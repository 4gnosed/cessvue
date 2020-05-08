<template>
  <div>
    <div>
      <el-collapse v-model="activeItem">
        <el-collapse-item name="interview">
          <div slot="title" style="width: 100%;font-size: 20px;">
            <el-row>
              <el-col :span="8">&nbsp;</el-col>
              <el-col :span="8">
                <i class="header-icon el-icon-s-management"></i>
                &nbsp;面 试 概 况
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
          </div>
          <div style="font-size: 18px">
            <el-row>
              <el-col :span="8">&nbsp;</el-col>
              <el-col :span="8" style="text-align: left">
                {{userPostionsResumeVo.student.name}}（应聘：{{userPostionsResumeVo.positions.name}}）
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
            <el-row>
              <el-col :span="8">&nbsp;</el-col>
              <el-col :span="8" style="text-align: left">
                笔试分数：
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
            <el-row>
              <el-col :span="8">&nbsp;</el-col>
              <el-col :span="8" style="text-align: left">
                面试分数：
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row>
              <el-col :span="8">&nbsp;</el-col>
              <el-col :span="8" style="text-align: left">
                面试简评：
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="preview">
          <div slot="title" style="width: 100%;font-size: 20px;">
            <el-row>
              <el-col :span="8">&nbsp;</el-col>
              <el-col :span="8">
                <i class="header-icon el-icon-view"></i>
                &nbsp;简 历 预 览
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
          </div>
          <div style="font-size: 18px">
            <el-row>
              <el-col :span="8">&nbsp;</el-col>
              <el-col :span="8" style="text-align: left">
                {{userPostionsResumeVo.student.name}}（应聘：{{userPostionsResumeVo.positions.name}}）
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
            <el-row>
              <el-col :span="8">&nbsp;</el-col>
              <el-col :span="8" style="text-align: left">{{userPostionsResumeVo.student.school}}&nbsp;&nbsp;/&nbsp;&nbsp;{{userPostionsResumeVo.student.topDegree}}
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
            <el-row>
              <el-col :span="8">&nbsp;</el-col>
              <el-col :span="5" style="text-align: left">邮箱：{{userPostionsResumeVo.student.email}}
              </el-col>
              <el-col :span="5" style="text-align: left">手机号码：{{userPostionsResumeVo.student.phone}}
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="detail">
          <div slot="title" style="width: 100%;font-size: 20px;">
            <el-row>
              <el-col :span="8">&nbsp;</el-col>
              <el-col :span="8">
                <i class="header-icon el-icon-document"></i>
                &nbsp;简 历 详 情
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
          </div>
          <div>
            <!--            <resume v-bind:userId="userPostionsResumeVo.user.id.toString()"></resume>-->
            <resume ref="resumeRef"></resume>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>

  import Resume from "../student/Resume";

  export default {
    name: "TalentPool",
    props: ['index'],
    components: {Resume},
    watch: {
      index: function (index) {
        if (index === null) {
          return
        }
        this.userPostionsResumeVo = ''
        this.userPostionsResumeVo = JSON.parse(window.sessionStorage.getItem("currentVo"));
        this.initResume()
      }
    },
    mounted() {
      this.getUserPostionsResumeVo()
    },
    data() {
      return {
        activeItem: 'interview',
        userPostionsResumeVo: {
          index: '',
          user: {
            id: '',
            username: '',
            password: '',
            salt: '',
            lastLogin: '',
            enabled: '',
            name: '',
            phone: '',
            email: '',
            roleId: '',
            role: '',
            rememberMe: '',
          },
          student: {
            userId: '',
            id: '',
            studentId: '',
            name: '',
            gender: '',
            birthday: '',
            idCard: '',
            nationId: '',
            nation: '',
            nativePlace: '',
            politicId: '',
            politics: '',
            email: '',
            phone: '',
            address: '',
            topDegree: '',
            school: '',
            departmentId: '',
            department: '',
            specialtyId: '',
            specialty: '',
            positionId: '',
            position: '',
            languageLevel: '',
            computerLevel: '',
            beginDate: '',
            endDate: '',
          },
          resume: {
            stateId: '',
            id: '',
            selfEvaluation: '',
            remark: '',
            avatarPath: '',
            filePath: '',
            experienceCertificateList: '',
            id: '',
            getDate: '',
            name: '',
            result: '',
            description: '',
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
              responsibility: '',
            },
            experienceSkillList: {
              id: '',
              name: '',
              levelId: '',
            },
            experienceTrain: {
              id: '',
              beginDate: '',
              endDate: '',
              organization: '',
              address: '',
              certificate: '',
              description: '',
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
              description: '',
            },
            fileUrlVo: {
              ipPort: '',
              filePath: '',
              path: '',
              fileName: '',
            }
          },
          positions: {
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
            updateTime: '',
            enabled: '',
          }
        }
      }
    },
    methods: {
      getUserPostionsResumeVo() {
        this.userPostionsResumeVo = ''
        this.userPostionsResumeVo = JSON.parse(window.sessionStorage.getItem("currentVo"));
        this.initResume()
      },
      initResume() {
        this.$refs['resumeRef'].getUserId(this.userPostionsResumeVo.user.id)
        // console.log('传参：' + this.userPostionsResumeVo.user.id)
      }
    }
  }
</script>

<style scoped>
  .el-table {
    background-color: #545c64;
  }
</style>

