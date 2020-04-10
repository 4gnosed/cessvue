<template>
      <div class="login-footer">
        <a class="a" href="https://github.com/4gnosed" target="_blank">
          GitHub
        </a>
        <a class="a" href="https://blog.csdn.net/gnosed" target="_blank">
          CSDN
        </a>
        <a class="a">
          © 2020 CESS, Inc.
        </a>
      </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
  .login-footer {
    padding: 10px;
    background: #303643;
    text-align: center;
    font-size: 16px;
    position: absolute;
    width: 100%;
    bottom: 0px;
    margin-left: -1px;
    border-top: 1px solid #969393;
  }
  .a {
    margin-left: 30px;
    color: #f0f0f0;
  }
</style>
