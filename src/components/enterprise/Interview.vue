<template>
  <div>
    <el-card>
      <span>[ {{vo.student.name}} ]的面试评分表</span>
      <el-divider></el-divider>
      <el-form :model="vo">
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名:">
              <el-input disabled disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                        v-model="vo.student.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别:">
              <el-radio-group disabled v-model="vo.student.gender">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="年龄:">
              <el-input disabled disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                        v-model="vo.student.age"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="籍贯:">
              <el-input disabled disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                        v-model="vo.student.nativePlace"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="毕业院校:">
              <el-input disabled disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                        v-model="vo.student.school"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学历:">
              <el-input disabled disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                        v-model="vo.student.topDegree"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="专业:">
              <el-select v-model="vo.student.specialtyId" placeholder="专业" size="mini" style="width: 130px;">
                <el-option
                  disabled
                  v-for="item in specialty"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="应聘职位:">
              <el-input disabled disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                        v-model="vo.positions.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-divider></el-divider>
      <el-form :model="scoreSheet" ref="scoreSheetRef" :rules="scoreSheetRules">
        <el-row>
          <div style="margin-top: 20px;margin-bottom: 20px">
            <el-row>
              <el-col :span="1">
                <el-button class="common_font_size" size="mini" type="mini"
                           style="background-color: #409EFF;color: white;margin-bottom: 10px"
                           icon="el-icon-plus" @click="addItem">添加评分项
                </el-button>
              </el-col>
            </el-row>
            <el-form ref="itemRefs">
              <div v-for="(item,index) in scoreSheet.itemList">
                <el-row>
                  <el-form-item label="评分项:">
                    <el-input size="mini" v-model="item.name" placeholder="请输入评分项名称"
                              style="width: 1000px"></el-input>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="面试情况">
                    <el-input v-model="item.itemSituation" placeholder="请输入面试情况" maxlength="500" size="mini"
                              type="textarea" :rows="4"></el-input>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-col :span="3">
                    <el-form-item label="分数:">
                      <el-input size="mini" v-model="item.itemScore" placeholder="请输入分数"
                                @change="count" style="width: 70px">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="19">&nbsp;</el-col>
                  <el-col :span="2" style="margin-top: 6px">
                    <el-button class="common_font_size" size="mini" type="mini"
                               style="background-color: #409EFF;color: white"
                               icon="el-icon-delete" @click="deleteItem(index)">删除
                    </el-button>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="6">
            <el-form-item label="总评分:" prop="totalScore">
              <el-input disabled size="small" v-model="scoreSheet.totalScore" style="width: 120px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="评语及录用建议:" prop="advice">
            <el-input v-model="scoreSheet.advice" placeholder="请评语及录用建议" maxlength="500" size="mini"
                      type="textarea" :rows="8"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="11">&nbsp;</el-col>
          <el-col :span="6">
            <el-form-item label="面试人:" prop="interviewer">
              <el-input size="mini" v-model="scoreSheet.interviewer" placeholder="请输入面试人"
                        style="width: 120px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="6">
            <el-form-item label="填写日期:" prop="idate">
              <el-date-picker
                v-model="scoreSheet.idate"
                size="mini"
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 130px;"
                placeholder="填写日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-divider></el-divider>
      <div style="margin-bottom:30px">
        <el-button class="common_font_size" size="small" type="primary" @click="addOrUpdate()">更 新</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Interview",
    props: ['index'],
    watch: {
      index: function (index) {
        if (index === null) {
          return
        }
        this.vo = ''
        this.vo = JSON.parse(window.sessionStorage.getItem("currentVo"))
        this.getScoreSheet()
      }
    },
    data() {
      return {
        scoreSheet: {
          id: '',
          totalScore: 0,
          advice: '',
          interviewer: '',
          idate: '',
          itemList: [{
            id: '',
            name: '',
            itemScore: 0,
            itemSituation: '',
          }],
        },
        vo: '',
        specialty: [],
        scoreSheetRules: {
          advice: [{required: true, message: '请输入评语及录用建议', trigger: 'blur'}],
          interviewer: [{required: true, message: '请输入面试人', trigger: 'blur'}],
          idate: [{required: true, message: '请选择填写日期', trigger: 'blur'}]
        }
      }
    },
    mounted() {
      this.initDate()
      this.getVo()
      this.getScoreSheet()
    },
    methods: {
      getVo() {
        this.vo = ''
        this.vo = JSON.parse(window.sessionStorage.getItem("currentVo"))
        this.getScoreSheet()
      },
      initDate() {
        if (!window.sessionStorage.getItem("specialty")) {
          this.$axios.get('/content/specialty').then(resp => {
            if (resp.data.code === 200) {
              this.specialty = resp.data.data;
              window.sessionStorage.setItem("specialty", JSON.stringify(this.specialty));
            }
          })
        } else {
          this.specialty = JSON.parse(window.sessionStorage.getItem("specialty"));
        }
      },
      addItem() {
        if (this.scoreSheet.itemList.length == 10) {
          this.$notify({message: '评分项上限10个', type: 'warning'});
          return
        }
        this.scoreSheet.itemList.push({
          id: '',
          name: '',
          itemScore: 0,
          itemSituation: ''
        })
      },
      deleteItem(index) {
        let s = parseInt(this.scoreSheet.itemList[index].itemScore)
        this.scoreSheet.totalScore -= s
        this.scoreSheet.itemList.splice(index, 1)
      },
      count() {
        let total = 0
        this.scoreSheet.itemList.forEach((item, index) => {
          total = total + parseInt(item.itemScore)
        })
        this.scoreSheet.totalScore = total
      },
      addOrUpdate() {
        if (this.scoreSheet.id) {
          this.$refs['scoreSheetRef'].validate(valid => {
            if (valid) {
              this.$axios.put('/scoreSheet', this.scoreSheet).then(resp => {
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
          this.$refs['scoreSheetRef'].validate(valid => {
            if (valid) {
              this.$axios.post('/scoreSheet?rid=' + this.vo.resume.id + '&pid=' + this.vo.positions.id, this.scoreSheet).then(resp => {
                if (resp.data.code === 200) {
                  if (resp.data.data != null) {
                    this.scoreSheet = resp.data.data
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
      getScoreSheet() {
        this.emptyScoreSheet()
        this.$axios.get('/scoreSheet?rid=' + this.vo.resume.id + '&pid=' + this.vo.positions.id).then(resp => {
          if (resp.data.code === 200) {
            if (resp.data.data != null) {
              this.scoreSheet = resp.data.data
            }
          }
        })
      },
      emptyScoreSheet() {
        this.scoreSheet.id = '',
          this.scoreSheet.totalScore = 0,
          this.scoreSheet.advice = '',
          this.scoreSheet.interviewer = '',
          this.scoreSheet.idate = '',
          this.scoreSheet.itemList = ''
      }
    }
  }
</script>

<style scoped>

</style>
