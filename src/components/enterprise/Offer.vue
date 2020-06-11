<template v-if="vo !==''">
  <el-card shadow="hover">
    <el-divider></el-divider>
    <el-form :model="sheetOffer" ref="sheetOfferRef" :rules="sheetOfferRules">
      <template v-if="this.vo !== null">
        <el-row>
          <el-col :span="8">
            <el-form-item label="部门:" prop="department">
              <el-input size="mini" v-model="sheetOffer.department" placeholder="请输入部门名称"
                        style="width: 200px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职位:" prop="positionsId">
              <el-select disabled v-model="sheetOffer.positionsId" placeholder="职位" size="mini" style="width: 200px">
                <el-option
                  disabled
                  clearable
                  v-for="item in positionList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="新职位:" prop="newPositionsId">
              <el-select filterable clearable v-model="sheetOffer.newPositionsId" placeholder="新职位" size="mini"
                         style="width: 200px">
                <el-option
                  v-for="item in positionList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="试用期:" prop="probation">
              <el-input size="mini" v-model="sheetOffer.probation" placeholder="请输入试用期"
                        style="width: 200px">
                <template slot="append">/月</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="试用期月薪:" prop="probationMonthSalary">
              <el-input size="mini" v-model="sheetOffer.probationMonthSalary" placeholder="请输入试用期月薪"
                        style="width: 200px">
                <template slot="append">/元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="转正后月薪:" prop="regularMonthSalary">
              <el-input size="mini" v-model="sheetOffer.regularMonthSalary" placeholder="请输入转正后月薪"
                        style="width: 200px">
                <template slot="append">/元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="备注:" prop="remark">
            <el-input v-model="sheetOffer.remark" placeholder="备注" maxlength="500" size="mini"
                      type="textarea" :rows="8"></el-input>
          </el-form-item>
        </el-row>
        <div style="margin-bottom:30px">
          <el-button class="common_font_size" size="small" type="primary" @click="addOrUpdate()">更 新</el-button>
        </div>
      </template>
      <template v-else>
        <el-row>
          <el-col :span="8">
            <el-form-item label="部门:" prop="department">
              <el-input disabled size="mini" v-model="sheetOffer.department" placeholder="请输入部门名称"
                        style="width: 200px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职位:" prop="positionsId">
              <el-select disabled disabled v-model="sheetOffer.positionsId" placeholder="职位" size="mini"
                         style="width: 200px">
                <el-option
                  disabled
                  clearable
                  v-for="item in positionList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="新职位:" prop="newPositionsId">
              <el-select disabled filterable clearable v-model="sheetOffer.newPositionsId" placeholder="新职位" size="mini"
                         style="width: 200px">
                <el-option
                  v-for="item in positionList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="试用期:" prop="probation">
              <el-input disabled size="mini" v-model="sheetOffer.probation" placeholder="请输入试用期"
                        style="width: 200px">
                <template slot="append">/月</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="试用期月薪:" prop="probationMonthSalary">
              <el-input disabled size="mini" v-model="sheetOffer.probationMonthSalary" placeholder="请输入试用期月薪"
                        style="width: 200px">
                <template slot="append">/元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="转正后月薪:" prop="regularMonthSalary">
              <el-input disabled size="mini" v-model="sheetOffer.regularMonthSalary" placeholder="请输入转正后月薪"
                        style="width: 200px">
                <template slot="append">/元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="备注:" prop="remark">
            <el-input disabled v-model="sheetOffer.remark" placeholder="备注" maxlength="500" size="mini"
                      type="textarea" :rows="8"></el-input>
          </el-form-item>
        </el-row>
      </template>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: "Offer",
    props: ['index'],
    watch: {
      index: function (index) {
        if (index === null) {
          return
        }
        this.vo = ''
        this.vo = JSON.parse(window.sessionStorage.getItem("currentVo"))
        this.getSheetOffer()
      }
    },
    data() {
      return {
        vo: '',
        sheetOfferId: '',
        sheetOffer: {
          id: '',
          department: '',
          positionsId: '',
          newPositionsId: '',
          probation: '',
          probationMonthSalary: '',
          regularMonthSalary: '',
          remark: ''
        },
        positionList: '',
        sheetOfferRules: {
          department: [{required: true, message: '请输入部门', trigger: 'blur'}],
          probation: [{required: true, message: '请输入试用期', trigger: 'blur'}],
          probationMonthSalary: [{required: true, message: '请输入试用期月薪', trigger: 'blur'}],
          regularMonthSalary: [{required: true, message: '请输入试用期月薪', trigger: 'blur'}],
        }
      }
    },
    mounted() {
      this.getVo()
      this.getPositionList()
      this.getSheetOffer()
    },
    created() {
      this.getSheetOfferId()
    },
    methods: {
      getSheetOfferId() {
        this.sheetOfferId = this.$route.query.Cw9on5fYd1xTR3RLTOUCi9wk
      },
      getVo() {
        this.vo = ''
        this.vo = JSON.parse(window.sessionStorage.getItem("currentVo"))
        if (this.vo === null) {
          return
        }
        this.emptySheetOffer()
        this.sheetOffer.positionsId = this.vo.positions.id
      },
      getPositionList() {
        if (!window.sessionStorage.getItem("positionList")) {
          this.$axios.get('/positions/getAll').then(resp => {
            if (resp.data.code === 200) {
              this.positionList = resp.data.data;
              window.sessionStorage.setItem("positionList", JSON.stringify(this.positionList));
            }
          })
        } else {
          this.positionList = JSON.parse(window.sessionStorage.getItem("positionList"));
        }
      },
      emptySheetOffer() {
        this.sheetOffer.department = '',
          this.sheetOffer.positionsId = '',
          this.sheetOffer.newPositionsId = '',
          this.sheetOffer.probation = '',
          this.sheetOffer.probationMonthSalary = '',
          this.sheetOffer.regularMonthSalary = '',
          this.sheetOffer.remark = ''
      },
      getSheetOffer() {
        //个人中心查看
        if (typeof this.sheetOfferId !== 'undefined') {
          this.$axios.get('/sheetOffer/getById?oid=' + this.sheetOfferId).then(resp => {
            if (resp.data.code === 200) {
              if (resp.data.data != null) {
                this.sheetOffer = resp.data.data
              }
            }
          })
          return
        }
        //招聘主页查看
        this.emptySheetOffer()
        this.$axios.get('/sheetOffer?rid=' + this.vo.resume.id + '&pid=' + this.vo.positions.id).then(resp => {
          if (resp.data.code === 200) {
            if (resp.data.data != null) {
              this.sheetOffer = resp.data.data
            }
          }
        })
        this.sheetOffer.positionsId = this.vo.positions.id
      },
      addOrUpdate() {
        if (this.sheetOffer.id) {
          this.$refs['sheetOfferRef'].validate(valid => {
            if (valid) {
              this.$axios.put('/sheetOffer', this.sheetOffer).then(resp => {
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
          this.$refs['sheetOfferRef'].validate(valid => {
            if (valid) {
              this.$axios.post('/sheetOffer?rid=' + this.vo.resume.id + '&pid=' + this.vo.positions.id, this.sheetOffer).then(resp => {
                if (resp.data.code === 200) {
                  if (resp.data.data != null) {
                    this.sheetOffer = resp.data.data
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
