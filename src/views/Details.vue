<template>
  <div class="details" v-if="topic">
    <Panel class="content">
      <template #header>
        <h2>文章详情</h2>
      </template>
      <template #content>
        <div class="topic-title">
          <span
            v-if="topic.top || topic.good"
            :class="topic.top || topic.good ? 'tab' : ''"
            >{{ topic | formatTab }}</span
          >
          <h3>{{ topic.title }}</h3>
          <el-button
            @click="collect(topic.is_collect)"
            v-if="isLogin"
            class="collect"
            :type="topic.is_collect ? 'danger' : 'primary'"
            >{{ topic.is_collect ? "取消收藏" : "收藏" }}</el-button
          >
        </div>
        <hr />
        <div class="topic-content">
          <div v-html="topic.content"></div>
        </div>
      </template>
    </Panel>
    <Panel class="replys">
      <template #header>
        <span>{{ topic.reply_count }}回复</span>
      </template>
      <template #content>
        <div class="reply" v-for="(reply, index) in topic.replies" :key="index">
          <div class="front-back">
            <div class="front">
              <el-avatar
                :style="{
                  cursor: 'pointer',
                  verticalAlign: 'middle',
                  marginRight: '10px',
                }"
                :title="reply.author.loginname"
                shape="square"
                :size="30"
                :src="reply.author.avatar_url"
              ></el-avatar>
              <span class="loginname">{{ reply.author.loginname }}</span>
              <span class="floor"
                >{{ index + 1 }}楼·{{
                  $moment(reply.create_at).fromNow()
                }}</span
              >
            </div>
            <div class="behind">
              <span
                v-if="isLogin"
                @click="up_click(reply.id)"
                :class="
                  reply.is_uped
                    ? 'iconfont icon-dianzan '
                    : 'iconfont icon-dianzan1 '
                "
              ></span>
              <span
                v-else
                @click="noLogin_click"
                class="iconfont icon-dianzan1"
              ></span>
              <span v-if="reply.ups.length !== 0" class="ups">{{
                reply.ups.length
              }}</span>
              <span
                v-if="isLogin"
                @click="otherAddForm(reply)"
                class="iconfont icon-icon_reply"
              ></span>
            </div>
          </div>
          <div class="reply_content" v-html="reply.content"></div>
          <div class="reply_other" v-if="reply.id === comment_id">
            <quill-editor ref="quill" v-model="comment_text"> </quill-editor>
            <el-button
              @click="otherSubmit(reply.id)"
              class="newComment"
              type="primary"
              >回复</el-button
            >
          </div>
        </div>
      </template>
    </Panel>
    <Panel v-if="$store.state.token" class="comment">
      <template #header> 新建评论 </template>
      <template #content>
        <quill-editor v-model="addForm"> </quill-editor>
        <el-button @click="submit" class="newComment" type="primary"
          >回复</el-button
        >
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";

export default {
  data() {
    return {
      topic: null,
      // 回复文章
      addForm: "",
      // 回复那个人的id
      comment_id: "",
      // 回复那个人的内容
      comment_text: "",
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.token;
    },
  },
  components: {
    Panel,
  },
  async created() {
    // const localToken = localStorage.getItem("localToken");
    // // console.log(localToken);
    // this.$store.commit("preserveToken", localToken);
    const { topicId } = this.$route.params;
    const { token } = this.$store.state;
    const verification = this.$store.state.token;
    const url = verification
      ? `/topic/${topicId}?accesstoken=${token}`
      : `/topic/${topicId}`;
    const res = await this.$axios.get(url);
    // console.log(res.data.author.loginname);
    this.topic = res.data;
    const loginname = this.topic.author.loginname;
    const res1 = await this.$axios.get(`/user/${loginname}`);
    this.$store.commit("getUserInfo", res1.data);
  },

  methods: {
    // 点赞
    async up_click(id) {
      const res = await this.$axios.post(`/reply/${id}/ups`, {
        accesstoken: this.$store.state.token,
      });
      console.log(this.topic.replies);
      // console.log(ups);
      const currentReply = this.topic.replies.find((item) => item.id === id);
      currentReply.is_uped = res.action === "up" ? true : false;
      // console.log(this.$store.state.userInfo);
      currentReply.is_uped
        ? currentReply.ups.push(this.$store.state.userInfo.id)
        : currentReply.ups.pop();
    },
    noLogin_click() {
      this.$message("请先登录，登录之后方可点赞");
    },

    // 收藏
    async collect(collect) {
      let res;
      if (collect) {
        res = await this.$axios.post("/topic_collect/de_collect", {
          accesstoken: this.$store.state.token,
          topic_id: this.$route.params.topicId,
        });
      } else {
        res = await this.$axios.post("/topic_collect/collect", {
          accesstoken: this.$store.state.token,
          topic_id: this.$route.params.topicId,
        });
      }
      this.topic.is_collect = !collect;
      // console.log(res);
    },

    // 回复
    async submit() {
      const localToken = localStorage.getItem("localToken");
      const localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));
      console.log(localToken, localUserInfo);
      const { addForm } = this;
      if (addForm) {
        const res = await this.$axios.post(`topic/${this.topic.id}/replies`, {
          accesstoken: localToken,
          content: addForm,
        });
        // 根据后台 ID 和 text 做假的评论 更新 topic
        const newComment = {
          id: res.reply_id,
          is_uped: false,
          ups: [],
          content: addForm,
          author: {
            avatar_url: localUserInfo.avatar_url,
            loginname: localUserInfo.loginname,
          },
        };
        this.topic.replies.push(newComment);
        this.addForm = "";
      }
    },

    // 回复别人
    otherAddForm(reply) {
      const { id, author } = reply;
      this.comment_id = id;
      this.comment_text = `<a href='/user/${author.loginname}'>@${author.loginname}</a> `;
      this.$nextTick(function () {
        this.$refs.quill[0].$refs.editor.focus();
      });
    },

    async otherSubmit(id) {
      const localToken = localStorage.getItem("localToken");
      const localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));
      const { comment_text } = this;
      if (comment_text) {
        // console.log(comment_text);
        const res = await this.$axios.post(`topic/${this.topic.id}/replies`, {
          accesstoken: localToken,
          content: comment_text,
        });
        // 根据后台 ID 和 text 做假的评论 更新 topic
        const newComment = {
          id: res.reply_id,
          is_uped: false,
          ups: [],
          content: comment_text,
          author: {
            avatar_url: localUserInfo.avatar_url,
            loginname: localUserInfo.loginname,
          },
        };
        this.topic.replies.push(newComment);
        this.comment_text = "";
        this.comment_id = "";
      }
    },
  },
};
</script>

<style lang="less" >
.details {
  width: 100%;
  .content {
    .topic-title {
      display: flex;
      align-items: center;
      .collect {
        margin-left: auto;
      }
      .tab {
        height: 30px;
        padding: 2px 4px;
        background-color: rgb(202, 19, 19);
        margin-right: 5px;
        border-radius: 4px;
        color: #aaa;
      }
    }
    .topic-content {
      .markdown-text p img {
        max-width: 100%;
      }
    }
  }
  .replys {
    .reply {
      padding-top: 10px;
      padding-bottom: 20px;
      border-top: 1px solid #f0f0f0;
      .reply_content {
        .markdown-text > p > img {
          max-width: 100%;
        }
      }
      .front-back {
        display: flex;
        align-items: center;
        .front {
          .loginname {
            font-size: 12px;
          }
          .floor {
            margin-left: 10px;
            font-size: 12px;
          }
        }
        .behind {
          margin-left: auto;

          span {
            margin-left: 4px;
          }
          .iconfont {
            font-size: 18px;
            cursor: pointer;
          }
          .ups {
            font-size: 12px;
          }
        }
      }
      .reply_other {
        height: 200px;
        .ql-editor {
          height: 100px;
        }
      }
    }
  }
  .comment {
    margin-top: 20px;
    .ql-editor {
      height: 200px;
    }
    .newComment {
      margin-top: 10px;
    }
  }
}
</style>>

