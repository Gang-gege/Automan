<template>
  <div class="footer">
    <div class="footer-top">
      <div class="content">
        <p>
          <a href="https://github.com/Gang-gege/cnode11/tree/gh-pages"
            >Github 源码</a
          >
        </p>
        <p><span>©2021 AutoMan论坛</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.footer {
  margin-top: 50px;
  display: flex;
  width: 100%;
  height: 100px;
  background-color: #444;
  justify-content: center;
  .footer-top {
    width: 80%;
    display: flex;
    align-items: center;
    .content {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-left: 50px;
      align-items: center;
      p {
        margin: 0;
        a {
          text-decoration: none;
          color: #ccc;
        }
        a:hover {
          text-decoration: underline;
          color: #fff;
        }
        span {
          color: #ccc;
        }
      }
    }
  }
}
</style>