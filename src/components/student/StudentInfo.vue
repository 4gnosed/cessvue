<template>
  <el-form :model="student" ref="stuForm">
    <el-row>
      <el-col :span="6">
        <el-form-item label="姓名:" prop="name">
          <el-input disabled size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="student.name"
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
          <el-select v-model="student.nationId" placeholder="民族" size="mini" style="width: 150px;">
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
          <el-input disabled size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                    v-model="student.nativePlace" placeholder="请输入籍贯"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="电子邮箱:" prop="email">
          <el-input disabled size="mini" style="width: 150px" prefix-icon="el-icon-message"
                    v-model="student.email" placeholder="请输入电子邮箱"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="联系地址:" prop="address">
          <el-input disabled size="mini" style="width: 200px" prefix-icon="el-icon-edit"
                    v-model="student.address" placeholder="请输入联系地址"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="身份证号码:" prop="idCard">
          <el-input disabled size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                    v-model="student.idCard" placeholder="请输入身份证号码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="电话号码:" prop="phone">
          <el-input disabled size="mini" style="width: 200px" prefix-icon="el-icon-phone"
                    v-model="student.phone" placeholder="电话号码"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="学号:" prop="studentId">
          <el-input disabled size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                    v-model="student.studentId" placeholder="学号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="学历:" prop="topDegree">
          <el-select v-model="student.topDegree" placeholder="学历" size="mini"
                     style="width: 150px;">
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
          <el-input disabled size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                    v-model="student.school" placeholder="毕业院校名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="所属院系:" prop="departmentId">
          <el-select v-model="student.departmentId" placeholder="院系" size="mini" style="width: 150px;">
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
          <el-select v-model="student.specialtyId" placeholder="专业" size="mini" style="width: 150px;">
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
                     style="width: 150px;">
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
          <el-input disabled size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                    v-model="student.languageLevel" placeholder="请输入外语水平"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="计算机水平:" prop="computerLevel">
          <el-input disabled size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                    v-model="student.computerLevel" placeholder="请输入计算机水平"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="入学日期:" prop="beginDate">
          <el-date-picker
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
    <el-row>
      <el-alert
        center
        close-text="知道了"
        title="基本信息无法修改"
        type="warning"
        description="请前往个人中心修改或者完善信息"
        show-icon>
      </el-alert>
    </el-row>
    <el-row style="text-align: right;margin-top: 10px">
      <el-button type="mini" style="background-color: #FDF6EC" @click="toPersonCenter">前往个人中心</el-button>
    </el-row>
  </el-form>
</template>

<script>
  export default {
    name: "StudentInfo",
    data() {
      return {
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
      }
    },
    mounted() {
      this.initStudentData()
      this.initStudent()
    },
    methods: {
      initStudent() {
        this.$axios.get('/content/student/getOne?userId=' + this.user.id).then(resp => {
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
      },
      toPersonCenter() {
        this.$router.replace('/personCenter')
      }
    }
  }
</script>

<style scoped>

</style>
