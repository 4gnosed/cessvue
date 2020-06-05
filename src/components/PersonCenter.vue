<template>
  <div>
    <el-scrollbar>
      <div>
        <el-tabs v-model="activeTab" :tab-position="tabPosition" style="height: 2000px;"
                 class="common_font_size">
          <el-tab-pane name="1" label="个人信息" style="text-align: center">
            <el-card shadow="hover" class="position_card">
              <span class="title_font">基本信息</span>
              <el-divider></el-divider>
              <el-form v-model="user" style="text-align: left">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="用户名" label-width="120px" prop="username" style="width: 200px">
                      <el-input size="mini" v-model="user.username" autocomplete="off" disabled="disabled"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="角色" label-width="120px" prop="roles" style="width: 200px">
                      <el-input size="mini" v-model="user.role" autocomplete="off" disabled="disabled"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="真实姓名" label-width="120px" prop="name" style="width: 200px">
                      <el-input size="mini" v-model="user.name" autocomplete="off" disabled="disabled"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="上次登录时间" label-width="120px" prop="email" style="width: 300px">
                      <el-input size="mini" v-model="user.lastLogin" autocomplete="off" disabled="disabled"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="手机号" label-width="120px" prop="phone" style="width: 300px">
                      <el-input size="mini" v-model="user.phone" autocomplete="off" disabled="disabled"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="邮箱" label-width="120px" prop="email" style="width: 300px">
                      <el-input size="mini" v-model="user.email" autocomplete="off" disabled="disabled"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <!--判断用户角色，展示不同角色的详细信息-->
              <!--学生-->
              <template v-if="user.roleId==this.$store.state.studentId">
                <el-divider></el-divider>
                <span class="title_font">学生详细信息</span>
                <template v-if="isAuthenticate==1">
                  <el-divider></el-divider>
                  <el-alert
                    title="请填写信息并等待审核，若已经填写则可以更新"
                    type="warning"
                    center
                    show-icon>
                  </el-alert>
                </template>
                <el-divider></el-divider>
                <el-form :model="student" :rules="stuRules" ref="stuForm">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="姓名:" prop="name">
                        <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="student.name"
                                  placeholder="请输入学生姓名"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="性别:" prop="gender">
                        <el-radio-group v-model="student.gender">
                          <el-radio label="男">男</el-radio>
                          <el-radio label="女">女</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="出生日期:" prop="birthday">
                        <el-date-picker
                          v-model="student.birthday"
                          size="mini"
                          type="date"
                          value-format="yyyy-MM-dd"
                          style="width: 130px;"
                          placeholder="出生日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="政治面貌:" prop="politicId">
                        <el-select v-model="student.politicId" placeholder="政治面貌" size="mini" style="width: 150px">
                          <el-option
                            v-for="item in politics"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="民族:" prop="nationId">
                        <el-select v-model="student.nationId" placeholder="民族" size="mini" style="width: 150px;">
                          <el-option
                            v-for="item in nations"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="籍贯:" prop="nativePlace">
                        <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                  v-model="student.nativePlace" placeholder="请输入籍贯"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="电子邮箱:" prop="email">
                        <el-input size="mini" style="width: 150px" prefix-icon="el-icon-message"
                                  v-model="student.email" placeholder="请输入电子邮箱"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="联系地址:" prop="address">
                        <el-input size="mini" style="width: 300px" prefix-icon="el-icon-edit"
                                  v-model="student.address" placeholder="请输入联系地址"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="身份证号码:" prop="idCard">
                        <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                                  v-model="student.idCard" placeholder="请输入身份证号码"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="电话号码:" prop="phone">
                        <el-input size="mini" style="width: 200px" prefix-icon="el-icon-phone"
                                  v-model="student.phone" placeholder="电话号码"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="学号:" prop="studentId">
                        <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                  v-model="student.studentId" placeholder="学号"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="学历:" prop="topDegree">
                        <el-select v-model="student.topDegree" placeholder="学历" size="mini"
                                   style="width: 150px;">
                          <el-option
                            v-for="item in topDegrees"
                            :key="item"
                            :label="item"
                            :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="毕业院校:" prop="school">
                        <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                                  v-model="student.school" placeholder="毕业院校名称"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="所属院系:" prop="departmentId">
                        <el-select v-model="student.departmentId" placeholder="院系" size="mini"
                                   @change="changeDepartment" style="width: 180px;">
                          <el-option
                            v-for="item in department"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="专业:" prop="departmentId">
                        <el-select v-model="student.specialtyId" placeholder="专业" size="mini"
                                   style="width: 150px;">
                          <el-option
                            v-for="item in specialtySelected"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="学生职位:" prop="positionId">
                        <el-select v-model="student.positionId" placeholder="学生职位" size="mini"
                                   style="width: 150px;">
                          <el-option
                            v-for="item in position"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="外语水平:" prop="languageLevel">
                        <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                  v-model="student.languageLevel" placeholder="请输入外语水平"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="计算机水平:" prop="computerLevel">
                        <el-input size="mini" style="width: 140px" prefix-icon="el-icon-edit"
                                  v-model="student.computerLevel" placeholder="请输入计算机水平"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="入学日期:" prop="beginDate">
                        <el-date-picker
                          v-model="student.beginDate"
                          size="mini"
                          type="date"
                          value-format="yyyy-MM-dd"
                          style="width: 130px;"
                          placeholder="入学日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="毕业日期:" prop="endDate">
                        <el-date-picker
                          v-model="student.endDate"
                          size="mini"
                          type="date"
                          value-format="yyyy-MM-dd"
                          style="width: 130px;"
                          placeholder="毕业日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-divider></el-divider>
                <div>
                  <el-button class="common_font_size" size="mini" @click="resetStudent()">重 置</el-button>
                  <el-button class="common_font_size" size="mini" type="primary" @click="addOrUpdateStudent()">更 新
                  </el-button>
                </div>
              </template>
              <!--企业-->
              <template v-if="user.roleId==this.$store.state.enterpriseId">
                <el-divider></el-divider>
                <el-form :model="enterprise" :rules="entRules" ref="entForm">
                  <el-row style="text-align: center">
                    <el-col :span="6">
                      <el-form-item label="宣讲日期:" prop="talkDate">
                        <el-date-picker
                          v-model="enterprise.talkDate"
                          size="mini"
                          type="date"
                          value-format="yyyy-MM-dd"
                          style="width: 140px;"
                          placeholder="宣讲日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="时间段:" prop="talkTimeId">
                        <el-select v-model="enterprise.talkTimeId" placeholder="宣讲时间" size="mini" style="width: 150px;">
                          <el-option
                            v-for="item in times"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-divider></el-divider>
                  <span style="font-size: 14px!important;font-weight: bold;">企业详细信息</span>
                  <template v-if="isAuthenticate==1">
                    <el-divider></el-divider>
                    <el-alert
                      title="请填写信息并等待审核，若已经填写则可以更新"
                      type="warning"
                      center
                      show-icon>
                    </el-alert>
                  </template>
                  <el-divider></el-divider>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="企业名称:" prop="name">
                        <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="enterprise.name"
                                  placeholder="请输入企业名称"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="成立日期:" prop="createTime">
                        <el-date-picker
                          v-model="enterprise.createTime"
                          size="mini"
                          type="date"
                          value-format="yyyy-MM-dd"
                          style="width: 140px;"
                          placeholder="createTime">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="所属行业:" prop="industry">
                        <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                  v-model="enterprise.industry"
                                  placeholder="请输入所属行业"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="企业性质:" prop="nature">
                        <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                  v-model="enterprise.nature"
                                  placeholder="请输入企业性质"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="经营范围:" prop="scope">
                        <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="enterprise.scope"
                                  placeholder="请输入经营范围"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="融资阶段:" prop="financeId">
                        <el-select v-model="enterprise.financeId" placeholder="融资阶段" size="mini" style="width: 150px;">
                          <el-option
                            v-for="item in finances"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="企业规模:" prop="scaleId">
                        <el-select v-model="enterprise.scaleId" placeholder="企业规模" size="mini" style="width: 150px;">
                          <el-option
                            v-for="item in scales"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="地址:" prop="address">
                        <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit"
                                  v-model="enterprise.address" placeholder="请输入地址"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="联系电话:" prop="phone">
                        <el-input size="mini" style="width: 150px" prefix-icon="el-icon-phone"
                                  v-model="enterprise.phone" placeholder="联系电话"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="电子邮箱:" prop="email">
                        <el-input size="mini" style="width: 150px" prefix-icon="el-icon-message"
                                  v-model="enterprise.email" placeholder="请输入电子邮箱"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="法人代表:" prop="boss">
                        <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                  v-model="enterprise.boss" placeholder="请输入法人代表"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="企业官网:" prop="website">
                        <el-input size="mini" style="width: 165px" prefix-icon="el-icon-phone"
                                  v-model="enterprise.website" placeholder="企业官网"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="企业简介:" prop="introduction">
                        <el-input size="mini" type="textarea" autosize
                                  prefix-icon="el-icon-edit"
                                  v-model="enterprise.introduction" placeholder="企业简介"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="产品介绍:" prop="product">
                        <el-input size="mini" type="textarea" autosize
                                  prefix-icon="el-icon-edit"
                                  v-model="enterprise.product" placeholder="产品介绍"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="企业荣誉:" prop="honor">
                        <el-input size="mini" type="textarea" autosize
                                  prefix-icon="el-icon-edit"
                                  v-model="enterprise.honor" placeholder="企业荣誉"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="企业文化:" prop="culture">
                        <el-input size="mini" type="textarea" autosize
                                  prefix-icon="el-icon-edit"
                                  v-model="enterprise.culture" placeholder="请输入企业文化"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="企业展望:" prop="expectation">
                        <el-input size="mini" type="textarea" autosize
                                  prefix-icon="el-icon-edit"
                                  v-model="enterprise.expectation" placeholder="请输入企业展望"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="福利:" prop="welfare">
                        <el-input size="mini" type="textarea" autosize
                                  prefix-icon="el-icon-edit"
                                  v-model="enterprise.welfare" placeholder="请输入福利"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-divider></el-divider>
                <div>
                  <el-button class="common_font_size" size="mini" @click="resetEnterprise()">重 置</el-button>
                  <el-button class="common_font_size" size="mini" type="primary" @click="addOrUpdateEnterprise()">更 新
                  </el-button>
                </div>
              </template>
              <!--教师-->
              <!--              <template v-if="user.roleId==this.$store.state.leaderId">-->
              <!--                <el-divider></el-divider>-->
              <!--                <span style="font-size: 14px!important;font-weight: bold;">教师详细信息</span>-->
              <!--                <el-divider></el-divider>-->
              <!--                内容-->
              <!--                <el-divider></el-divider>-->
              <!--                <div>-->
              <!--                  <el-button class="common_font_size" size="mini" @click="resetTeacher()">重 置</el-button>-->
              <!--                  <el-button class="common_font_size" size="mini" type="primary" @click="addOrUpdateTeacher()">更 新-->
              <!--                  </el-button>-->
              <!--                </div>-->
              <!--              </template>-->
            </el-card>
          </el-tab-pane>
          <template v-if="this.$store.state.user.roleId == this.$store.state.studentId">
            <el-tab-pane name="2" label="标准简历">
              <el-card style="height: 1300px" class="position_card">
                <span class="title_font">标准简历</span>
                <el-divider></el-divider>
                <el-form :model="resume" ref="resumeRefs" :rules="resumeRules">
                  <el-tabs :tab-position="tabPosition" v-model="active" style="height: 1300px;"
                           @tab-click="changeActive">
                    <el-tab-pane label="工作经验" name="0">
                      <div style="margin-left: 60px;margin-top: 40px">
                        <el-form :model="resume.experienceWork" ref="workRefs" :rules="workRules">
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="开始日期:" prop="beginDate">
                                <el-date-picker
                                  v-model="resume.experienceWork.beginDate"
                                  size="mini"
                                  type="date"
                                  value-format="yyyy-MM-dd"
                                  style="width: 150px;"
                                  placeholder="开始日期">
                                </el-date-picker>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="结束日期:" prop="endDate">
                                <el-date-picker
                                  v-model="resume.experienceWork.endDate"
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
                              <el-form-item label="企业名称:" prop="enterpriseName">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceWork.enterpriseName"
                                          placeholder="请输入企业名称"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="所属行业:" prop="enterpriseName">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceWork.industry"
                                          placeholder="请输入所属行业"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="部门:" prop="department">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceWork.department"
                                          placeholder="请输入部门名称"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="实习职位:" prop="position">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceWork.position"
                                          placeholder="请输入实习职位"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="企业性质:" prop="nature">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceWork.nature"
                                          placeholder="请输入企业性质"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="企业规模:" prop="scaleId">
                                <el-select v-model="resume.experienceWork.scaleId" placeholder="企业规模" size="mini"
                                           style="width: 150px;">
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
                                           style="width: 150px;">
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
                                          v-model="resume.experienceWork.departmentNumber"
                                          placeholder="请输入部门人数"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="主管:" prop="leader">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceWork.leader"
                                          placeholder="请输入主管姓名"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="证明人:" prop="witness">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceWork.witness"
                                          placeholder="请输入证明人姓名"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="证明人联系电话:" prop="witnessPhone">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceWork.witnessPhone"
                                          placeholder="请输入证明人联系电话"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-form-item label="离职原因:" prop="workoutReason">
                              <el-input size="mini" type="textarea" :rows="5"
                                        v-model="resume.experienceWork.workoutReason"
                                        style="width: 1075px;" placeholder="请输入离职原因" maxlength="500"></el-input>
                            </el-form-item>
                          </el-row>
                          <el-row>
                            <el-form-item label="主要成绩:" prop="achievement">
                              <el-input size="mini" type="textarea" :rows="5"
                                        v-model="resume.experienceWork.achievement"
                                        style="width: 1075px;" placeholder="请输入主要成绩" maxlength="500"></el-input>
                            </el-form-item>
                          </el-row>
                          <el-row>
                            <el-form-item label="工作描述:" prop="description">
                              <el-input size="mini" type="textarea" :rows="5"
                                        v-model="resume.experienceWork.description"
                                        style="width: 1075px;" placeholder="请输入工作描述" maxlength="500"></el-input>
                            </el-form-item>
                          </el-row>
                        </el-form>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="项目经验" name="1">
                      <div style="margin-left: 60px;margin-top: 40px">
                        <el-form :model="resume.experienceProject" ref="projectRefs" :rules="projectRules">
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="开始日期:" prop="beginDate">
                                <el-date-picker
                                  v-model="resume.experienceProject.beginDate"
                                  size="mini"
                                  type="date"
                                  value-format="yyyy-MM-dd"
                                  style="width: 150px;"
                                  placeholder="开始日期">
                                </el-date-picker>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="结束日期:" prop="endDate">
                                <el-date-picker
                                  v-model="resume.experienceProject.endDate"
                                  size="mini"
                                  type="date"
                                  value-format="yyyy-MM-dd"
                                  style="width: 150px;"
                                  placeholder="结束日期">
                                </el-date-picker>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="项目名称:" prop="name">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceProject.name"
                                          placeholder="请输入项目名称"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="开发工具:" prop="tool">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceProject.tool"
                                          placeholder="请输入开发工具"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="软件环境:" prop="software">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceProject.software"
                                          placeholder="请输入软件环境"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="硬件环境:" prop="hardware">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceProject.hardware"
                                          placeholder="请输入硬件环境"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="项目人数:" prop="number">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceProject.number"
                                          placeholder="请输入number"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="项目描述:" prop="description">
                                <el-input size="mini" type="textarea" :rows="8"
                                          v-model="resume.experienceProject.description"
                                          style="width: 1075px;" placeholder="请输入项目描述" maxlength="1000"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="责任描述:" prop="responsibility">
                                <el-input size="mini" type="textarea" :rows="8"
                                          v-model="resume.experienceProject.responsibility"
                                          style="width: 1075px;" placeholder="请输入责任描述" maxlength="1000"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                        </el-form>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="培训经历" name="2">
                      <div style="margin-left: 60px;margin-top: 40px">
                        <el-form :model="resume.experienceTrain" ref="trainRefs" :rules="trainRules">
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="开始日期:" prop="beginDate">
                                <el-date-picker
                                  v-model="resume.experienceTrain.beginDate"
                                  size="mini"
                                  type="date"
                                  value-format="yyyy-MM-dd"
                                  style="width: 150px;"
                                  placeholder="开始日期">
                                </el-date-picker>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="结束日期:" prop="endDate">
                                <el-date-picker
                                  v-model="resume.experienceTrain.endDate"
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
                              <el-form-item label="培训机构:" prop="organization">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceTrain.organization"
                                          placeholder="请输入培训机构名称"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="培训地址:" prop="address">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceTrain.address"
                                          placeholder="请输入培训地址"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="获得证书:" prop="certificate">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceTrain.certificate"
                                          placeholder="请输入获得证书"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="培训描述:" prop="description">
                                <el-input size="mini" type="textarea" :rows="16"
                                          v-model="resume.experienceTrain.description"
                                          style="width: 1075px;" placeholder="请输入培训描述" maxlength="1000"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                        </el-form>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="技能掌握" name="3">
                      <div style="margin-left: 60px;margin-top: 40px;">
                        <el-row>
                          <el-col :span="1">
                            <el-button class="common_font_size" size="mini" type="mini"
                                       style="background-color: #409EFF;color: white;margin-bottom: 20px"
                                       icon="el-icon-plus" @click="addSkill">添加技能
                            </el-button>
                          </el-col>
                        </el-row>
                        <el-form ref="skillRefs">
                          <div v-for="(skill,index) in resume.experienceSkillList">
                            <el-row>
                              <el-col :span="6">
                                <el-form-item label="技能">
                                  <el-input size="mini" v-model="skill.name" placeholder="请输入技能名称"
                                            style="width: 150px"></el-input>
                                </el-form-item>
                              </el-col>
                              <el-col :span="6">
                                <el-form-item label="掌握程度">
                                  <el-select v-model="skill.levelId" placeholder="掌握程度" size="mini"
                                             style="width: 150px;">
                                    <el-option
                                      v-for="item in levels"
                                      :key="item.id"
                                      :label="item.name"
                                      :value="item.id">
                                    </el-option>
                                  </el-select>
                                </el-form-item>
                              </el-col>
                              <el-col :span="6">
                                <el-button class="common_font_size" size="mini" type="mini"
                                           style="background-color: #409EFF;color: white"
                                           icon="el-icon-delete" @click="deleteSkill(index)">删除
                                </el-button>
                              </el-col>
                            </el-row>
                          </div>
                        </el-form>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="获得证书" name="4">
                      <div style="margin-left: 60px;margin-top: 40px;">
                        <el-row>
                          <el-col :span="1">
                            <el-button class="common_font_size" size="mini" type="mini"
                                       style="background-color: #409EFF;color: white;margin-bottom: 20px"
                                       icon="el-icon-plus" @click="addCertificate">添加证书
                            </el-button>
                          </el-col>
                        </el-row>
                        <el-form ref="CertificateRefs">
                          <div v-for="(certificate,index) in resume.experienceCertificateList">
                            <el-row>
                              <el-col :span="4">
                                <el-form-item label="获得日期">
                                  <el-date-picker
                                    v-model="certificate.getDate"
                                    size="mini"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    style="width: 150px;"
                                    placeholder="获得日期">
                                  </el-date-picker>
                                </el-form-item>
                              </el-col>
                              <el-col :span="4">
                                <el-form-item label="证书名称">
                                  <el-input size="mini" v-model="certificate.name" placeholder="请输入证书名称"
                                            style="width: 150px"></el-input>
                                </el-form-item>
                              </el-col>
                              <el-col :span="4">
                                <el-form-item label="成绩">
                                  <el-input size="mini" v-model="certificate.result" placeholder="请输入成绩"
                                            style="width: 150px"></el-input>
                                </el-form-item>
                              </el-col>
                              <el-col :span="4">
                                <el-button class="common_font_size" size="mini" type="mini"
                                           style="background-color: #409EFF;color: white"
                                           icon="el-icon-delete" @click="deleteCertificate(index)">删除
                                </el-button>
                              </el-col>
                            </el-row>
                            <el-row>
                              <el-col>
                                <el-form-item label="证书描述:" prop="description">
                                  <el-input size="mini" type="textarea" :rows="3" v-model="certificate.description"
                                            style="width: 1075px;" placeholder="请输入证书描述" maxlength="500"></el-input>
                                </el-form-item>
                              </el-col>
                            </el-row>
                          </div>
                        </el-form>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="自我评价" name="5">
                      <div style="margin-left: 60px;margin-top: 40px">
                        <el-row>
                          <el-col :span="6">
                            <el-form-item label="自我评价:" prop="selfEvaluation">
                              <el-input size="mini" type="textarea" :rows="16" v-model="resume.selfEvaluation"
                                        style="width: 1075px;" placeholder="请输入自我评价" maxlength="1000"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="备注" name="6">
                      <div style="margin-left: 60px;margin-top: 40px">
                        <el-row>
                          <el-col :span="6">
                            <el-form-item label="备注:" prop="remark">
                              <el-input size="mini" type="textarea" :rows="16" v-model="resume.remark"
                                        style="width: 1075px;" placeholder="请输入备注" maxlength="1000"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                    </el-tab-pane>
                    <el-divider></el-divider>
                    <el-row>
                      <el-col :span="2">
                        <el-button class="common_font_size" size="mini" type="mini"
                                   style="background-color: #409EFF;color: white"
                                   icon="el-icon-arrow-left" @click="last">上一步
                        </el-button>
                      </el-col>
                      <el-col :span="2">
                        <el-button class="common_font_size" size="mini" style="background-color: #409EFF;
                        color: white" @click="next">下一步
                          <i class="el-icon-arrow-right el-icon--right"></i>
                        </el-button>
                      </el-col>
                      <el-col :span="20">
                        <template v-if=" this.resume.fileUrlVo.fileName!=null&&this.resume.fileUrlVo.fileName!='' ">
                          <a class="el-upload-list__item-name" :href="this.resume.fileUrlVo.path" target=" _blank"
                             style="margin-bottom: 10px">
                            <i class="el-icon-document"></i>
                            {{this.resume.fileUrlVo.fileName}}
                          </a>
                        </template>
                        <el-upload
                          ref="upload"
                          action="void"
                          multiple
                          :multiple="false"
                          :http-request="customUpload"
                          :on-remove="handleRemove"
                          :on-progress="progressA"
                          :auto-upload="true">
                          <el-button class="common_font_size" size="mini" :disabled="uploadDataDisabled" type="mini"
                                     style="background-color: #409EFF;color: white" :icon="uploadDataBtnIcon">
                            上传附件
                          </el-button>
                        </el-upload>
                      </el-col>
                    </el-row>
                    <el-divider></el-divider>
                    <el-row>
                      <el-col :span="11">&nbsp;</el-col>
                      <el-col :span="13" style="text-align: left">
                        <div style="margin-bottom: 10px">
                          <el-button class="common_font_size" size="middle" type="success" round
                                     @click="saveOrUpdateResume">保存简历
                          </el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </el-tabs>
                </el-form>
              </el-card>
            </el-tab-pane>
            <el-tab-pane name="3" label="应聘进度">
              <el-card shadow="hover" class="position_card">
                <span class="title_font">应聘进度</span>
                <!--                <el-button class="common_font_size" size="mini" type="primary" style="margin-top: 12px;"-->
                <!--                           @click="nextState">下一步-->
                <!--                </el-button>-->
                <el-divider></el-divider>
                <div style="float: left">
                  <span style="font-size: 14px!important;">选择职位：</span>
                  <el-select v-model="selectedPositionId" filterable size="mini" @change="getCurrentPositions">
                    <el-option
                      v-for="item in resumePositionsList"
                      :key="item.positions.id"
                      :label="item.positions.name"
                      :value="item.positions.id">
                    </el-option>
                  </el-select>
                </div>
                <div style="float: left;margin-top: 40px">
                  <el-steps align-center :active="activeState" finish-status="success" style="width: 1050px">
                    <template v-if="activeState === 0">
                      <el-step title="简历筛选" description="简历筛选中"></el-step>
                      <el-step title="笔试" description=" "></el-step>
                      <el-step title="面试" description=" "></el-step>
                      <el-step title="offer沟通" description=" "></el-step>
                      <el-step title="三方签约" description=" "></el-step>
                      <el-step title="待入职" description=" "></el-step>
                    </template>
                    <template v-else>
                      <el-step title="简历筛选" description="恭喜您的简历通过筛选！请做好笔试准备"></el-step>
                      <template v-if="activeState === 1">
                        <el-step title="笔试" description="笔试中"></el-step>
                        <el-step title="面试"></el-step>
                        <el-step title="offer沟通"></el-step>
                        <el-step title="三方签约"></el-step>
                        <el-step title="待入职"></el-step>
                      </template>
                      <template v-else>
                        <el-step title="笔试" description="恭喜您通过笔试！请做好面试准备"></el-step>
                        <template v-if="activeState === 2">
                          <el-step title="面试" description="面试中"></el-step>
                          <el-step title="offer沟通"></el-step>
                          <el-step title="三方签约"></el-step>
                          <el-step title="待入职"></el-step>
                        </template>
                        <template v-else>
                          <el-step title="面试" description="恭喜您通过面试！请与企业有效沟通"></el-step>
                          <template v-if="activeState === 3">
                            <el-step title="offer沟通" description="offer沟通中"></el-step>
                            <el-step title="三方签约"></el-step>
                            <el-step title="待入职"></el-step>
                          </template>
                          <template v-else>
                            <el-step title="offer沟通" description="若您对这个offer满意，可申请签约！"></el-step>
                            <template v-if="activeState === 4">
                              <el-step title="三方签约" description="三方签约中"></el-step>
                              <el-step title="待入职"></el-step>
                            </template>
                            <template v-else>
                              <el-step title="三方签约" description="恭喜您签约成功！"></el-step>
                              <template v-if="activeState === 5">
                                <el-step title="待入职"></el-step>
                              </template>
                              <template v-if="activeState === 6">
                                <el-step title="待入职" description="恭喜您签约成功，请做好入职准备！"></el-step>
                              </template>
                            </template>
                          </template>
                        </template>
                      </template>
                    </template>
                  </el-steps>
                </div>
                <el-row style="margin-top: 200px">
                  <el-col :span="8">&nbsp;</el-col>
                  <el-col :span="8">
                    <template v-if="activeState === 5">
                      <el-button class="common_font_size" size="mini" type="primary" style="margin-top: 12px;"
                                 @click="showEmployed">查看录用通知书
                      </el-button>
                    </template>
                    <template v-if="activeState === 4 ">
                      <el-button class="common_font_size" size="mini" type="primary" style="margin-top: 12px;"
                                 @click="showContract">查看签约
                      </el-button>
                      <el-button class="common_font_size" size="mini" type="primary" style="margin-top: 12px;"
                                 @click="confirmContract">确认签约
                      </el-button>
                    </template>
                  </el-col>
                  <el-col :span="8"></el-col>
                </el-row>
                <el-divider></el-divider>
                <div style="float: left;margin-top: 50px;width: 100%">
                  <el-collapse>
                    <template v-for="enterprise in enterprises" v-if="enterprise.id === selectedPosition.enterpriseId">
                      <el-collapse-item class="minHeight">
                        <template slot="title">
                          <div style="width: 100%;padding-left: 20px;text-align: left;margin-bottom: 82px;">
                            <el-row class="top_el_row">
                              <el-col :span="5">
                                <div class="grid-content">{{selectedPosition.name}}</div>
                              </el-col>
                              <el-col :span="1">
                                <div class="grid-content"></div>
                              </el-col>
                              <el-col :span="4">
                                <div class="grid-content">[{{selectedPosition.address | addrEllipsis}}]</div>
                              </el-col>
                              <el-col :span="4">
                                <div class="grid-content"></div>
                              </el-col>
                              <el-col :span="6">
                                <div class="grid-content">{{enterprise.name}}</div>
                              </el-col>
                              <el-col :span="4">
                                <div class="grid-content">更新时间：{{selectedPosition.updateTime}}</div>
                              </el-col>
                            </el-row>
                            <el-row class="mid_el_row">
                              <el-col :span="2">
                                <div class="grid-content">
                                  <template v-for="salary in salaries" v-if="salary.id === selectedPosition.salaryId">
                                    <span style="color: #fc703e;font-size: 14px!important;">{{salary.name}}</span>
                                  </template>
                                </div>
                              </el-col>
                              <el-col :span="2">
                                <div class="grid-content">
                                  <template v-for="experience in experiences"
                                            v-if="experience.id === selectedPosition.experienceId">
                                    {{experience.name}}
                                  </template>
                                </div>
                              </el-col>
                              <el-col :span="2">
                                <div class="grid-content">
                                  <div class="grid-content">
                                    <template v-for="degree in degrees" v-if="degree.id === selectedPosition.degreeId">
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
                                <div class="grid-content">{{selectedPosition.keyword}}</div>
                              </el-col>
                              <el-col :span="10">
                                <div class="grid-content">{{enterprise.welfare | welEllipsis}}</div>
                              </el-col>
                            </el-row>
                          </div>
                        </template>
                        <div style="font-size: 12px;margin-top: 10px;text-align: left">
                          <span style="font-weight: bold;margin-left: 18px">职位描述</span>
                          <div style="margin-left: 18px;margin-right: 18px"
                               v-html="keepTextStyle(selectedPosition.description)"></div>
                          <el-divider></el-divider>
                          <span style="font-weight: bold;margin-left: 18px">公司介绍</span>
                          <div style="margin-left: 18px;margin-right: 18px"
                               v-html="keepTextStyle(enterprise.introduction)"></div>
                          <el-divider></el-divider>
                          <span style="font-weight: bold;margin-left: 18px">招聘人数</span>
                          <div style="margin-left: 18px;margin-right: 18px">{{selectedPosition.number}}</div>
                          <el-divider></el-divider>
                          <span style="font-weight: bold;margin-left: 18px">工作地址</span>
                          <div style="margin-left: 18px;margin-right: 18px">{{selectedPosition.address}}</div>
                          <el-divider></el-divider>
                          <span style="font-weight: bold;margin-left: 18px">工商信息</span>
                          <a style="font-weight: bold;float: right;margin-right: 18px">
                            <router-link target="_blank"
                                         :to="{path:'/infoEnterprise',query:{UT93oOdkwCTY9RnxRwfLCi:enterprise.id}}">
                              查看更多
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
                        </div>
                      </el-collapse-item>
                    </template>
                  </el-collapse>
                </div>
              </el-card>
            </el-tab-pane>
          </template>
          <el-tab-pane name="4" label="更改密码" style="text-align: center">
            <el-card shadow="hover" class="position_card">
              <span class="title_font">更改密码</span>
              <el-divider></el-divider>
              <el-form :model="passForm" ref="passForm" :rules="passRules">
                <el-form-item prop="oldPassword">
                  <el-input size="mini" type="oldPassword" v-model="passForm.oldPassword" prefix-icon="el-icon-lock"
                            auto-complete="off" placeholder="请输入旧密码" show-password="show-password"
                            style="width: 450px">
                  </el-input>
                </el-form-item>
                <el-form-item prop="newPassword">
                  <el-input size="mini" type="newPassword" v-model="passForm.newPassword" prefix-icon="el-icon-lock"
                            auto-complete="off" placeholder="请输入新密码" show-password="show-password"
                            style="width: 450px">
                  </el-input>
                </el-form-item>
                <el-form-item prop="checkPassword">
                  <el-input size="mini" type="checkPassword" v-model="passForm.checkPassword" prefix-icon="el-icon-lock"
                            auto-complete="off" placeholder="请再次输入新密码" show-password="show-password"
                            style="width: 450px">
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-button class="common_font_size" size="mini" type="warning" @click="updatePassword">更改密码
                  </el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    name: "PersonCenter",
    data() {
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'))
        }
        callback()
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'))
        }
        callback()
      }
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'))
        } else if (value !== this.passForm.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        selectedPositionId: '',
        selectedPosition: '',
        selectedResumePositions: '',
        resumePositionsList: [],
        enterprises: [],
        isAuthenticate: 0,
        activeState: 0,
        tabPosition: 'left',
        activeTab: '1',
        user: this.$store.state.user,
        nations: [],
        department: [],
        specialty: [],
        specialtySelected: [],
        position: [],
        politics: [],
        topDegrees: ['本科', '大专', '硕士', '博士', '高中', '初中', '小学', '其他'],
        student: {
          id: "",
          name: "",
          studentId: "",
          gender: "",
          birthday: "",
          idCard: "",
          nationId: "",
          nativePlace: "",
          politicId: "",
          email: "",
          phone: "",
          address: "",
          school: "",
          topDegree: "",
          departmentId: "",
          specialtyId: "",
          positionId: "",
          beginDate: "",
          endDate: ""
        },
        enterprise: {
          talkDate: '',
          talkTimeId: '',
          id: '',
          name: '',
          createTime: '',
          industry: '计算机软件、硬件行业',
          nature: '私营企业',
          scope: '计算机软件、硬件服务',
          financeId: '',
          scaleId: '',
          finance: '',
          scale: '',
          address: '北京市 朝阳区 ',
          phone: '13878787871',
          email: '13878787871@cess.com',
          boss: '',
          website: 'http://www.cess.com',
          introduction: '',
          product: '',
          honor: '',
          culture: '',
          expectation: '',
          welfare: '',
        },
        times: [],
        finances: [],
        scales: [],
        natures: [],
        levels: [],
        passForm: {
          oldPassword: '',
          newPassword: '',
          checkPassword: ''
        },
        stepNum: 7,
        activeInt: 0,
        active: '0',
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
        passRules: {
          oldPassword: [{validator: validatePass1, trigger: 'blur'}],
          newPassword: [{validator: validatePass2, trigger: 'blur'}],
          checkPassword: [{validator: validatePass3, trigger: 'blur'}]
        },
        stuRules: {
          name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          gender: [{required: true, message: '请输入性别', trigger: 'blur'}],
          birthday: [{required: true, message: '请输入出生日期', trigger: 'blur'}],
          idCard: [{required: true, message: '请输入身份证号码', trigger: 'blur'}, {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '身份证号码格式不正确',
            trigger: 'blur'
          }],
          nationId: [{required: true, message: '请输入您组', trigger: 'blur'}],
          nativePlace: [{required: true, message: '请输入籍贯', trigger: 'blur'}],
          politicId: [{required: true, message: '请输入政治面貌', trigger: 'blur'}],
          email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'}, {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }],
          phone: [{required: true, message: '请输入电话号码', trigger: 'blur'}],
          address: [{required: true, message: '请输入学生地址', trigger: 'blur'}],
          departmentId: [{required: true, message: '请输入院系名称', trigger: 'blur'}],
          topDegree: [{required: true, message: '请输入学历', trigger: 'blur'}],
          specialty: [{required: true, message: '请输入专业', trigger: 'blur'}],
          school: [{required: true, message: '请输入毕业院校', trigger: 'blur'}],
          beginDate: [{required: true, message: '请输入入学日期', trigger: 'blur'}],
          studentId: [{required: true, message: '请输入学号', trigger: 'blur'}],
        },
        entRules: {
          talkDate: [{required: true, message: '请选择宣讲日期', trigger: 'blur'}],
          talkTimeId: [{required: true, message: '请选择宣讲时间段', trigger: 'blur'}],
          name: [{required: true, message: '请输入企业名称', trigger: 'blur'}],
          email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'}, {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }],
          phone: [{required: true, message: '请输入电话号码', trigger: 'blur'}],
          address: [{required: true, message: '请输入地址', trigger: 'blur'}],
          createTime: [{required: true, message: '请输入成立日期', trigger: 'blur'}],
          industry: [{required: true, message: '请输入所属行业', trigger: 'blur'}],
          nature: [{required: true, message: '请输入企业性质', trigger: 'blur'}],
          scope: [{required: true, message: '请输入经营范围', trigger: 'blur'}],
          boss: [{required: true, message: '请输入法人代表', trigger: 'blur'}],
          website: [{required: true, message: '请输入企业官网', trigger: 'blur'}],
          introduction: [{required: true, message: '请输入企业简介', trigger: 'blur'}],
          product: [{required: true, message: '请输入企业产品', trigger: 'blur'}],
          honor: [{required: true, message: '请输入企业荣誉', trigger: 'blur'}],
          culture: [{required: true, message: '请输入企业文化', trigger: 'blur'}],
          expectation: [{required: true, message: '请输入企业展望', trigger: 'blur'}],
          welfare: [{required: true, message: '请输入企业福利', trigger: 'blur'}],
        },
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
      if (this.user.roleId == 2) {
        this.initStudentData()
        this.initStudent()
        this.initResumeData()
      } else if (this.user.roleId == 3) {
        // this.initEnterpriseData()
        this.initEnterprise()
      } else if (this.user.roleId == 5) {

      }
      this.initCommonData()
    },
    methods: {
      showEmployed() {
        const {href} = this.$router.resolve({
          path: '/employed',
          //传参
          query: {
            fLTYROd1T59onR3kUxCi9wCw: this.selectedResumePositions.sheetEmployedId
          }
        })
        window.open(href, '_blank')
      },
      showContract() {
        const {href} = this.$router.resolve({
          path: '/contract',
          //传参
          query: {
            LXw8AAX8QIRj10d59852mmDQ: this.selectedResumePositions.sheetContractId
          }
        })
        window.open(href, '_blank')
      },
      confirmContract() {
        let cid = this.getSheetContractId()
        if (cid !== null) {
          this.$axios.put('/sheetContract/confirm/student?cid=' + cid).then(resp => {
            if (resp.data.code === 200) {
              this.$notify({
                message: '申请成功，请等待学校回复',
                type: 'success'
              })
            } else {
              this.$notify({
                message: '申请失败',
                type: 'error'
              })
            }
          })
        }
      },
      getSheetContractId() {
        let length = this.resumePositionsList.length
        for (let i = 0; i < length; i++) {
          if (this.resumePositionsList[i].positions.id === this.selectedPositionId) {
            return this.resumePositionsList[i].sheetContractId
          }
        }
        return null
      },
      nextState() {
        if (this.activeState++ > 5) this.activeState = 0
      },
      initResumePositionsList() {
        this.$axios.get('/resume/getResumePositionsList?rid=' + this.resume.id).then(resp => {
          if (resp.data.code === 200) {
            if (resp.data.data !== null) {
              this.resumePositionsList = resp.data.data;
              //默认选中第一个职位
              this.selectedPosition = this.resumePositionsList[0].positions
              this.selectedPositionId = this.selectedPosition.id
              this.activeState = this.resumePositionsList[0].stateId - 1
              this.selectedResumePositions = this.resumePositionsList[0]
            }
          }
        })
        //用于展示职位所处企业的信息
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
      getCurrentPositions() {
        let length = this.resumePositionsList.length
        for (let i = 0; i < length; i++) {
          if (this.resumePositionsList[i].positions.id === this.selectedPositionId) {
            this.selectedPosition = this.resumePositionsList[i].positions;
            this.activeState = this.resumePositionsList[i].stateId - 1
            this.selectedResumePositions = this.resumePositionsList[i]
            break;
          }
        }
      },
      goBack() {
        this.$router.go(-1)
      },
      initStudent() {
        this.$axios.get('/content/student/getOne?userId=' + this.user.id).then(resp => {
          if (resp.data.code === 200) {
            this.student = resp.data.data;
            this.$notify({
              title: '提醒',
              message: '您的身份通过审核',
              type: 'success'
            })
          } else if (resp.data.code === 204) {
            //提示需要完善信息认证
            this.isAuthenticate = 1
            this.$notify({
              title: '提醒',
              message: '请完善详细信息',
              type: 'warning'
            })
          } else if (resp.data.code === 444) {
            //审核未通过状态
            this.isAuthenticate = 1
            this.student = resp.data.data;
            this.$notify({
              title: '提醒',
              message: '请等待审核结果',
              type: 'warning'
            })
          }
        })
      },
      initEnterprise() {
        this.$axios.get('/enterprise/getOne?userId=' + this.user.id).then(resp => {
          if (resp.data.code === 200) {
            this.enterprise = resp.data.data;
            this.$notify({
              title: '提醒',
              message: '您的身份通过审核',
              type: 'success'
            })
          } else if (resp.data.code === 204) {
            //提示需要完善信息认证
            this.isAuthenticate = 1
            this.$notify({
              title: '提醒',
              message: '请完善详细信息',
              type: 'warning'
            })
          } else if (resp.data.code === 444) {
            //审核未通过状态
            this.isAuthenticate = 1
            this.enterprise = resp.data.data;
            this.$notify({
              title: '提醒',
              message: '请等待审核结果',
              type: 'warning'
            })
          }
        })
      },
      initStudentData() {
        if (!window.sessionStorage.getItem("department")) {
          this.$axios.get('/content/department').then(resp => {
            if (resp.data.code === 200) {
              this.department = resp.data.data;
              window.sessionStorage.setItem("department", JSON.stringify(this.department));
            }
          })
        } else {
          this.department = JSON.parse(window.sessionStorage.getItem("department"));
        }
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
        this.specialtySelected = this.specialty
        if (!window.sessionStorage.getItem("position")) {
          this.$axios.get('/content/position').then(resp => {
            if (resp.data.code === 200) {
              this.position = resp.data.data;
              window.sessionStorage.setItem("position", JSON.stringify(this.position));
            }
          })
        } else {
          this.position = JSON.parse(window.sessionStorage.getItem("position"));
        }
        if (!window.sessionStorage.getItem("nations")) {
          this.$axios.get('/content/nations').then(resp => {
            if (resp.data.code === 200) {
              this.nations = resp.data.data;
              window.sessionStorage.setItem("nations", JSON.stringify(this.nations));
            }
          })
        } else {
          this.nations = JSON.parse(window.sessionStorage.getItem("nations"));
        }
        if (!window.sessionStorage.getItem("politics")) {
          this.$axios.get('/content/politics').then(resp => {
            if (resp.data.code === 200) {
              this.politics = resp.data.data;
              window.sessionStorage.setItem("politics", JSON.stringify(this.politics));
            }
          })
        } else {
          this.politics = JSON.parse(window.sessionStorage.getItem("politics"));
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
      initEnterpriseData() {
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
        if (!window.sessionStorage.getItem("times")) {
          this.$axios.get('/time').then(resp => {
            if (resp.data.code === 200) {
              this.times = resp.data.data;
              window.sessionStorage.setItem("times", JSON.stringify(this.times));
            }
          })
        } else {
          this.times = JSON.parse(window.sessionStorage.getItem("times"));
        }
      },
      initCommonData() {
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
        if (!window.sessionStorage.getItem("times")) {
          this.$axios.get('/time').then(resp => {
            if (resp.data.code === 200) {
              this.times = resp.data.data;
              window.sessionStorage.setItem("times", JSON.stringify(this.times));
            }
          })
        } else {
          this.times = JSON.parse(window.sessionStorage.getItem("times"));
        }
      }
      ,
      keepTextStyle(text) {
        return text.replace(/\n/g, "<br/>")
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
      resetStudent() {
        this.initStudent()
      },
      addOrUpdateStudent() {
        if (this.student.id) {
          this.$refs['stuForm'].validate(valid => {
            if (valid) {
              this.$axios.put("/content/student", this.student).then(resp => {
                if (resp.data.code === 200) {
                  // this.initStudent();
                  this.$notify({
                    message: '更新成功',
                    type: 'success'
                  })
                }
              })
            }
          });
        } else {
          this.$refs['stuForm'].validate(valid => {
            if (valid) {
              this.$axios({
                url: '/content/student',
                method: 'post',
                data: {
                  userId: this.user.id,
                  name: this.student.name,
                  studentId: this.student.studentId,
                  gender: this.student.gender,
                  birthday: this.student.birthday,
                  idCard: this.student.idCard,
                  nationId: this.student.nationId,
                  nativePlace: this.student.nativePlace,
                  politicId: this.student.politicId,
                  email: this.student.email,
                  phone: this.student.phone,
                  address: this.student.address,
                  school: this.student.school,
                  topDegree: this.student.topDegree,
                  departmentId: this.student.departmentId,
                  specialtyId: this.student.specialtyId,
                  positionId: this.student.positionId,
                  beginDate: this.student.beginDate,
                  endDate: this.student.endDate
                }
              }).then(resp => {
                if (resp.data.code === 200) {
                  this.student = resp.data.data;
                  this.isAuthenticate = 1
                  this.$notify({
                    title: '提醒',
                    message: '请等待审核结果',
                    type: 'warning'
                  })
                }
              })
            }
          });
        }
      },
      addOrUpdateEnterprise() {
        if (this.enterprise.id) {
          this.$refs['entForm'].validate(valid => {
            if (valid) {
              this.$axios.put("/enterprise", this.enterprise).then(resp => {
                if (resp.data.code === 200) {
                  // this.initEnterprise();
                  this.$notify({
                    message: '更新成功',
                    type: 'success'
                  })
                }
              })
            }
          });
        } else {
          this.$refs['entForm'].validate(valid => {
            if (valid) {
              this.$axios({
                url: "/enterprise",
                method: "post",
                data: {
                  userId: this.user.id,
                  name: this.enterprise.name,
                  createTime: this.enterprise.createTime,
                  industry: this.enterprise.industry,
                  nature: this.enterprise.nature,
                  scope: this.enterprise.scope,
                  financeId: this.enterprise.financeId,
                  scaleId: this.enterprise.scaleId,
                  address: this.enterprise.address,
                  phone: this.enterprise.phone,
                  email: this.enterprise.email,
                  boss: this.enterprise.boss,
                  website: this.enterprise.website,
                  introduction: this.enterprise.introduction,
                  product: this.enterprise.product,
                  honor: this.enterprise.honor,
                  culture: this.enterprise.culture,
                  expectation: this.enterprise.expectation,
                  welfare: this.enterprise.welfare,
                  talkDate: this.enterprise.talkDate,
                  talkTimeId: this.enterprise.talkTimeId,
                }
              }).then(resp => {
                if (resp.data.code === 200) {
                  this.enterprise = resp.data.data;
                  this.isAuthenticate = 1
                  this.$notify({
                    title: '提醒',
                    message: '请等待审核结果',
                    type: 'warning'
                  })
                }
              })
            }
          });
        }
      },
      updatePassword(username) {
        this.$refs['passForm'].validate(valid => {
          if (valid) {
            this.$axios({
              url: '/password',
              method: 'put',
              data: {
                username: this.$store.state.user.username,
                oldPassword: this.passForm.oldPassword,
                newPassword: this.passForm.newPassword
              }
            }).then(resp => {
              if (resp.data.code === 200) {
                this.$alert(resp.data.data + ',请重新登录')
                this.$router.replace('/login')
              } else {
                this.$alert(resp.data.message)
              }
            })
          }
        })
      },
      initResumeData() {
        //获取该用户已经保存的简历信息
        this.$axios.get('/resume?userId=' + this.user.id).then(resp => {
          if (resp.data.code === 200) {
            this.resume = resp.data.data;
            this.initResumePositionsList()
          }
        })
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
                        if (this.resume.id) {
                          this.$axios.put('/resume?userId=' + this.user.id, this.resume)
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
                            '/resume/personCenter?userId=' + this.user.id, this.resume)
                            .then(resp => {
                              if (resp.data.code === 200) {
                                this.$notify({
                                  message: '保存成功',
                                  type: 'success'
                                })
                                this.initResumeData()
                              } else {
                                this.$notify.error('保存失败')
                              }
                            })
                        }
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
      }
    },
    filters: {
      addrEllipsis(value) {
        if (!value) return "";
        if (value.length > 10) {
          return value.slice(0, 10) + "...";
        }
        return value;
      },
      welEllipsis(value) {
        if (!value) return "";
        if (value.length > 32) {
          return value.slice(0, 32) + "...";
        }
        return value;
      }
    }
  }
</script>

<style>
  .el-tabs__item {
    font-size: 11px !important;
  }

  .el-form-item__label {
    font-size: 11px !important;
  }

  .el-radio__original {
    font-size: 11px !important;
  }

  .el-step__description {
    font-size: 11px !important;
  }

  .position_card {
    width: 1300px;
  }

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
