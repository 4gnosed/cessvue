<template>
  <el-scrollbar>
    <el-page-header @back="goBack" content="个人中心" style="margin-left: 10px;margin-top: 10px"/>
    <div style="font-size: 20px;margin-top: -30px">
      <span>欢迎来到CESS个人中心</span>
    </div>
    <el-divider></el-divider>
    <el-tabs :tab-position="tabPosition" style="height: 2000px;margin-top: 50px;margin-left: 50px;font-size: 18px">
      <el-tab-pane label="个人信息">
        <el-card style="width: 1500px;margin-left: 100px">
          <span>基本信息</span>
          <el-divider></el-divider>
          <el-form v-model="user" style="text-align: left">
            <el-row>
              <el-col :span="6">
                <el-form-item label="用户名" label-width="120px" prop="username" style="width: 300px">
                  <el-input v-model="user.username" autocomplete="off" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="角色" label-width="120px" prop="roles" style="width: 300px">
                  <el-input v-model="user.role" autocomplete="off" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="真实姓名" label-width="120px" prop="name" style="width: 300px">
                  <el-input v-model="user.name" autocomplete="off" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="上次登录时间" label-width="120px" prop="email" style="width: 300px">
                  <el-input v-model="user.lastLogin" autocomplete="off" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="手机号" label-width="120px" prop="phone" style="width: 300px">
                  <el-input v-model="user.phone" autocomplete="off" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="邮箱" label-width="120px" prop="email" style="width: 300px">
                  <el-input v-model="user.email" autocomplete="off" disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!--判断用户角色，展示不同角色的详细信息-->
          <!--学生-->
          <template v-if="user.roleId==2">
            <el-divider></el-divider>
            <span>学生详细信息</span>
            <template v-if="isAuthenticate==1">
              <el-divider></el-divider>
              <el-alert
                title="（请完善详细信息）"
                description="填写信息并等待认证，若已经填写则可以再次填写更新"
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
                      style="width: 150px;"
                      placeholder="出生日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="政治面貌:" prop="politicId">
                    <el-select v-model="student.politicId" placeholder="政治面貌" size="mini" style="width: 200px;">
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
                    <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
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
                    <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit"
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
                    <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                              v-model="student.school" placeholder="毕业院校名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="所属院系:" prop="departmentId">
                    <el-select v-model="student.departmentId" placeholder="院系" size="mini"
                               @change="changeDepartment" style="width: 150px;">
                      <el-option
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
                    <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                              v-model="student.languageLevel" placeholder="请输入外语水平"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="计算机水平:" prop="computerLevel">
                    <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
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
              <el-button @click="resetStudent()">重 置</el-button>
              <el-button type="primary" @click="addOrUpdateStudent()">更 新</el-button>
            </div>
          </template>
          <!--企业-->
          <template v-if="user.roleId==3">
            <el-divider></el-divider>
            <span>企业详细信息</span>
            <template v-if="isAuthenticate==1">
              <el-divider></el-divider>
              <el-alert
                title="（请完善详细信息）"
                description="填写信息并等待认证，若已经填写则可以再次填写更新"
                type="warning"
                center
                show-icon>
              </el-alert>
            </template>
            <el-divider></el-divider>
            <el-form :model="enterprise" :rules="entRules" ref="entForm">
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
                      style="width: 150px;"
                      placeholder="createTime">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="所属行业:" prop="industry">
                    <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="enterprise.industry"
                              placeholder="请输入所属行业"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="企业性质:" prop="nature">
                    <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="enterprise.nature"
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
                    <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                              v-model="enterprise.address" placeholder="请输入地址"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="联系电话:" prop="phone">
                    <el-input size="mini" style="width: 200px" prefix-icon="el-icon-phone"
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
                    <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                              v-model="enterprise.boss" placeholder="请输入法人代表"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="企业官网:" prop="website">
                    <el-input size="mini" style="width: 200px" prefix-icon="el-icon-phone"
                              v-model="enterprise.website" placeholder="企业官网"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="企业简介:" prop="introduction">
                    <el-input type="textarea" size="mini" style="width: 1300px;margin-left: 100px" autosize
                              prefix-icon="el-icon-edit"
                              v-model="enterprise.introduction" placeholder="企业简介"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="产品介绍:" prop="product">
                    <el-input size="mini" type="textarea" style="width: 1300px;margin-left: 100px" autosize
                              prefix-icon="el-icon-edit"
                              v-model="enterprise.product" placeholder="产品介绍"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="企业荣誉:" prop="honor">
                    <el-input size="mini" type="textarea" style="width: 1300px;margin-left: 100px" autosize
                              prefix-icon="el-icon-edit"
                              v-model="enterprise.honor" placeholder="企业荣誉"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="企业文化:" prop="culture">
                    <el-input size="mini" type="textarea" style="width: 1300px;margin-left: 100px" autosize
                              prefix-icon="el-icon-edit"
                              v-model="enterprise.culture" placeholder="请输入企业文化"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="企业展望:" prop="expectation">
                    <el-input size="mini" type="textarea" style="width: 1300px;margin-left: 100px" autosize
                              prefix-icon="el-icon-edit"
                              v-model="enterprise.expectation" placeholder="请输入企业展望"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="福利:" prop="welfare">
                    <el-input size="mini" type="textarea" style="width: 1300px;margin-left: 100px" autosize
                              prefix-icon="el-icon-edit"
                              v-model="enterprise.welfare" placeholder="请输入福利"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-divider></el-divider>
            <div>
              <el-button @click="resetEnterprise()">重 置</el-button>
              <el-button type="primary" @click="addOrUpdateEnterprise()">更 新</el-button>
            </div>
          </template>
          <!--教师-->
          <template v-if="user.roleId==5">
            <el-divider></el-divider>
            <span>教师详细信息</span>
            <el-divider></el-divider>
            内容
            <el-divider></el-divider>
            <div>
              <el-button @click="resetTeacher()">重 置</el-button>
              <el-button type="primary" @click="addOrUpdateTeacher()">更 新</el-button>
            </div>
          </template>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="更改密码">
        <el-form>
          <el-form-item label="密码" label-width="120px" prop="password">
            <el-button type="warning" @click="updatePassword(user.username)">更改密码</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <template v-if="this.$store.state.user.roleId == 2">
        <el-tab-pane label="标准简历">标准简历</el-tab-pane>
      </template>
    </el-tabs>
  </el-scrollbar>
</template>

<script>
  export default {
    name: "PersonCenter",
    data() {
      return {
        isAuthenticate: 0,
        tabPosition: 'left',
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
        enterprise: {
          id: '',
          name: '',
          createTime: '',
          industry: '',
          nature: '',
          scope: '',
          financeId: '',
          scaleId: '',
          finance: '',
          scale: '',
          address: '',
          phone: '',
          email: '',
          boss: '',
          website: '',
          introduction: '',
          product: '',
          honor: '',
          culture: '',
          expectation: '',
          welfare: '',
        },
        finances: [],
        scales: []
      }
    },
    mounted() {
      if (this.user.roleId == 2) {
        this.initStudentData()
        this.initStudent()
      } else if (this.user.roleId == 3) {
        this.initEnterpriseData()
        this.initEnterprise()
      } else if (this.user.roleId == 5) {

      }

    },
    methods: {
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
          } else if (resp.data.code === 400) {
            //审核未通过状态
            this.isAuthenticate = 1
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
          } else if (resp.data.code === 400) {
            //审核未通过状态
            this.isAuthenticate = 1
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
                  this.initStudent();
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
                  this.initEnterprise();
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
                  welfare: this.enterprise.welfare
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
        // this.$axios.put('/password?username=' + username).then(resp => {
        //   if (resp && resp.data.code === 200) {
        //     this.$alert('密码已修改 ' + resp.data.data)
        //   }
        // })
      }
    }
  }
</script>

<style scoped>
</style>
