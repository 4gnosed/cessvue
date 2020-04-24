<template>
  <div>
    <el-menu
      :default-active="$route.path"
      router
      mode="horizontal"
      background-color="#303643"
      style="width: 100%">
      <el-row style="color: #fff">
        <el-col :xs="18" :sm="18" :md="20" :lg="21" :xl="21">
          <div class="el_menu_else_item title_item">
            高校就业服务后台管理系统
          </div>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1">
          <div class="el_menu_else_item">
            <i @click="viewMessage()" class="el-icon-s-comment el_menu_else_item" style="font-size: 18px">
              <el-badge is-dot></el-badge>
            </i>
          </div>
        </el-col>
        <el-col :xs="4" :sm="4" :md="2" :lg="2" :xl="2">
          <div class="el_menu_else_item">
            <el-dropdown trigger="click" class="el_menu_else_item">
              <template v-if="this.$store.state.user.username">
                <el-button size="mini" round class="drop_down_button">
                  {{this.$store.state.user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" style="font-size: 11px;">
                  <el-dropdown-item @click.native="help">帮助</el-dropdown-item>
                  <el-dropdown-item @click.native="backIndex">返回主页</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-menu>
  </div>
</template>

<script>
  import {createRouter} from "../../router";
  import 'element-ui/lib/theme-chalk/display.css';

  export default {
    name: 'Header',
    methods: {
      backIndex() {
        this.$router.replace('/index')
      },
      viewMessage() {
        this.$message('新消息')
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

  .el-icon-arrow-down {
    font-size: 11px;
  }

  .el_menu_else_item {
    font-size: 11px;
    font-weight: bold;
    line-height: 30px;
    height: 30px;
  }

  .title_item {
    font-size: 16px;
    letter-spacing: 2px;
  }

  .drop_down_button {
    font-size: 11px;
    font-weight: bold;
  }
</style>
