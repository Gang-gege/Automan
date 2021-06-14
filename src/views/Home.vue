<template>
  <div class="home">
    <Panel>
      <template #header>
        <div class="nav">
          <router-link to="/">全部</router-link>
          <router-link to="/good">精华</router-link>
          <router-link to="/share">分享</router-link>
          <router-link to="/ask">问答</router-link>
          <router-link to="/job">招聘</router-link>
          <router-link to="/dev">客户端测试</router-link>
        </div>
      </template>
      <template #content>
        <div v-if="posts.length">
          <div class="post-item" v-for="post in posts" :key="post.id">
            <el-avatar
              :style="{
                cursor: 'pointer',
                verticalAlign: 'middle',
                marginRight: '10px',
              }"
              :title="post.author.loginname"
              shape="square"
              :size="50"
              :src="post.author.avatar_url"
            ></el-avatar>
            <span class="count">
              <span :style="{ fontSize: '20px' }">{{ post.reply_count }}</span>
              <span>/</span>
              <span :style="{ color: '#999' }">{{ post.visit_count }}</span>
            </span>
            <span class="art">
              <span
                v-if="!$route.params.tab || post.top || post.good"
                :class="post.top || post.good ? 'active-tab' : 'tab'"
                >{{ post | formatTab }}</span
              >
              <router-link
                class="title"
                :to="{ name: 'details', params: { topicId: post.id } }"
                ><span>{{ post.title }}</span></router-link
              ></span
            >
            <span class="time">{{
              $moment(post.last_reply_at).fromNow()
            }}</span>
            <hr />
          </div>
        </div>
      </template>
    </Panel>
    <el-pagination
      class="pagenation"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[40, 20]"
      :page-size="40"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  data() {
    return {
      posts: [],
      currentPage: 1,
      sizeChange: 40,
      currentChange: 1,
      publicTab: "",
      piblicLimit: 0,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.sizeChange = val;
      // console.log(this.sizeChange);
    },
    handleCurrentChange(val) {
      this.currentChange = val;
    },
    changeSize() {
      this.$emit();
    },
  },
  // created() {
  //   console.log(this.$route);
  // },
  computed: {
    total() {
      const currentPath = this.$route.path;
      return currentPath === "/"
        ? 680
        : currentPath === "/good"
        ? 720
        : currentPath === "/share"
        ? 440
        : currentPath === "/ask"
        ? 280
        : currentPath === "/job"
        ? 240
        : currentPath === "/dev"
        ? 360
        : "";
    },
  },
  components: { Panel },
  name: "Home",
  watch: {
    "$route.params.tab": {
      async handler(newVaule) {
        // console.log(newVaule);
        const tab = newVaule ? newVaule : "";
        this.publicTab = tab;
        const res = await this.$axios.get(`/topics?page=1&limit=40&tab=${tab}`);
        // console.log(res.data);
        this.posts = res.data;
      },
      immediate: true,
    },
    "$route.path": {
      async handler(newVaule) {
        const tab =
          (newVaule === "/") |
          (newVaule === "/good") |
          (newVaule === "share") |
          (newVaule === "ask") |
          (newVaule === "job") |
          (newVaule === "dev");
        if (tab) {
          const localUserInfo = JSON.parse(
            localStorage.getItem("localUserInfo")
          );
          this.$store.commit("preserveUserInfo", localUserInfo);
        }
      },
      immediate: true,
    },
    sizeChange: {
      async handler(newVaule) {
        // console.log(newVaule);
        this.piblicLimit = newVaule;
        const res = await this.$axios.get(
          `/topics?page=1&limit=${newVaule}&tab=${this.publicTab}`
        );
        // console.log(res.data);
        this.posts = res.data;
      },
    },
    currentChange: {
      async handler(newVaule) {
        // console.log(newVaule);
        const res = await this.$axios.get(
          `/topics?page=${newVaule}&limit=${this.piblicLimit}&tab=${this.publicTab}`
        );
        this.$router.push(this.$route.path + "?page=" + newVaule);
        // console.log(res.data);
        this.posts = res.data;
      },
    },
  },
};
</script>
<style scoped lang='less'>
.home {
  width: 100%;
  .pagenation {
    background-color: white;
    padding-bottom: 10px;
  }
  .nav {
    a {
      margin-right: 15px;
      margin-left: 15px;
      color: green;
    }
    a:hover {
      color: #040c79;
    }
  }
  .post-item {
    margin-top: 10px;
    .count {
      width: 100px;
      display: inline-block;
      vertical-align: middle;
    }
    .art {
      width: 74%;
      display: inline-block;
      .title {
        color: black;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: middle;
        :hover {
          text-decoration: underline;
          color: #0e1ead;
        }
      }
      .active-tab {
        padding: 2px 4px;
        background-color: rgb(202, 19, 19);
        margin-right: 5px;
        border-radius: 4px;
        color: #ccc;
      }
      .tab {
        padding: 2px 4px;
        background-color: #eee;
        margin-right: 5px;
        border-radius: 4px;
        color: #aaa;
      }
    }
  }
}
</style>
