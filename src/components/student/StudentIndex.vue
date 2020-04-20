<template>
  <div style="height: 1500px">
    <div style="margin-top: 40px">
      <div>
        <el-input placeholder="搜索职位、公司、关键词 " prefix-icon="el-icon-search"
                  clearable
                  @clear="initPositions"
                  style="width: 400px;margin-right: 10px" v-model="searchValue.keywords"
                  @keydown.enter.native="initPositions" :disabled="showAdvanceSearchView"></el-input>
        <el-button icon="el-icon-search" type="primary" @click="initPositions" :disabled="showAdvanceSearchView">
          搜索
        </el-button>
        <el-button type="primary" @click="showAdvanceSearchView = !showAdvanceSearchView">
          <i :class="showAdvanceSearchView?'fa fa-angle-double-up':'fa fa-angle-double-down'"
             aria-hidden="true"></i>
          高级搜索
        </el-button>
      </div>
      <transition name="slide-fade">
        <div v-show="showAdvanceSearchView"
             style="border: 1px solid #409eff;border-radius: 5px;box-sizing: border-box;padding: 5px;margin: 10px 0px;">
          <el-row style="margin-top: 10px">
            <el-col :span="5">
              工作经验:
              <el-select v-model="searchValue.experienceId" placeholder="工作经验" size="mini" clearable="clearable"
                         style="width: 130px;">
                <el-option
                  v-for="item in experiences"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              学历要求:
              <el-select v-model="searchValue.degreeId" placeholder="学历要求" size="mini" clearable="clearable"
                         style="width: 130px;">
                <el-option
                  v-for="item in degrees"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              薪资要求:
              <el-select v-model="searchValue.salaryId" placeholder="薪资要求" size="mini" clearable="clearable"
                         style="width: 130px;">
                <el-option
                  v-for="item in salaries"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              融资阶段:
              <el-select v-model="searchValue.financeId" placeholder="融资阶段" size="mini" clearable="clearable"
                         style="width: 130px;">
                <el-option
                  v-for="item in finances"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              企业规模:
              <el-select v-model="searchValue.scaleId" placeholder="企业规模" size="mini" clearable="clearable"
                         style="width: 130px;">
                <el-option
                  v-for="item in scales"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="el_row" style="text-align: center;margin-bottom: 10px;margin-top: 10px">
            <el-button size="mini" @click="showAdvanceSearchView=false">取消</el-button>
            <el-button size="mini" icon="el-icon-search" type="primary" @click="initPositions">搜索</el-button>
          </el-row>
        </div>
      </transition>
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
                <div style="font-size: 16px;margin-top: 10px;text-align: left">
                  <span style="font-weight: bold;margin-left: 18px">职位描述</span>
                  <div style="margin-left: 18px;margin-right: 18px" v-html="keepTextStyle(position.description)"></div>
                  <el-divider></el-divider>
                  <span style="font-weight: bold;margin-left: 18px">公司介绍</span>
                  <div style="margin-left: 18px;margin-right: 18px"
                       v-html="keepTextStyle(enterprise.introduction)"></div>
                  <el-divider></el-divider>
                  <span style="font-weight: bold;margin-left: 18px">招聘人数</span>
                  <div style="margin-left: 18px;margin-right: 18px">{{position.number}}</div>
                  <el-divider></el-divider>
                  <span style="font-weight: bold;margin-left: 18px">工作地址</span>
                  <div style="margin-left: 18px;margin-right: 18px">{{position.address}}</div>
                  <el-divider></el-divider>
                  <span style="font-weight: bold;margin-left: 18px">工商信息</span>
                  <el-row>
                    <el-col>
                      <div style="margin-left: 18px;margin-right: 18px">
                        {{enterprise.name}}
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <div style="margin-left: 18px;margin-right: 18px">
                        <label style="color: #8D92B6">法人代表：</label>
                        {{enterprise.boss}}
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div style="margin-left: 18px;margin-right: 18px">
                        <label style="color: #8D92B6">官方网站：</label>
                        {{enterprise.website}}
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div style="margin-left: 18px;margin-right: 18px">
                        <label style="color: #8D92B6">联系方式：</label>
                        {{enterprise.phone}}
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div style="margin-left: 18px;margin-right: 18px">
                        <label style="color: #8D92B6">邮箱：</label>
                        {{enterprise.email}}
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <div style="margin-left: 18px;margin-right: 18px">
                        <label style="color: #8D92B6">成立时间：</label>
                        {{enterprise.createTime}}
                      </div>
                    </el-col>
                    <el-col :span="18">
                      <div style="margin-left: 18px;margin-right: 18px">
                        <label style="color: #8D92B6">福利：</label>
                        {{enterprise.welfare}}
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="4"></el-col>
                  </el-row>
                  <el-divider></el-divider>
                  <span style="font-weight: bold;margin-left: 18px">推荐职位</span>
                  <el-divider></el-divider>
                  <span style="font-weight: bold;margin-left: 18px">推荐公司</span>
                  <el-divider></el-divider>
                  <div style="text-align: center">
                    <el-button
                      id="submitButton"
                      size="middle"
                      type="primary"
                      @click="sendResume()">
                      投递简历
                    </el-button>
                  </div>
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
          keywords: null,
          experienceId: null,
          degreeId: null,
          salaryId: null,
          financeId: null,
          scaleId: null,
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
        finances: [],
        scales: [],
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
        if (!window.sessionStorage.getItem("natures")) {
          this.$axios.get('/nature').then(resp => {
            if (resp.data.code === 200) {
              this.natures = resp.data.data;
              window.sessionStorage.setItem("natures", JSON.stringify(this.natures));
            }
          })
        } else {
          this.natures = JSON.parse(window.sessionStorage.getItem("natures"));
        }
        if (!window.sessionStorage.getItem("finances")) {
          this.$axios.get('/finance').then(resp => {
            if (resp.data.code === 200) {
              this.finances = resp.data.data;
              window.sessionStorage.setItem("finances", JSON.stringify(this.finances));
            }
          })
        } else {
          this.finances = JSON.parse(window.sessionStorage.getItem("finances"));
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
      },
      initPositions() {
        let url = '/positions?page=' + this.page + '&size=' + this.size;
        if (this.searchValue.keywords) {
          url += '&keywords=' + this.searchValue.keywords;
        }
        if (this.searchValue.experienceId) {
          url += '&experienceId=' + this.searchValue.experienceId;
        }
        if (this.searchValue.degreeId) {
          url += '&degreeId=' + this.searchValue.degreeId;
        }
        if (this.searchValue.salaryId) {
          url += '&salaryId=' + this.searchValue.salaryId;
        }
        if (this.searchValue.financeId) {
          url += '&financeId=' + this.searchValue.financeId;
        }
        if (this.searchValue.scaleId) {
          url += '&scaleId=' + this.searchValue.scaleId;
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
      },
      keepTextStyle(text) {
        return text.replace(/\n/g, "<br/>")
      },
      sendResume() {

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
    font-size: 16px;
  }

  .mid_el_row {
    height: 40px;
    font-size: 16px;
  }

  .bot_el_row {
    font-size: 14px;
    border-top: 2px solid #F6F6F8;
  }

  .grid-content {
    height: 40px;
  }
</style>
