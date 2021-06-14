<template>
  <div class="header">
    <div class="header-top">
      <div class="logo">
        <span class="one">A</span>
        <span class="one">O</span>
        <span class="one">T</span>
        <span class="one">U</span>
        <span class="two">M</span>
        <span class="two">A</span>
        <span class="two">N</span>
      </div>
      <div class="leftNav">
        <router-link to="/"><span>首页</span></router-link>
        <span
          :style="{ cursor: 'pointer' }"
          @click="quit"
          v-if="$store.state.token"
          >退出</span
        >
        <router-link v-else to="/login"><span>登录</span></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",

  methods: {
    quit() {
      localStorage.clear();
      this.$store.commit("deleteToken", "");
      window.location.reload();
    },
  },
};
</script>

<style lang='less' scoped>
.header {
  display: flex;
  width: 100%;
  height: 100px;
  background-color: #444;
  justify-content: center;
  .header-top {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .leftNav span {
      margin-right: 16px;
      color: #ccc;
      line-height: 50px;
      font-size: 20px;
    }
    .leftNav span:hover {
      color: #fff;
    }
  }
  .logo {
    span {
      font-size: 42px;
      line-height: 50px;
    }
    .one {
      color: #fff;
    }
    .two {
      color: rgb(224, 106, 106);
    }
  }
}
</style>