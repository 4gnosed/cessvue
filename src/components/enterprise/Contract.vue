<template v-if="vo !==''">
  <el-card shadow="hover">
    <template v-if="sheetContractId !== null">
      <span>您的三方签约情况</span>
    </template>
    <template v-else>
      <span>[ {{vo.student.name}} ]的三方签约情况</span>
    </template>
    <el-divider></el-divider>
    <el-form :model="sheetContract" ref="sheetContractRef">
      <div>
        <template v-if="this.user.roleId === this.$store.state.enterpriseId">
          <template v-if="this.sheetContract.enterpriseConfirm">
            <el-row>
              <el-form-item label="企业契约:" prop="enterpriseContract">
                <el-input disabled v-model="sheetContract.enterpriseContract" placeholder="请输入企业契约"
                          maxlength="500" size="mini"
                          type="textarea" :rows="8"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="11">&nbsp;</el-col>
              <el-col :span="6">
                <el-form-item label="企业签名:" prop="enterpriseSign">
                  <el-input disabled size="mini" v-model="sheetContract.enterpriseSign"
                            placeholder="请输入企业签名"
                            style="width: 120px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="6">
                <el-form-item label="填写日期:" prop="enterpriseDate">
                  <el-date-picker
                    disabled
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
          </template>
          <template v-else>
            <el-row>
              <el-form-item label="企业契约:" prop="enterpriseContract">
                <el-input v-model="sheetContract.enterpriseContract" placeholder="请输入企业契约"
                          maxlength="500" size="mini"
                          type="textarea" :rows="8"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="11">&nbsp;</el-col>
              <el-col :span="6">
                <el-form-item label="企业签名:" prop="enterpriseSign">
                  <el-input size="mini" v-model="sheetContract.enterpriseSign"
                            placeholder="请输入企业签名"
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
          </template>
          <el-row>
            <el-form-item label="学生契约:" prop="studentContract">
              <el-input disabled v-model="sheetContract.studentContract" placeholder="请输入学生契约"
                        maxlength="500"
                        size="mini"
                        type="textarea" :rows="8"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="11">&nbsp;</el-col>
            <el-col :span="6">
              <el-form-item label="学生签名:" prop="studentSign">
                <el-input disabled size="mini" v-model="sheetContract.studentSign"
                          placeholder="请输入学生签名"
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
          <el-row>
            <el-form-item label="学校契约:" prop="schoolContract">
              <el-input disabled v-model="sheetContract.schoolContract" placeholder="请输入学校契约"
                        maxlength="500"
                        size="mini"
                        type="textarea" :rows="8"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="11">&nbsp;</el-col>
            <el-col :span="6">
              <el-form-item label="学校签名:" prop="schoolSign">
                <el-input disabled size="mini" v-model="sheetContract.schoolSign"
                          placeholder="请输入学校签名"
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
        </template>
        <template v-if="this.user.roleId === this.$store.state.studentId">
          <el-row>
            <el-form-item label="企业契约:" prop="enterpriseContract">
              <el-input disabled v-model="sheetContract.enterpriseContract" placeholder="请输入企业契约"
                        maxlength="500"
                        size="mini"
                        type="textarea" :rows="8"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="11">&nbsp;</el-col>
            <el-col :span="6">
              <el-form-item label="企业签名:" prop="enterpriseSign">
                <el-input disabled size="mini" v-model="sheetContract.enterpriseSign"
                          placeholder="请输入企业签名"
                          style="width: 120px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="6">
              <el-form-item label="填写日期:" prop="enterpriseDate">
                <el-date-picker
                  disabled
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
          <template v-if="this.sheetContract.studentConfirm">
            <el-row>
              <el-form-item label="学生契约:" prop="studentContract">
                <el-input disabled v-model="sheetContract.studentContract" placeholder="请输入学生契约"
                          maxlength="500"
                          size="mini"
                          type="textarea" :rows="8"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="11">&nbsp;</el-col>
              <el-col :span="6">
                <el-form-item label="学生签名:" prop="studentSign">
                  <el-input disabled size="mini" v-model="sheetContract.studentSign"
                            placeholder="请输入学生签名"
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
          </template>
          <template v-else>
            <el-row>
              <el-form-item label="学生契约:" prop="studentContract">
                <el-input v-model="sheetContract.studentContract" placeholder="请输入学生契约"
                          maxlength="500"
                          size="mini"
                          type="textarea" :rows="8"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="11">&nbsp;</el-col>
              <el-col :span="6">
                <el-form-item label="学生签名:" prop="studentSign">
                  <el-input size="mini" v-model="sheetContract.studentSign" placeholder="请输入学生签名"
                            style="width: 120px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="6">
                <el-form-item label="填写日期:" prop="studentDate">
                  <el-date-picker
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
          </template>
          <el-row>
            <el-form-item label="学校契约:" prop="schoolContract">
              <el-input disabled v-model="sheetContract.schoolContract" placeholder="请输入学校契约"
                        maxlength="500"
                        size="mini"
                        type="textarea" :rows="8"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="11">&nbsp;</el-col>
            <el-col :span="6">
              <el-form-item label="学校签名:" prop="schoolSign">
                <el-input disabled size="mini" v-model="sheetContract.schoolSign"
                          placeholder="请输入学校签名"
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
        </template>
      </div>
      <div style="margin-bottom:30px">
        <template v-if="this.user.roleId === this.$store.state.enterpriseId
                  && !this.sheetContract.enabled
                  && !this.sheetContract.enterpriseConfirm
                  && !this.sheetContract.studentConfirm">
          <el-button class="common_fontSize" size="small" type="primary" @click="addOrUpdate()">更 新
          </el-button>
        </template>
        <template v-if="this.user.roleId === this.$store.state.studentId
                  && !this.sheetContract.enabled
                  && !this.sheetContract.studentConfirm
                  && !this.sheetContract.schoolConfirm">
          <el-button class="common_fontSize" size="small" type="primary" @click="addOrUpdate()">更 新
          </el-button>
        </template>
      </div>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: "Contact",
    props: ['index'],
    created() {
      this.getSheetContractId()
    },
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
        user: this.$store.state.user,
        sheetContractId: null,
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
          enterpriseConfirm: '',
          schoolConfirm: '',
          studentConfirm: '',
          enabled: '',
          remark: ''
        }
      }
    },
    mounted() {
      this.getVo()
      this.getSheetContract()
    },
    methods: {
      getSheetContractId() {
        this.sheetContractId = this.$route.query.LXw8AAX8QIRj10d59852mmDQ
      },
      getVo() {
        this.vo = ''
        this.vo = JSON.parse(window.sessionStorage.getItem("currentVo"))
        if (this.vo === null) {
          return
        }
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
          this.sheetContract.enabled = '',
          this.sheetContract.remark = ''
      },
      getSheetContract() {
        //个人中心查看
        if (typeof this.sheetContractId !== 'undefined') {
          this.$axios.get('/sheetContract/getById?cid=' + this.sheetContractId).then(resp => {
            if (resp.data.code === 200) {
              if (resp.data.data != null) {
                this.sheetContract = resp.data.data
              }
            }
          })
          return
        }
        //招聘主页查看
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
        if (this.user.roleId === this.$store.state.studentId) {
          if (this.sheetContract.schoolConfirm) {
            this.$notify({message: '学校已审核，不能修改', type: 'warning'})
            return
          }
          // this.$refs['sheetContractRef'].validate(valid => {
          //   if (valid) {
          if (this.sheetContract.studentContract === ''
            || this.sheetContract.studentDate === ''
            || this.sheetContract.studentSign === '') {
            this.$notify({
              message: '内容未填写完整',
              type: 'warning'
            })
            return
          }
          this.$axios.put('/sheetContract', this.sheetContract).then(resp => {
            if (resp.data.code === 200) {
              this.$notify({
                message: '更新成功',
                type: 'success'
              })
            }
          })
          //   }
          // });
        } else if (this.user.roleId === this.$store.state.enterpriseId) {
          if (this.sheetContract.enterpriseContract === ''
            || this.sheetContract.enterpriseDate === ''
            || this.sheetContract.enterpriseSign === '') {
            this.$notify({
              message: '内容未填写完整',
              type: 'warning'
            })
            return
          }
          if (this.sheetContract.schoolConfirm) {
            this.$notify({message: '学校已审核，不能修改', type: 'warning'})
            return
          } else if (this.sheetContract.studentConfirm) {
            this.$notify({message: '学生已确认，不能修改', type: 'warning'})
            return;
          }
          if (this.sheetContract.id && !this.sheetContract.enabled) {
            // this.$refs['sheetContractRef'].validate(valid => {
            //   if (valid) {
            this.$axios.put('/sheetContract', this.sheetContract).then(resp => {
              if (resp.data.code === 200) {
                this.$notify({
                  message: '更新成功',
                  type: 'success'
                })
              }
            })
            //   }
            // });
          } else {
            // this.$refs['sheetContractRef'].validate(valid => {
            //   if (valid) {
            this.$axios.post('/sheetContract?rid=' + this.vo.resume.id + '&pid=' + this.vo.positions.id, this.sheetContract).then(resp => {
              if (resp.data.code === 200) {
                if (resp.data.data != null) {
                  this.sheetContract = resp.data.data
                }
                this.$notify({
                  message: '提交成功，等待回复',
                  type: 'success'
                })
              }
            })
            //   }
            // });
          }
        } else if (this.user.roleId === this.$store.state.adminId
          || this.user.roleId === this.$store.state.departmentId) {
          if (this.sheetContract.schoolContract === ''
            || this.sheetContract.schoolDate === ''
            || this.sheetContract.schoolSign === '') {
            this.$notify({
              message: '内容未填写完整',
              type: 'warning'
            })
            return
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>


