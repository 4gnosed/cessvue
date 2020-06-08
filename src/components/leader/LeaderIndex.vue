<template>
  <div style="height: 1900px;background-color: white;padding: 10px 20px 0 20px">
    <div>
      <div style="margin-top: 20px">
        <el-row>
          <el-col :span="8" style="text-align: left">
            <span class="title">毕业生薪资统计</span>
          </el-col>
        </el-row>
        <el-row class="select" style="margin-top: 20px">
          <el-col :span="6">
            所属院系:
            <el-select v-model="searchValue.departmentId" placeholder="全部院系" size="mini"
                       @change="changeDepartment" style="width: 130px;" filterable clearable>
              <el-option
                v-for="item in department"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="select" style="margin-top: 20px">
          <el-col :span="6">
            选择专业:
            <el-select v-model="searchValue.specialtyId" placeholder="全部专业" size="mini"
                       style="width: 130px;" filterable clearable>
              <el-option
                v-for="item in specialtySelected"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="select" style="margin-top: 20px">
          <el-col :span="6">
            <div>签约率 ( A / B )：<span class="keyword">75.25%</span></div>
          </el-col>
          <el-col :span="3">
            <div>签约总人数 A：<span class="keyword">3010</span></div>
          </el-col>
          <el-col :span="3">
            <div>毕业生总人数 B：<span class="keyword">4000</span></div>
          </el-col>
          <el-col :span="3">
            <div>平均薪资：<span class="keyword">13.83k</span></div>
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
        <el-row class="select" style="margin-top: 20px">
          <el-col :span="6">
            所属院系:
            <el-select v-model="searchValue.departmentId" placeholder="全部院系" size="mini"
                       @change="changeDepartment" style="width: 130px;" filterable clearable>
              <el-option
                v-for="item in department"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="select" style="margin-top: 20px">
          <el-col :span="6">
            选择专业:
            <el-select v-model="searchValue.specialtyId" placeholder="全部专业" size="mini"
                       style="width: 130px;" filterable clearable>
              <el-option
                v-for="item in specialtySelected"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="select" style="margin-top: 20px">
          <el-col :span="6">
            <div>应聘率 ( A / B )：<span class="keyword">87.5%</span></div>
          </el-col>
          <el-col :span="3">
            <div>应聘人数 A：<span class="keyword">3500</span></div>
          </el-col>
          <el-col :span="3">
            <div>毕业生总人数 B：<span class="keyword">4000</span></div>
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
          <el-col :span="6">
            <div>招聘满足度 ( A / B )：<span class="keyword">70.59%</span></div>
          </el-col>
          <el-col :span="3">
            <div>录用总人数 A：<span class="keyword">1200</span></div>
          </el-col>
          <el-col :span="3">
            <div>需求总人数 B：<span class="keyword">1700</span></div>
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
        department: [],
        specialty: [],
        searchValue: '',
        specialtySelected: '',
        signSalaryCharts: '',
        applyProgressCharts: '',
        signDemandCharts: '',
      }
    },
    methods: {
      getFontSize() {
        return 16
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
          legend: {
            data: ['本科', '硕士'],
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
              data: ['3K以下', '3-5K', '5-10K', '10-15K', '15-20K', '20-30K', '50K以上'],
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
              name: '本科',
              type: 'bar',
              data: [100, 220, 300, 330, 200, 100, 50],
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
              // markLine: {
              //   data: [
              //     {type: 'average', name: '平均值'}
              //   ]
              // }
            },
            {
              name: '硕士',
              type: 'bar',
              data: [80, 200, 400, 430, 300, 200, 100],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              }
              // markLine: {
              //   data: [
              //     {type: 'average', name: '平均值'}
              //   ]
              // }
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
          legend: {
            data: ['合格人数', '总人数'],
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
              data: [300, 220, 120, 50, 30],
              itemStyle: {
                normal: {
                  color: '#BBAFAF',
                }
              }

              // markPoint: {
              //   data: [
              //     {type: 'max', name: '最大值'},
              //     {type: 'min', name: '最小值'}
              //   ]
              // }
              // markLine: {
              //   data: [
              //     {type: 'average', name: '平均值'}
              //   ]
              // }
            },
            {
              name: '总人数',
              type: 'bar',
              data: [500, 300, 220, 120, 50, 200],
              // markPoint: {
              //   data: [
              //     {type: 'max', name: '最大值'},
              //     {type: 'min', name: '最小值'}
              //   ]
              // }
              // markLine: {
              //   data: [
              //     {type: 'average', name: '平均值'}
              //   ]
              // }
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
              data: ['3K以下', '3-5K', '5-10K', '10-15K', '15-20K', '20-30K', '50K以上'],
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
              data: [100, 220, 300, 260, 200, 100, 50],
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
              // markLine: {
              //   data: [
              //     {type: 'average', name: '平均值'}
              //   ]
              // }
            },
            {
              name: '需求人数',
              type: 'bar',
              data: [120, 250, 400, 300, 250, 150, 60],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              }
              // markLine: {
              //   data: [
              //     {type: 'average', name: '平均值'}
              //   ]
              // }
            }
          ]
        })
      }
    },
    //调用
    mounted() {
      this.$nextTick(function () {
        this.drawSignSalaryBar('signSalary')
        this.drawApplyProgressBar('applyProgress')
        this.drawSignDemandBar('signDemand')
      })
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
