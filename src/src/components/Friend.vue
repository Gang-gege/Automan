<template>
  <div class="friend">
    <Panel>
      <template #header> 友情社区 </template>
      <template #content>
        <div>
          <img
            src="//static2.cnodejs.org/public/images/ruby-china-20150529.png"
            alt=""
          />
          <img
            src="//static2.cnodejs.org/public/images/golangtc-logo.png"
            alt=""
          />
          <img
            src="//static2.cnodejs.org/public/images/phphub-logo.png"
            alt=""
          />
        </div>
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
.friend {
  margin-top: 20px;
  width: 280px;
  img {
    width: 70%;
  }
}
</style>