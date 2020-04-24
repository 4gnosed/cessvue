<template>
  <div style="width: 100%">
    <el-menu
      :default-active="$route.path"
      router
      mode="horizontal"
      background-color="#303643"
      text-color="#D2D3D6"
      active-text-color="red"
      style="width: 100%">
      <el-row>
        <el-col :xs="12" :sm="11" :md="8" :lg="6" :xl="8">
          <el-menu-item class="el_menu_item" v-for="(item,i) in navList" :key="i" :index="item.name">
            {{ item.navItem }}
          </el-menu-item>
        </el-col>
        <el-col :xs="6" :sm="7" :md="7" :lg="5" :xl="4">
          <div class="el_menu_else_item title_item">
            高校就业服务系统
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="5" class="hidden-md-and-down">
          <div class="el_menu_else_item title_item" style="border-left: #D2D3D6 solid 2px">
            Collage Employment Service System
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="4" :lg="3" :xl="4" class="hidden-sm-and-down">
          <div class="el_menu_else_item">
            <el-input
              prefix-icon="el-icon-search"
              size="mini"
              style="width: 150px;">
            </el-input>
          </div>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1">
          <div class="el_menu_else_item">
            <i @click="viewMessage()" class="el-icon-s-comment el_menu_else_item" style="font-size: 18px">
              <el-badge is-dot></el-badge>
            </i>
          </div>
        </el-col>
        <el-col :xs="4" :sm="4" :md="1" :lg="1" :xl="2">
          <div class="el_menu_else_item">
            <el-dropdown trigger="click" class="el_menu_else_item">
              <template v-if="this.$store.state.user.username">
                <el-button size="mini" round class="drop_down_button">
                  {{this.$store.state.user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" style="font-size: 11px;">
                  <el-dropdown-item @click.native="personCenter">个人中心</el-dropdown-item>
                  <el-dropdown-item @click.native="help">帮助</el-dropdown-item>
                  <el-dropdown-item @click.native="logout">安全退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
              <template v-else>
                <el-button @click.native="login" size="mini" round class="drop_down_button">
                  未登录
                </el-button>
              </template>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-menu>
  </div>
</template>

<script>
  import 'element-ui/lib/theme-chalk/display.css';
  import {createRouter} from "../../router";

  export default {
    name: 'NavMenu',
    data() {
      return {
        navList: [
          {name: '/index', navItem: '首页'},
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

            /*清空路由，防止路由重复加载*/
            const newRouter = createRouter()
            this.$router.matcher = newRouter.matcher

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

<style>
  a {
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }

  .el-icon-arrow-down {
    font-size: 11px;
  }

  .el_menu_item {
    font-size: 11px;
    font-weight: bold;
    float: left;
    padding: 0 4px;
    line-height: 30px;
    height: 30px;
  }

  .el_menu_else_item {
    font-size: 11px;
    color: #D2D3D6;
    font-weight: bold;
    line-height: 30px;
    height: 30px;
  }

  .title_item {
    font-size: 14px
  }

  .drop_down_button {
    font-size: 11px;
    font-weight: bold;
  }
</style>
