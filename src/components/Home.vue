<template>
  <div>
    <template>
      <el-backtop class="el_backtop">
        <i class="el-icon-caret-top"></i>
      </el-backtop>
    </template>
    <el-container style="text-align: center">
      <el-header style="padding: 0px;height: 30px;margin-bottom: 1px">
        <nav-menu></nav-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer style="height: 30px;padding: 0 ">
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import NavMenu from './common/NavMenu'
  import Footer from "./admin/Footer";

  export default {
    name: 'Home',
    components: {NavMenu, Footer},
    mounted() {
      this.newMessage()
    },
    methods: {
      newMessage() {
        //有新消息则通知
        this.$axios.get('/message/new?userId=' + this.$store.state.user.id).then(resp => {
          if (resp.data.code === 200) {
            this.$notify({message: '您有 ' + resp.data.data + ' 条未读消息', type: 'success'})
          }
        })
      }
    }
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
