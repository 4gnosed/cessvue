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
                      @click="showResume()">
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
      <div>
        <el-dialog
          :visible.sync="dialogVisible"
          title="您的简历"
          center
          width="80%">
          <div style="height: 1000px">
            <el-tabs :tab-position="tabPosition" v-model="active" style="height: 900px;">
              <el-tab-pane label="基本信息" name="0">
                <div style="margin-left: 60px;margin-top: 60px">
                  <student-info></student-info>
                </div>
              </el-tab-pane>
              <el-tab-pane label="工作经验" name="1">
                <div style="margin-left: 60px;margin-top: 60px">
                  <el-form :model="work" ref="workForm">
                    <el-row>
                      <el-col span="12">
                        <el-form-item label="开始日期:" prop="beginDate">
                          <el-date-picker
                            v-model="work.beginDate"
                            size="mini"
                            type="date"
                            value-format="yyyy-MM-dd"
                            style="width: 150px;"
                            placeholder="开始日期">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col span="12">
                        <el-form-item label="结束日期:" prop="endDate">
                          <el-date-picker
                            v-model="work.endDate"
                            size="mini"
                            type="date"
                            value-format="yyyy-MM-dd"
                            style="width: 150px;"
                            placeholder="结束日期">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="姓名:" prop="enterpriseName">
                          <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                    v-model="work.enterpriseName"
                                    placeholder="请输入企业名称"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="所属行业:" prop="enterpriseName">
                          <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                    v-model="work.industry"
                                    placeholder="请输入所属行业"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="部门:" prop="department">
                          <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                    v-model="work.department"
                                    placeholder="请输入部门名称"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="实习职位:" prop="position">
                          <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                    v-model="work.position"
                                    placeholder="请输入实习职位"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="企业性质:" prop="nature">
                          <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                    v-model="work.nature"
                                    placeholder="请输入企业性质"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="企业规模:" prop="scaleId">
                          <el-select v-model="work.scaleId" placeholder="企业规模" size="mini" style="width: 150px;">
                            <el-option
                              v-for="item in scales"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="工作性质:" prop="natureId">
                          <el-select v-model="work.natureId" placeholder="工作性质" size="mini" style="width: 150px;">
                            <el-option
                              v-for="item in natures"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="部门人数:" prop="departmentNumber">
                          <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                    v-model="work.departmentNumber"
                                    placeholder="请输入部门人数"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="主管:" prop="leader">
                          <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                    v-model="work.leader"
                                    placeholder="请输入主管姓名"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="证明人:" prop="witness">
                          <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                    v-model="work.witness"
                                    placeholder="请输入证明人姓名"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="证明人联系电话:" prop="witnessPhone">
                          <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                    v-model="work.witnessPhone"
                                    placeholder="请输入证明人联系电话"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-form-item label="离职原因:" prop="workoutReason">
                        <el-input type="textarea" :rows="8" v-model="work.workoutReason"
                                  style="width: 1000px;" placeholder="请输入离职原因"  maxlength="500"></el-input>
                      </el-form-item>
                    </el-row>
                    <el-row>
                      <el-form-item label="主要成绩:" prop="achievement">
                        <el-input type="textarea" :rows="8" v-model="work.achievement"
                                  style="width: 1000px;" placeholder="请输入主要成绩"  maxlength="500"></el-input>
                      </el-form-item>
                    </el-row>
                    <el-row>
                      <el-form-item label="工作描述:" prop="description">
                        <el-input type="textarea" :rows="8" v-model="work.description"
                                  style="width: 1000px;" placeholder="请输入工作描述" maxlength="500"></el-input>
                      </el-form-item>
                    </el-row>
                  </el-form>
                </div>
              </el-tab-pane>
              <el-tab-pane label="项目经验" name="2">
                <div style="margin-left: 60px;margin-top: 60px">
                </div>
              </el-tab-pane>
              <el-tab-pane label="培训经历" name="3">
                <div style="margin-left: 60px;margin-top: 60px">
                </div>
              </el-tab-pane>
              <el-tab-pane label="技能掌握" name="4">
                <div style="margin-left: 60px;margin-top: 60px">
                </div>
              </el-tab-pane>
              <el-tab-pane label="获得证书" name="5">
                <div style="margin-left: 60px;margin-top: 60px">
                </div>
              </el-tab-pane>
              <el-tab-pane label="备注" name="6">
                <div style="margin-left: 60px;margin-top: 60px">
                </div>
              </el-tab-pane>
            </el-tabs>
            <el-button type="mini" style="margin-top: 12px;" @click="last">上一步</el-button>
            <el-button type="mini" style="margin-top: 12px;" @click="next">下一步</el-button>
          </div>
          <el-divider></el-divider>
          <div slot="footer" class="dialog-footer">
            <el-upload
              ref="upload"
              action="void"
              multiple
              :multiple="false"
              style="margin-bottom: 10px"
              :http-request="customUpload"
              :on-remove="handleRemove"
              :on-progress="progressA"
              :auto-upload="true">
              <el-button :disabled="importDataDisabled" type="success" :icon="importDataBtnIcon">
                上传附件
              </el-button>
            </el-upload>
            <el-divider></el-divider>
            <el-button type="primary" @click="saveResume">投递简历</el-button>
          </div>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
  import StudentInfo from "./StudentInfo";

  export default {
    components: {StudentInfo},
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
        total: 0,
        page: 1,
        size: 10,
        dialogVisible: false,
        stepNum: 0,
        activeInt: 0,
        active: '0',
        tabPosition: 'left',
        importDataDisabled: false,
        importDataBtnIcon: 'el-icon-upload2',
        work: {
          id: '',
          beginDate: '',
          endDate: '',
          enterpriseName: '',
          industry: '',
          department: '',
          position: '',
          nature: '',
          scaleId: '',
          natureId: '',
          departmentNumber: '',
          leader: '',
          witness: '',
          witnessPhone: '',
          workoutReason: '',
          achievement: '',
          description: ''
        }
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
      showResume() {
        this.stepNum = 7
        this.dialogVisible = true
      },
      saveResume() {
        this.dialogVisible = false
      },
      next() {
        this.activeInt++;
        this.asyncActiveInt()
      },
      last() {
        this.activeInt--;
        this.asyncActiveInt()
      },
      asyncActiveInt() {
        if (this.activeInt < 0) {
          this.activeInt = this.stepNum - 1
          this.active = this.activeInt + ''
        }
        for (let i = 0; i < this.stepNum; i++) {
          if (this.activeInt == i) {
            this.active = i + ''
          }
        }
        if (this.activeInt >= this.stepNum) {
          this.activeInt = '0'
          this.active = '0'
        }
      },
      customUpload(file) {
        let FormDatas = new FormData();
        FormDatas.append('file', file.file);
        this.$axios({
          url: this.baseUrl + "/content/student/import",
          method: 'post',
          data: FormDatas,
          //上传进度
          onUploadProgress: (progressEvent) => {
            let num = progressEvent.loaded / progressEvent.total * 100 | 0;  //百分比
            file.onProgress({percent: num})     //进度条
          }
        }).then(resp => {
          if (resp.data.code === 200) {
            file.onSuccess(); //上传成功(打钩的小图标)
            this.$message({type: 'success', message: '上传完成'})
          }
        })
      },
      /**     文件正在上传时的钩子    **/
      progressA(event, file) {
      },
      /**     移除上传文件    **/
      handleRemove(file) {
        this.$refs.upload.abort(); //取消上传
        this.$message({message: '成功移除' + file.name, type: 'success'});
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
