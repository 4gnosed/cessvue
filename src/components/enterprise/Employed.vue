<template>
  <div>
    <el-card>
      <span>[ {{vo.student.name}} ]的录用通知</span>
      <el-divider></el-divider>
      <el-form :model="sheetEmployed" ref="sheetEmployedRef" :rules="sheetEmployedRules">
        <el-row>
          <el-col :span="7">
            <el-form-item label="入职日期:" prop="date">
              <el-date-picker
                v-model="sheetEmployed.date"
                size="mini"
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 150px;"
                placeholder="请选择入职日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="入职准备:" prop="preparation">
            <el-input v-model="sheetEmployed.preparation" placeholder="请输入入职准备" maxlength="500" size="mini"
                      type="textarea" :rows="8"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="入职要求:" prop="requirements">
            <el-input v-model="sheetEmployed.requirements" placeholder="请输入入职要求" maxlength="500" size="mini"
                      type="textarea" :rows="8"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="入职建议:" prop="advice">
            <el-input v-model="sheetEmployed.advice" placeholder="请输入入职建议" maxlength="500" size="mini"
                      type="textarea" :rows="8"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="企业祝语:" prop="enterpriseHope">
            <el-input v-model="sheetEmployed.enterpriseHope" placeholder="企业祝语" maxlength="500" size="mini"
                      type="textarea" :rows="8"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="备注:" prop="remark">
            <el-input v-model="sheetEmployed.remark" placeholder="备注" maxlength="500" size="mini"
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
    name: "Employed",
    props: ['index'],
    watch: {
      index: function (index) {
        if (index === null) {
          return
        }
        this.vo = ''
        this.vo = JSON.parse(window.sessionStorage.getItem("currentVo"))
        this.getSheetEmployed()
      }
    },
    data() {
      return {
        vo: '',
        sheetEmployed: {
          id: '',
          date: '',
          preparation: '',
          requirements: '',
          advice: '',
          enterpriseHope: '',
          remark: ''
        },
        sheetEmployedRules: {
          date: [{required: true, message: '请输入入职日期', trigger: 'blur'}],
          preparation: [{required: true, message: '请输入入职准备', trigger: 'blur'}],
          requirements: [{required: true, message: '请输入入职要求', trigger: 'blur'}],
          advice: [{required: true, message: '请输入入职建议', trigger: 'blur'}],
          enterpriseHope: [{required: true, message: '请输入企业祝语', trigger: 'blur'}],
        }
      }
    },
    mounted() {
      this.getVo()
      this.getSheetEmployed()
    },
    methods: {
      getVo() {
        this.vo = ''
        this.vo = JSON.parse(window.sessionStorage.getItem("currentVo"))
        this.emptySheetEmployed()
      },
      emptySheetEmployed() {
        this.sheetEmployed.date = '',
          this.sheetEmployed.preparation = '',
          this.sheetEmployed.requirements = '',
          this.sheetEmployed.advice = '',
          this.sheetEmployed.remark = ''
      },
      getSheetEmployed() {
        this.emptySheetEmployed()
        this.$axios.get('/sheetEmployed?rid=' + this.vo.resume.id + '&pid=' + this.vo.positions.id).then(resp => {
          if (resp.data.code === 200) {
            if (resp.data.data != null) {
              this.sheetEmployed = resp.data.data
            }
          }
        })
      },
      addOrUpdate() {
        if (this.sheetEmployed.id) {
          this.$refs['sheetEmployedRef'].validate(valid => {
            if (valid) {
              this.$axios.put('/sheetEmployed', this.sheetEmployed).then(resp => {
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
          this.$refs['sheetEmployedRef'].validate(valid => {
            if (valid) {
              this.$axios.post('/sheetEmployed?rid=' + this.vo.resume.id + '&pid=' + this.vo.positions.id, this.sheetEmployed).then(resp => {
                if (resp.data.code === 200) {
                  if (resp.data.data != null) {
                    this.sheetEmployed = resp.data.data
                  }
                  this.$notify({
                    message: '发送成功，请等待回复',
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

