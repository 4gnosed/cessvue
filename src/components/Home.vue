<template>
  <div style="height: 100px;margin-left: -1px;margin-top: -6px">
    <template>
      <el-backtop>
        <div
          style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        text-align: center;
        line-height: 20px;
        color: #303643;
      }"
        >
          UP
        </div>
      </el-backtop>
    </template>
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
