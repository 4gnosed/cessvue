<template>
  <div>
    <el-card shadow="hover">
      <el-table
        :data="userEnterpriseVos"
        stripe
        border
        highlight-current-row="highlight-current-row"
        v-loading="loading"
        element-loading-text="正在加载..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="RGB(239,239,239)"
        style="width: 100%" enabled
        height="700px"
        class="common_font_size">
        <el-table-column
          label="用户信息"
          align="left">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="user.username"
            label="用户名"
            width="100px"
            sortable
            fit>
          </el-table-column>
          <el-table-column
            prop="user.lastLogin"
            label="上次登录时间"
            width="170"
            show-overflow-tooltip
            sortable
            fit>
          </el-table-column>
        </el-table-column>
        <el-table-column
          align="left"
          label="企业信息">
          <el-table-column
            prop="enterprise.name"
            label="企业名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="enterprise.talkDate"
            label="宣讲日期"
            width="120">
          </el-table-column>
          <el-table-column
            prop="enterprise.talkTime.name"
            label="宣讲时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="enterprise.industry"
            label="所属行业"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            prop="enterprise.nature"
            label="企业性质"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            prop="enterprise.state"
            width="110"
            sortable
            :formatter="stateFormat"
            label="经营状态">
          </el-table-column>
          <el-table-column
            prop="enterprise.scope"
            width="170"
            sortable
            label="经营范围">
          </el-table-column>
          <el-table-column
            prop="enterprise.finance.name"
            width="120"
            sortable
            label="融资阶段">
          </el-table-column>
          <el-table-column
            prop="enterprise.scale.name"
            width="110"
            sortable
            label="企业规模">
          </el-table-column>
          <el-table-column
            prop="enterprise.address"
            width="200"
            sortable
            label="企业地址">
          </el-table-column>
          <el-table-column
            prop="enterprise.phone"
            width="110"
            sortable
            label="电话号码">
          </el-table-column>
          <el-table-column
            prop="enterprise.email"
            width="170"
            align="left"
            sortable
            label="电子邮件">
          </el-table-column>
          <el-table-column
            prop="enterprise.boss"
            width="120"
            sortable
            label="法人代表">
          </el-table-column>
          <el-table-column
            prop="enterprise.website"
            width="160"
            sortable
            label="企业官网">
          </el-table-column>
          <el-table-column
            prop="enterprise.introduction"
            width="300"
            sortable
            label="企业简介">
          </el-table-column>
          <el-table-column
            prop="enterprise.product"
            width="300"
            sortable
            label="产品介绍">
          </el-table-column>
          <el-table-column
            prop="enterprise.honor"
            width="300"
            sortable
            label="企业荣誉">
          </el-table-column>
          <el-table-column
            prop="enterprise.culture"
            width="300"
            sortable
            label="企业文化">
          </el-table-column>
          <el-table-column
            prop="enterprise.expectation"
            width="300"
            sortable
            label="企业展望">
          </el-table-column>
          <el-table-column
            prop="enterprise.welfare"
            width="200"
            sortable
            label="福利">
          </el-table-column>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="80"
          label="审核状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="(value) => commitStatusChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="130"
          sortable
          align="center"
          label="安排宣讲地点">
          <template slot-scope="scope">
            <template v-if="scope.row.enterprise.place.name === null">
              <el-button round class="common_font_size" size="mini" type="primary" @click="distributePlace(scope.row)">
                未安排
              </el-button>
            </template>
            <template v-else>
              {{scope.row.enterprise.place.name}}
            </template>
          </template>
        </el-table-column>
      </el-table>
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
    <el-dialog
      :visible.sync="placeDialogVisible"
      width="80%">
      <div slot="title">
        安排[<span style="font-weight: bold">{{this.selectedEnterprise.name}}</span>]宣讲会地点
        <br/><br/>
        时间：{{this.selectedEnterprise.talkDate}}&nbsp;&nbsp;&nbsp;&nbsp;{{this.selectedEnterprise.talkTime.name}}
      </div>
      <div>
        <el-table
          :data="placeList"
          border
          highlight-current-row="highlight-current-row"
          height="400px">
          <el-table-column
            type="index"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            sortable
            label="地点"
            align="center">
          </el-table-column>
          <el-table-column
            label="时间段"
            align="center">
            <el-table-column
              align="center"
              width="170px"
              label="8:00-10:00">
              <template slot-scope="scope">
                <template v-if="scope.row.time1">
                  <el-switch
                    active-text="已占用"
                    inactive-text="未占用"
                    active-color="#E6A23C"
                    inactive-color="#13ce66"
                    v-model="scope.row.time1"
                    @change="(value) => changeTalkTime(scope.row,1)">
                    >
                  </el-switch>
                </template>
                <template v-else>
                  <el-switch
                    active-text="已占用"
                    inactive-text="未占用"
                    active-color="#E6A23C"
                    inactive-color="#13ce66"
                    v-model="scope.row.time1"
                    @change="(value) => changeTalkTime(scope.row,1)">
                    >
                  </el-switch>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="170px"
              label="10:00-12:00">
              <template slot-scope="scope">
                <template v-if="scope.row.time2">
                  <el-switch
                    disabled
                    active-text="已占用"
                    inactive-text="未占用"
                    active-color="#E6A23C"
                    inactive-color="#13ce66"
                    v-model="scope.row.time2"
                    @change="(value) => changeTalkTime(scope.row,2)">
                    >
                  </el-switch>
                </template>
                <template v-else>
                  <el-switch
                    active-text="已占用"
                    inactive-text="未占用"
                    active-color="#E6A23C"
                    inactive-color="#13ce66"
                    v-model="scope.row.time2"
                    @change="(value) => changeTalkTime(scope.row,2)">
                    >
                  </el-switch>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="170px"
              label="14:00-16:00">
              <template slot-scope="scope">
                <template v-if="scope.row.time3">
                  <el-switch
                    disabled
                    active-text="已占用"
                    inactive-text="未占用"
                    active-color="#E6A23C"
                    inactive-color="#13ce66"
                    v-model="scope.row.time3"
                    @change="(value) => changeTalkTime(scope.row,3)">
                    >
                  </el-switch>
                </template>
                <template v-else>
                  <el-switch
                    active-text="已占用"
                    inactive-text="未占用"
                    active-color="#E6A23C"
                    inactive-color="#13ce66"
                    v-model="scope.row.time3"
                    @change="(value) => changeTalkTime(scope.row,3)">
                    >
                  </el-switch>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="170px"
              label="16:00-18:00">
              <template slot-scope="scope">
                <template v-if="scope.row.time4">
                  <el-switch
                    disabled
                    active-text="已占用"
                    inactive-text="未占用"
                    active-color="#E6A23C"
                    inactive-color="#13ce66"
                    v-model="scope.row.time4"
                    @change="(value) => changeTalkTime(scope.row,4)">
                    >
                  </el-switch>
                </template>
                <template v-else>
                  <el-switch
                    active-text="已占用"
                    inactive-text="未占用"
                    active-color="#E6A23C"
                    inactive-color="#13ce66"
                    v-model="scope.row.time4"
                    @change="(value) => changeTalkTime(scope.row,4)">
                    >
                  </el-switch>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="170px"
              label="19:00-21:00">
              <template slot-scope="scope">
                <template v-if="scope.row.time5">
                  <el-switch
                    disabled
                    active-text="已占用"
                    inactive-text="未占用"
                    active-color="#E6A23C"
                    inactive-color="#13ce66"
                    v-model="scope.row.time5"
                    @change="(value) => changeTalkTime(scope.row,5)">
                    >
                  </el-switch>
                </template>
                <template v-else>
                  <el-switch
                    active-text="已占用"
                    inactive-text="未占用"
                    active-color="#E6A23C"
                    inactive-color="#13ce66"
                    v-model="scope.row.time5"
                    @change="(value) => changeTalkTime(scope.row,5)">
                    >
                  </el-switch>
                </template>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "CheckEnterprise",
    data() {
      return {
        userEnterpriseVos: [],
        total: 0,
        page: 1,
        size: 10,
        nations: [],
        department: [],
        specialty: [],
        position: [],
        politics: [],
        loading: false,
        placeDialogVisible: false,
        selectedEnterprise: {
          talkDate: '',
          talkTime: '',
          place: {
            name: ''
          }
        },
        placeList: []
      }
    },
    mounted() {
      this.initUserEnterpriseVos()
    },
    methods: {
      initUserEnterpriseVos() {
        this.loading = true
        this.$axios.get('/userEnterprise?page=' + this.page + '&size=' + this.size).then(resp => {
          if (resp.data.code === 200) {
            this.userEnterpriseVos = resp.data.data.data
            this.total = resp.data.data.total;
            this.loading = false
          }
        })
      },
      sizeChange(currentSize) {
        this.size = currentSize;
        this.initUserEnterpriseVos();
      },
      currentChange(currentPage) {
        this.page = currentPage;
        this.initUserEnterpriseVos();
      },
      commitStatusChange(userEnterprise) {
        let value = userEnterprise.enabled
        //审核之前安排宣讲会地点
        if (userEnterprise.enterprise.place.name === null) {
          this.$notify({
            message: '请先安排宣讲会地点',
            type: 'warning'
          })
          userEnterprise.enabled = false
          return
        }
        this.$axios.put('/userEnterprise/status?enabled=' + value + '&id=' + userEnterprise.id).then(resp => {
          if (resp && resp.data.code === 200) {
            let msg = '设置用户 [' + userEnterprise.user.username + '] , 企业 [' + userEnterprise.enterprise.name + ']'
            if (value) {
              this.$notify({
                message: msg + '审核通过,已通知该企业',
                type: 'success'
              })
            } else {
              this.$notify({
                message: msg + '审核不通过,已通知该企业',
                type: 'warning'
              })
            }
          } else {
            this.$notify({
              message: msg + ' 设置失败',
              type: 'error'
            })
          }
        })
      },
      stateFormat(row, column, cellValue) {
        if (cellValue) {
          return '经营中'
        } else {
          return '已关闭'
        }
      },
      distributePlace(userEnterprise) {
        let msg = '设置用户 [' + userEnterprise.user.username + '] , 企业 [' + userEnterprise.enterprise.name + ']'
        this.placeDialogVisible = true
        this.selectedEnterprise = userEnterprise.enterprise
        //获取所有地点，并结合该企业宣讲日期，判断当天被占用的时间段
        this.$axios.get('/place?talkDate=' + this.selectedEnterprise.talkDate).then(resp => {
          if (resp.data.code === 200) {
            this.placeList = resp.data.data
          }
        })
      },
      changeTalkTime(place, time) {
        let talkTimeId = 0
        if (time === 1) {
          talkTimeId = 1
        } else if (time === 2) {
          talkTimeId = 2
        } else if (time === 3) {
          talkTimeId = 3
        } else if (time === 4) {
          talkTimeId = 4
        } else if (time === 5) {
          talkTimeId = 5
        }
        this.$axios.post('/enterprisePlace?eid=' + this.selectedEnterprise.id +
          '&pid=' + place.id + '&talkTimeId=' + talkTimeId).then(resp => {
          if (resp.data.code === 200) {
            this.$notify({
              message: '安排成功，请尽快审核',
              type: 'success'
            })
            this.selectedEnterprise.place.name = place.name
          } else {
            this.$notify({
              message: resp.data.message,
              type: 'error'
            })
          }
          this.placeDialogVisible = false
        })
      },
    }
  }
</script>

<style scoped>

</style>
