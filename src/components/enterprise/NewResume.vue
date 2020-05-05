<template>
  <el-container>
    <el-aside width="300px">
      <el-table
        :data="userPostionsResumeVos"
        @row-click="selectResume"
        border
        highlight-current-row
        max-height="1000px"
        style="width: 100%;">
        <el-table-column
          prop="student.name"
          align="center"
          label="姓名"
          sortable
          width="100px">
        </el-table-column>
        <el-table-column
          prop="positions.name"
          align="center"
          label="职位"
          sortable
          width="200px">
        </el-table-column>
      </el-table>
    </el-aside>
    <el-main>
      <div>
        <el-collapse v-model="preview" accordion>
          <el-collapse-item name="preview">
            <div slot="title" style="font-size: 16px;margin-left: 600px">
              <i class="header-icon el-icon-view"></i>&nbsp;简历预览
            </div>
            <div>
              {{selectedResume.name}}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div>简历详情</div>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "NewResume",
    data() {
      return {
        user: this.$store.state.user,
        preview: 'preview',
        selectedResume: '',
        userPostionsResumeVos: []
      }
    },
    mounted() {
      this.getuserPostionsResumeVos()
    },
    methods: {
      getuserPostionsResumeVos() {
        this.$axios.get('/resume/getUserPostionsResumeVos?userId=' + this.user.id).then(resp => {
          if (resp.data.code === 200) {
            this.userPostionsResumeVos = resp.data.data
          }
        })
      },
      selectResume(row, column, event) {
        this.selectedResume = row.resume
      }
    }
  }
</script>

<style scoped>
  .el-table {
    background-color: #545c64;
  }
</style>
