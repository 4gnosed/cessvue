<template>
  <div style="height: 1900px;background-color: white;padding: 10px 20px 0 20px">
    <div>
      <div style="margin-top: 20px">
        <el-row>
          <el-col :span="8" style="text-align: left">
            <span class="title">毕业生薪资统计</span>
          </el-col>
        </el-row>
<!--        <el-row class="select" style="margin-top: 20px">-->
<!--          <el-col :span="6">-->
<!--            所属院系:-->
<!--            <el-select v-model="searchValue.departmentId" placeholder="全部院系" size="mini"-->
<!--                       @change="changeDepartment" style="width: 130px;" filterable clearable>-->
<!--              <el-option-->
<!--                v-for="item in department"-->
<!--                :key="item.id"-->
<!--                :label="item.name"-->
<!--                :value="item.id">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row class="select" style="margin-top: 20px">-->
<!--          <el-col :span="6">-->
<!--            选择专业:-->
<!--            <el-select v-model="searchValue.specialtyId" placeholder="全部专业" size="mini"-->
<!--                       style="width: 130px;" filterable clearable>-->
<!--              <el-option-->
<!--                v-for="item in specialtySelected"-->
<!--                :key="item.id"-->
<!--                :label="item.name"-->
<!--                :value="item.id">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-col>-->
<!--        </el-row>-->
        <el-row class="select" style="margin-top: 20px">
          <el-col :span="4">
            <div>签约率 ( A / B )：<span class="keyword">{{(this.employedCount/this.totalStudent).toFixed(4)*100}}%</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div>签约总人数 A：<span class="keyword">{{this.employedCount}}</span></div>
          </el-col>
          <el-col :span="4">
            <div>毕业生总人数 B：<span class="keyword">{{this.totalStudent}}</span></div>
          </el-col>
          <el-col :span="4">
            <div>平均薪资：<span class="keyword">{{Math.round(this.averageSalary)/1000}}K</span></div>
          </el-col>
        </el-row>
      </div>
      <div id="signSalary" class="chart"></div>
    </div>
    <el-divider></el-divider>
    <div>
      <div style="margin-top: 20px">
        <el-row>
          <el-col :span="8" style="text-align: left">
            <span class="title">毕业生应聘情况</span>
          </el-col>
        </el-row>
<!--        <el-row class="select" style="margin-top: 20px">-->
<!--          <el-col :span="6">-->
<!--            所属院系:-->
<!--            <el-select v-model="searchValue.departmentId" placeholder="全部院系" size="mini"-->
<!--                       @change="changeDepartment" style="width: 130px;" filterable clearable>-->
<!--              <el-option-->
<!--                v-for="item in department"-->
<!--                :key="item.id"-->
<!--                :label="item.name"-->
<!--                :value="item.id">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row class="select" style="margin-top: 20px">-->
<!--          <el-col :span="6">-->
<!--            选择专业:-->
<!--            <el-select v-model="searchValue.specialtyId" placeholder="全部专业" size="mini"-->
<!--                       style="width: 130px;" filterable clearable>-->
<!--              <el-option-->
<!--                v-for="item in specialtySelected"-->
<!--                :key="item.id"-->
<!--                :label="item.name"-->
<!--                :value="item.id">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-col>-->
<!--        </el-row>-->
        <el-row class="select" style="margin-top: 20px">
          <el-col :span="4">
            <div>应聘率 ( A / B )：<span class="keyword">{{(this.applyCount/this.totalStudent).toFixed(5)*100}}%</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div>应聘人数 A：<span class="keyword">{{this.applyCount}}</span></div>
          </el-col>
          <el-col :span="4">
            <div>毕业生总人数 B：<span class="keyword">{{this.totalStudent}}</span></div>
          </el-col>
        </el-row>
      </div>
      <div id="applyProgress" class="chart"></div>
    </div>
    <el-divider></el-divider>
    <div>
      <div style="margin-top: 20px">
        <el-row>
          <el-col :span="8" style="text-align: left">
            <span class="title">企业招聘情况</span>
          </el-col>
        </el-row>
        <el-row class="select" style="margin-top: 20px">
          <el-col :span="4">
            <div>招聘满足度 ( A / B )：<span
              class="keyword">{{((this.employedCount/this.totalPositionNumber).toFixed(4))*100}}%</span></div>
          </el-col>
          <el-col :span="4">
            <div>录用总人数 A：<span class="keyword">{{this.employedCount}}</span></div>
          </el-col>
          <el-col :span="4">
            <div>需求总人数 B：<span class="keyword">{{this.totalPositionNumber}}</span></div>
          </el-col>
        </el-row>
      </div>
      <div id="signDemand" class="chart"></div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: "Leader",
    data() {
      return {
        totalStudent: 0,
        totalPositionNumber: 0,
        salaryPositionNumber: [],
        averageSalary: 0,
        employedCount: 0,
        applyCount: 0,
        salary: [],
        salary1: 0,
        salary2: 0,
        salary3: 0,
        salary4: 0,
        salary5: 0,
        salary6: 0,
        salary7: 0,
        salary8: 0,
        apply: [],
        exam: 0,
        interview: 0,
        offer: 0,
        pool: 0,
        department: [],
        specialty: [],
        searchValue: '',
        specialtySelected: '',
        signSalaryCharts: '',
        applyProgressCharts: '',
        signDemandCharts: '',
      }
    },
    mounted() {
      this.initData()
      this.compute()
      this.$nextTick(function () {
        this.drawSignSalaryBar('signSalary')
        this.drawApplyProgressBar('applyProgress')
        this.drawSignDemandBar('signDemand')
      })
    },
    watch: {
      salary() {
        this.drawSignSalaryBar('signSalary')
        this.drawSignDemandBar('signDemand')
      },
      apply() {
        this.drawApplyProgressBar('applyProgress')
      },
      salaryPositionNumber() {
        this.drawSignDemandBar('signDemand')
      }
    },
    methods: {
      getFontSize() {
        return 16
      },
      initData() {
        // if (!window.sessionStorage.getItem("department")) {
        //   this.$axios.get('/content/department').then(resp => {
        //     if (resp.data.code === 200) {
        //       this.department = resp.data.data;
        //       window.sessionStorage.setItem("department", JSON.stringify(this.department));
        //     }
        //   })
        // } else {
        //   this.department = JSON.parse(window.sessionStorage.getItem("department"));
        // }
        // if (!window.sessionStorage.getItem("specialty")) {
        //   this.$axios.get('/content/specialty').then(resp => {
        //     if (resp.data.code === 200) {
        //       this.specialty = resp.data.data;
        //       window.sessionStorage.setItem("specialty", JSON.stringify(this.specialty));
        //     }
        //   })
        // } else {
        //   this.specialty = JSON.parse(window.sessionStorage.getItem("specialty"));
        // }
        this.$axios.get('/content/student/getTotal').then(resp => {
          if (resp.data.code === 200) {
            this.totalStudent = resp.data.data;
          }
        })
        this.$axios.get('/sheetOffer/getAll').then(resp => {
          if (resp.data.code === 200) {
            this.sheetOfferList = resp.data.data;
          }
        })
        this.$axios.get('/positions/getNumber').then(resp => {
          if (resp.data.code === 200) {
            this.totalPositionNumber = resp.data.data.totalPositionNumber;
            this.salaryPositionNumber = resp.data.data.salaryPositionNumber;
          }
        })
      },
      compute() {
        this.$axios.get('/resumePositions/getAll').then(resp => {
          if (resp.data.code === 200) {
            let positionIds = []
            let totalSalary = 0
            let rps = []
            rps = resp.data.data
            this.applyCount = rps.length
            rps.forEach((rp, index) => {
              //待入职
              if (rp.stateId === 6 || rp.stateId === 5) {
                this.employedCount++
                //已经签约的职位的id
                positionIds.push(rp.pid)

                this.exam++
                this.interview++
                this.offer++
              } else if (rp.stateId === 4) {
                //offer
                this.sheetOfferList.forEach((so, index) => {
                  //总薪酬
                  if (rp.sheetOfferId === so.id) {
                    totalSalary += so.regularMonthSalary
                  }
                })
                this.exam++
                this.interview++
                this.offer++
              } else if (rp.stateId === 3) {
                //面试
                this.exam++
                this.interview++
              } else if (rp.stateId === 2) {
                //笔试
                this.exam++
              } else if (rp.stateId === 7) {
                //人才库
                this.pool++
              }
            })
            //进度分类
            this.apply.push(this.applyCount)
            this.apply.push(this.exam)
            this.apply.push(this.interview)
            this.apply.push(this.offer)
            this.apply.push(this.employedCount)
            this.apply.push(this.pool)
            //平均薪资
            this.averageSalary = totalSalary / this.employedCount
            //薪酬范围分类
            this.$axios({
              url: '/positions/getSalaryIds',
              method: 'post',
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              data: positionIds
            }).then(resp => {
              if (resp.data.code === 200) {
                resp.data.data.forEach((id, index) => {
                  if (id === 1) {
                    this.salary1++;
                  } else if (id === 2) {
                    this.salary2++;
                  } else if (id === 3) {
                    this.salary3++;
                  } else if (id === 4) {
                    this.salary4++;
                  } else if (id === 5) {
                    this.salary5++;
                  } else if (id === 6) {
                    this.salary6++;
                  } else if (id === 7) {
                    this.salary7++;
                  } else if (id === 8) {
                    this.salary8++;
                  }
                })
                this.salary.push(this.salary1)
                this.salary.push(this.salary2)
                this.salary.push(this.salary3)
                this.salary.push(this.salary4)
                this.salary.push(this.salary5)
                this.salary.push(this.salary6)
                this.salary.push(this.salary7)
                this.salary.push(this.salary8)
              }
            })
          }
        })
      },
      changeDepartment(departmentId) {
        let selectedSpecialty = []
        this.specialty.forEach((spelty) => {
          if (spelty.departmentId == departmentId) {
            selectedSpecialty.push(spelty)
          }
        })
        this.specialtySelected = selectedSpecialty
      },
      drawSignSalaryBar(id) {
        this.signSalaryCharts = echarts.init(document.getElementById(id))
        this.signSalaryCharts.setOption({
          title: {
            text: '',
            subtext: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              name: '薪资范围',
              type: 'category',
              data: ['3K以下', '3-5K', '5-10K', '10-15K', '15-20K', '20-30K', '30-50K', '50K以上'],
              nameTextStyle: {
                fontSize: this.getFontSize()
              }
            }
          ],
          yAxis: [
            {
              name: '签约人数',
              type: 'value',
              nameTextStyle: {
                fontSize: this.getFontSize()
              }
            }
          ],
          series: [
            {
              type: 'bar',
              data: this.salary,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              }
            }
          ]
        })
      },
      drawApplyProgressBar(id) {
        this.applyProgressCharts = echarts.init(document.getElementById(id))
        this.applyProgressCharts.setOption({
          title: {
            text: '',
            subtext: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              name: '应聘进度',
              type: 'category',
              data: ['简历筛选', '笔试', '面试', 'offer沟通', '签约', '人才储备库'],
              nameTextStyle: {
                fontSize: this.getFontSize()
              }
            }
          ],
          yAxis: [
            {
              name: '人数',
              type: 'value',
              nameTextStyle: {
                fontSize: this.getFontSize()
              }
            }
          ],
          series: [
            {
              name: '合格人数',
              type: 'bar',
              data: this.apply,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              }
            }
          ]
        })
      },
      drawSignDemandBar(id) {
        this.signDemandCharts = echarts.init(document.getElementById(id))
        this.signDemandCharts.setOption({
          title: {
            text: '',
            subtext: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['录用人数', '需求人数'],
            textStyle: {
              fontSize: this.getFontSize()
            }
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              name: '薪资范围',
              type: 'category',
              data: ['3K以下', '3-5K', '5-10K', '10-15K', '15-20K', '20-30K', '30-50K', '50K以上'],
              nameTextStyle: {
                fontSize: this.getFontSize()
              }
            }
          ],
          yAxis: [
            {
              name: '人数',
              type: 'value',
              nameTextStyle: {
                fontSize: this.getFontSize()
              }
            }
          ],
          series: [
            {
              name: '录用人数',
              type: 'bar',
              data: this.salary,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              itemStyle: {
                normal: {
                  color: '#BBAFAF',
                }
              }
            },
            {
              name: '需求人数',
              type: 'bar',
              data: this.salaryPositionNumber,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              }
            }
          ]
        })
      }
    }
  }

</script>

<style scoped>
  .title {
    font-size: 18px;
    font-weight: bold;
  }

  .select {
    font-size: 16px;
    font-weight: bold;
  }

  .keyword {
    font-size: 19px;
    font-weight: bold;
    color: #C23531;
    font-style: italic;
  }

  .chart {
    height: 400px;
    margin-top: 20px;
  }
</style>
