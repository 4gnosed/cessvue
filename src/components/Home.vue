<template>
  <div>
    <template>
      <el-backtop class="el_backtop">
        <i class="el-icon-caret-top"></i>
      </el-backtop>
    </template>
    <el-container style="text-align: center">
      <el-header style="padding: 0px;height: 30px;margin-bottom: 1px">
        <nav-menu v-bind:newMessageNum="newMessageNum"></nav-menu>
      </el-header>
      <el-main style="margin-top: 20px">
        <router-view></router-view>
      </el-main>
      <el-footer style="height: 40px;padding: 0 ">
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import NavMenu from './common/NavMenu'
  import Footer from "./common/Footer";

  export default {
    name: 'Home',
    components: {NavMenu, Footer},
    data() {
      return {
        newMessageNum: 0
      }
    },
    mounted() {
      this.newMessage()
    },
    methods: {
      newMessage() {
        let uid = this.$store.state.user.id
        if (uid) {
          //有新消息则通知
          this.$axios.get('/message/new?userId=' + uid).then(resp => {
            if (resp.data.code === 200) {
              this.newMessageNum = resp.data.data;
              this.$notify({message: '您有 ' + this.newMessageNum + ' 条未读消息', type: 'success'})
            }
          })
        }
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
