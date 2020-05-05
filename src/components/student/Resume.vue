<template>
  <div>
    <el-scrollbar>
      <div>
        <el-row>
          <span style="font-weight: bold">{{student.name}}的简历</span>
        </el-row>
        <el-tabs :tab-position="tabPosition" style="height: 1500px;font-weight: bold;margin-top: 20px"
                 class="common_font_size">
          <el-tab-pane label="个人信息">
            <el-card style="width: 1000px;margin-left: 50px">
              <span>基本信息</span>
              <el-divider></el-divider>
              <el-form :model="student" ref="stuForm">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="姓名:" prop="name">
                      <el-input disabled disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                v-model="student.name"
                                placeholder="请输入学生姓名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="性别:" prop="gender">
                      <el-radio-group disabled v-model="student.gender">
                        <el-radio label="男">男</el-radio>
                        <el-radio label="女">女</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="出生日期:" prop="birthday">
                      <el-date-picker
                        disabled
                        disabled
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
                      <el-select v-model="student.politicId" placeholder="政治面貌" size="mini" style="width: 120px">
                        <el-option
                          disabled
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
                      <el-select v-model="student.nationId" placeholder="民族" size="mini" style="width: 130px;">
                        <el-option
                          disabled
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
                      <el-input disabled disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                v-model="student.nativePlace" placeholder="请输入籍贯"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="电子邮箱:" prop="email">
                      <el-input disabled disabled size="mini" style="width: 120px" prefix-icon="el-icon-message"
                                v-model="student.email" placeholder="请输入电子邮箱"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="联系地址:" prop="address">
                      <el-input disabled disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                v-model="student.address" placeholder="请输入联系地址"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="身份证号码:" prop="idCard">
                      <el-input disabled disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                v-model="student.idCard" placeholder="请输入身份证号码"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="电话号码:" prop="phone">
                      <el-input disabled disabled size="mini" style="width: 200px" prefix-icon="el-icon-phone"
                                v-model="student.phone" placeholder="电话号码"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="学号:" prop="studentId">
                      <el-input disabled disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                v-model="student.studentId" placeholder="学号"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="学历:" prop="topDegree">
                      <el-select v-model="student.topDegree" placeholder="学历" size="mini"
                                 style="width: 130px;">
                        <el-option
                          disabled
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
                      <el-input disabled disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                v-model="student.school" placeholder="毕业院校名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="所属院系:" prop="departmentId">
                      <el-select v-model="student.departmentId" placeholder="院系" size="mini" style="width: 130px;">
                        <el-option
                          disabled
                          v-for="item in department"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="专业:" prop="departmentId">
                      <el-select v-model="student.specialtyId" placeholder="专业" size="mini" style="width: 130px;">
                        <el-option
                          disabled
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
                                 style="width: 130px;">
                        <el-option
                          disabled
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
                      <el-input disabled disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                v-model="student.languageLevel" placeholder="请输入外语水平"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="计算机水平:" prop="computerLevel">
                      <el-input disabled disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                v-model="student.computerLevel" placeholder="请输入计算机水平"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="入学日期:" prop="beginDate">
                      <el-date-picker
                        disabled
                        disabled
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
                        disabled
                        disabled
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
                <!--                <el-row>-->
                <!--                  <el-alert-->
                <!--                    center-->
                <!--                    close-text="知道了"-->
                <!--                    title="基本信息无法修改"-->
                <!--                    type="warning"-->
                <!--                    description="请前往个人中心修改或者完善信息"-->
                <!--                    show-icon>-->
                <!--                  </el-alert>-->
                <!--                </el-row>-->
                <!--                <el-row style="text-align: right;margin-top: 10px">-->
                <!--                  <el-button type="mini" style="background-color: #FDF6EC" @click="toPersonCenter">前往个人中心</el-button>-->
                <!--                </el-row>-->
              </el-form>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="标准简历">
            <div style="text-align: center">
              <div style="height: 970px">
                <el-form :model="resume" ref="resumeRefs">
                  <el-tabs :tab-position="tabPosition" v-model="active" style="height: 970px;"
                           @tab-click="changeActive">
                    <el-tab-pane label="工作经验" name="0">
                      <div style="margin-left: 60px;margin-top: 40px">
                        <el-form :model="resume.experienceWork" ref="workRefs">
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="开始日期:" prop="beginDate">
                                <el-date-picker
                                  disabled
                                  v-model="resume.experienceWork.beginDate"
                                  size="mini"
                                  type="date"
                                  value-format="yyyy-MM-dd"
                                  style="width: 130px;"
                                  placeholder="开始日期">
                                </el-date-picker>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="结束日期:" prop="endDate">
                                <el-date-picker
                                  disabled
                                  v-model="resume.experienceWork.endDate"
                                  size="mini"
                                  type="date"
                                  value-format="yyyy-MM-dd"
                                  style="width: 130px;"
                                  placeholder="结束日期">
                                </el-date-picker>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="企业名称:" prop="enterpriseName">
                                <el-input disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceWork.enterpriseName"
                                          placeholder="请输入企业名称"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="所属行业:" prop="enterpriseName">
                                <el-input disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceWork.industry"
                                          placeholder="请输入所属行业"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="部门:" prop="department">
                                <el-input disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceWork.department"
                                          placeholder="请输入部门名称"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="实习职位:" prop="position">
                                <el-input disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceWork.position"
                                          placeholder="请输入实习职位"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="企业性质:" prop="nature">
                                <el-input disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceWork.nature"
                                          placeholder="请输入企业性质"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="企业规模:" prop="scaleId">
                                <el-select v-model="resume.experienceWork.scaleId" placeholder="企业规模" size="mini"
                                           style="width: 130px;">
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
                                           style="width: 130px;">
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
                                <el-input disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceWork.departmentNumber"
                                          placeholder="请输入部门人数"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="主管:" prop="leader">
                                <el-input disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceWork.leader"
                                          placeholder="请输入主管姓名"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="证明人:" prop="witness">
                                <el-input disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceWork.witness"
                                          placeholder="请输入证明人姓名"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="证明人联系电话:" prop="witnessPhone">
                                <el-input disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceWork.witnessPhone"
                                          placeholder="请输入证明人联系电话"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-form-item label="离职原因:" prop="workoutReason">
                              <el-input disabled size="mini" type="textarea" :rows="5"
                                        v-model="resume.experienceWork.workoutReason"
                                        style="width: 1075px;" placeholder="请输入离职原因" maxlength="500"></el-input>
                            </el-form-item>
                          </el-row>
                          <el-row>
                            <el-form-item label="主要成绩:" prop="achievement">
                              <el-input disabled size="mini" type="textarea" :rows="5"
                                        v-model="resume.experienceWork.achievement"
                                        style="width: 1075px;" placeholder="请输入主要成绩" maxlength="500"></el-input>
                            </el-form-item>
                          </el-row>
                          <el-row>
                            <el-form-item label="工作描述:" prop="description">
                              <el-input disabled size="mini" type="textarea" :rows="5"
                                        v-model="resume.experienceWork.description"
                                        style="width: 1075px;" placeholder="请输入工作描述" maxlength="500"></el-input>
                            </el-form-item>
                          </el-row>
                        </el-form>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="项目经验" name="1">
                      <div style="margin-left: 60px;margin-top: 40px">
                        <el-form :model="resume.experienceProject" ref="projectRefs">
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="开始日期:" prop="beginDate">
                                <el-date-picker
                                  disabled
                                  v-model="resume.experienceProject.beginDate"
                                  size="mini"
                                  type="date"
                                  value-format="yyyy-MM-dd"
                                  style="width: 130px;"
                                  placeholder="开始日期">
                                </el-date-picker>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="结束日期:" prop="endDate">
                                <el-date-picker
                                  disabled
                                  v-model="resume.experienceProject.endDate"
                                  size="mini"
                                  type="date"
                                  value-format="yyyy-MM-dd"
                                  style="width: 130px;"
                                  placeholder="结束日期">
                                </el-date-picker>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="项目名称:" prop="name">
                                <el-input disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceProject.name"
                                          placeholder="请输入项目名称"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="开发工具:" prop="tool">
                                <el-input disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceProject.tool"
                                          placeholder="请输入开发工具"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="软件环境:" prop="software">
                                <el-input disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceProject.software"
                                          placeholder="请输入软件环境"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="硬件环境:" prop="hardware">
                                <el-input disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceProject.hardware"
                                          placeholder="请输入硬件环境"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="项目人数:" prop="number">
                                <el-input disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceProject.number"
                                          placeholder="请输入number"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="项目描述:" prop="description">
                                <el-input disabled size="mini" type="textarea" :rows="8"
                                          v-model="resume.experienceProject.description"
                                          style="width: 1075px;" placeholder="请输入项目描述" maxlength="1000"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="责任描述:" prop="responsibility">
                                <el-input disabled size="mini" type="textarea" :rows="8"
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
                        <el-form :model="resume.experienceTrain" ref="trainRefs">
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="开始日期:" prop="beginDate">
                                <el-date-picker
                                  disabled
                                  v-model="resume.experienceTrain.beginDate"
                                  size="mini"
                                  type="date"
                                  value-format="yyyy-MM-dd"
                                  style="width: 130px;"
                                  placeholder="开始日期">
                                </el-date-picker>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="结束日期:" prop="endDate">
                                <el-date-picker
                                  disabled
                                  v-model="resume.experienceTrain.endDate"
                                  size="mini"
                                  type="date"
                                  value-format="yyyy-MM-dd"
                                  style="width: 130px;"
                                  placeholder="结束日期">
                                </el-date-picker>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="培训机构:" prop="organization">
                                <el-input disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceTrain.organization"
                                          placeholder="请输入培训机构名称"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="培训地址:" prop="address">
                                <el-input disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceTrain.address"
                                          placeholder="请输入培训地址"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="6">
                              <el-form-item label="获得证书:" prop="certificate">
                                <el-input disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                                          v-model="resume.experienceTrain.certificate"
                                          placeholder="请输入获得证书"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="6">
                              <el-form-item label="培训描述:" prop="description">
                                <el-input disabled size="mini" type="textarea" :rows="16"
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
                        <!--                        <el-row>-->
                        <!--                          <el-col :span="1">-->
                        <!--                            <el-button class="common_font_size" size="mini" type="mini"-->
                        <!--                                       style="background-color: #409EFF;color: white;margin-bottom: 20px"-->
                        <!--                                       icon="el-icon-plus" @click="addSkill">添加技能-->
                        <!--                            </el-button>-->
                        <!--                          </el-col>-->
                        <!--                        </el-row>-->
                        <el-form ref="skillRefs">
                          <div v-for="(skill,index) in resume.experienceSkillList">
                            <el-row>
                              <el-col :span="6">
                                <el-form-item label="技能">
                                  <el-input disabled size="mini" v-model="skill.name" placeholder="请输入技能名称"
                                            style="width: 120px"></el-input>
                                </el-form-item>
                              </el-col>
                              <el-col :span="6">
                                <el-form-item label="掌握程度">
                                  <el-select v-model="skill.levelId" placeholder="掌握程度" size="mini"
                                             style="width: 130px;">
                                    <el-option
                                      v-for="item in levels"
                                      :key="item.id"
                                      :label="item.name"
                                      :value="item.id">
                                    </el-option>
                                  </el-select>
                                </el-form-item>
                              </el-col>
                              <!--                              <el-col :span="6">-->
                              <!--                                <el-button class="common_font_size" size="mini" type="mini"-->
                              <!--                                           style="background-color: #409EFF;color: white"-->
                              <!--                                           icon="el-icon-delete" @click="deleteSkill(index)">删除-->
                              <!--                                </el-button>-->
                              <!--                              </el-col>-->
                            </el-row>
                          </div>
                        </el-form>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="获得证书" name="4">
                      <div style="margin-left: 60px;margin-top: 40px;">
                        <el-row>
                          <el-col :span="1">
                            <!--                            <el-button class="common_font_size" size="mini" type="mini"-->
                            <!--                                       style="background-color: #409EFF;color: white;margin-bottom: 20px"-->
                            <!--                                       icon="el-icon-plus" @click="addCertificate">添加证书-->
                            <!--                            </el-button>-->
                          </el-col>
                        </el-row>
                        <el-form ref="CertificateRefs">
                          <div v-for="(certificate,index) in resume.experienceCertificateList">
                            <el-row>
                              <el-col :span="4">
                                <el-form-item label="获得日期">
                                  <el-date-picker
                                    disabled
                                    v-model="certificate.getDate"
                                    size="mini"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    style="width: 130px;"
                                    placeholder="获得日期">
                                  </el-date-picker>
                                </el-form-item>
                              </el-col>
                              <el-col :span="4">
                                <el-form-item label="证书名称">
                                  <el-input disabled size="mini" v-model="certificate.name" placeholder="请输入证书名称"
                                            style="width: 120px"></el-input>
                                </el-form-item>
                              </el-col>
                              <el-col :span="4">
                                <el-form-item label="成绩">
                                  <el-input disabled size="mini" v-model="certificate.result" placeholder="请输入成绩"
                                            style="width: 120px"></el-input>
                                </el-form-item>
                              </el-col>
                              <el-col :span="4">
                                <!--                                <el-button class="common_font_size" size="mini" type="mini"-->
                                <!--                                           style="background-color: #409EFF;color: white"-->
                                <!--                                           icon="el-icon-delete" @click="deleteCertificate(index)">删除-->
                                <!--                                </el-button>-->
                              </el-col>
                            </el-row>
                            <el-row>
                              <el-col>
                                <el-form-item label="证书描述:" prop="description">
                                  <el-input disabled size="mini" type="textarea" :rows="3"
                                            v-model="certificate.description"
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
                              <el-input disabled size="mini" type="textarea" :rows="16" v-model="resume.selfEvaluation"
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
                              <el-input disabled size="mini" type="textarea" :rows="16" v-model="resume.remark"
                                        style="width: 1075px;" placeholder="请输入备注" maxlength="1000"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                    </el-tab-pane>
                    <el-divider></el-divider>
                    <el-row>
                      <el-col :span="2">
                        <el-button class="common_font_size" size="mini"
                                   style="background-color: #409EFF;color: white"
                                   icon="el-icon-arrow-left" @click="last">上一步
                        </el-button>
                      </el-col>
                      <el-col :span="2">
                        <el-button class="common_font_size" size="mini" style="background-color: #409EFF;
                        color: white"@click="next">下一步
                          <i class="el-icon-arrow-right el-icon--right"></i>
                        </el-button>
                      </el-col>
                      <el-col :span="20">
                        <template v-if=" this.resume.fileUrlVo.fileName!=null&&this.resume.fileUrlVo.fileName!='' ">
                          <a class="el-upload-list__item-name" :href="this.resume.fileUrlVo.path" target=" _blank"
                             style="margin-bottom: 10px">
                            <span style="font-size: 16px">查看简历附件：</span>
                            <i class="el-icon-document"></i>
                            {{this.resume.fileUrlVo.fileName}}
                          </a>
                        </template>
                        <!--                        <el-upload-->
                        <!--                          ref="upload"-->
                        <!--                          action="void"-->
                        <!--                          multiple-->
                        <!--                          :multiple="false"-->
                        <!--                          :http-request="customUpload"-->
                        <!--                          :on-remove="handleRemove"-->
                        <!--                          :on-progress="progressA"-->
                        <!--                          :auto-upload="true">-->
                        <!--                          <el-button class="common_font_size" size="mini" :disabled="uploadDataDisabled" type="mini"-->
                        <!--                                     style="background-color: #409EFF;color: white" :icon="uploadDataBtnIcon">-->
                        <!--                            上传附件-->
                        <!--                          </el-button>-->
                        <!--                        </el-upload>-->
                      </el-col>
                    </el-row>
                    <el-divider></el-divider>
                    <!--                    <el-row>-->
                    <!--                      <el-col :span="11">&nbsp;</el-col>-->
                    <!--                      <el-col :span="13" style="text-align: left">-->
                    <!--                        <div style="margin-bottom: 10px">-->
                    <!--                          <el-button class="common_font_size" size="middle" type="success" round-->
                    <!--                                     @click="saveOrUpdateResume">保存简历-->
                    <!--                          </el-button>-->
                    <!--                        </div>-->
                    <!--                      </el-col>-->
                    <!--                    </el-row>-->
                  </el-tabs>
                </el-form>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    name: "Resume",
    // props: {
    //   userId: {
    //     type: String,
    //     required: false
    //   }
    // },
    data() {
      return {
        userId: '',
        stepNum: 7,
        activeInt: 0,
        active: '0',
        baseUrl: this.$axios.defaults.baseURL,
        uploadDataDisabled: false,
        uploadDataBtnIcon: 'el-icon-upload2',
        tabPosition: 'left',
        senderUid: '',
        nations: [],
        department: [],
        specialty: [],
        specialtySelected: [],
        position: [],
        politics: [],
        finances: [],
        scales: [],
        natures: [],
        levels: [],
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
      }
    },
    created() {
      this.getSenderUid()
      this.initStudentData()
      this.initStudentAndResume()
    },
    mounted() {
    },
    methods: {
      getUserId(val) {
        this.userId = val
        // console.log('接收参数 ：' + val)
        this.senderUid = this.userId
        this.initStudentAndResume()
      },
      getSenderUid() {
        // 取到路由带过来的参数
        this.senderUid = this.$route.query.fLTYROdT9onR3kUxCi9wCw
      },
      initStudentAndResume() {
        if (typeof this.senderUid !== 'undefined') {
          this.initStudent()
          this.initResumeData()
        }
      },
      initStudent() {
        this.$axios.get('/content/student/getOne?userId=' + this.senderUid).then(resp => {
          if (resp.data.code === 200) {
            this.student = resp.data.data;
          } else if (resp.data.code === 204) {
            //提示需要完善信息认证
            this.$notify({
              title: '提醒',
              message: '请完善详细信息',
              type: 'warning'
            })
          } else if (resp.data.code === 400) {
            //审核未通过状态
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
      initResumeData() {
        //获取该用户已经保存的简历信息
        this.$axios.get('/resume?userId=' + this.senderUid).then(resp => {
          if (resp.data.code === 200) {
            this.resume = resp.data.data;
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

  .el-input.is-disabled .el-input__inner {
    background-color: #FFF !important;
  }

  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #FFF !important;
  }
</style>
