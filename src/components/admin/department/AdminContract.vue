<template>
  <div>
    <div style="margin-top: 10px">
      <el-table
        :data="contractVos"
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
          align="left"
          label="职位信息">
          <el-table-column
            prop="positions.name"
            align="left"
            sortable
            label="名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="positions.salary.name"
            align="left"
            sortable
            label="年薪"
            width="75">
          </el-table-column>
          <el-table-column
            prop="positions.address"
            align="left"
            sortable
            label="工作地址"
            width="200">
          </el-table-column>
        </el-table-column>
        <el-table-column
          align="left"
          label="企业信息">
          <el-table-column
            prop="enterprise.name"
            sortable
            label="企业名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="enterprise.industry"
            label="所属行业"
            sortable
            width="105">
          </el-table-column>
          <el-table-column
            prop="enterprise.nature"
            label="企业性质"
            sortable
            width="120">
          </el-table-column>
        </el-table-column>
        <el-table-column
          align="left"
          label="学生信息">
          <el-table-column
            prop="student.name"
            align="left"
            sortable
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
            width="80">
          </el-table-column>
          <el-table-column
            prop="student.idCard"
            width="170"
            sortable
            label="身份证号码">
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
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          width="120"
          label="操作">
          <template slot-scope="scope">
            <template v-if="scope.row.sheetContract.enabled">
              <el-button class="common_font_size" size="mini" type="success"
                         @click="checkOrShowContract(scope.row,scope.$index)"
                         style="padding: 3px">已审核
              </el-button>
            </template>
            <template v-else>
              <el-button class="common_font_size" size="mini" type="warning"
                         @click="checkOrShowContract(scope.row)"
                         style="padding: 3px">审核
              </el-button>
            </template>
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
    <el-dialog
      title="三方契约内容"
      :visible.sync="showContractVisible"
      width="65 %"
      center>
      <div>
        <el-form :model="selectedSheetContract" ref="sheetContractRef" :rules="sheetContractRules">
          <div>
            <el-row>
              <el-form-item label="企业契约:" prop="enterpriseContract">
                <el-input disabled v-model="selectedSheetContract.enterpriseContract" placeholder="请输入企业契约"
                          maxlength="500" size="mini"
                          type="textarea" :rows="8"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="11">&nbsp;</el-col>
              <el-col :span="6">
                <el-form-item label="企业签名:" prop="enterpriseSign">
                  <el-input disabled size="mini" v-model="selectedSheetContract.enterpriseSign" placeholder="请输入企业签名"
                            style="width: 120px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="6">
                <el-form-item label="填写日期:" prop="enterpriseDate">
                  <el-date-picker
                    v-model="selectedSheetContract.enterpriseDate"
                    disabled
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
              <el-form-item label="学生契约:" prop="studentContract">
                <el-input disabled v-model="selectedSheetContract.studentContract" placeholder="请输入学生契约"
                          maxlength="500"
                          size="mini"
                          type="textarea" :rows="8"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="11">&nbsp;</el-col>
              <el-col :span="6">
                <el-form-item label="学生签名:" prop="studentSign">
                  <el-input disabled size="mini" v-model="selectedSheetContract.studentSign" placeholder="请输入学生签名"
                            style="width: 120px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="6">
                <el-form-item label="填写日期:" prop="studentDate">
                  <el-date-picker
                    disabled
                    v-model="selectedSheetContract.studentDate"
                    size="mini"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 130px;"
                    placeholder="填写日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <template v-if="!selectedSheetContract.enabled">
              <el-row>
                <el-form-item label="学校契约:" prop="schoolContract">
                  <el-input v-model="selectedSheetContract.schoolContract" placeholder="请输入学校契约" maxlength="500"
                            size="mini"
                            type="textarea" :rows="8"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-col :span="11">&nbsp;</el-col>
                <el-col :span="6">
                  <el-form-item label="学校签名:" prop="schoolSign">
                    <el-input size="mini" v-model="selectedSheetContract.schoolSign" placeholder="请输入学校签名"
                              style="width: 120px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="6">
                  <el-form-item label="填写日期:" prop="schoolDate">
                    <el-date-picker
                      v-model="selectedSheetContract.schoolDate"
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
                <el-form-item label="学校契约:" prop="schoolContract">
                  <el-input disabled v-model="selectedSheetContract.schoolContract" placeholder="请输入学校契约"
                            maxlength="500"
                            size="mini"
                            type="textarea" :rows="8"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-col :span="11">&nbsp;</el-col>
                <el-col :span="6">
                  <el-form-item label="学校签名:" prop="schoolSign">
                    <el-input disabled size="mini" v-model="selectedSheetContract.schoolSign" placeholder="请输入学校签名"
                              style="width: 120px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="6">
                  <el-form-item label="填写日期:" prop="schoolDate">
                    <el-date-picker
                      disabled
                      v-model="selectedSheetContract.schoolDate"
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
        </el-form>
      </div>
      <div style="text-align: center;margin-top: 20px">
        <el-button class="common_font_size" size="mini" @click="showContractVisible = false">关闭</el-button>
        <template v-if="!selectedSheetContract.enabled">
          <!--          <el-button class="common_font_size" size="mini" type="primary" @click="confirmCheck(0)">审核不通过</el-button>-->
          <el-button class="common_font_size" size="mini" type="primary" @click="confirmCheck(1)">审核通过</el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "AdminContract",
    data() {
      return {
        contractVos: [],
        selectedSheetContract: '',
        showContractVisible: false,
        total: 0,
        page: 1,
        size: 20,
        loading: false,
        sheetContractRules: {
          // enterpriseSign: [{required: true, message: '请输入企业签名', trigger: 'blur'}],
          schoolSign: [{required: true, message: '请输入学校签名', trigger: 'blur'}],
          // studentSign: [{required: true, message: '请输入学生签名', trigger: 'blur'}],
          // enterpriseDate: [{required: true, message: '请选择企业日期', trigger: 'blur'}],
          schoolDate: [{required: true, message: '请选择学校时间', trigger: 'blur'}],
          // studentDate: [{required: true, message: '请选择学生时长', trigger: 'blur'}],
          // enterpriseContract: [{required: true, message: '请输入企业契约', trigger: 'blur'}],
          schoolContract: [{required: true, message: '请输入学校契约', trigger: 'blur'}],
          // studentContract: [{required: true, message: '请输入学生契约', trigger: 'blur'}]
        }
      }
    },
    mounted() {
      this.initContractVos()
    },
    methods: {
      confirmCheck(type) {
        this.$refs['sheetContractRef'].validate(valid => {
          if (valid) {
            if (type === 1) {
              this.$axios.put('/sheetContract/confirm/school/enabled', this.selectedSheetContract).then(resp => {
                if (resp.data.code === 200) {
                  this.$notify({
                    message: '审核通过成功',
                    type: 'success'
                  })
                  this.initContractVos()
                }
              })
            } else if (type === 0) {
              this.$axios.put('/sheetContract/confirm/school/disabled', this.selectedSheetContract).then(resp => {
                if (resp.data.code === 200) {
                  this.$notify({
                    message: '审核不通过成功',
                    type: 'success'
                  })
                  this.initContractVos()
                }
              })
            }
          }
        })
        this.showContractVisible = false
      },
      initContractVos() {
        this.loading = true
        this.$axios.get('/resume/getContractVos?page=' + this.page + '&size=' + this.size).then(resp => {
          if (resp.data.code === 200) {
            this.contractVos = resp.data.data.data
            this.total = resp.data.data.total;
            this.loading = false
          }
        })
      },
      checkOrShowContract(vo) {
        this.showContractVisible = true
        this.selectedSheetContract = vo.sheetContract
      },
      sizeChange(currentSize) {
        this.size = currentSize;
        this.initContractVos();
      },
      currentChange(currentPage) {
        this.page = currentPage;
        this.initContractVos();
      },
    }
  }
</script>

<style scoped>
</style>

