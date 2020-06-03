<template>
  <div>
    <el-dialog
      title="修改角色信息"
      style="height: 700px"
      :visible.sync="dialogFormVisible">
      <el-form :model="selectedRole" style="text-align: left" ref="dataForm">
        <el-form-item label="角色名" label-width="120px" prop="username">
          <el-input size="mini" style="width: 150px" class="common_font_size" v-model="selectedRole.name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="common_font_size" size="mini" label="角色描述" label-width="120px" prop="name">
          <el-input size="mini" style="width: 150px" v-model="selectedRole.nameZh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限配置" label-width="120px" prop="perms">
          <el-checkbox-group v-model="selectedPermsIds">
            <el-checkbox v-for="(perm,i) in perms" :key="i" :label="perm.id">{{perm.desc}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="菜单配置" label-width="120px" prop="menus">
          <el-tree
            :data="menus"
            :props="props"
            show-checkbox
            :default-checked-keys="selectedMenusIds"
            node-key="id"
            ref="tree">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="common_font_size" size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button class="common_font_size" size="mini" type="primary" @click="onSubmit(selectedRole)">确 定</el-button>
      </div>
    </el-dialog>
    <role-create @onSubmit="listRoles()"></role-create>
    <el-card style="margin: 18px 2%;width: 95%" shadow="hover">
      <el-table
        :data="roles"
        stripe
        highlight-current-row="highlight-current-row"
        style="width: 100%"
        class="common_font_size"
        :max-height="tableHeight">
        <el-table-column
          type="index"
          label="序号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名"
          sortable
          fit>
        </el-table-column>
        <el-table-column
          prop="nameZh"
          label="角色描述"
          fit>
        </el-table-column>
        <el-table-column
          label="状态"
          width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="(value) => commitStatusChange(value, scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editRole(scope.row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import RoleCreate from './RoleCreate'

  export default {
    name: 'UserRole',
    components: {RoleCreate},
    data() {
      return {
        dialogFormVisible: false,
        roles: [],
        perms: [],
        menus: [],
        selectedRole: [],
        selectedPermsIds: [],
        selectedMenusIds: [],
        props: {
          id: 'id',
          label: 'nameZh',
          children: 'children'
        }
      }
    },
    mounted() {
      this.listRoles()
      this.listPerms()
      this.listMenus()
    },
    computed: {
      tableHeight() {
        return window.innerHeight - 320
      }
    },
    methods: {
      listRoles() {
        this.$axios.get('/admin/role').then(resp => {
          if (resp && resp.data.code === 200) {
            this.roles = resp.data.data
          }
        })
      },
      listPerms() {
        this.$axios.get('/admin/role/perm').then(resp => {
          if (resp && resp.data.code === 200) {
            this.perms = resp.data.data
          }
        })
      },
      listMenus() {
        this.$axios.get('/admin/role/menu').then(resp => {
          if (resp && resp.data.code === 200) {
            this.menus = resp.data.data
          }
        })
      },
      commitStatusChange(value, role) {
        if (role.id !== 1) {
          this.$axios.put('/admin/role/status', {
            enabled: value,
            id: role.id
          }).then(resp => {
            if (resp && resp.data.code === 200) {
              if (value) {
                this.$notify({
                  message: '角色 [' + role.nameZh + '] 已启用',
                  type: "success"
                })
              } else {
                this.$notify({
                  message: '角色 [' + role.nameZh + '] 已禁用',
                  type: "success"
                })
              }
            } else {
              role.enabled = false
              this.$notify({
                message: '请完善 [' + role.nameZh + '] 角色信息',
                type: "warning"
              })
            }
          })
        } else {
          role.enabled = true
          this.$notify({
            message: '不能禁用超级管理员',
            type: "error"
          })
        }
      },
      editRole(role) {
        if (role.id === 1) {
          this.$notify({
            message: '无法编辑超级管理员',
            type: "error"
          })
          return
        }
        this.selectedRole = role
        let permIds = []
        if (role.perms !== null) {
          for (let i = 0; i < role.perms.length; i++) {
            permIds.push(role.perms[i].id)
          }
        }
        this.selectedPermsIds = permIds
        let menuIds = []
        if (role.menus !== null) {
          for (let i = 0; i < role.menus.length; i++) {
            menuIds.push(role.menus[i].id)
            if (role.menus[i].children !== null) {
              for (let j = 0; j < role.menus[i].children.length; j++) {
                menuIds.push(role.menus[i].children[j].id)
              }
            }
          }
        }
        this.selectedMenusIds = menuIds
        this.dialogFormVisible = true
        // 判断树是否已经加载，第一次打开对话框前树不存在，会报错。所以需要设置 default-checked
        if (this.$refs.tree) {
          this.$refs.tree.setCheckedKeys([])
        }
      },
      onSubmit(role) {
        // 根据视图绑定的角色 id 向后端传送角色信息
        let perms = []
        let menus = []
        for (let i = 0; i < this.selectedPermsIds.length; i++) {
          for (let j = 0; j < this.perms.length; j++) {
            if (this.selectedPermsIds[i] === this.perms[j].id) {
              perms.push(this.perms[j])
            }
          }
        }
        let selectedMenusIds = this.$refs.tree.getCheckedKeys()
        for (let i = 0; i < selectedMenusIds.length; i++) {
          for (let j = 0; j < this.menus.length; j++) {
            if (selectedMenusIds[i] === this.menus[j].id) {
              menus.push(this.menus[j])
            }
          }
        }
        this.$axios.put('/admin/role', {
          id: role.id,
          name: role.name,
          nameZh: role.nameZh,
          enabled: role.enabled,
          perms: perms,
          menus: menus
        }).then(resp => {
          if (resp && resp.data.code === 200) {
            this.$notify({
              message: '修改成功',
              type: "error"
            })
            this.dialogFormVisible = false
            this.roles = []
            this.perms = []
            this.listRoles()
          }
        })
      }
    }
  }
</script>

<style scoped>
</style>
