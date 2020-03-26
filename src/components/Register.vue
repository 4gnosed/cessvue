<template>
  <body id="paper">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-container">
    <el-form-item label="姓名" prop="name">
      <el-input type="text" v-model.number="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input type="text" v-model.number="ruleForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input type="text" v-model.number="ruleForm.email"></el-input>
    </el-form-item>
      <el-form-item label="用户名" prop="username">
      <el-input type="text" v-model.number="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" @keyup.enter.native="register()"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="register()">注册</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>
<script>
export default {
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'))
      }
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
      if (value === '') {
        callback(new Error('请输入密码'))
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
        password: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register () {
      var _this = this
      this.$axios
        .post('/register', {
          name: this.ruleForm.name,
          phone: this.ruleForm.phone,
          email: this.ruleForm.email,
          username: this.ruleForm.username,
          password: this.ruleForm.password
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
        .catch(failResponse => {})
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style>
  #paper {
    background:url("../assets/eva.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: -5px 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
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
</style>
