<template>
  <div style="height: 700px;">
    <div style="height: 80px;background-color: #444C5F;color: white;">
      <el-row style="line-height: 75px;font-weight: bold">
        <el-col :span="3">&nbsp;</el-col>
        <el-col :span="5" style="font-size: 26px;text-align: left;" @click.native="toEnterprise">{{enterprise.name}}
        </el-col>
        <el-col :span="7">&nbsp;</el-col>
        <el-col :span="4" style="text-align: right">
          <el-button type="primary" size="mini" @click="addPosition">发布职位</el-button>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="4" style="text-align: left">
          <el-button type="primary" size="mini" @click="toEnterprise">查看本企业详情</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-container>
        <el-header style="padding: 0!important;margin-top: 8px;">
          <el-menu
            :default-active="$route.path"
            router
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="/enterprise/newResume"
                          @click="alterCurrentStateVos(1)">新简历（{{currentStateVos1.length}}）
            </el-menu-item>
            <el-menu-item index="/enterprise/interview"
                          @click="alterCurrentStateVos(2)">面试中（{{currentStateVos2.length}}）
            </el-menu-item>
            <el-menu-item index="/enterprise/offer"
                          @click="alterCurrentStateVos(3)">Offer沟通中（{{currentStateVos3.length}}）
            </el-menu-item>
            <el-menu-item index="/enterprise/contract"
                          @click="alterCurrentStateVos(4)">三方签约中（{{currentStateVos4.length}}）
            </el-menu-item>
            <el-menu-item index="/enterprise/employed"
                          @click="alterCurrentStateVos(5)">待入职（{{currentStateVos5.length}}）
            </el-menu-item>
            <el-menu-item index="/enterprise/talentPool"
                          @click="alterCurrentStateVos(6)">人才储备库（{{currentStateVos6.length}}）
            </el-menu-item>
            <div style="float: right;line-height: 60px;margin-right: 10px">
              <el-select v-model="selectedPositionId" filterable placeholder="按职位查看" size="mini"
                         @change="getAllStateCurrentPostionsVos"
                         clearable>
                <el-option
                  v-for="item in positions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </el-menu>
        </el-header>
        <el-container>
          <el-aside width="300px">
            <el-table
              ref="voTableRef"
              :data="currentStateVos"
              @row-click="selectRow"
              @current-change="currentRow"
              border
              highlight-current-row
              max-height="1000px"
              style="width: 100%;margin-top: 20px">
              <el-table-column
                type="index"
                align="center"
                sortable
                width="30px"
                :index="indexMethod">
              </el-table-column>
              <el-table-column
                prop="student.name"
                align="center"
                label="姓名"
                sortable
                width="90px">
              </el-table-column>
              <el-table-column
                prop="positions.name"
                align="center"
                label="职位"
                sortable
                width="180px">
              </el-table-column>
            </el-table>
          </el-aside>
          <el-main>
            <el-row style="margin-bottom: 8px">
              <el-col :span="12" style="text-align: left">
                <template v-if="currentSate === 1">
                  <el-button class="common_font_size" size="mini"
                             style="background-color: #E6A23C;color: white"
                             icon="el-icon-arrow-left" @click="eliminate(1)">淘汰
                  </el-button>
                </template>
                <template v-if="currentSate === 2">
                  <el-button class="common_font_size" size="mini"
                             style="background-color: #E6A23C;color: white"
                             icon="el-icon-arrow-left" @click="eliminate(2)">淘汰
                  </el-button>
                </template>
                <template v-if="currentSate === 3">
                  <el-button class="common_font_size" size="mini"
                             style="background-color: #E6A23C;color: white"
                             icon="el-icon-arrow-left" @click="eliminate(3)">淘汰
                  </el-button>
                </template>
                <template v-if="currentSate === 4">
                  <el-button class="common_font_size" size="mini"
                             style="background-color: #E6A23C;color: white"
                             icon="el-icon-arrow-left" @click="eliminate(4)">淘汰
                  </el-button>
                </template>
                <template v-if="currentSate === 5">
                  <el-button class="common_font_size" size="mini"
                             style="background-color: #E6A23C;color: white"
                             icon="el-icon-arrow-left" @click="eliminate(5)">淘汰
                  </el-button>
                </template>
                <template v-if="currentSate === 6">
                  <el-button class="common_font_size" size="mini"
                             style="background-color: #67C23A;color: white"
                             icon="el-icon-arrow-left" @click="moveToNewResume">移至新简历
                  </el-button>
                </template>
              </el-col>
              <el-col :span="12" style="text-align: right">
                <template v-if="currentSate === 1">
                  <el-button class="common_font_size" size="mini" style="background-color: #67C23A;
                        color: white" @click="inviteInterview">邀请面试
                    <i class="el-icon-arrow-right el-icon--right"></i>
                  </el-button>
                </template>
                <template v-if="currentSate === 2">
                  <el-button class="common_font_size" size="mini" style="background-color: #67C23A;
                        color: white" @click="offerCommunicate">offer沟通
                    <i class="el-icon-arrow-right el-icon--right"></i>
                  </el-button>
                </template>
                <template v-if="currentSate === 3">
                  <el-button class="common_font_size" size="mini" style="background-color: #67C23A;
                        color: white" @click="applyTriple">申请三方
                    <i class="el-icon-arrow-right el-icon--right"></i>
                  </el-button>
                </template>
                <template v-if="currentSate === 4">
                  <el-button class="common_font_size" size="mini" style="background-color: #67C23A;
                        color: white" @click="confirmContract">确定签约
                    <i class="el-icon-arrow-right el-icon--right"></i>
                  </el-button>
                </template>
                <template v-if="currentSate === 6">
                  <el-button class="common_font_size" size="mini" style="background-color: #F56C6C;
                        color: white" @click="deleteResume">永久删除
                    <i class="el-icon-arrow-right el-icon--right"></i>
                  </el-button>
                </template>
              </el-col>
            </el-row>
            <router-view :index="index"/>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <div>
      <el-dialog
        title="填写职位信息"
        :visible.sync="dialogVisible"
        width="80%">
        <el-row>
          <el-col :span="2">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-plus"
              @click="addTab(editableTabsValue)">
              增加职位
            </el-button>
          </el-col>
          <el-col :span="2" style="margin-left: 10px">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-minus"
              @click="removeTab(editableTabsValue)">
              移出职位
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-tabs v-model="editableTabsValue" type="card" style="margin-top: 20px">
            <el-tab-pane class="tab" v-for="(item, index) in editableTabs" :key="item.name" :label="item.title"
                         :name="item.name">
              <position-item v-bind:positionId=-1></position-item>
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import PositionItem from "./PositionItem";

  let positionItem = PositionItem
  export default {
    name: "enterprise",
    components: {PositionItem},
    data() {
      return {
        user: this.$store.state.user,
        dialogVisible: false,
        editableTabsValue: '1',
        editableTabs: [{
          title: '新职位',
          name: '1',
          content: ''
        }],
        tabIndex: 1,
        enterprise: {
          id: ''
        },
        salaries: [],
        degrees: [],
        experiences: [],
        natures: [],
        scales: [],
        positions: [],
        finances: [],
        levels: [],
        selectedPositionId: '',
        index: '',
        userPostionsResumeVos: [],
        allStateCurrentPostionsVos: [],
        currentStateVos: [],
        currentStateVos1: [],
        currentStateVos2: [],
        currentStateVos3: [],
        currentStateVos4: [],
        currentStateVos5: [],
        currentStateVos6: [],
        currentSate: '',
        currentIndex: '',
        currentVo: {
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
    mounted() {
      this.initData()
      this.getEnterprise()
      this.getUserPostionsResumeVos()
    },
    methods: {
      activeCurrentSate() {
        let path = this.$route.path;
        if (path.startsWith('/enterprise/newResume')) {
          this.currentSate = 1
          this.alterCurrentStateVos(1)
        } else if (path.startsWith('/enterprise/interview')) {
          this.currentSate = 2
          this.alterCurrentStateVos(2)
        } else if (path.startsWith('/enterprise/offer')) {
          this.currentSate = 3
          this.alterCurrentStateVos(3)
        } else if (path.startsWith('/enterprise/contract')) {
          this.currentSate = 4
          this.alterCurrentStateVos(4)
        } else if (path.startsWith('/enterprise/employed')) {
          this.currentSate = 5
          this.alterCurrentStateVos(5)
        } else if (path.startsWith('/enterprise/talentPool')) {
          this.currentSate = 6
          this.alterCurrentStateVos(6)
        }
      },
      addPosition() {
        this.dialogVisible = true
      },
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: '新职位',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },
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
      getEnterprise() {
        this.$axios.get('/enterprise/getOne?userId=' + this.$store.state.user.id).then(resp => {
          if (resp.data.code === 200) {
            this.enterprise = resp.data.data;
            window.sessionStorage.setItem("enterprise", JSON.stringify(this.enterprise))
            this.getPositions()
          }
        })
      },
      getPositions() {
        let url = '/positions/getAllByUid?userId=' + this.$store.state.user.id
        this.$axios.get(url).then(resp => {
          if (resp.data.code === 200) {
            this.positions = resp.data.data;
          }
        })
      },
      toEnterprise() {
        const {href} = this.$router.resolve({
          path: '/infoEnterprise',
          //传参
          query: {
            UT93oOdkwCTY9RnxRwfLCi: this.enterprise.id
          }
        })
        window.open(href, '_blank')
      },
      getUserPostionsResumeVos() {
        this.$axios.get('/resume/getUserPostionsResumeVos?userId=' + this.user.id).then(resp => {
          if (resp.data.code === 200) {
            this.userPostionsResumeVos = resp.data.data
            this.getAllStateCurrentPostionsVos()
            this.activeCurrentSate()
          }
        })
      },
      getAllStateCurrentPostionsVos() {
        // console.log(this.selectedPositionId)
        //根据选中的职位id，过滤出当前allStateCurrentPostionsVos数组
        this.allStateCurrentPostionsVos = []

        //未选中职位下，显示所有职位的数组元素
        if (this.selectedPositionId === '') {
          this.allStateCurrentPostionsVos = this.userPostionsResumeVos
        } else {
          this.userPostionsResumeVos.forEach((vo, index) => {
            if (vo.positions.id === this.selectedPositionId) {
              this.allStateCurrentPostionsVos.push(vo)
            }
          })
        }
        //根据简历状态划分状态数目的数组
        this.classifyCurrentStateVos()
      },
      alterCurrentStateVos(stateId) {
        //根据简历状态选择当前表格的数据，并更改操作简历按钮
        switch (stateId) {
          case 1:
            this.currentStateVos = this.currentStateVos1;
            this.currentSate = 1;
            break;
          case 2:
            this.currentStateVos = this.currentStateVos2;
            this.currentSate = 2;
            break;
          case 3:
            this.currentStateVos = this.currentStateVos3;
            this.currentSate = 3;
            break;
          case 4:
            this.currentStateVos = this.currentStateVos4;
            this.currentSate = 4;
            break;
          case 5:
            this.currentStateVos = this.currentStateVos5;
            this.currentSate = 5;
            break;
          case 6:
            this.currentStateVos = this.currentStateVos6;
            this.currentSate = 6;
            break;
        }
        this.setCurrent(0)
      },
      classifyCurrentStateVos() {
        //根据简历状态划分状态数目的数组
        this.allStateCurrentPostionsVos.forEach((vo, index) => {
          let stateId = vo.resume.stateId;
          switch (stateId) {
            case 1:
              this.currentStateVos1.push(vo);
              break;
            case 2:
              this.currentStateVos2.push(vo);
              break;
            case 3:
              this.currentStateVos3.push(vo);
              break;
            case 4:
              this.currentStateVos4.push(vo);
              break;
            case 5:
              this.currentStateVos5.push(vo);
              break;
            case 6:
              this.currentStateVos6.push(vo);
              break;
          }
        })
      },
      indexMethod(index) {
        return index++
      },
      getCurrentIndex() {
        //获取当前currentVo所在的当前状态数组中位置的下标
        for (let i = 0; i < this.currentStateVos.length; i++) {
          if (this.currentStateVos[i].index === this.currentVo.index) {
            this.currentIndex = i
            break
          }
        }
      },
      selectRow(row, column, event) {
        this.index = row.index
      },
      currentRow(currentRow, oldCurrentRow) {
        if (currentRow === null) {
          return
        }
        this.currentVo = currentRow
        this.getCurrentIndex()
        window.sessionStorage.setItem("currentVo", JSON.stringify(this.currentVo))
        this.index = currentRow.index
        // console.log('行号:' + this.currentIndex + '---id:' + this.currentVo.index + '-' + this.currentVo.student.name + '-' + this.currentVo.positions.name)
      },
      setCurrent(currentIndex) {
        this.currentIndex = currentIndex
        if (this.currentStateVos.length > 0) {
          this.$refs['voTableRef'].setCurrentRow(this.currentStateVos[currentIndex])
        }
      },
      nextCurrent() {
        if (this.currentStateVos.length == 0) {
          return
        }
        this.setCurrent(this.currentIndex)
      },
      eliminate(stateId) {
        this.$axios.put('/resume/state?rid=' + this.currentVo.resume.id +
          '&pid=' + this.currentVo.positions.id +
          '&stateId=' + 6).then(resp => {
          if (resp.data.code === 200) {
            this.$notify({message: '移入人才库成功', type: 'success'})
            //本地处理数据，避免重新请求
            switch (stateId) {
              case 1:
                this.currentStateVos6.push(this.currentStateVos1[this.currentIndex]);
                this.currentStateVos1.splice(this.currentIndex, 1);
                this.currentStateVos = this.currentStateVos1;
                break;
              case 2:
                this.currentStateVos6.push(this.currentStateVos2[this.currentIndex]);
                this.currentStateVos2.splice(this.currentIndex, 1);
                this.currentStateVos = this.currentStateVos2;
                break;
              case 3:
                this.currentStateVos6.push(this.currentStateVos3[this.currentIndex]);
                this.currentStateVos3.splice(this.currentIndex, 1);
                this.currentStateVos = this.currentStateVos3;
                break;
              case 4:
                this.currentStateVos6.push(this.currentStateVos4[this.currentIndex]);
                this.currentStateVos4.splice(this.currentIndex, 1);
                this.currentStateVos = this.currentStateVos4;
                break;
              case 5:
                this.currentStateVos6.push(this.currentStateVos5[this.currentIndex]);
                this.currentStateVos5.splice(this.currentIndex, 1);
                this.currentStateVos = this.currentStateVos5;
                break;
            }
            this.nextCurrent()
          }
        })
      },
      inviteInterview() {
        this.$axios.put('/resume/state?rid=' + this.currentVo.resume.id +
          '&pid=' + this.currentVo.positions.id +
          '&stateId=' + 2).then(resp => {
          if (resp.data.code === 200) {
            this.$notify({message: '邀请面试成功', type: 'success'})
            //本地处理数据，避免重新请求
            this.currentStateVos2.push(this.currentStateVos1[this.currentIndex])
            this.currentStateVos1.splice(this.currentIndex, 1)
            this.currentStateVos = this.currentStateVos1
            this.nextCurrent()
          }
        })
      },
      offerCommunicate() {
        this.$axios.put('/resume/state?rid=' + this.currentVo.resume.id +
          '&pid=' + this.currentVo.positions.id +
          '&stateId=' + 3).then(resp => {
          if (resp.data.code === 200) {
            this.$notify({message: '开始offer沟通', type: 'success'})
            //本地处理数据，避免重新请求
            this.currentStateVos3.push(this.currentStateVos2[this.currentIndex])
            this.currentStateVos2.splice(this.currentIndex, 1)
            this.currentStateVos = this.currentStateVos2
            this.nextCurrent()
          }
        })
      },
      applyTriple() {
        this.$axios.put('/resume/state?rid=' + this.currentVo.resume.id +
          '&pid=' + this.currentVo.positions.id +
          '&stateId=' + 4).then(resp => {
          if (resp.data.code === 200) {
            this.$notify({message: '申请成功，请等待回复', type: 'success'})
            //本地处理数据，避免重新请求
            this.currentStateVos4.push(this.currentStateVos3[this.currentIndex])
            this.currentStateVos3.splice(this.currentIndex, 1)
            this.currentStateVos = this.currentStateVos3
            this.nextCurrent()
          }
        })
      },
      confirmContract() {
        this.$axios.put('/resume/state?rid=' + this.currentVo.resume.id +
          '&pid=' + this.currentVo.positions.id +
          '&stateId=' + 5).then(resp => {
          if (resp.data.code === 200) {
            this.$notify({message: '签约成功', type: 'success'})
            //本地处理数据，避免重新请求
            this.currentStateVos5.push(this.currentStateVos4[this.currentIndex])
            this.currentStateVos4.splice(this.currentIndex, 1)
            this.currentStateVos = this.currentStateVos4
            this.nextCurrent()
          }
        })
      },
      deleteResume() {
        this.$axios.delete('/resume/state/delete?rid=' + this.currentVo.resume.id +
          '&pid=' + this.currentVo.positions.id).then(resp => {
          if (resp.data.code === 200) {
            this.$notify({message: '永久删除成功', type: 'success'})
            //本地处理数据，避免重新请求
            this.currentStateVos6.splice(this.currentIndex, 1)
            this.currentStateVos = this.currentStateVos6
            this.nextCurrent()
          }
        })
      },
      moveToNewResume() {
        this.$axios.put('/resume/state?rid=' + this.currentVo.resume.id +
          '&pid=' + this.currentVo.positions.id +
          '&stateId=' + 1).then(resp => {
          if (resp.data.code === 200) {
            this.$notify({message: '移至新简历成功', type: 'success'})
            //本地处理数据，避免重新请求
            this.currentStateVos1.push(this.currentStateVos6[this.currentIndex])
            this.currentStateVos6.splice(this.currentIndex, 1)
            this.currentStateVos = this.currentStateVos6
            this.nextCurrent()
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-menu--horizontal > .el-menu-item {
    margin: 0 0 0 60px !important;;
  }
</style>
