<template>
  <div>
    <el-card class="admin-header">
      <a href="/index">
      </a>
      <span style="font-size: 25px;font-weight: bold;position:absolute;left: 30px">cess后台管理</span>
      <i class="el-icon-switch-button" v-on:click="logout" style="font-size: 30px;float: right;"></i>
    </el-card>
  </div>
</template>

<script>

  export default {
    name: 'Header',
    methods: {
      logout() {
        this.$router.replace('/index')
        // var _this = this
        // this.$axios.get('/logout').then(resp => {
        //   if (resp && resp.data.code === 200) {
        //     _this.$store.commit('logout')
        //     _this.$router.replace('/index')
        //     // 清空路由，防止路由重复加载
        //     // const newRouter = createRouter()
        //     // _this.$router.matcher = newRouter.matcher
        //   }
        // }).catch(failResponse => {
        // })
      }
    }
  }
</script>

<style scoped>
  .admin-header {
    height: 55px;
    opacity: 0.85;
    line-height: 10px;
    min-width: 900px;
  }

  .el-icon-switch-button {
    cursor: pointer;
    outline: 0;
  }
</style>
