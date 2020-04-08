<template>
  <div>
    <el-menu
      router
      mode="horizontal"
      background-color="#545c64"
      text-color="#D2D3D6"
      active-text-color="white"
      style="min-width: 1300px;height: 50px">
      <span style="font-size: 25px;color:#f0f0f0;font-weight: bold;position:absolute;left: 30px;margin-top: 7px">CESS 后台管理</span>
      <i @click="viewMessage()" class="el-icon-bell"
         style="font-size: 26px;color: #f0f0f0;padding: 15px;margin-left: 1550px">
        <el-badge is-dot></el-badge>
      </i>
      <el-dropdown class="drop_down" trigger="click">
        <el-button circle class="font_class">
          {{this.$store.state.user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" class="font_class">
          <el-dropdown-item @click.native="help">帮助</el-dropdown-item>
          <el-dropdown-item @click.native="logout">返回主页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
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
      },
      viewMessage() {
        this.$message('新消息')
      }
    }
  }
</script>

<style scoped>
  .drop_down {
    float: right;
    font-size: 16px;
    padding: 5px;
    color: #f0f0f0;
  }
  .font_class {
    font-size: 15px;font-weight: bold;
  }
</style>
