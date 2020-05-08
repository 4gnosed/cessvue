<template>
  <div>
    <el-card>
      <span>[ {{vo.student.name}} ]的三方签约情况</span>
      <el-divider></el-divider>
      <el-form :model="sheetContract" ref="sheetContractRef" :rules="sheetContractRules">
        <div>
          <el-row>
            <el-form-item label="企业契约:" prop="enterpriseContract">
              <el-input v-model="sheetContract.enterpriseContract" placeholder="请输入企业契约" maxlength="500" size="mini"
                        type="textarea" :rows="8"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="11">&nbsp;</el-col>
            <el-col :span="6">
              <el-form-item label="企业签名:" prop="enterpriseSign">
                <el-input size="mini" v-model="sheetContract.enterpriseSign" placeholder="请输入企业签名"
                          style="width: 120px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="6">
              <el-form-item label="填写日期:" prop="enterpriseDate">
                <el-date-picker
                  v-model="sheetContract.enterpriseDate"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 130px;"
                  placeholder="填写日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-form-item label="学校契约:" prop="schoolContract">
              <el-input disabled v-model="sheetContract.schoolContract" placeholder="请输入学校契约" maxlength="500"
                        size="mini"
                        type="textarea" :rows="8"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="11">&nbsp;</el-col>
            <el-col :span="6">
              <el-form-item label="学校签名:" prop="schoolSign">
                <el-input disabled size="mini" v-model="sheetContract.schoolSign" placeholder="请输入学校签名"
                          style="width: 120px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="6">
              <el-form-item label="填写日期:" prop="schoolDate">
                <el-date-picker
                  disabled
                  v-model="sheetContract.schoolDate"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 130px;"
                  placeholder="填写日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-form-item label="学生契约:" prop="studentContract">
              <el-input disabled v-model="sheetContract.studentContract" placeholder="请输入学生契约" maxlength="500"
                        size="mini"
                        type="textarea" :rows="8"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="11">&nbsp;</el-col>
            <el-col :span="6">
              <el-form-item label="学生签名:" prop="studentSign">
                <el-input disabled size="mini" v-model="sheetContract.studentSign" placeholder="请输入学生签名"
                          style="width: 120px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="6">
              <el-form-item label="填写日期:" prop="studentDate">
                <el-date-picker
                  disabled
                  v-model="sheetContract.studentDate"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 130px;"
                  placeholder="填写日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div style="margin-bottom:30px">
          <el-button class="common_fontSize" size="small" type="primary" @click="addOrUpdate()">更 新</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Contact",
    props: ['index'],
    watch: {
      index: function (index) {
        if (index === null) {
          return
        }
        this.vo = ''
        this.vo = JSON.parse(window.sessionStorage.getItem("currentVo"))
        this.getSheetContract()
      }
    },
    data() {
      return {
        vo: '',
        sheetContract: {
          id: '',
          enterpriseSign: '',
          schoolSign: '',
          studentSign: '',
          enterpriseDate: '',
          schoolDate: '',
          studentDate: '',
          enterpriseContract: '',
          schoolContract: '',
          studentContract: '',
          remark: ''
        },
        sheetContractRules: {
          enterpriseSign: [{required: true, message: '请输入企业签名', trigger: 'blur'}],
          // schoolSign: [{required: true, message: '请输入学校签名', trigger: 'blur'}],
          // studentSign: [{required: true, message: '请输入学生签名', trigger: 'blur'}],
          enterpriseDate: [{required: true, message: '请选择企业日期', trigger: 'blur'}],
          // schoolDate: [{required: true, message: '请选择学校时间', trigger: 'blur'}],
          // studentDate: [{required: true, message: '请选择学生时长', trigger: 'blur'}],
          enterpriseContract: [{required: true, message: '请输入企业契约', trigger: 'blur'}],
          // schoolContract: [{required: true, message: '请输入学校契约', trigger: 'blur'}],
          // studentContract: [{required: true, message: '请输入学生契约', trigger: 'blur'}]
        }
      }
    },
    mounted() {
      this.getVo()
      this.getSheetContract()
    },
    methods: {
      getVo() {
        this.vo = ''
        this.vo = JSON.parse(window.sessionStorage.getItem("currentVo"))
        this.emptySheetContract()
      },
      emptySheetContract() {
        this.sheetContract.enterpriseSign = '',
          this.sheetContract.schoolSign = '',
          this.sheetContract.studentSign = '',
          this.sheetContract.enterpriseDate = '',
          this.sheetContract.schoolDate = '',
          this.sheetContract.studentDate = '',
          this.sheetContract.enterpriseContract = '',
          this.sheetContract.schoolContract = '',
          this.sheetContract.remark = ''
      },
      getSheetContract() {
        this.emptySheetContract()
        this.$axios.get('/sheetContract?rid=' + this.vo.resume.id + '&pid=' + this.vo.positions.id).then(resp => {
          if (resp.data.code === 200) {
            if (resp.data.data != null) {
              this.sheetContract = resp.data.data
            }
          }
        })
      },
      addOrUpdate() {
        if (this.sheetContract.id) {
          this.$refs['sheetContractRef'].validate(valid => {
            if (valid) {
              this.$axios.put('/sheetContract', this.sheetContract).then(resp => {
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
          this.$refs['sheetContractRef'].validate(valid => {
            if (valid) {
              this.$axios.post('/sheetContract?rid=' + this.vo.resume.id + '&pid=' + this.vo.positions.id, this.sheetContract).then(resp => {
                if (resp.data.code === 200) {
                  if (resp.data.data != null) {
                    this.sheetContract = resp.data.data
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


