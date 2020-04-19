<template>
  <div style="height: 1500px">
    <div style="margin-top: 40px">
      <div>
        <el-input placeholder="搜索职位、公司、关键词 " prefix-icon="el-icon-search"
                  clearable
                  @clear="initPositions"
                  style="width: 400px;margin-right: 10px" v-model="this.searchValue.keywords"
                  @keydown.enter.native="initStudents" :disabled="showAdvanceSearchView"></el-input>
        <el-button icon="el-icon-search" type="primary" @click="initPositions" :disabled="showAdvanceSearchView">
          搜索
        </el-button>
        <el-button type="primary" @click="showAdvanceSearchView = !showAdvanceSearchView">
          <i :class="showAdvanceSearchView?'fa fa-angle-double-up':'fa fa-angle-double-down'"
             aria-hidden="true"></i>
          高级搜索
        </el-button>
      </div>
      <!--      <transition name="slide-fade">-->
      <!--        <div v-show="showAdvanceSearchView"-->
      <!--             style="border: 1px solid #409eff;border-radius: 5px;box-sizing: border-box;padding: 5px;margin: 10px 0px;">-->
      <!--          <el-row class="el_row">-->
      <!--            <el-col :span="5">-->
      <!--              所属院系:-->
      <!--              <el-select v-model="searchValue.departmentId" placeholder="所属院系" size="mini" clearable="clearable"-->
      <!--                         @change="changeDepartment" style="width: 130px;">-->
      <!--                <el-option-->
      <!--                  v-for="item in department"-->
      <!--                  :key="item.id"-->
      <!--                  :label="item.name"-->
      <!--                  :value="item.id">-->
      <!--                </el-option>-->
      <!--              </el-select>-->
      <!--            </el-col>-->
      <!--            <el-col :span="5">-->
      <!--              专业:-->
      <!--              <el-select v-model="searchValue.specialtyId" placeholder="专业" size="mini" clearable="clearable"-->
      <!--                         style="width: 130px;">-->
      <!--                <el-option-->
      <!--                  v-for="item in specialtySelected"-->
      <!--                  :key="item.id"-->
      <!--                  :label="item.name"-->
      <!--                  :value="item.id">-->
      <!--                </el-option>-->
      <!--              </el-select>-->
      <!--            </el-col>-->
      <!--            <el-col :span="5">-->
      <!--              学生职位:-->
      <!--              <el-select v-model="searchValue.positionId" placeholder="学生职位" size="mini" clearable="clearable"-->
      <!--                         style="width: 130px;">-->
      <!--                <el-option-->
      <!--                  v-for="item in position"-->
      <!--                  :key="item.id"-->
      <!--                  :label="item.name"-->
      <!--                  :value="item.id">-->
      <!--                </el-option>-->
      <!--              </el-select>-->
      <!--            </el-col>-->
      <!--            <el-col :span="5">-->
      <!--              政治面貌:-->
      <!--              <el-select v-model="searchValue.politicId" placeholder="政治面貌" size="mini" clearable="clearable"-->
      <!--                         style="width: 130px;">-->
      <!--                <el-option-->
      <!--                  v-for="item in politics"-->
      <!--                  :key="item.id"-->
      <!--                  :label="item.name"-->
      <!--                  :value="item.id">-->
      <!--                </el-option>-->
      <!--              </el-select>-->
      <!--            </el-col>-->
      <!--            <el-col :span="4">-->
      <!--              民族:-->
      <!--              <el-select v-model="searchValue.nationId" placeholder="民族" size="mini" clearable="clearable"-->
      <!--                         style="width: 130px;">-->
      <!--                <el-option-->
      <!--                  v-for="item in nations"-->
      <!--                  :key="item.id"-->
      <!--                  :label="item.name"-->
      <!--                  :value="item.id">-->
      <!--                </el-option>-->
      <!--              </el-select>-->
      <!--            </el-col>-->
      <!--          </el-row class="el_row">-->
      <!--          <el-row class="el_row" style="margin-top: 10px">-->
      <!--            <el-col :span="10">-->
      <!--              入学日期:-->
      <!--              <el-date-picker-->
      <!--                v-model="searchValue.beginDateScope"-->
      <!--                type="daterange"-->
      <!--                size="mini"-->
      <!--                unlink-panels-->
      <!--                value-format="yyyy-MM-dd"-->
      <!--                range-separator="至"-->
      <!--                start-placeholder="开始日期"-->
      <!--                end-placeholder="结束日期"-->
      <!--                :picker-options="pickerOptions">-->
      <!--              </el-date-picker>-->
      <!--            </el-col>-->
      <!--            <el-col :span="5" :offset="4">-->
      <!--              <el-button size="mini" @click="showAdvanceSearchView=false">取消</el-button>-->
      <!--              <el-button size="mini" icon="el-icon-search" type="primary" @click="initStudents">搜索-->
      <!--              </el-button>-->
      <!--            </el-col>-->
      <!--          </el-row class="el_row">-->
      <!--        </div>-->
      <!--      </transition>-->
      <div class="position_card">
        <!--        <el-card id="el_card" class="position_item" shadow="hover" style="height: 100px"-->
        <el-collapse accordion>
          <div v-for="(position,index) in positions" :key="position.id">
            <template v-for="enterprise in enterprises" v-if="enterprise.id === position.enterpriseId">
              <el-collapse-item style="margin-bottom: 40px;" class="minHeight">
                <template slot="title">
                  <div style="width: 100%;padding-left: 20px;text-align: left">
                    <el-row class="top_el_row">
                      <el-col :span="5">
                        <div class="grid-content">{{position.name}}</div>
                      </el-col>
                      <el-col :span="1">
                        <div class="grid-content"></div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content">[{{position.address | addrEllipsis}}]</div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content"></div>
                      </el-col>
                      <el-col :span="10">
                        <div class="grid-content">{{enterprise.name}}</div>
                      </el-col>
                    </el-row>
                    <el-row class="mid_el_row">
                      <el-col :span="2">
                        <div class="grid-content">
                          <template v-for="salary in salaries" v-if="salary.id === position.salaryId">
                            {{salary.name}}
                          </template>
                        </div>
                      </el-col>
                      <el-col :span="2">
                        <div class="grid-content">
                          <template v-for="experience in experiences" v-if="experience.id === position.experienceId">
                            {{experience.name}}
                          </template>
                        </div>
                      </el-col>
                      <el-col :span="2">
                        <div class="grid-content">
                          <div class="grid-content">
                            <template v-for="degree in degrees" v-if="degree.id === position.degreeId">
                              {{degree.name}}
                            </template>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="2">
                        <div class="grid-content">
                          {{enterprise.boss}}
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content"></div>
                      </el-col>
                      <el-col :span="3">
                        <div class="grid-content">
                          {{enterprise.industry}}
                        </div>
                      </el-col>
                      <el-col :span="3">
                        {{enterprise.nature}}
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content">
                          <div class="grid-content">
                            <template v-for="scale in scales" v-if="scale.id === enterprise.scaleId">
                              {{scale.name}}
                            </template>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row class="bot_el_row">
                      <el-col :span="14">
                        <div class="grid-content">{{position.keyword}}</div>
                      </el-col>
                      <el-col :span="10">
                        <div class="grid-content">{{enterprise.welfare | welEllipsis}}</div>
                      </el-col>
                    </el-row>
                  </div>
                </template>
                <div style="font-size: 20px;margin-top: 10px">
                  岗位职责：
                  1. 负责游戏主体框架结构设计，设定核心玩法和系统规则；
                  2. 负责用户日常游戏目标，产出、消耗等系统的规划和整体设计；
                  3. 制定项目进度，安排、监督、指导下属策划的工作，协调技术完成对应开发内容，推动项目开发工作顺利进行；
                  4. 负责提及把控输出策划设计方案的质量和效率；
                  5. 把控游戏的产品质量、美术风格、技术要求等产品关键指标。
                  任职要求：
                  1. 3年以上游戏策划经验，有0-1的过程；
                  2. 对游戏有深刻的认识和理解，游戏经验丰富，熟悉多种类型游戏；
                  3. 良好的沟通、理解和语言表达能力，文字功底扎实，逻辑敏捷、思维清晰；
                  4. 性格开朗、情绪稳定，工作积极主动，较好的工作抗压能力；
                  5. 有桌游或棋类游戏开发经验者优先。
                  公司介绍
                  企业介绍

                  闲徕互娱，是国内领先的移动互联网企业，致力于为用户提供专业、多元的互联网文娱生活。
                  2017年，闲徕互娱被上市集团昆仑万维收购（股票代码：300418），依托集团强大的资源优势，构建多层次开放性平台，不断完善在业务领域的布局。
                  业务范畴包括：移动游戏、文化娱乐、社交软
                </div>
              </el-collapse-item>
            </template>
          </div>
        </el-collapse>
        <!--        </el-card>-->
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
    </div>
  </div>
</template>

<script>
  export default {
    name: "student",
    data() {
      return {
        showAdvanceSearchView: false,
        searchValue: {
          keywords: '',
        },
        position: {
          userId: '',
          enterpriseId: '',
          id: '',
          name: '',
          address: '',
          salaryId: '',
          degreeId: '',
          experienceId: '',
          description: '',
          natureId: '',
          number: '',
          keyword: '',
          updateTime: ''
        },
        salaries: [],
        degrees: [],
        experiences: [],
        natures: [],
        scales: [],
        positions: [],
        enterprises: [],
        total: 0,
        page: 1,
        size: 10,
      }
    },
    mounted() {
      this.initData()
      this.initPositions()
    },
    methods: {
      initData() {
        if (!window.sessionStorage.getItem("salaries")) {
          this.$axios.get('/salary').then(resp => {
            if (resp.data.code === 200) {
              this.salaries = resp.data.data;
              window.sessionStorage.setItem("salaries", JSON.stringify(this.salaries));
            }
          })
        } else {
          this.salaries = JSON.parse(window.sessionStorage.getItem("salaries"));
        }
        if (!window.sessionStorage.getItem("degrees")) {
          this.$axios.get('/degree').then(resp => {
            if (resp.data.code === 200) {
              this.degrees = resp.data.data;
              window.sessionStorage.setItem("degrees", JSON.stringify(this.degrees));
            }
          })
        } else {
          this.degrees = JSON.parse(window.sessionStorage.getItem("degrees"));
        }
        if (!window.sessionStorage.getItem("experiences")) {
          this.$axios.get('/experience').then(resp => {
            if (resp.data.code === 200) {
              this.experiences = resp.data.data;
              window.sessionStorage.setItem("experiences", JSON.stringify(this.experiences));
            }
          })
        } else {
          this.experiences = JSON.parse(window.sessionStorage.getItem("experiences"));
        }
        if (!window.sessionStorage.getItem("scales")) {
          this.$axios.get('/scale').then(resp => {
            if (resp.data.code === 200) {
              this.scales = resp.data.data;
              window.sessionStorage.setItem("scales", JSON.stringify(this.scales));
            }
          })
        } else {
          this.scales = JSON.parse(window.sessionStorage.getItem("scales"));
        }
        if (!window.sessionStorage.getItem("enterprises")) {
          this.$axios.get('/enterprise').then(resp => {
            if (resp.data.code === 200) {
              this.enterprises = resp.data.data;
              window.sessionStorage.setItem("enterprises", JSON.stringify(this.enterprises));
            }
          })
        } else {
          this.enterprises = JSON.parse(window.sessionStorage.getItem("enterprises"));
        }
      },
      initPositions() {
        let url = '/positions?page=' + this.page + '&size=' + this.size;
        if (this.searchValue.keywords) {
          url += '&keywords=' + this.searchValue.keywords;
        }
        this.$axios.get(url).then(resp => {
          if (resp.data.code === 200) {
            this.positions = resp.data.data.data;
            this.total = resp.data.data.total;
          }
        })
      },
      sizeChange(currentSize) {
        this.size = currentSize;
        this.initPositions();
      },
      currentChange(currentPage) {
        this.page = currentPage;
        this.initPositions();
      }
    },
    filters: {
      addrEllipsis(value) {
        if (!value) return "";
        if (value.length > 6) {
          return value.slice(0, 6) + "...";
        }
        return value;
      },
      welEllipsis(value) {
        if (!value) return "";
        if (value.length > 30) {
          return value.slice(0, 30) + "...";
        }
        return value;
      }
    }
  }
</script>

<style scoped>
  .position_card {
    margin: auto;
    margin-top: 30px;
    width: 1200px;
  }

  .position_item {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .minHeight >>> .el-collapse-item__header {
    min-height: 130px !important;
  }

  .top_el_row {
    height: 40px;
    font-size: 20px;
  }

  .mid_el_row {
    height: 40px;
    font-size: 20px;
  }

  .bot_el_row {
    font-size: 14px;
    border-top: 2px solid #F6F6F8;
  }

  .grid-content {
    height: 40px;
  }
</style>
