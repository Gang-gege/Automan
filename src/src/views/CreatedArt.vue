<template>
  <div class="created">
    <Panel>
      <template #header>
        <router-link :style="{ color: '#00b3b4' }" to="/">主页</router-link> /
        <span>发布话题</span>
      </template>
      <template #content>
        <div class="select">
          <span>选择板块：</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <el-input
          placeholder="请输入标题不少于十个字"
          class="input"
          v-model="input"
        ></el-input>
        <quill-editor class="qui-editor" v-model="create_article">
        </quill-editor>
        <el-button @click="submitTopic" class="newComment" type="primary"
          >提交</el-button
        >
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: {
    Panel,
  },
  data() {
    return {
      create_article: "",
      options: [
        {
          value: "/share",
          label: "分享",
        },
        {
          value: "/ask",
          label: "回答",
        },
        {
          value: "/job",
          label: "招聘",
        },
        {
          value: "/dev",
          label: "客户端测试",
        },
      ],
      value: "",
      input: "",
    };
  },
  methods: {
    async submitTopic() {
      console.log(this.value);
      const res = await this.$axios.post("/topics", {
        accesstoken: this.$store.state.token,
        title: this.input,
        tab: "dev",
        content: this.create_article,
      });
      this.$router.push({ path: this.value });
      // console.log(res);
    },
  },
};
</script>

<style lang='less'>
.created {
  .select {
    margin-top: 5px;
  }
  .input {
    margin-top: 10px;
  }
  .qui-editor {
    margin-top: 10px;
    .ql-editor {
      min-height: 500px;
    }
  }
  .newComment {
    margin-top: 10px;
  }
}
</style>