<template>
  <div>
    <el-card>
      <span>[ {{vo.student.name}} ]的笔试情况</span>
      <el-divider></el-divider>
      <el-form :model="sheetExam" ref="sheetExamRef" :rules="sheetExamRules">
        <el-row>
          <el-form-item label="笔试内容:" prop="content">
            <el-input v-model="sheetExam.content" placeholder="请输入笔试内容" maxlength="500" size="mini"
                      type="textarea" :rows="8"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="笔试成绩:" prop="score">
              <el-input size="mini" v-model="sheetExam.score" placeholder="请输入笔试成绩"
                        style="width: 120px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="8">
            <el-form-item label="笔试时长(分钟为单位):" prop="duration">
              <el-input size="mini" v-model="sheetExam.duration" placeholder="请输入笔试时长"
                        style="width: 120px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="笔试日期:" prop="date">
              <el-date-picker
                size="mini"
                v-model="sheetExam.date"
                style="width: 130px"
                placeholder="请选择笔试日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="6">
            <el-form-item label="笔试时间:" prop="time">
              <el-time-picker
                size="mini"
                v-model="sheetExam.time"
                style="width: 130px"
                placeholder="请选择笔试时间">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="备注:" prop="remark">
            <el-input v-model="sheetExam.remark" placeholder="请注输入备注" maxlength="500" size="mini"
                      type="textarea" :rows="8"></el-input>
          </el-form-item>
        </el-row>
        <div style="margin-bottom:30px">
          <el-button class="common_font_size" size="small" type="primary" @click="addOrUpdate()">更 新</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Examination",
    props: ['index'],
    watch: {
      index: function (index) {
        if (index === null) {
          return
        }
        this.vo = ''
        this.vo = JSON.parse(window.sessionStorage.getItem("currentVo"))
        this.getSheetExam()
      }
    },
    data() {
      return {
        vo: '',
        sheetExam: {
          id: '',
          content: '',
          score: '',
          date: '',
          time: '',
          duration: '',
          remark: ''
        },
        positionList: '',
        sheetExamRules: {
          content: [{required: true, message: '请输入笔试内容', trigger: 'blur'}],
          score: [{required: true, message: '请输入笔试成绩', trigger: 'blur'}],
          date: [{required: true, message: '请选择笔试日期', trigger: 'blur'}],
          time: [{required: true, message: '请选择笔试时间', trigger: 'blur'}],
          duration: [{required: true, message: '请输入笔试时长', trigger: 'blur'}],
        }
      }
    },
    mounted() {
      this.getVo()
      this.getSheetExam()
    },
    methods: {
      getVo() {
        this.vo = ''
        this.vo = JSON.parse(window.sessionStorage.getItem("currentVo"))
        this.emptySheetExam()
      },
      emptySheetExam() {
        this.sheetExam.content = '',
          this.sheetExam.score = '',
          this.sheetExam.time = '',
          this.sheetExam.duration = ''
        this.sheetExam.remark = ''
      },
      getSheetExam() {
        this.emptySheetExam()
        this.$axios.get('/sheetExam?rid=' + this.vo.resume.id + '&pid=' + this.vo.positions.id).then(resp => {
          if (resp.data.code === 200) {
            if (resp.data.data != null) {
              this.sheetExam = resp.data.data
            }
          }
        })
      },
      addOrUpdate() {
        if (this.sheetExam.id) {
          this.$refs['sheetExamRef'].validate(valid => {
            if (valid) {
              this.$axios.put('/sheetExam', this.sheetExam).then(resp => {
                if (resp.data.code === 200) {
                  this.$notify({
                    message: '更新成功',
                    type: 'success'
                  })
                }
              })
            }
          });
        } else {
          this.$refs['sheetExamRef'].validate(valid => {
            if (valid) {
              this.$axios.post('/sheetExam?rid=' + this.vo.resume.id + '&pid=' + this.vo.positions.id, this.sheetExam).then(resp => {
                if (resp.data.code === 200) {
                  if (resp.data.data != null) {
                    this.sheetExam = resp.data.data
                  }
                  this.$notify({
                    message: '提交成功',
                    type: 'success'
                  })
                }
              })
            }
          });
        }
      },
    }
  }
</script>

<style scoped>

</style>

