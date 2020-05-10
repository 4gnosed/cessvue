<template>
  <div>
    <div style="margin-top: 10px">
      <el-table
        :data="userStudentVos"
        stripe
        border
        highlight-current-row="highlight-current-row"
        v-loading="loading"
        element-loading-text="正在加载..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="RGB(239,239,239)"
        style="width: 100%"
        class="common_font_size">
        <el-table-column
          label="用户信息"
          align="left">
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
            width="100px"
            sortable
            fit>
          </el-table-column>
          <el-table-column
            prop="user.lastLogin"
            label="上次登录时间"
            width="170"
            show-overflow-tooltip
            sortable
            fit>
          </el-table-column>
        </el-table-column>
        <el-table-column
          align="left"
          label="学生信息">
          <el-table-column
            prop="student.name"
            align="left"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="student.studentId"
            label="学号"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            prop="student.gender"
            label="性别"
            sortable
            width="85">
          </el-table-column>
          <el-table-column
            prop="student.birthday"
            width="110"
            sortable
            label="出生日期">
          </el-table-column>
          <el-table-column
            prop="student.idCard"
            width="170"
            sortable
            label="身份证号码">
          </el-table-column>
          <el-table-column
            prop="student.nation.name"
            width="90"
            sortable
            label="民族">
          </el-table-column>
          <el-table-column
            prop="student.nativePlace"
            width="90"
            sortable
            label="籍贯">
          </el-table-column>
          <el-table-column
            prop="student.politics.name"
            width="110"
            sortable
            label="政治面貌">
          </el-table-column>
          <el-table-column
            prop="student.email"
            width="170"
            align="left"
            sortable
            label="电子邮件">
          </el-table-column>
          <el-table-column
            prop="student.phone"
            width="110"
            sortable
            label="电话号码">
          </el-table-column>
          <el-table-column
            prop="student.address"
            width="220"
            sortable
            label="联系地址">
          </el-table-column>
          <el-table-column
            prop="student.topDegree"
            width="120"
            sortable
            label="最高学历">
          </el-table-column>
          <el-table-column
            prop="student.school"
            width="160"
            sortable
            label="毕业院校">
          </el-table-column>
          <el-table-column
            prop="student.department.name"
            width="200"
            sortable
            label="所属院系">
          </el-table-column>
          <el-table-column
            prop="student.specialty.name"
            width="200"
            sortable
            label="专业">
          </el-table-column>
          <el-table-column
            prop="student.position.name"
            width="120"
            sortable
            label="学生职位">
          </el-table-column>
          <el-table-column
            prop="student.languageLevel"
            width="150"
            sortable
            label="外语水平">
          </el-table-column>
          <el-table-column
            prop="student.computerLevel"
            width="150"
            sortable
            label="计算机等级">
          </el-table-column>
          <el-table-column
            prop="student.beginDate"
            width="120"
            sortable
            label="入学日期">
          </el-table-column>
          <el-table-column
            prop="student.endDate"
            width="120"
            sortable
            label="毕业日期">
          </el-table-column>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="200"
          label="审核状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="(value) => commitStatusChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex;justify-content: flex-end">
        <el-pagination
          background
          @current-change="currentChange"
          @size-change="sizeChange"
          layout="sizes, prev, pager, next, jumper, ->, total, slot"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CheckStudent",
    data() {
      return {
        userStudentVos: [],
        total: 0,
        page: 1,
        size: 10,
        nations: [],
        department: [],
        specialty: [],
        position: [],
        politics: [],
        loading: false,
      }
    },
    mounted() {
      this.initUserStudentVos()
    },
    methods: {
      initUserStudentVos() {
        this.loading = true
        this.$axios.get('/userStudent?page=' + this.page + '&size=' + this.size).then(resp => {
          if (resp.data.code === 200) {
            this.userStudentVos = resp.data.data.data
            this.total = resp.data.data.total;
            this.loading = false
          }
        })
      },
      sizeChange(currentSize) {
        this.size = currentSize;
        this.initUserStudentVos();
      },
      currentChange(currentPage) {
        this.page = currentPage;
        this.initUserStudentVos();
      },
      commitStatusChange(userStudent) {
        let value = userStudent.enabled
        this.$axios.put('/userStudent/status?enabled=' + value + '&id=' + userStudent.id).then(resp => {
          if (resp && resp.data.code === 200) {
            let msg = '设置用户 [' + userStudent.user.username + '] , 学生 [' + userStudent.student.name + ']'
            if (value) {
              this.$notify({
                message: msg + '审核通过',
                type: 'success'
              })
            } else {
              this.$notify({
                message: msg + ' 审核不通过',
                type: 'success'
              })
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
</style>
