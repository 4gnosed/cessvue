<template>
  <div>
    <el-menu
      :default-active="'/index'"
      router
      mode="horizontal"
      background-color="#303643"
      text-color="#D2D3D6"
      active-text-color="red"
      style="min-width: 1300px;margin-left: -1px;margin-right: -30px">
      <el-menu-item class="font_class" v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
      <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;color: #D2D3D6;font-weight: bold;">Collage Employment Service System | 高校就业服务系统</span>
      <el-input
        placeholder="快速搜索..."
        prefix-icon="el-icon-search"
        size="medium"
        style="width: 300px;position:absolute;margin-top: 18px;right: 18%"
      >
      </el-input>
      <i @click="viewMessage()" class="el-icon-bell"
         style="font-size: 26px;color: #f0f0f0;padding: 20px;margin-left: 1180px">
        <el-badge is-dot></el-badge>
      </i>
      <el-dropdown class="drop_down" trigger="click">
        <template v-if="this.$store.state.user.username">
          <el-button circle class="font_class">
            {{this.$store.state.user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="font_class">
            <el-dropdown-item @click.native="personCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="help">帮助</el-dropdown-item>
            <el-dropdown-item @click.native="logout">安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
        <template v-else>
          <el-button circle  class="font_class" @click.native="login">
            未登录
          </el-button>
        </template>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    data() {
      return {
        navList: [
          {name: '/index', navItem: '首页'},
          // {name: '/student', navItem: '学生'},
          // {name: '/enterprise', navItem: '企业'},
          // {name: '/leader', navItem: '教师'},
          // {name: '/admin/welcome', navItem: '学校就业部'}
          {name: '/student', navItem: '求职'},
          {name: '/enterprise', navItem: '招聘'},
          {name: '/leader', navItem: '数据分析'},
          {name: '/admin/welcome', navItem: '后台管理'}
        ]
      }
    },
    methods: {
      logout() {
        var _this = this
        this.$axios.get('/logout').then(resp => {
          if (resp.data.code === 200) {
            // 前后端状态保持一致
            _this.$store.commit('logout')
            _this.$router.replace('/home')
          }
        })
      },
      login() {
        this.$router.replace('/login')
      },
      viewMessage() {
        this.$message('新消息')
      },
      personCenter() {
        this.$router.replace('/personCenter')
      }
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }

  .el-icon-switch-button {
    cursor: pointer;
    outline: 0;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .drop_down {
    float: right;
    font-size: 16px;
    padding: 13px;
    margin-right: 20px;
    color: #f0f0f0;
  }

  .font_class {
    font-size: 15px;font-weight: bold;
  }
</style>
