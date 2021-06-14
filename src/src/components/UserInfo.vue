<template>
  <div class="userinfo">
    <Panel>
      <template #header>
        <span v-if="token">个人信息</span>
        <span v-else>网站信息</span>
      </template>
      <template #content>
        <div v-if="token" class="user-info">
          <el-avatar
            :style="{
              cursor: 'pointer',
              verticalAlign: 'middle',
              marginRight: '10px',
            }"
            title="帅气逼人"
            shape="square"
            :size="50"
            :src="userInfo.avatar_url"
          ></el-avatar>
          <p :style="{ marginLeft: '20px' }">{{ userInfo.loginname }}</p>
          <p>"这个人很帅什么都没有留下"</p>
        </div>
        <div v-else class="web-info">
          <p>CNode：Node.js专业中文社区</p>
          <el-button
            v-if="!$route.path.includes('/login')"
            type="primary"
            @click="login"
            >登录</el-button
          >
          <span v-else>作者邮箱:2453451606@qq.com</span>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel";
export default {
  created() {
    const localUserInfo = JSON.parse(localStorage.getItem("localUserInfo"));
    this.$store.commit("preserveUserInfo", localUserInfo);
    const localToken = localStorage.getItem("localToken");
    this.$store.commit("preserveToken", localToken);
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  components: {
    Panel,
  },
  methods: {
    //   3606c179-df1f-4107-93d7-96e1b829dfb0
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.user-info {
  width: 260px;
  display: flex;
  flex-wrap: wrap;
}
.web-info {
  width: 260px;
  display: flex;
  flex-direction: column;
}
</style>