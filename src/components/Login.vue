<template>
  <body id="poster">
  <el-scrollbar style="height: 100%;">
    <el-form class="login-container" ref="loginRefs" :model="loginForm" :rules="loginRules" label-position="left"
             label-width="0px">
      <h3 class="login_title">CESS登录</h3>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click.native="changeIndex('1')">
          <i class="el-icon-user"></i>
          <span slot="title">账户登录</span>
        </el-menu-item>
        <el-menu-item index="2" @click.native="changeIndex('2')">
          <i class="el-icon-message"></i>
          <span slot="title">验证登录</span>
        </el-menu-item>
        <el-menu-item index="3" @click.native="changeIndex('3')">
          <i class="iconfont el-icon-iconfont-QRcode"></i>
          <span slot="title">二维码登录</span>
        </el-menu-item>
      </el-menu>
      <template v-if="activeIndex === '1' ">
        <el-form-item class="form_item" prop="username">
          <el-input type="text" v-model="loginForm.username" prefix-icon="el-icon-user-solid"
                    @keyup.enter.native="login"
                    auto-complete="off" placeholder="请输入账号" spellcheck="false">
            <i slot="prepend">账号</i>
          </el-input>
        </el-form-item>
        <el-form-item class="form_item" prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"
                    @keyup.enter.native="login"
                    auto-complete="off" placeholder="请输入密码" show-password="show-password">
            <i slot="prepend">密码</i>
          </el-input>
        </el-form-item>
        <el-form-item class="form_item" prop="verificationCode">
          <el-input v-model="loginForm.verificationCode" placeholder="请输入验证码">
            <i slot="prepend">验证码</i>
            <template slot="append">
              <el-button @click="getCode" :disabled="disabled=!show">
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </template>
      <template v-if="activeIndex === '2'">
        <el-form-item class="form_item" prop="phoneOrEmail">
          <el-input type="text" v-model="loginForm.phoneOrEmail" prefix-icon="el-icon-mobile-phone"
                    auto-complete="off" placeholder="请输入手机号或邮箱" spellcheck="false">
            <i slot="prepend">账号</i>
          </el-input>
        </el-form-item>
        <el-form-item class="form_item" prop="peCode">
          <el-input v-model="loginForm.peCode" placeholder="请输入验证码" prefix-icon="el-icon-message">
            <i slot="prepend">验证码</i>
            <template slot="append">
              <el-button icon="el-icon-mobile-phone" @click="sendCode" :disabled="disabled=!show">
                <span v-show="show">发送验证码</span>
                <span v-show="!show" class="count">{{count}} s</span>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </template>
      <el-form-item class="form_item">
        <el-checkbox v-model="loginForm.rememberMe" style="float: left;">记住我</el-checkbox>
      </el-form-item>
      <el-form-item class="form_item">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
      </el-form-item>
      <el-form-item class="form_item">
        <router-link to="register">
          <el-button type="primary" style="width: 100%;background: #505458;border: none">没用账户？ 先注册</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </el-scrollbar>
  </body>
</template>

<script>
  import Vue from "vue";

  const TIME_COUNT = 60; //更改倒计时时间
  export default {
    name: 'Login',
    data() {
      var checkPhoneOrEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号或邮箱'))
        }
        let valueStr = value.toString()
        let phoneReg = /^1[3456789]\d{9}$/
        let emailReg = /[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/
        if ((valueStr.length == 11 && phoneReg.test(valueStr)) || (emailReg.test(valueStr))) {
          callback()
        } else {
          return callback(new Error('输入不合法'))
        }
      }
      return {
        loginForm: {
          username: 'admin',
          password: '123',
          phoneOrEmail: '',
          peCode: '',
          rememberMe: true,
          verificationCode: ''
        },
        responseResult: [],
        activeIndex: '1',
        loginRules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
          peCode: [{required: true, message: '请输入验证码', trigger: 'blur'}],
          phoneOrEmail: [{validator: checkPhoneOrEmail, trigger: 'blur'}],
        },
        show: true,  // 初始启用按钮
        count: '',   // 初始化次数
        timer: null,
      }
    },
    methods: {
      changeIndex(index) {
        this.activeIndex = index
        this.$refs['loginRefs'].clearValidate();
      },
      sendCode() {
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);  // 清除定时器
              this.timer = null;
            }
          }, 1000)
        }
      },
      getCode() {

      },
      login() {
        this.$refs['loginRefs'].validate(valid => {
          if (valid) {
            if (this.activeIndex === 2) {
            } else {
              this.$axios
                .post('/login', {
                  username: this.loginForm.username,
                  password: this.loginForm.password,
                  rememberMe: this.loginForm.rememberMe
                })
                .then(resp => {
                  if (resp.data.code === 200) {
                    this.$notify({
                      message: '登录成功',
                      type: 'success'
                    })
                    // 触发 store 中的 login() 方法，把返回的user对象传递给 store 中
                    this.$store.commit('login', resp.data.data)
                    // 获取登录前页面的路径并跳转，如果该路径不存在，则跳转到首页
                    var path = this.$route.query.redirect
                    this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
                  } else {
                    this.$notify({
                      message: resp.data.message,
                      type: 'error'
                    })
                  }
                })
            }
          }
        })
      },
    }
  }
</script>

<style>
  @import "../assets/icon/iconfont.css";

  #poster {
    background: url("../assets/img/eva.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  body {
    margin: 0px;
  }

  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 400px;
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
    margin: 18px auto;
  }

  .el-checkbox__label {
    font-size: 13px;
  }
</style>
