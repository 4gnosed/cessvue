<template>
  <el-menu
    :default-active="currentPath"
    class="el-menu-admin"
    router
    mode="vertical"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse">
    <div style="height: 80px;"></div>
    <navigation-item v-for="(menu,i) in adminMenus" :key="i" :item="menu"/>
  </el-menu>
</template>

<script>
import NavigationItem from "../common/NavigationItem";
export default {
  name: 'AdminMenu',
  components: {NavigationItem},
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    adminMenus () {
      return this.$store.state.adminMenus
    },
    currentPath () {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
  .el-menu-admin {
    border-radius: 5px;
    height: 100%;
  }
</style>
