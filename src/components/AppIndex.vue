<template>
  <div style="margin-top: 35px">
    <div>
      <div>
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item style="background-color: transparent">
            <img src="http://localhost:8443/api/file/img/1.jpg"/>
          </el-carousel-item>
          <el-carousel-item style="background-color: transparent">
            <img src="http://localhost:8443/api/file/img/2.jpg"/>
          </el-carousel-item>
          <el-carousel-item style="background-color: transparent">
            <img src="http://localhost:8443/api/file/img/3.jpg"/>
          </el-carousel-item>
          <el-carousel-item style="background-color: transparent">
            <img src="http://localhost:8443/api/file/img/4.jpg"/>
          </el-carousel-item>
          <el-carousel-item style="background-color: transparent">
            <img src="http://localhost:8443/api/file/img/5.jpg"/>
          </el-carousel-item>
          <el-carousel-item style="background-color: transparent">
            <img src="http://localhost:8443/api/file/img/6.jpg"/>
          </el-carousel-item>
          <el-carousel-item style="background-color: transparent">
            <img src="http://localhost:8443/api/file/img/7.jpg"/>
          </el-carousel-item>
          <el-carousel-item style="background-color: transparent">
            <img src="http://localhost:8443/api/file/img/8.jpg"/>
          </el-carousel-item>
          <el-carousel-item style="background-color: transparent">
            <img src="http://localhost:8443/api/file/img/9.jpg"/>
          </el-carousel-item>
          <el-carousel-item style="background-color: transparent">
            <img src="http://localhost:8443/api/file/img/10.jpg"/>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div>
        <el-card shadow="hover">
          <div slot="header">
            <el-row>
              <el-col :span="4">&nbsp;</el-col>
              <el-col :span="4"><span style="font-weight: bold">企业校招</span></el-col>
              <el-col :span="4">&nbsp;</el-col>
              <el-col :span="4">&nbsp;</el-col>
              <el-col :span="4"><span style="font-weight: bold">学校通知</span></el-col>
              <el-col :span="4">&nbsp;</el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="11" style="text-align: left">
            </el-col>
            <el-col :span="2" style="height: 600px">
              <el-divider direction="vertical" style="font-size: 5px;"></el-divider>
            </el-col>
            <el-col :span="11" style="text-align: left">
              <div style="height: 500px">
                <div v-for="(notice,index) in noticeList"
                     :class="active === index?'smart_index':'a_white'"
                     @mouseover="mouseOver(index)" @mouseleave="mouseLeave(index)"
                     @click=" toNoticeInfo(notice.id)">
                  <el-row>
                    <el-col :span="1" style="height: 34px;line-height: 34px">
                      <i class="el-icon-thumb"></i>
                    </el-col>
                    <el-col :span="2">
                      <el-avatar :class="active === index?'a_white':'smart_index'" style="font-size: 12px;">
                        {{notice.time | timeEllipsis}}
                      </el-avatar>
                    </el-col>
                    <el-col :span="21" style="margin-top: 10px">
                      <el-badge value="new">
                        {{notice.title | titleEllipsis }}
                      </el-badge>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div style="display: flex;justify-content: flex-end;">
                <el-pagination
                  background
                  @current-change="currentChange"
                  @size-change="sizeChange"
                  layout="sizes, prev, pager, next, jumper, ->, total, slot"
                  :total="total">
                </el-pagination>
              </div>
              <el-divider></el-divider>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </div>
  </div>

</template>

<script>

  export default {
    name: 'AppIndex',
    data() {
      return {
        noticeList: [],
        total: 0,
        page: 1,
        size: 10,
        active: 0
      }
    },
    mounted() {
      this.initNotices()
    },
    methods: {
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
      initNotices() {
        this.$axios.get('/notice/byPage?page=' + this.page + '&size=' + this.size).then(resp => {
          if (resp.data.code === 200) {
            this.noticeList = resp.data.data.data;
            this.total = resp.data.data.total;
          }
        })
      },
      sizeChange(currentSize) {
        this.size = currentSize;
        this.initNotices();
      },
      currentChange(currentPage) {
        this.page = currentPage;
        this.initNotices();
      },
      mouseOver: function (index) {
        this.active = index
      },
      mouseLeave: function (index) {
        this.active = index
      }
    },
    filters: {
      timeEllipsis(value) {
        if (!value) return "";
        return value.slice(5, 10);
      },
      titleEllipsis(value) {
        if (!value) return "";
        if (value.length > 27) {
          return value.slice(0, 27) + "...";
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
    width: 32px;
    height: 32px;
    line-height: 32px;
  }

  .smart_index {
    background-color: #F5F5F5;
  }

  .a_white {
    background-color: #ffffff;
  }

  .el-divider--vertical {
    width: 2px;
    height: 28em;
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
</style>
