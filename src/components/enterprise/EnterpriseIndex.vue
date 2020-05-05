<template>
  <div style="height: 1800px;">
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
            <el-menu-item index="/enterprise/newResume">新简历（100）</el-menu-item>
            <el-menu-item index="/enterprise/interview">面试（15）</el-menu-item>
            <el-menu-item index="/enterprise/offer">Offer（12）</el-menu-item>
            <el-menu-item index="/enterprise/contract">三方签约（10）</el-menu-item>
            <el-menu-item index="/enterprise/employed">待入职（5）</el-menu-item>
            <el-menu-item index="/enterprise/talentPool">人才储备库（100）</el-menu-item>
            <div style="float: right;line-height: 60px;margin-right: 10px">
              <el-select v-model="selectPositionId" filterable placeholder="按职位查看" size="mini"
                         clearable @change="changePosition">
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
        <el-main style="height: 1600px">
          <router-view/>
        </el-main>
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
        total: 0,
        page: 1,
        size: 10,
        selectPositionId: ''
      }
    },
    mounted() {
      this.initData()
      this.getEnterprise()
    },
    methods: {
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
        let url = '/positions/getByEid?page=' + this.page + '&size=' + this.size + '&eid=' + this.enterprise.id
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
      changePosition() {
        console.log('pid:' + this.selectPositionId)
      }
    }
  }
</script>

<style scoped>
  .el-menu--horizontal > .el-menu-item {
    margin: 0 0 0 60px !important;;
  }
</style>
