<template>
  <div style="text-align: left" class="common_font_size">
    <el-button class="add-button common_font_size" type="success" size="mini" @click="dialogFormVisible = true">添加用户
    </el-button>
    <el-dialog
      title="添加用户"
      :visible.sync="dialogFormVisible"
      width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="name">
          <el-input size="mini" type="text" v-model="ruleForm.name" placeholder="真实姓名" spellcheck="false"
                    maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input size="mini" type="text" v-model="ruleForm.phone" placeholder="电话" spellcheck="false"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input size="mini" type="text" v-model="ruleForm.email" placeholder="邮箱" spellcheck="false"></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input size="mini" type="text" v-model="ruleForm.username" placeholder="用户名" spellcheck="false"
                    maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="mini" type="password" v-model="ruleForm.password" placeholder="密码"
                    show-password="show-password"
                    maxlength="16"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input size="mini" type="password" v-model="ruleForm.checkPass" @keyup.enter.native="register()"
                    placeholder="确认密码" show-password="show-password" maxlength="16"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-radio-group v-model="ruleForm.role" size="mini">
            <el-row>
              <el-col class="common_font_size">
                <el-radio border style="width: 70px;text-align: left" label="2">学生</el-radio>
                <el-radio border style="width: 70px;text-align: left" label="3">企业</el-radio>
                <el-radio border style="width: 80px;text-align: left" label="5">校领导</el-radio>
              </el-col>
            </el-row>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button class="common_font_size" size="mini" type="primary" @click="register()">注册</el-button>
          <el-button class="common_font_size" size="mini" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'addUser',
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
        dialogFormVisible: false,
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
              this.$alert('添加成功')
            } else {
              this.$alert(resp.data.message)
            }
            this.dialogFormVisible = false
            this.clear()
          })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      clear() {
        this.ruleForm = {
          name: '',
          phone: '',
          email: '',
          username: '',
          password: '',
          role: ''
        }
      }
    }
  }
</script>
<style>
  .add-button {
    margin: 18px 0 0 25px;
  }

  .common_font_size el-col el-col-24 {
    width: 330px;
  }
</style>
