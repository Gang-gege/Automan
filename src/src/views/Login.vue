<template>
  <div class="login">
    <div class="user">
      <span>用户名：</span>
      <el-input class="input" v-model="casual" placeholder="随便写"></el-input>
    </div>
    <div class="password">
      <span>密 码：</span>
      <el-input
        class="input"
        v-model.trim="token"
        placeholder="请输入密码"
      ></el-input>
    </div>
    <el-button type="primary" class="button" @click="login">登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "3606c179-df1f-4107-93d7-96e1b829dfb0",
      casual: "帅气逼人",
    };
  },
  methods: {
    login() {
      //   3606c179-df1f-4107-93d7-96e1b829dfb0
      this.$axios
        .post("/accesstoken", { accesstoken: this.token })
        .then((res) => {
          const userInfo = res;
          const token = this.token;
          localStorage.setItem("localToken", token);
          localStorage.setItem("localUserInfo", JSON.stringify(userInfo));
          this.$store.commit("getToken", token);
          this.$store.commit("getUserInfo", userInfo);
          this.$router.push("/");
        })
        .catch((err) => {
          this.$message.error("密码输入错误，请重新输入");
        });
    },
  },
};
</script>

<style scoped lang='less'>
.login {
  margin: 100px auto;
  display: flex;
  background-color: rgb(233, 220, 233);
  width: 70%;
  height: 300px;
  flex-direction: column;
  border-radius: 30px;
  .user {
    display: flex;
    margin-top: 40px;
    margin-left: 75px;
    span {
      width: 15%;
      line-height: 40px;
      font-size: 20px;
    }
    .input {
      width: 70%;
    }
  }
  .password {
    margin-top: 40px;
    margin-left: 75px;
    display: flex;
    span {
      width: 15%;
      line-height: 40px;
      font-size: 20px;
    }
    .input {
      width: 70%;
    }
  }
  .button {
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
  }
}
</style>