<template>
  <div style="width: 100%">
    <el-menu
      :default-active="activePath"
      router
      mode="horizontal"
      background-color="#303643"
      text-color="#D2D3D6"
      active-text-color="red"
      style="width: 100%">
      <el-row>
        <el-col :xs="12" :sm="11" :md="8" :lg="6" :xl="8">
          <el-menu-item class="el_menu_item" v-for="(item,i) in navList" :key="i" :index="item.name">
            {{ item.navItem }}
          </el-menu-item>
        </el-col>
        <el-col :xs="6" :sm="7" :md="7" :lg="5" :xl="4">
          <div class="el_menu_else_item title_item" @click="toIndex">
            高校就业服务系统
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="5" class="hidden-md-and-down">
          <div class="el_menu_else_item title_item" style="border-left: #D2D3D6 solid 2px" @click="toIndex">
            Collage Employment System
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="4" :lg="3" :xl="4" class="hidden-sm-and-down">
          <div class="el_menu_else_item">
            <el-input
              prefix-icon="el-icon-search"
              size="mini"
              style="width: 150px;">
            </el-input>
          </div>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1">
          <div style="margin-top: 16px">
            <el-badge :value="newMessageNum" :max="99">
              <i @click="showMessages()" class="el-icon-bell el_menu_message_item" style="font-size: 30px"></i>
            </el-badge>
          </div>
        </el-col>
        <el-col :xs="4" :sm="4" :md="1" :lg="1" :xl="2">
          <div class="el_menu_else_item">
            <el-dropdown trigger="click" class="el_menu_else_item">
              <template v-if="this.$store.state.user.username">
                <el-button size="mini" round class="drop_down_button">
                  {{this.$store.state.user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="personCenter">个人中心</el-dropdown-item>
                  <el-dropdown-item @click.native="help">帮助</el-dropdown-item>
                  <el-dropdown-item @click.native="logout">安全退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
              <template v-else>
                <el-button @click.native="login" size="mini" round class="drop_down_button">
                  未登录
                </el-button>
              </template>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-menu>
    <div>
      <el-drawer
        title="您的收信箱"
        :visible.sync="messageTable"
        direction="rtl"
        size="30%">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1" @click.native="changeIndex('1')">
            <i class="iconfont el-icon-iconfont-noread"></i>
            <span slot="title">未读消息</span>
          </el-menu-item>
          <el-menu-item index="2" @click.native="changeIndex('2')">
            <i class="iconfont el-icon-iconfont-read"></i>
            <span slot="title">已读消息</span>
          </el-menu-item>
          <el-menu-item index="3" @click.native="changeIndex('3')">
            <i class="iconfont el-icon-iconfont-yifasong"></i>
            <span slot="title">已发消息</span>
          </el-menu-item>
        </el-menu>
        <template v-if="activeIndex === '1' ">
          <el-table :data="messages" @selection-change="readyTagReadMessages" ref="messageRefs" height="500"
                    stripe class="common_font_size">
            <el-table-column type="selection" width="60px"></el-table-column>
            <el-table-column sortable prop="sender" label="发件人" width="80"></el-table-column>
            <el-table-column sortable prop="title" label="标题" width="170px"></el-table-column>
            <el-table-column sortable prop="sendTime" label="日期" width="85px"></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="50">
              <template slot-scope="scope">
                <el-button @click="showMessage(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin: 10px 0 10px 10px;float: left">
            <el-button class="common_font_size" size="mini" type="primary" @click="tagRead()">标记已读</el-button>
            <el-button class="common_font_size" size="mini" @click="resetSelected()">取消选择</el-button>
          </div>
        </template>
        <template v-if="activeIndex === '2' ">
          <el-table :data="readedMessages" height="500" stripe class="common_font_size">
            <el-table-column type="selection" width="60px"></el-table-column>
            <el-table-column sortable prop="sender" label="发件人" width="80px"></el-table-column>
            <el-table-column sortable prop="title" label="标题" width="170px"></el-table-column>
            <el-table-column sortable prop="sendTime" label="日期" width="85px"></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="50">
              <template slot-scope="scope">
                <el-button @click="showReadMessage(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-if="activeIndex === '3' ">
          <el-table :data="sendedMessages" height="500" stripe class="common_font_size">
            <el-table-column type="selection" width="60px"></el-table-column>
            <el-table-column sortable prop="sender" label="发件人" width="80px"></el-table-column>
            <el-table-column sortable prop="title" label="标题" width="170px"></el-table-column>
            <el-table-column sortable prop="sendTime" label="日期" width="85px"></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="50">
              <template slot-scope="scope">
                <el-button @click="showSendMessage(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-drawer>
      <el-dialog
        title="详细消息"
        :visible.sync="messageDetailDialogVisible"
        width="70%"
        center>
        <el-row>
          <el-col :span="8"><span class="title_font">发件人：</span>{{messageDetail.sender}}</el-col>
          <el-col :span="8"><span class="title_font">收件人：</span>{{messageDetail.receiver}}</el-col>
          <el-col :span="8"><span class="title_font">发送时间：</span>{{messageDetail.sendTime}}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row><span class="title_font">标题：</span>{{messageDetail.title}}</el-row>
        <el-divider></el-divider>
        <el-row>
          <span class="title_font">内容：</span>
          {{messageDetail.content}}
          <template v-if="messageDetailSenderRoleId === this.$store.state.studentId && activeIndex !== 3">
            <el-button type="mini" style="background-color: #FDF6EC" @click="toResume">
              点击查看[{{messageDetail.sender}}]的信息和简历
            </el-button>
            <el-button type="mini" style="background-color: #FDF6EC" @click="toEnterpriseIndex">
              去招聘页面处理简历
            </el-button>
          </template>
          <template v-if="messageDetailSenderRoleId === this.$store.state.enterpriseId">
            <el-button type="mini" style="background-color: #FDF6EC" @click="toEnterprise">
              点击查看[{{messageDetailEnterprise.name}}]的企业信息
            </el-button>
          </template>
        </el-row>
        <el-divider></el-divider>
        <div class="dialog_footer">
          <template v-if="activeIndex !== '3' ">
            <el-button class="common_font_size" size="mini" type="primary" @click="readyResponseMessage">回复此消息
            </el-button>
          </template>
          <el-button class="common_font_size" size="mini" @click="messageDetailDialogVisible = false">取消</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="回复消息"
        :visible.sync="responseDialogVisible"
        width="50%"
        center>
        <el-form :model="messageResponse" ref="messageForm" :rules="messageRules">
          <el-row>
            <el-col :span="12">
              <el-form-item prop="sender" label="发件人：">
                <el-input v-model="messageResponse.sender" autocomplete="off" size="mini" style="width: 100px"
                          disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="receiver" label="收件人：">
                <el-input v-model="messageResponse.receiver" autocomplete="off" size="mini" style="width: 100px"
                          disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item prop="title" label="标题：">
              <el-input v-model="messageResponse.title" autocomplete="off" size="mini" placeholder="请输入标题"
                        style="width: 400px"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item prop="content" label="内容：">
              <el-input type="textarea" :rows="8" v-model="messageResponse.content" style="width: 550px;" size="mini"
                        placeholder="请输入回复内容" maxlength="1000"></el-input>
            </el-form-item>
          </el-row>
          <el-divider></el-divider>
          <div class="dialog_footer">
            <el-button class="common_font_size" size="mini" @click="back">返回</el-button>
            <el-button class="common_font_size" size="mini" type="primary" @click="responseMessage">发送</el-button>
            <el-button class="common_font_size" size="mini" @click="responseDialogVisible = false">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import 'element-ui/lib/theme-chalk/display.css';
  import {createRouter} from "../../router";

  export default {
    name: 'NavMenu',
    props: {
      newMessageNum: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        navList: [
          {name: '/index', navItem: '首页'},
          {name: '/student', navItem: '求职'},
          {name: '/enterprise/newResume', navItem: '招聘'},
          {name: '/leader', navItem: '数据分析'},
          {name: '/admin', navItem: '后台管理'}
        ],
        user: this.$store.state.user,
        activeIndex: '1',
        messageTable: false,
        messageDetailDialogVisible: false,
        responseDialogVisible: false,
        selectedMegs: [],
        messageDetail: '',
        messageDetailSenderRoleId: '',
        messageDetailEnterprise: '',
        messageResponse: {
          id: '',
          sender: '',
          receiver: '',
          title: '',
          content: '',
          sendTime: '',
          status: '',
          responseId: '',
          senderUid: '',
          receiverUid: ''
        },
        messages: [],
        readedMessages: [],
        sendedMessages: [],
        messageRules: {
          title: [{required: true, message: '请输入标题', trigger: 'blur'}],
          content: [{required: true, message: '请输入回复内容', trigger: 'blur'}]
        }
      }
    },
    methods: {
      logout() {
        var _this = this
        this.$axios.get('/logout').then(resp => {
          if (resp.data.code === 200) {
            // 前后端状态保持一致
            _this.$store.commit('logout')

            /*清空路由，防止路由重复加载*/
            const newRouter = createRouter()
            this.$router.matcher = newRouter.matcher

            _this.$router.push('/home')
          }
        })
      },
      login() {
        this.$router.push('/login')
      },
      personCenter() {
        this.$router.push('/personCenter')
      },
      showMessages() {
        //获取信息
        this.$axios.get('/message?userId=' + this.user.id).then(resp => {
          if (resp.data.code === 200) {
            this.messages = []
            this.readedMessages = []
            //根据阅读状态分开
            resp.data.data.forEach(message => {
              if (message.status) {
                //已读
                this.readedMessages.push(message)
              } else {
                //未读
                this.messages.push(message)
              }
            })
          }
        })
        this.messageTable = true
        //已发送消息
        this.$axios.get('/message/send?userId=' + this.user.id).then(resp => {
          if (resp.data.code === 200) {
            this.sendedMessages = resp.data.data
          }
        })
      },
      showMessage(message) {
        this.getSenderInfo(message)
        this.messageDetailDialogVisible = true
        this.messageDetail = message
        this.selectedMegs.push(message)
        this.sendRead()
      },
      showReadMessage(message) {
        this.getSenderInfo(message)
        this.messageDetailDialogVisible = true
        this.messageDetail = message
      },
      showSendMessage(message) {
        this.messageDetailDialogVisible = true
        this.messageDetail = message
      },
      getSenderInfo(message) {
        //获取发送者的角色
        let userId = message.senderUid;
        this.$axios.get('/userRole?userId=' + userId).then(resp => {
          if (resp.data.code === 200) {
            this.messageDetailSenderRoleId = resp.data.data
            //如果是企业，获取其信息
            if (this.messageDetailSenderRoleId === this.$store.state.enterpriseId) {
              this.$axios.get('/enterprise/getOne?userId=' + userId).then(resp => {
                if (resp.data.code === 200) {
                  this.messageDetailEnterprise = resp.data.data
                }
              })
            }
          }
        })
      },
      changeIndex(index) {
        this.activeIndex = index
      },
      resetSelected() {
        this.$refs['messageRefs'].clearSelection()
        this.selectedMegs = []
      },
      readyTagReadMessages(rows) {
        this.selectedMegs = rows
      },
      tagRead() {
        if (this.selectedMegs.length === 0) {
          this.$notify({
            message: '未选择消息',
            type: "error"
          })
          return
        } else {
          this.sendRead()
        }
      },
      sendRead() {
        let selectedMegsId = []
        this.selectedMegs.forEach(message => {
          let mid = message.id
          //用户发送的id集合
          selectedMegsId.push(mid)
          //从未读消息中删除
          for (let index = 0; index < this.messages.length; index++) {
            if (mid === this.messages[index].id) {
              this.messages.splice(index, 1);
              break;
            }
          }
          //添加到已读消息中去
          this.readedMessages.push(message)
        })
        this.$axios.put('/message/status', selectedMegsId).then(resp => {
          if (resp.data.code === 200) {
            this.$notify({message: '已将该消息移至已读列表', type: 'success'})
            this.$refs['messageRefs'].clearSelection()
            this.selectedMegs = []
          }
        })
      },
      back() {
        this.responseDialogVisible = false
        this.messageDetailDialogVisible = true
      },
      readyResponseMessage() {
        this.messageDetailDialogVisible = false
        //互换发送者与接收者
        this.messageResponse.sender = this.messageDetail.receiver
        this.messageResponse.senderUid = this.messageDetail.receiverUid
        this.messageResponse.receiver = this.messageDetail.sender
        this.messageResponse.receiverUid = this.messageDetail.senderUid
        //表示这封信是对id值为response_id的信息进行回信
        this.messageResponse.responseId = this.messageDetail.id
        this.responseDialogVisible = true
      },
      responseMessage() {
        this.$refs['messageForm'].validate(valid => {
          if (valid) {
            this.$axios.post('/message', this.messageResponse).then(resp => {
              if (resp.data.code === 200) {
                this.$notify({message: '发送成功', type: 'success'})
                this.$refs['messageForm'].resetFields()
                this.responseDialogVisible = false
              }
            })
          }
        })
      },
      toResume() {
        const {href} = this.$router.resolve({
          path: '/resume',
          //传参
          query: {
            fLTYROdT9onR3kUxCi9wCw: this.messageDetail.senderUid
          }
        })
        window.open(href, '_blank')
      },
      toEnterprise() {
        const {href} = this.$router.resolve({
          path: '/infoEnterprise',
          //传参
          query: {
            UT93oOdkwCTY9RnxRwfLCi: this.messageDetailEnterprise.id
          }
        })
        window.open(href, '_blank')
      },
      toEnterpriseIndex() {
        const {href} = this.$router.resolve({
          path: '/enterprise/newResume'
        })
        window.open(href, '_blank')
      },
      toIndex() {
        this.$router.push('/index')
      }
    },
    computed: {
      // 根据路由父路径激活菜单
      activePath() {
        let path = this.$route.path
        if (path.startsWith('/infoEnterprise')) {
          return '/student'
        }
        let index = 1
        for (; index < path.length;) {
          if (path[index] === '/') {
            break;
          }
          index++
        }
        let s = path.substr(0, index)
        if (s.startsWith('/enterprise')) {
          s = s + '/newResume'
        }
        return s
      }
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }

  .el-icon-arrow-down {
    font-size: 18px;
  }

  .el_menu_item {
    font-size: 18px;

    float: left;
    padding: 0 4px;
    line-height: 60px;
    height: 60px;
  }

  .el_menu_else_item {
    font-size: 18px;
    color: #D2D3D6;

    line-height: 60px;
    height: 60px;
  }

  .el_menu_message_item {
    color: #D2D3D6;

    line-height: 30px;
    height: 30px;
  }

  .title_item {
    font-weight: bold;
    font-size: 24px;
  }

  .drop_down_button {
    font-size: 18px;

  }

  .common_font_size {
    font-size: 18px;
  }

  .title_font {

  }

  .dialog_footer {
    text-align: center;
  }

  .el-dropdown-menu__item {
    font-size: 18px !important;
  }

  .el-badge__content {
    background-color: red;
    font-size: 2px;
    height: 18px;
    line-height: 18px;
    padding: 0 3px;
  }
</style>
