<template>
  <body id="poster">
    <el-form class="login-container" label-position="left"
             label-width="0px">
      <h3 class="login_title">Cess系统登录</h3>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">
          <i class="el-icon-user"></i>
          <span slot="title">账户登录</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-message"></i>
          <span slot="title">短信登录</span>
        </el-menu-item>
      </el-menu>
      <el-form-item class="form_item">
        <el-input type="text" v-model="loginForm.username" prefix-icon="el-icon-user-solid"
                  auto-complete="off" placeholder="请输入账号" spellcheck="false">
          <i slot="prepend">账号</i>
        </el-input>
      </el-form-item>
      <el-form-item class="form_item">
        <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"
                  auto-complete="off" placeholder="请输入密码" show-password="show-password">
          <i slot="prepend">密码</i>
        </el-input>
      </el-form-item>
      <el-form-item class="form_item">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
      </el-form-item>
      <el-form-item class="form_item">
        <router-link to="register"><el-button type="primary" style="width: 100%;background: #505458;border: none">没用账户？ 先注册</el-button></router-link>
      </el-form-item>
    </el-form>
  </body>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123'
      },
      responseResult: [],
      activeIndex: '1'
    }
  },
  methods: {
    login() {
      // add
      this.$axios
        .post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(resp => {
          if (resp.data.code === 200) {
            // 返回成功代码直接跳转首页
            // this.$router.replace({path: '/index'})
            // 触发 store 中的 login() 方法，把 loginForm 对象传递给 store 中的 user 对象
            this.$store.commit('login', this.loginForm)
            // 获取登录前页面的路径并跳转，如果该路径不存在，则跳转到首页
            var path = this.$route.query.redirect
            this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {
        })
    },
    handleSelect() {

    }
  }
}
</script>

<style>
  #poster {
    background:url("../assets/img/eva.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 200px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .form_item {
    margin: 20px auto;
  }
</style>
