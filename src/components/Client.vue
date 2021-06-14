<template>
  <div class="client">
    <Panel>
      <template #header> 站长微信 </template>
      <template #content>
        <img src="../assets/VX.jpg" alt="" />
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel },
};
</script>

<style lang='less'>
.client {
  margin-top: 20px;
  width: 280px;
  img {
    width: 100%;
  }
}
</style>