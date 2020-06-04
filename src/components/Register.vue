<template>
  <body id="paper">
  <el-scrollbar style="height: 100%;">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-container">
      <h3>用户注册</h3>
      <el-form-item label="" prop="name">
        <el-input type="text" v-model="ruleForm.name" spellcheck="false" maxlength="20"><i slot="prepend">真实姓名</i>
        </el-input>
      </el-form-item>
      <el-form-item label="" prop="phone">
        <el-input type="text" v-model="ruleForm.phone" spellcheck="false"><i slot="prepend">电话</i></el-input>
      </el-form-item>
      <el-form-item label="" prop="email">
        <el-input type="text" v-model="ruleForm.email" spellcheck="false"><i slot="prepend">邮箱</i></el-input>
      </el-form-item>
      <el-form-item label="" prop="username">
        <el-input type="text" v-model="ruleForm.username" spellcheck="false" maxlength="20"><i slot="prepend">用户名</i>
        </el-input>
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input type="password" v-model="ruleForm.password" show-password="show-password" maxlength="16"><i
          slot="prepend">密码</i></el-input>
      </el-form-item>
      <el-form-item label="" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" @keyup.enter.native="register()"
                  show-password="show-password" maxlength="16"><i slot="prepend">确认密码</i></el-input>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-radio-group v-model="ruleForm.role" size="medium">
          <el-radio border label="2">学生</el-radio>
          <el-radio border label="3">企业</el-radio>
          <el-radio border label="5">教师</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register()">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="toLogin()">返回登录</el-button>
      </el-form-item>
    </el-form>
  </el-scrollbar>
  </body>
</template>
<script>
  export default {
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('真实姓名不能为空'))
        }
        callback()
      }
      var checkUserName = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9_-]{4,16}$/
        if (!value) {
          return callback(new Error('用户名不能为空'))
        } else if (!reg.test(value.toString())) {
          return callback(new Error('用户名需要4到16位（数字、字母、下划线、减号）'))
        }
        callback()
      }
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'))
        }
        setTimeout(() => {
          let reg = /^1[3456789]\d{9}$/
          let num = value.toString()
          if (num.length !== 11 || !reg.test(num)) {
            callback(new Error('请输入有效的手机号'))
          } else {
            callback()
          }
        }, 0)
      }
      var checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        setTimeout(() => {
          let reg = /[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/
          if (!reg.test(value.toString())) {
            callback(new Error('请输入有效的邮箱'))
          } else {
            callback()
          }
        }, 0)
      }
      var validatePass = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9_-]{3,16}$/
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (!reg.test(value.toString())) {
          return callback(new Error('密码需要3到16位（数字、字母、下划线、减号）'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          name: '',
          phone: '',
          email: '',
          username: '',
          password: '',
          role: ''
        },
        rules: {
          name: [
            {validator: checkName, trigger: 'blur'}
          ],
          username: [
            {validator: checkUserName, trigger: 'blur'}
          ],
          phone: [
            {validator: checkPhone, trigger: 'blur'}
          ],
          email: [
            {validator: checkEmail, trigger: 'blur'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      register() {
        var _this = this
        this.$axios
          .post('/register', {
            name: this.ruleForm.name,
            phone: this.ruleForm.phone,
            email: this.ruleForm.email,
            username: this.ruleForm.username,
            password: this.ruleForm.password,
            role: this.ruleForm.role
          })
          .then(resp => {
            if (resp.data.code === 200) {
              this.$alert('注册成功', '提示', {
                confirmButtonText: '确定'
              })
              _this.$router.replace('/login')
            } else {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
          .catch(failResponse => {
          })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      toLogin() {
        this.$router.push({path: '/login'})
      }
    }
  }
</script>
<style>
  #paper {
    background: url("../assets/img/eva.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  body {
    margin: 0;
  }

  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 30px auto;
    width: 400px;
    padding: 20px 20px 20px 20px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>
