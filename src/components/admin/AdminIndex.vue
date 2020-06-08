<template>
  <el-container>
    <template>
      <el-backtop class="el_backtop">
        <i class="el-icon-caret-top"></i>
      </el-backtop>
    </template>
    <el-header style="padding: 0px;height: 30px;margin-bottom: 21px">
      <Header v-bind:newMessageNum="newMessageNum"></Header>
    </el-header>
    <el-container ref="homePage">
      <el-aside style="width: 210px">
        <admin-menu style="width: 200px;height: 1000px;"></admin-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
    <el-footer style="padding: 0px;height: 20px;margin-top: 1px">
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
  import AdminMenu from './AdminMenu'
  import Header from './Header'
  import Footer from "../common/Footer";

  export default {
    name: 'AdminIndex',
    components: {Footer, AdminMenu, Header},
    data() {
      return {
        newMessageNum: 0,
        clientHeight: '',
      }
    },
    mounted() {
      this.newMessage()

      // 获取浏览器可视区域高度
      this.clientHeight = `${document.documentElement.clientHeight}`
      //document.body.clientWidth;
      //console.log(self.clientHeight);
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };
    },
    watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },
    methods: {
      changeFixed(clientHeight) { //动态修改样式
        // console.log(clientHeight);
        // console.log(this.$refs.homePage.$el.style.height);
        this.$refs.homePage.$el.style.height = clientHeight - 20 + 'px';
      },
      newMessage() {
        //有新消息则通知
        this.$axios.get('/message/new?userId=' + this.$store.state.user.id).then(resp => {
          if (resp.data.code === 200) {
            this.newMessageNum = resp.data.data;
            this.$notify({message: '您有 ' + this.newMessageNum + ' 条未读消息', type: 'success'})
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el_backtop {
    font-size: 14px;
    background-color: #f2f5f6;
    text-align: center;
    line-height: 20px;
    color: #303643;
  }
</style>
