<template>
  <div>
    <div style="margin-top: 10px">
      <el-table
        :data="userEnterpriseVos"
        stripe
        border
        highlight-current-row="highlight-current-row"
        v-loading="loading"
        element-loading-text="正在加载..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="RGB(239,239,239)"
        style="width: 100%"
        class="common_font_size">
        <el-table-column
          label="用户信息"
          align="center">
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
          align="center"
          label="企业信息">
          <el-table-column
            prop="enterprise.name"
            align="left"
            label="企业名称"
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
          width="200"
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
    </div>
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
        this.$axios.put('/userEnterprise/status?enabled=' + value + '&id=' + userEnterprise.id).then(resp => {
          if (resp && resp.data.code === 200) {
            let msg = '设置用户 [' + userEnterprise.user.username + '] , 企业 [' + userEnterprise.enterprise.name + ']'
            this.$notify({
              message: msg + '审核通过',
              type: 'success'
            })
          } else {
            this.$notify({
              message: msg + ' 审核不通过',
              type: 'success'
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
      }
    }
  }
</script>

<style scoped>

</style>
