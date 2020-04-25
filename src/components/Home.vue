<template>
  <div>
    <template>
      <el-backtop class="el_backtop">
        <i class="el-icon-caret-top"></i>
      </el-backtop>
    </template>
    <el-scrollbar>
      <div>
        <nav-menu></nav-menu>
        <router-view/>
        <Footer></Footer>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
  import NavMenu from './common/NavMenu'
  import Footer from "./admin/Footer";

  export default {
    name: 'Home',
    components: {NavMenu, Footer}
  }
</script>

<style scoped>
  .el_backtop {
    font-size: 14px;
    background-color: #f2f5f6;
    text-align: center;
    line-height: 20px;
    color: #303643;
  }
</style>
