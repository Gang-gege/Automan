<template>
  <div class="app">
    <Header />
    <div class="main">
      <router-view class="left" />
      <div class="right">
        <UserInfo />
        <Conversation
          class="conversation"
          v-if="
            !$route.path.includes('/topic') &&
            !$route.path.includes('/login') &&
            $store.state.userInfo
          "
        />
        <Client />
        <Friend />
      </div>
    </div>
    <el-backtop :right="2" :bottom="200" :visibility-height="300">
      <div
        style="
           {
            height: 100px;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.42);
            border-radius: 5px;
            text-align: center;
            line-height: 100px;
            color: #1989fa;
          }
        "
      >
        UP
      </div>
    </el-backtop>
    <Footer />
  </div>
</template>
<script>
import Client from "./components/Client.vue";
import Conversation from "./components/Conversation.vue";
import Friend from "./components/Friend.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import UserInfo from "./components/UserInfo.vue";
export default {
  components: { Header, UserInfo, Conversation, Friend, Client, Footer },
};
</script>
<style lang='less' scoped>
.app {
  width: 100%;
  .main {
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    display: flex;
    .left {
      margin-left: 80px;
      margin-right: 40px;
      margin-top: 20px;
    }
    .right {
      margin-right: 80px;
      margin-top: 20px;
      .conversation {
        margin-top: 14px;
      }
    }
  }
}
</style>