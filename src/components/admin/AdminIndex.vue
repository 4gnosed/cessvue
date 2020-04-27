<template>
  <el-container>
    <template>
      <el-backtop class="el_backtop">
        <i class="el-icon-caret-top"></i>
      </el-backtop>
    </template>
    <el-header style="padding: 0px;height: 30px;margin-bottom: 1px">
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside style="width: 200px">
        <admin-menu style="width: 200px;height: 1000px;"></admin-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
    <el-footer style="padding: 0px;height: 30px;margin-top: 1px">
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
  import AdminMenu from './AdminMenu'
  import Header from './Header'
  import Footer from "./Footer";

  export default {
    name: 'AdminIndex',
    components: {Footer, AdminMenu, Header},
    data() {
      return {}
    },
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
