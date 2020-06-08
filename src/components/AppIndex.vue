<template>
  <div>
    <div>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item style="background-color: transparent">
          <img src="http://192.168.0.109:8443/api/file/img/1.jpg"/>
        </el-carousel-item>
        <el-carousel-item style="background-color: transparent">
          <img src="http://192.168.0.109:8443/api/file/img/2.jpg"/>
        </el-carousel-item>
        <el-carousel-item style="background-color: transparent">
          <img src="http://192.168.0.109:8443/api/file/img/3.jpg"/>
        </el-carousel-item>
        <el-carousel-item style="background-color: transparent">
          <img src="http://192.168.0.109:8443/api/file/img/4.jpg"/>
        </el-carousel-item>
        <el-carousel-item style="background-color: transparent">
          <img src="http://192.168.0.109:8443/api/file/img/5.jpg"/>
        </el-carousel-item>
        <el-carousel-item style="background-color: transparent">
          <img src="http://192.168.0.109:8443/api/file/img/6.jpg"/>
        </el-carousel-item>
        <el-carousel-item style="background-color: transparent">
          <img src="http://192.168.0.109:8443/api/file/img/7.jpg"/>
        </el-carousel-item>
        <el-carousel-item style="background-color: transparent">
          <img src="http://192.168.0.109:8443/api/file/img/8.jpg"/>
        </el-carousel-item>
        <el-carousel-item style="background-color: transparent">
          <img src="http://192.168.0.109:8443/api/file/img/9.jpg"/>
        </el-carousel-item>
        <el-carousel-item style="background-color: transparent">
          <img src="http://192.168.0.109:8443/api/file/img/10.jpg"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-card shadow="hover" style="margin-top: 5px">
      <div slot="header">
        <el-row>
          <el-col :span="6" :push="1">
            <div
              :class="active3 === 0?'notice_title1':'notice_title2'"
              @mouseover="mouseOver3"
              @click="changeNotice(1)">招 聘 信 息
            </div>
          </el-col>
          <el-col :span="6">
            <div
              :class="active4 === 0?'notice_title1':'notice_title2'"
              @mouseover="mouseOver4"
              @click="changeNotice(2)">公 告 公 示
            </div>
          </el-col>
          <el-col :span="6" :push="1">
            <div
              :class="active5 === 0?'notice_title1':'notice_title2'"
              @mouseover="mouseOver5"
              @click="changeNotice(3)">就 业 指 导
            </div>
          </el-col>
          <el-col :span="6">
            <div
              :class="active6 === 0?'notice_title1':'notice_title2'"
              @mouseover="mouseOver6"
              @click="changeNotice(4)">就 业 政 策
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col v-if="active3 === 1 && active4 === 0" :span="11" style="text-align: left">
          <div style="height: 500px">
            <div v-for="(notice,index) in enterpriseNoticeList"
                 :class="active1 === index?'smart_index':'a_white'"
                 @mouseover="mouseOver1(index)" @mouseleave="mouseLeave1(index)"
                 @click=" toNoticeInfo(notice.id)">
              <el-row>
                <el-col :span="3">
                  <template v-if=" Date.parse(getDate(notice.time)) + 2*1000 * 60 * 60 *24  >= new Date() ">
                    <el-badge value="new">
                      <el-avatar :class="active1 === index?'a_white':'smart_index'" style="font-size: 14px;">
                        {{notice.time | timeEllipsis}}
                      </el-avatar>
                    </el-badge>
                  </template>
                  <template v-else>
                    <el-avatar :class="active1 === index?'a_white':'smart_index'" style="font-size: 14px;">
                      {{notice.time | timeEllipsis}}
                    </el-avatar>
                  </template>
                </el-col>
                <el-col :span="21" style="margin-top: 10px">
                  {{notice.title | titleEllipsis }}
                </el-col>
              </el-row>
            </div>
          </div>
          <div style="display: flex;justify-content: flex-end;">
            <el-pagination
              background
              @current-change="currentChange1"
              :current-page="enterprisePage"
              layout="prev, pager, next"
              :total="enterpriseTotal">
            </el-pagination>
          </div>
          <el-divider></el-divider>
        </el-col>
        <el-col v-if="active3 === 0 && active4 === 1" :span="11" style="text-align: left">
          <div style="height: 500px">
            <div v-for="(notice,index) in normalNoticeList"
                 :class="active2 === index?'smart_index':'a_white'"
                 @mouseover="mouseOver2(index)" @mouseleave="mouseLeave2(index)"
                 @click=" toNoticeInfo(notice.id)">
              <el-row>
                <el-col :span="3">
                  <template v-if=" Date.parse(getDate(notice.time)) + 2*1000 * 60 * 60 *24  >= new Date() ">
                    <el-badge value="new">
                      <el-avatar :class="active2 === index?'a_white':'smart_index'" style="font-size: 14px;">
                        {{notice.time | timeEllipsis}}
                      </el-avatar>
                    </el-badge>
                  </template>
                  <template v-else>
                    <el-avatar :class="active2 === index?'a_white':'smart_index'" style="font-size: 14px;">
                      {{notice.time | timeEllipsis}}
                    </el-avatar>
                  </template>
                </el-col>
                <el-col :span="21" style="margin-top: 10px">
                  {{notice.title | titleEllipsis }}
                </el-col>
              </el-row>
            </div>
          </div>
          <div style="display: flex;justify-content: flex-end;">
            <el-pagination
              background
              @current-change="currentChange2"
              :current-page="schoolPage"
              layout="prev, pager, next"
              :total="schoolTotal">
            </el-pagination>
          </div>
          <el-divider></el-divider>
        </el-col>
        <el-col :span="2" style="height: 600px">
          <el-divider direction="vertical" style="font-size: 5px;"></el-divider>
        </el-col>
        <el-col v-if="active5 === 1 && active6 === 0" :span="11" style="text-align: left">
          <div style="height: 500px">
            <div v-for="(notice,index) in guideNoticeList"
                 :class="active11 === index?'smart_index':'a_white'"
                 @mouseover="mouseOver11(index)" @mouseleave="mouseLeave11(index)"
                 @click=" toNoticeInfo(notice.id)">
              <el-row>
                <el-col :span="3">
                  <template v-if=" Date.parse(getDate(notice.time)) + 2*1000 * 60 * 60 *24  >= new Date() ">
                    <el-badge value="new">
                      <el-avatar :class="active11 === index?'a_white':'smart_index'" style="font-size: 14px;">
                        {{notice.time | timeEllipsis}}
                      </el-avatar>
                    </el-badge>
                  </template>
                  <template v-else>
                    <el-avatar :class="active11 === index?'a_white':'smart_index'" style="font-size: 14px;">
                      {{notice.time | timeEllipsis}}
                    </el-avatar>
                  </template>
                </el-col>
                <el-col :span="21" style="margin-top: 10px">
                  {{notice.title | titleEllipsis }}
                </el-col>
              </el-row>
            </div>
          </div>
          <div style="display: flex;justify-content: flex-end;">
            <el-pagination
              background
              @current-change="currentChange3"
              :current-page="guidePage"
              layout="prev, pager, next"
              :total="guideTotal">
            </el-pagination>
          </div>
          <el-divider></el-divider>
        </el-col>
        <el-col v-if="active5 === 0 && active6 === 1" :span="11" style="text-align: left">
          <div style="height: 500px">
            <div v-for="(notice,index) in policyNoticeList"
                 :class="active22 === index?'smart_index':'a_white'"
                 @mouseover="mouseOver22(index)" @mouseleave="mouseLeave22(index)"
                 @click=" toNoticeInfo(notice.id)">
              <el-row>
                <el-col :span="3">
                  <template v-if=" Date.parse(getDate(notice.time)) + 2*1000 * 60 * 60 *24  >= new Date() ">
                    <el-badge value="new">
                      <el-avatar :class="active22 === index?'a_white':'smart_index'" style="font-size: 14px;">
                        {{notice.time | timeEllipsis}}
                      </el-avatar>
                    </el-badge>
                  </template>
                  <template v-else>
                    <el-avatar :class="active22 === index?'a_white':'smart_index'" style="font-size: 14px;">
                      {{notice.time | timeEllipsis}}
                    </el-avatar>
                  </template>
                </el-col>
                <el-col :span="21" style="margin-top: 10px">
                  {{notice.title | titleEllipsis }}
                </el-col>
              </el-row>
            </div>
          </div>
          <div style="display: flex;justify-content: flex-end;">
            <el-pagination
              background
              @current-change="currentChange4"
              :current-page="policyPage"
              layout="prev, pager, next"
              :total="policyTotal">
            </el-pagination>
          </div>
          <el-divider></el-divider>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>

  export default {
    name: 'AppIndex',
    data() {
      return {
        normalNoticeList: [],
        schoolTotal: 0,
        schoolPage: 1,
        enterpriseNoticeList: [],
        enterpriseTotal: 0,
        enterprisePage: 1,
        guideNoticeList: [],
        guideTotal: 0,
        guidePage: 1,
        policyNoticeList: [],
        policyTotal: 0,
        policyPage: 1,
        size: 10,
        active1: 0,
        active11: 0,
        active2: 0,
        active22: 0,
        active3: 1,
        active4: 0,
        active5: 1,
        active6: 0,
      }
    },
    mounted() {
      this.initNormalNotices()
      this.initEnterpriseNotices()
      this.initGuideNotices()
      this.initPolicyNotices()
    },
    methods: {
      changeNotice(type) {
        if (type === 1) {
          this.active3 = 1
          this.active4 = 0
        } else if (type === 2) {
          this.active4 = 1
          this.active3 = 0
        } else if (type === 3) {
          this.active5 = 1
          this.active6 = 0
        } else if (type === 4) {
          this.active6 = 1
          this.active5 = 0
        }
      },
      getDate(dateTime) {
        return dateTime.slice(0, 10);
      },
      toNoticeInfo(noticeId) {
        const {href} = this.$router.resolve({
          path: '/noticeInfo',
          //传参
          query: {
            k1TfLTxCi9wCwYROd59onR3U: noticeId
          }
        })
        window.open(href, '_blank')
      },
      initNormalNotices() {
        this.$axios.get('/noticeNormal/byPage?page=' + this.schoolPage + '&size=' + this.size).then(resp => {
          if (resp.data.code === 200) {
            this.normalNoticeList = resp.data.data.data;
            this.schoolTotal = resp.data.data.total;
          }
        })
      },
      initEnterpriseNotices() {
        this.$axios.get('/noticeEnterprise/byPage?page=' + this.enterprisePage + '&size=' + this.size).then(resp => {
          if (resp.data.code === 200) {
            this.enterpriseNoticeList = resp.data.data.data;
            this.enterpriseTotal = resp.data.data.total;
          }
        })
      },
      initGuideNotices() {
        this.$axios.get('/noticeGuide/byPage?page=' + this.guidePage + '&size=' + this.size).then(resp => {
          if (resp.data.code === 200) {
            this.guideNoticeList = resp.data.data.data;
            this.guideTotal = resp.data.data.total;
          }
        })
      },
      initPolicyNotices() {
        this.$axios.get('/noticePolicy/byPage?page=' + this.policyPage + '&size=' + this.size).then(resp => {
          if (resp.data.code === 200) {
            this.policyNoticeList = resp.data.data.data;
            this.policyTotal = resp.data.data.total;
          }
        })
      },
      currentChange1(currentPage) {
        this.enterprisePage = currentPage;
        this.initEnterpriseNotices();
      },
      currentChange2(currentPage) {
        this.schoolPage = currentPage;
        this.initNormalNotices();
      },
      currentChange3(currentPage) {
        this.guidePage = currentPage;
        this.initGuideNotices();
      },
      currentChange4(currentPage) {
        this.policyPage = currentPage;
        this.initPolicyNotices();
      },
      mouseOver1: function (index) {
        this.active1 = index
      },
      mouseLeave1: function (index) {
        this.active1 = index
      },
      mouseOver2: function (index) {
        this.active2 = index
      },
      mouseLeave2: function (index) {
        this.active2 = index
      },
      mouseOver11: function (index) {
        this.active11 = index
      },
      mouseLeave11: function (index) {
        this.active11 = index
      },
      mouseOver22: function (index) {
        this.active22 = index
      },
      mouseLeave22: function (index) {
        this.active22 = index
      },
      mouseOver3: function () {
        this.active3 = 1
        this.active4 = 0
      },
      mouseOver4: function () {
        this.active4 = 1
        this.active3 = 0
      },
      mouseOver5: function () {
        this.active5 = 1
        this.active6 = 0
      },
      mouseOver6: function () {
        this.active6 = 1
        this.active5 = 0
      },
    },
    filters: {
      timeEllipsis(value) {
        if (!value) return "";
        return value.slice(5, 10);
      },
      titleEllipsis(value) {
        if (!value) return "";
        if (value.length > 30) {
          return value.slice(0, 30) + "...";
        }
        return value;
      }
    }
  }
</script>

<style scoped>
  .el-col {
    margin-top: 6px;
  }

  .el-avatar {
    color: black;
    background: #F5F5F5;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
  }

  .smart_index {
    background-color: #A1F2D2;
  }

  .a_white {
    background-color: #ffffff;
  }

  .el-divider--vertical {
    width: 2px;
    height: 37em;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-card >>> .el-card__header {
    background-color: #00c2b3 !important;
    color: white;
  }

  .notice_title1 {
    width: 60%;
    font-size: 22px;
    color: white;
    border-bottom: 2px solid white;
  }

  .notice_title2 {
    width: 60%;
    font-weight: bold;
    font-size: 22px;
    color: black;
    border-bottom: 2px solid black;
  }
</style>
