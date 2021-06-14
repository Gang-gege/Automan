<template>
  <div class="conversation">
    <el-button class="release" type="primary">
      <router-link to="/topic/create"> 发布话题</router-link>
    </el-button>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.conversation {
  padding: 10px;
  width: 280px;
  background-color: white;
  .release {
    a {
      text-decoration: none;
      color: #fff;
    }
  }
}
</style>