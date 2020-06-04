<template>
  <div style="height: 1800px;">
    <el-card shadow="hover" style="background-color: #00c2b3;height: 150px">
      <div style="line-height: 80px">
        <el-input size="small" placeholder="搜索职位、公司、关键词 " prefix-icon="el-icon-search"
                  clearable
                  @clear="initPositions"
                  style="width: 400px;margin-right: 10px" v-model="searchValue.keywords"
                  @keydown.enter.native="initPositions" :disabled="showAdvanceSearchView"></el-input>
      </div>
      <div style="margin-top: 10px">
        <el-button class="common_font_size" size="mini" icon="el-icon-search" type="primary" @click="searchPositions"
                   :disabled="showAdvanceSearchView">
          搜索
        </el-button>
        <el-button class="common_font_size" size="mini" type="primary"
                   @click="showAdvanceSearchView = !showAdvanceSearchView">
          <i :class="showAdvanceSearchView?'fa fa-angle-double-up':'fa fa-angle-double-down'"
             aria-hidden="true"></i>
          高级搜索
        </el-button>
      </div>
    </el-card>
    <transition name="slide-fade">
      <div v-show="showAdvanceSearchView" class="common_font_size"
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
          <el-button class="common_font_size" size="mini" @click="showAdvanceSearchView=false">取消
          </el-button>
          <el-button class="common_font_size" size="mini" icon="el-icon-search" type="primary"
                     @click="initPositions">搜索
          </el-button>
        </el-row>
      </div>
    </transition>
    <el-card shadow="hover" class="position_card">
      <!--        <el-card id="el_card" class="position_item" shadow="hover" style="height: 100px"-->
      <div style="text-align: right;margin-bottom: 4px">
        <el-button icon="el-icon-sort" class="common_font_size" size="mini" @click="sortByUpdateTime">时间排序</el-button>
      </div>
      <el-collapse accordion>
        <div v-for="(position,index) in positions" :key="position.id">
          <template v-for="enterprise in enterprises" v-if="enterprise.id === position.enterpriseId">
            <el-collapse-item style="margin-bottom: 40px;" class="minHeight">
              <template slot="title">
                <div style="width: 100%;padding-left: 20px;text-align: left;">
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
                    <el-col :span="6">
                      <div class="grid-content">{{enterprise.name}}</div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content">更新时间：{{position.updateTime}}</div>
                    </el-col>
                  </el-row>
                  <el-row class="mid_el_row">
                    <el-col :span="2">
                      <div class="grid-content">
                        <template v-for="salary in salaries" v-if="salary.id === position.salaryId">
                          <span style="color: #fc703e;font-size: 14px!important;">{{salary.name}}</span>
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
              <div style="font-size: 12px;margin-top: 10px;text-align: left">
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
                <a style="font-weight: bold;float: right;margin-right: 18px">
                  <router-link target="_blank"
                               :to="{path:'/infoEnterprise',query:{UT93oOdkwCTY9RnxRwfLCi:enterprise.id}}">查看更多
                  </router-link>
                </a>
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
                  <el-button class="common_font_size" size="mini"
                             id="submitButton"
                             type="primary"
                             @click="showResume(position.id)">
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
    </el-card>
    <div>
      <el-dialog
        :visible.sync="dialogVisible"
        title="您的简历"
        center
        width="80%">
        <div class="dialog_height">
          <el-form :model="resume" ref="resumeRefs" :rules="resumeRules">
            <el-tabs :tab-position="tabPosition" v-model="active" class="dialog_height"
                     @tab-click="changeActive">
              <el-tab-pane label="基本信息" name="0">
                <div style="margin-left: 60px;margin-top: 10px">
                  <student-info></student-info>
                </div>
              </el-tab-pane>
              <el-tab-pane label="工作经验" name="1">
                <div style="margin-left: 60px;margin-top: 10px">
                  <el-form :model="resume.experienceWork" ref="workRefs" :rules="workRules">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="开始日期:" prop="beginDate">
                          <el-date-picker
                            v-model="resume.experienceWork.beginDate"
                            size="mini"
                            type="date"
                            value-format="yyyy-MM-dd"
                            style="width: 120px"
                            placeholder="开始日期">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="结束日期:" prop="endDate">
                          <el-date-picker
                            v-model="resume.experienceWork.endDate"
                            size="mini"
                            type="date"
                            value-format="yyyy-MM-dd"
                            style="width: 120px"
                            placeholder="结束日期">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="企业名称:" prop="enterpriseName">
                          <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                    v-model="resume.experienceWork.enterpriseName"
                                    placeholder="请输入企业名称"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="所属行业:" prop="enterpriseName">
                          <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                    v-model="resume.experienceWork.industry"
                                    placeholder="请输入所属行业"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="部门:" prop="department">
                          <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                    v-model="resume.experienceWork.department"
                                    placeholder="请输入部门名称"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="实习职位:" prop="position">
                          <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                    v-model="resume.experienceWork.position"
                                    placeholder="请输入实习职位"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="企业性质:" prop="nature">
                          <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                    v-model="resume.experienceWork.nature"
                                    placeholder="请输入企业性质"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="企业规模:" prop="scaleId">
                          <el-select v-model="resume.experienceWork.scaleId" placeholder="企业规模" size="mini"
                                     style="width: 120px">
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
                          <el-select v-model="resume.experienceWork.natureId" placeholder="工作性质" size="mini"
                                     style="width: 120px">
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
                          <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                    v-model="resume.experienceWork.departmentNumber"
                                    placeholder="请输入部门人数"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="主管:" prop="leader">
                          <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                    v-model="resume.experienceWork.leader"
                                    placeholder="请输入主管姓名"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="证明人:" prop="witness">
                          <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                    v-model="resume.experienceWork.witness"
                                    placeholder="请输入证明人姓名"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="证明人联系电话:" prop="witnessPhone">
                          <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                    v-model="resume.experienceWork.witnessPhone"
                                    placeholder="请输入证明人联系电话"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-form-item label="离职原因:" prop="workoutReason">
                        <el-input size="mini" type="textarea" :rows="4" v-model="resume.experienceWork.workoutReason"
                                  style="width: 700px" placeholder="请输入离职原因" maxlength="500"></el-input>
                      </el-form-item>
                    </el-row>
                    <el-row>
                      <el-form-item label="主要成绩:" prop="achievement">
                        <el-input size="mini" type="textarea" :rows="5" v-model="resume.experienceWork.achievement"
                                  style="width: 700px" placeholder="请输入主要成绩" maxlength="500"></el-input>
                      </el-form-item>
                    </el-row>
                    <el-row>
                      <el-form-item label="工作描述:" prop="description">
                        <el-input size="mini" type="textarea" :rows="5" v-model="resume.experienceWork.description"
                                  style="width: 700px" placeholder="请输入工作描述" maxlength="500"></el-input>
                      </el-form-item>
                    </el-row>
                  </el-form>
                </div>
              </el-tab-pane>
              <el-tab-pane label="项目经验" name="2">
                <div style="margin-left: 60px;margin-top: 10px">
                  <el-form :model="resume.experienceProject" ref="projectRefs" :rules="projectRules">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="开始日期:" prop="beginDate">
                          <el-date-picker
                            v-model="resume.experienceProject.beginDate"
                            size="mini"
                            type="date"
                            value-format="yyyy-MM-dd"
                            style="width: 120px"
                            placeholder="开始日期">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="结束日期:" prop="endDate">
                          <el-date-picker
                            v-model="resume.experienceProject.endDate"
                            size="mini"
                            type="date"
                            value-format="yyyy-MM-dd"
                            style="width: 120px"
                            placeholder="结束日期">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="项目名称:" prop="name">
                          <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                    v-model="resume.experienceProject.name"
                                    placeholder="请输入项目名称"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="开发工具:" prop="tool">
                          <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                    v-model="resume.experienceProject.tool"
                                    placeholder="请输入开发工具"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="软件环境:" prop="software">
                          <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                    v-model="resume.experienceProject.software"
                                    placeholder="请输入软件环境"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="硬件环境:" prop="hardware">
                          <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                    v-model="resume.experienceProject.hardware"
                                    placeholder="请输入硬件环境"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="项目人数:" prop="number">
                          <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                    v-model="resume.experienceProject.number"
                                    placeholder="请输入number"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-form-item label="项目描述:" prop="description">
                        <el-input size="mini" type="textarea" :rows="10" v-model="resume.experienceProject.description"
                                  style="width: 700px" placeholder="请输入项目描述" maxlength="1000"></el-input>
                      </el-form-item>
                    </el-row>
                    <el-row>
                      <el-form-item label="责任描述:" prop="responsibility">
                        <el-input size="mini" type="textarea" :rows="10"
                                  v-model="resume.experienceProject.responsibility"
                                  style="width: 700px" placeholder="请输入责任描述" maxlength="1000"></el-input>
                      </el-form-item>
                    </el-row>
                  </el-form>
                </div>
              </el-tab-pane>
              <el-tab-pane label="培训经历" name="3">
                <div style="margin-left: 60px;margin-top: 10px">
                  <el-form :model="resume.experienceTrain" ref="trainRefs" :rules="trainRules">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="开始日期:" prop="beginDate">
                          <el-date-picker
                            v-model="resume.experienceTrain.beginDate"
                            size="mini"
                            type="date"
                            value-format="yyyy-MM-dd"
                            style="width: 120px"
                            placeholder="开始日期">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="结束日期:" prop="endDate">
                          <el-date-picker
                            v-model="resume.experienceTrain.endDate"
                            size="mini"
                            type="date"
                            value-format="yyyy-MM-dd"
                            style="width: 120px"
                            placeholder="结束日期">
                          </el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="培训机构:" prop="organization">
                          <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                    v-model="resume.experienceTrain.organization"
                                    placeholder="请输入培训机构名称"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="培训地址:" prop="address">
                          <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                    v-model="resume.experienceTrain.address"
                                    placeholder="请输入培训地址"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="获得证书:" prop="certificate">
                          <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                    v-model="resume.experienceTrain.certificate"
                                    placeholder="请输入获得证书"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-form-item label="培训描述:" prop="description">
                        <el-input size="mini" type="textarea" :rows="16" v-model="resume.experienceTrain.description"
                                  style="width: 700px" placeholder="请输入培训描述" maxlength="1000"></el-input>
                      </el-form-item>
                    </el-row>
                  </el-form>
                </div>
              </el-tab-pane>
              <el-tab-pane label="技能掌握" name="4">
                <div style="margin-left: 60px;margin-top: 10px;">
                  <el-button class="common_font_size" size="mini"
                             style="background-color: #409EFF;color: white;margin-bottom: 20px"
                             icon="el-icon-plus" @click="addSkill">添加技能
                  </el-button>
                  <el-form ref="skillRefs">
                    <div v-for="(skill,index) in resume.experienceSkillList">
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label="技能">
                            <el-input size="mini" v-model="skill.name" placeholder="请输入技能名称"
                                      style="width: 120px"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="掌握程度">
                            <el-select v-model="skill.levelId" placeholder="掌握程度" size="mini">
                              <el-option
                                v-for="item in levels"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item>
                            <el-button class="common_font_size" size="mini"
                                       style="background-color: #409EFF;color: white"
                                       icon="el-icon-delete" @click="deleteSkill(index)">删除
                            </el-button>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-form>
                </div>
              </el-tab-pane>
              <el-tab-pane label="获得证书" name="5">
                <div style="margin-left: 60px;margin-top: 10px;">
                  <el-button class="common_font_size" size="mini"
                             style="background-color: #409EFF;color: white;margin-bottom: 20px"
                             icon="el-icon-plus" @click="addCertificate">添加证书
                  </el-button>
                  <el-form ref="CertificateRefs">
                    <div v-for="(certificate,index) in resume.experienceCertificateList" style="margin-bottom: 10px">
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="获得日期">
                            <el-date-picker
                              v-model="certificate.getDate"
                              size="mini"
                              type="date"
                              value-format="yyyy-MM-dd"
                              style="width: 120px"
                              placeholder="获得日期">
                            </el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="证书名称">
                            <el-input size="mini" v-model="certificate.name" placeholder="请输入证书名称"
                                      style="width: 120px"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="成绩">
                            <el-input size="mini" v-model="certificate.result" placeholder="请输入成绩"
                                      style="width: 120px"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item>
                            <el-button class="common_font_size" size="mini"
                                       style="background-color: #409EFF;color: white"
                                       icon="el-icon-delete" @click="deleteCertificate(index)">删除
                            </el-button>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col>
                          <el-form-item label="证书描述:" prop="description">
                            <el-input size="mini" type="textarea" :rows="3" v-model="certificate.description"
                                      style="width: 700px;" placeholder="请输入证书描述" maxlength="500"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-form>
                </div>
              </el-tab-pane>
              <el-tab-pane label="自我评价" name="6">
                <div style="margin-left: 60px;margin-top: 10px">
                  <el-row>
                    <el-form-item label="自我评价:" prop="selfEvaluation">
                      <el-input size="mini" type="textarea" :rows="16" v-model="resume.selfEvaluation"
                                style="width: 700px" placeholder="请输入自我评价" maxlength="1000"></el-input>
                    </el-form-item>
                  </el-row>
                </div>
              </el-tab-pane>
              <el-tab-pane label="备注" name="7">
                <div style="margin-left: 60px;margin-top: 10px">
                  <el-row>
                    <el-form-item label="备注:" prop="remark">
                      <el-input size="mini" type="textarea" :rows="16" v-model="resume.remark"
                                style="width: 700px" placeholder="请输入备注" maxlength="1000"></el-input>
                    </el-form-item>
                  </el-row>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-form>
          <el-button class="common_font_size" size="mini"
                     style="margin-top: 12px;background-color: #409EFF;color: white"
                     icon="el-icon-arrow-left" @click="last">上一步
          </el-button>
          <el-button class="common_font_size" size="mini" style="background-color: #409EFF;
                        color: white" @click="next">下一步
            <i class="el-icon-arrow-right el-icon--right"></i>
          </el-button>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-divider></el-divider>
          <div style="margin-bottom: 20px">
            <template v-if=" this.resume.fileUrlVo.fileName!=null&&this.resume.fileUrlVo.fileName!='' ">
              <a class="el-upload-list__item-name" :href="this.resume.fileUrlVo.path" target=" _blank">
                <i class="el-icon-document"></i>
                {{this.resume.fileUrlVo.fileName}}
              </a>
            </template>
          </div>
          <div>
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
              <el-button class="common_font_size" size="mini" :disabled="uploadDataDisabled" type="success"
                         :icon="uploadDataBtnIcon">
                上传附件
              </el-button>
            </el-upload>
          </div>
          <el-divider></el-divider>
          <div style="margin-bottom: 10px">
            <el-button class="common_font_size" size="mini" type="primary" @click="cancel">取消</el-button>
            <el-button class="common_font_size" size="mini" type="primary" @click="saveOrUpdateResume">保存简历</el-button>
            <el-button id="sendResumeButton" @click="sendResume">投递简历</el-button>
          </div>
        </div>
      </el-dialog>
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
        ascSort: true,
        showAdvanceSearchView: false,
        searchValue: {
          keywords: null,
          experienceId: null,
          degreeId: null,
          salaryId: null,
          financeId: null,
          scaleId: null,
        },
        selectPositionId: '',
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
        levels: [],
        total: 0,
        page: 1,
        size: 10,
        dialogVisible: false,
        stepNum: 0,
        activeInt: 0,
        active: '0',
        tabPosition: 'left',
        baseUrl: this.$axios.defaults.baseURL,
        uploadDataDisabled: false,
        uploadDataBtnIcon: 'el-icon-upload2',
        resume: {
          id: '',
          selfEvaluation: '',
          remark: '',
          avatarPath: '',
          fileUrlVo: {
            ipPort: '',
            filePath: '',
            path: '',
            fileName: ''
          },
          experienceWork: {
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
          },
          experienceProject: {
            id: '',
            beginDate: '',
            endDate: '',
            name: '',
            tool: '',
            software: '',
            hardware: '',
            number: '',
            description: '',
            responsibility: ''
          },
          experienceTrain: {
            id: '',
            beginDate: '',
            endDate: '',
            organization: '',
            address: '',
            certificate: '',
            description: ''
          },
          experienceSkillList: [
            {
              id: '',
              name: '',
              levelId: ''
            }
          ],
          experienceCertificateList: [
            {
              getDate: '',
              name: '',
              result: '',
              description: ''
            }
          ]
        },
        studentId: this.$store.state.studentId,
        user: this.$store.state.user,
        userId: this.$store.state.user.id,
        username: this.$store.state.user.username,
        roleId: this.$store.state.user.roleId,
        resumeRules: {
          selfEvaluation: [
            {required: true, message: '请输入自我评价', trigger: 'blur'}]
        },
        workRules: {
          beginDate: [
            {required: true, message: '请选择开始日期', trigger: 'blur'}],
          endDate: [
            {required: true, message: '请选择结束日期', trigger: 'blur'}],
          enterpriseName: [
            {required: true, message: '请输入企业名称', trigger: 'blur'}],
          industry: [
            {required: true, message: '请输入所属行业', trigger: 'blur'}],
          department: [
            {required: true, message: '请输入部门名称', trigger: 'blur'}],
          position: [
            {required: true, message: '请输入实习职位', trigger: 'blur'}],
          nature: [
            {required: true, message: '请输入企业性质', trigger: 'blur'}],
          scaleId: [
            {required: true, message: '请选择企业规模', trigger: 'blur'}],
          natureId: [
            {required: true, message: '请选择工作性质', trigger: 'blur'}],
          departmentNumber: [
            {required: true, message: '请输入部门人数', trigger: 'blur'},
            {pattern: /(^[1-9]\d*$)/, message: '输入值不规范', trigger: 'blur'}],
          leader: [
            {required: true, message: '请输入主管姓名', trigger: 'blur'}],
          witness: [
            {required: true, message: '请输入证明人姓名', trigger: 'blur'}],
          witnessPhone: [
            {required: true, message: '请输入证明人联系电话', trigger: 'blur'},
            {pattern: /^1[3456789]\d{9}$/, message: '输入不规范', trigger: 'blur'}],
          workoutReason: [
            {required: true, message: '请输入离职原因', trigger: 'blur'}],
          achievement: [
            {required: true, message: '请输入主要成绩', trigger: 'blur'}],
          description: [
            {required: true, message: '请输入工作描述', trigger: 'blur'}]
        },
        projectRules: {
          beginDate: [
            {required: true, message: '请选择开始日期', trigger: 'blur'}],
          endDate: [
            {required: true, message: '请选择结束日期', trigger: 'blur'}],
          name: [
            {required: true, message: '请输入项目名称', trigger: 'blur'}],
          tool: [
            {required: true, message: '请输入开发工具', trigger: 'blur'}],
          software: [
            {required: true, message: '请输入软件环境', trigger: 'blur'}],
          hardware: [
            {required: true, message: '请输入硬件环境', trigger: 'blur'}],
          number: [
            {required: true, message: '请输入项目人数', trigger: 'blur'},
            {pattern: /(^[1-9]\d*$)/, message: '输入值不规范', trigger: 'blur'}],
          responsibility: [
            {required: true, message: '请输入责任描述', trigger: 'blur'}],
          description: [
            {required: true, message: '请输入项目描述', trigger: 'blur'}]
        },
        trainRules: {
          beginDate: [
            {required: true, message: '请选择开始日期', trigger: 'blur'}],
          endDate: [
            {required: true, message: '请选择结束日期', trigger: 'blur'}],
          organization: [
            {required: true, message: '请输入培训机构名称', trigger: 'blur'}],
          address: [
            {required: true, message: '请输入培训地址', trigger: 'blur'}],
          description: [
            {required: true, message: '请输入工作描述', trigger: 'blur'}]
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
        if (!window.sessionStorage.getItem("levels")) {
          this.$axios.get('/level').then(resp => {
            if (resp.data.code === 200) {
              this.levels = resp.data.data;
              window.sessionStorage.setItem("levels", JSON.stringify(this.levels));
            }
          })
        } else {
          this.levels = JSON.parse(window.sessionStorage.getItem("levels"));
        }
      },
      searchPositions() {
        let keywords = this.searchValue.keywords;
        if (keywords && !keywords.match(/^[ ]*$/)) {
          this.initPositions()
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
      showResume(positionId) {
        //判断该用户是否为学生
        if (this.roleId === this.studentId) {
          //判断该学生信息是否已经审核通过，是才可以进入简历编辑页面
          this.$axios.get('/content/student/getOne?userId=' + this.user.id).then(resp => {
            if (resp.data.code === 200) {
              this.stepNum = 8
              this.dialogVisible = true
              //当前职位
              this.selectPositionId = positionId
              //获取该用户已经保存的简历信息
              this.$axios.get('/resume?userId=' + this.userId).then(resp => {
                if (resp.data.code === 200) {
                  this.resume = resp.data.data;
                  //控制投递简历按钮样式
                  this.isSavedResume()
                }
              })
            } else if (resp.data.code === 204) {
              //提示需要完善信息认证
              this.$notify({
                title: '提醒',
                message: '请前往个人中心完善信息',
                type: 'warning'
              })
            } else if (resp.data.code === 444) {
              //审核未通过状态
              this.$notify({
                title: '提醒',
                message: '请等待审核结果',
                type: 'warning'
              })
            }
          })
        } else {
          //提示并路由至登录页面
          this.$confirm('您不是学生用户，是否退出重新登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.get('/logout').then(resp => {
              if (resp.data.code === 200) {
                // 前后端状态保持一致
                this.$store.commit('logout')
                this.$router.replace('/login')
              }
            })
          })
        }
      },
      cancel() {
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
      changeActive() {
        this.activeInt = parseInt(this.active)
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
        FormDatas.append('userId', this.user.id);
        this.$axios({
          url: this.baseUrl + "/resume/file",
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
            this.$notify({type: 'success', message: '上传完成'})
          }
        })
      },
      /**     文件正在上传时的钩子    **/
      progressA(event, file) {
      },
      /**     移除上传文件    **/
      handleRemove(file) {
        this.$refs.upload.abort(); //取消上传
        this.$notify({message: '成功移除' + file.name, type: 'success'});
      },
      saveOrUpdateResume() {
        this.$refs['resumeRefs'].validate(valid => {
          if (valid) {
            this.$refs['workRefs'].validate(valid => {
              if (valid) {
                this.$refs['projectRefs'].validate(valid => {
                  if (valid) {
                    this.$refs['trainRefs'].validate(valid => {
                      if (valid) {
                        this.dialogVisible = false
                        if (this.resume.id != '' && this.resume.id != null) {
                          this.$axios.put('/resume?userId=' + this.userId, this.resume)
                            .then(resp => {
                              if (resp.data.code === 200) {
                                this.$notify({
                                  message: '保存成功',
                                  type: 'success'
                                })
                              } else {
                                this.$notify.error('保存失败')
                              }
                            })
                        } else {
                          this.$axios.post(
                            '/resume?userId=' + this.userId + '&positionId=' + this.selectPositionId, this.resume)
                            .then(resp => {
                              if (resp.data.code === 200) {
                                this.$notify({
                                  message: '保存成功',
                                  type: 'success'
                                })
                              } else {
                                this.$notify.error('保存失败')
                              }
                            })
                        }
                        this.isSavedResume()
                      } else {
                        this.$notify.error('培训经历内容不完整')
                      }
                    })
                  } else {
                    this.$notify.error('项目经验内容不完整')
                  }
                })
              } else {
                this.$notify.error('工作经验内容不完整')
              }
            })
          } else {
            this.$notify.error('自我评价不完整')
          }
        })
      },
      sendResume() {
        this.$axios.post('/resume/send?userId=' + this.userId + '&positionId=' +
          this.selectPositionId + '&rid=' + this.resume.id).then(resp => {
          if (resp.data.code === 200) {
            this.$notify({
              message: '投递成功，请等待回复',
              type: 'success'
            })
          } else {
            this.$notify({message: resp.data.message, type: 'warning'})
          }
        })
      },
      isSavedResume() {
        let sendResumeButton = document.getElementById('sendResumeButton');
        if (this.resume.id != '' && this.resume.id != null) {
          sendResumeButton.setAttribute("class", 'el-button common_font_size el-button--primary el-button--mini')
          sendResumeButton.removeAttribute("disabled")
        } else {
          sendResumeButton.setAttribute("disabled", false)
          sendResumeButton.style.backgroundColor = '#909399'
        }
      },
      addSkill() {
        if (this.resume.experienceSkillList.length == 10) {
          this.$notify({message: '填写技能上限10个', type: 'warning'});
          return
        }
        this.resume.experienceSkillList.push({
          id: '',
          name: '',
          levelId: ''
        })
      },
      deleteSkill(index) {
        this.resume.experienceSkillList.splice(index, 1)
      },
      addCertificate() {
        if (this.resume.experienceCertificateList.length == 4) {
          this.$notify({message: '填写证书上限4个', type: 'warning'});
          return
        }
        this.resume.experienceCertificateList.push({
          getDate: '',
          name: '',
          result: '',
          description: ''
        })
      },
      deleteCertificate(index) {
        this.resume.experienceCertificateList.splice(index, 1)
      },
      sortByUpdateTime() {
        this.ascSort = !this.ascSort
        // console.log(this.ascSort)
        // let arr = this.positions
        if (this.ascSort) {
          //按最旧时间
          this.positions.sort(this.asc('updateTime'))
        } else {
          //按最新时间
          this.positions.sort(this.desc('updateTime'))
        }
        // arr.forEach((pos) => {
        //   console.log(pos.name + ' ' + pos.updateTime + ' ' + typeof pos.updateTime)
        // })
      },
      asc(property) {
        return function (a, b) {
          let value1 = a[property];
          let value2 = b[property];
          if (value1 > value2) {
            return 1
          } else if (value2 > value1) {
            return -1
          } else {
            return 0
          }
        }
      },
      desc(property) {
        return function (a, b) {
          let value1 = a[property];
          let value2 = b[property];
          if (value2 > value1) {
            return 1
          } else if (value1 > value2) {
            return -1
          } else {
            return 0
          }
        }
      }
    },
    filters: {
      addrEllipsis(value) {
        if (!value) return "";
        if (value.length > 12) {
          return value.slice(0, 12) + "...";
        }
        return value;
      },
      welEllipsis(value) {
        if (!value) return "";
        if (value.length > 36) {
          return value.slice(0, 36) + "...";
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
    font-size: 14px !important;
  }

  .mid_el_row {
    height: 40px;
    font-size: 12px;
  }

  .bot_el_row {
    font-size: 12px;
    border-top: 2px solid #F6F6F8;
  }

  .grid-content {
    height: 40px;
  }

  .top_el_row[data-v-5eac995b] {
    font-size: 12px;
    color: #00c2b3;
  }

  .dialog_height {
    height: 700px;
  }
</style>
