<template>
  <!-- 布局组件 -->
  <div class="panel">
    <div class="header">
      <slot name="header" />
    </div>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.panel {
  width: 100%;
  border-radius: 5px;
  .header {
    padding: 10px;
    background-color: rgb(212, 205, 205);
  }
  .content {
    padding: 10px;
    background-color: white;
  }
}
</style>