<template>
  <div>
    <el-dialog
      title="修改用户信息"
      :visible.sync="dialogFormVisible">
      <el-form v-model="selectedUser" style="text-align: left" ref="dataForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="selectedUser.username" autocomplete="off" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" label-width="120px" prop="name">
          <el-input v-model="selectedUser.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="120px" prop="phone">
          <el-input v-model="selectedUser.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="selectedUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-button type="warning" @click="resetPassword(selectedUser.username)">重置密码</el-button>
        </el-form-item>
        <el-form-item label="角色分配" label-width="120px" prop="roles">
          <el-checkbox-group v-model="selectedRolesIds">
            <el-checkbox v-for="(role,i) in roles" :key="i" :label="role.id">{{role.nameZh}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(selectedUser)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="确认删除？"
      :visible.sync="dialogFormVisible1"
      width="30%"
      class="common_font_size"
      center>
      <span></span>
      <span slot="footer" class="dialog-footer">
       <el-button class="common_font_size" size="mini" @click="dialogFormVisible1 = false">取 消</el-button>
       <el-button class="common_font_size" size="mini" type="primary" @click="deleteUser()">确 定</el-button>
      </span>
    </el-dialog>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="common_font_size" :to="{ path: '/admin/welcome' }">后台管理</el-breadcrumb-item>
        <el-breadcrumb-item class="common_font_size">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item class="common_font_size">用户信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <user-registration @onSubmit="listUserDtos()"></user-registration>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        @selection-change="readyDeleteUsers"
        ref="multipleTable"
        :data="userDtos"
        stripe
        highlight-current-row="highlight-current-row"
        :default-sort="{prop: 'id', order: 'ascending'}"
        style="width: 100%"
        class="common_font_size"
        :max-height="tableHeight">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="user.username"
          label="用户名"
          sortable
          fit>
        </el-table-column>
        <el-table-column
          prop="user.name"
          label="真实姓名"
          sortable
          fit>
        </el-table-column>
        <el-table-column
          prop="user.phone"
          label="手机号"
          sortable
          fit>
        </el-table-column>
        <el-table-column
          prop="user.email"
          label="邮箱"
          sortable
          show-overflow-tooltip
          fit>
        </el-table-column>
        <el-table-column
          prop="user.lastLogin"
          label="上次登录时间"
          show-overflow-tooltip
          sortable
          fit>
        </el-table-column>
        <el-table-column
          label="状态"
          width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.user.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="(value) => commitStatusChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click="editUser(scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click="readyDeleteUser(scope.$index,scope.row.user)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px 0 20px 0;float: left">
        <el-button class="common_font_size" size="mini" @click="resetSelected()">取消选择</el-button>
        <el-button class="common_font_size" size="mini" @click="deleteUsers()">批量删除</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import UserRegistration from './UserRegister'

  export default {
    name: 'UserProfile',
    components: {UserRegistration},
    data() {
      return {
        userDtos: [],
        roles: [],
        dialogFormVisible: false,
        dialogFormVisible1: false,
        selectedUser: [],
        selectedRolesIds: [],
        deletedIndex: -1,
        deletedUserId: -1,
        selectedUsers: []
      }
    },
    mounted() {
      this.listUserDtos()
      this.listRoles()
    },
    computed: {
      tableHeight() {
        return window.innerHeight - 320
      }
    },
    methods: {
      listUserDtos() {
        this.$axios.get('/admin/user').then(resp => {
          if (resp && resp.data.code === 200) {
            this.userDtos = resp.data.data
          }
        })
      },
      listRoles() {
        this.$axios.get('/admin/role').then(resp => {
          if (resp && resp.data.code === 200) {
            this.roles = resp.data.data
          }
        })
      },
      commitStatusChange(user) {
        let value = user.user.enabled
        let isAdmin = 0
        for (let i = 0; i < user.roles.length; i++) {
          if (user.roles[i].id === 1) {
            isAdmin = 1
            break
          }
        }
        if (isAdmin === 1) {
          user.user.enabled = true
          this.$notify({
            message: '不能禁用管理员账户',
            type: "error"
          })
        } else {
          this.$axios.put('/admin/user/status', {
            enabled: value,
            username: user.user.username
          }).then(resp => {
            if (resp && resp.data.code === 200) {
              if (value) {
                this.$notify({
                  message: '用户 [' + user.user.username + '] 已启用',
                  type: "success"
                })
              } else {
                this.$notify({
                  message: '用户 [' + user.user.username + '] 已禁用',
                  type: "success"
                })
              }
            }
          })
        }
      },
      onSubmit(user) {
        // 根据视图绑定的角色 id 向后端传送角色信息
        let roles = []
        for (let i = 0; i < this.selectedRolesIds.length; i++) {
          for (let j = 0; j < this.roles.length; j++) {
            if (this.selectedRolesIds[i] === this.roles[j].id) {
              roles.push(this.roles[j])
            }
          }
        }
        this.$axios.put('/admin/user', {
          user: user,
          roles: roles
        }).then(resp => {
          if (resp && resp.data.code === 200) {
            this.$notify({
              message: '用户信息修改成功',
              type: "success"
            })
            this.dialogFormVisible = false
            // 修改角色后重新请求用户信息，实现视图更新
            this.listUserDtos()
          }
        })
      },
      editUser(user) {
        this.selectedUser = user.user
        let roleIds = []
        for (let i = 0; i < user.roles.length; i++) {
          roleIds.push(user.roles[i].id)
        }
        this.selectedRolesIds = roleIds
        this.dialogFormVisible = true
      },
      resetPassword(username) {
        this.$axios.put('/admin/user/password?username=' + username).then(resp => {
          if (resp && resp.data.code === 200) {
            this.$notify({
              message: '密码已重置为 ' + resp.data.data,
              type: "success"
            })
          }
        })
      },
      readyDeleteUser(index, user) {
        this.dialogFormVisible1 = true
        this.deletedIndex = index
        this.deletedUserId = user.id
      },
      deleteUser() {
        this.$axios.delete('/admin/user/delete?id=' + this.deletedUserId).then(resp => {
          this.userDtos.splice(this.deletedIndex, 1)
          if (resp && resp.data.code === 200) {
            this.$notify({
              message: '删除成功',
              type: "success"
            })
          }
        })
        this.dialogFormVisible1 = false
      },
      resetSelected() {
        this.$refs.multipleTable.clearSelection()
      },
      readyDeleteUsers(rows) {
        this.selectedUsers = rows
      },
      deleteUsers() {
        if (this.selectedUsers.length === 0) {
          this.$notify({
            message: '为选择用户',
            type: "error"
          })
          return
        }
        let users = []
        this.selectedUsers.forEach(item => {
          users.push(item.user)
          for (let i = 0; i < this.userDtos.length; i++) {
            if (item.user.id === this.userDtos[i].user.id) {
              this.userDtos.splice(i, 1)
            }
          }
        })
        if (users) {
          this.$axios.delete('/admin/user/deletes', {
            data: users
          }).then(resp => {
            if (resp && resp.data.code === 200) {
              this.$notify({
                message: '删除成功',
                type: "success"
              })
            }
          })
        }
        this.$refs.multipleTable.clearSelection()
      }
    }
  }
</script>

<style scoped>
  .common_font_size {
    font-size: 12px;
  }
</style>
