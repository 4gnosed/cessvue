<template>
  <div style="height: 100px;margin-left: -1px;margin-top: -6px">
    <el-scrollbar>
      <nav-menu></nav-menu>
      <router-view/>
      <Footer></Footer>
    </el-scrollbar>
  </div>
</template>

<script>
import NavMenu from './common/NavMenu'
import Footer from "./admin/Footer";

export default {
  name: 'Home',
  components: {NavMenu,Footer}
}
</script>

<style scoped>
</style>
