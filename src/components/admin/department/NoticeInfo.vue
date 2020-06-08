<template>
  <div style="width: 1500px;margin:0px auto;">
    <el-card shadow="hover">
      <div slot="header">
        <div style="font-size: 22px;font-weight: bold;border-bottom: 1px solid #EBEEF5" v-html="notice.title"></div>
        <div style="margin-top: 10px;font-size: 16px;">
          <el-row>
            <el-col :span="3">
              分类：{{notice.type}}
            </el-col>
            <el-col :span="3">
              发布者：{{notice.publisher}}
            </el-col>
            <el-col :span="11">&nbsp;</el-col>
            <el-col :span="3" style="font-weight: bold;text-align: right">
              <template v-if="notice.eid">
                <a>
                  <i class="el-icon-thumb"></i>
                  <router-link target="_blank"
                               :to="{path:'/infoEnterprise',query:{UT93oOdkwCTY9RnxRwfLCi:notice.eid}}">
                    查看更多企业信息
                  </router-link>
                </a>
              </template>
              <template v-else>
                &nbsp;
              </template>
            </el-col>
            <el-col :span="4" style="text-align: right">
              时间：{{notice.time}}
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-html="notice.content" style="text-align: left"></div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "NoticeInfo",
    data() {
      return {
        noticeId: '',
        notice: '',
      }
    },
    created() {
      this.getNoticeId()
    },
    mounted() {
    },
    methods: {
      getNoticeId() {
        this.noticeId = this.$route.query.k1TfLTxCi9wCwYROd59onR3U
        this.initNotice()
      },
      initNotice() {
        this.$axios.get('/notice?noticeId=' + this.noticeId).then(resp => {
          if (resp.data.code === 200) {
            this.notice = resp.data.data
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-card >>> .el-card__header {
    background-color: #00c2b3 !important;
    color: black;
  }
</style>
