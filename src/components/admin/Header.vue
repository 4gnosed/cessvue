<template>
  <div>
    <el-menu
      :default-active="$route.path"
      router
      mode="horizontal"
      background-color="#303643"
      style="width: 100%">
      <el-row style="color: #fff">
        <el-col :xs="18" :sm="18" :md="20" :lg="21" :xl="21">
          <div class="el_menu_else_item title_item" @click="backIndex">
            高校就业服务后台管理系统
          </div>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1">
          <div style="margin-top: 6px">
            <el-badge :value="newMessageNum" :max="99">
              <i @click="showMessages()" class="el-icon-bell el_menu_message_item" style="font-size: 20px"></i>
            </el-badge>
          </div>
        </el-col>
        <el-col :xs="4" :sm="4" :md="2" :lg="2" :xl="2">
          <div class="el_menu_else_item">
            <el-dropdown trigger="click" class="el_menu_else_item">
              <template v-if="this.$store.state.user.username">
                <el-button size="mini" round class="drop_down_button">
                  {{this.$store.state.user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" style="font-size: 11px;">
                  <el-dropdown-item @click.native="help">帮助</el-dropdown-item>
                  <el-dropdown-item @click.native="backIndex">返回主页</el-dropdown-item>
                </el-dropdown-menu>
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
            <el-table-column type="selection" width="34px"></el-table-column>
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
            <el-table-column type="selection" width="34px"></el-table-column>
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
            <el-table-column type="selection" width="34px"></el-table-column>
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
        <el-row><span class="title_font">内容：</span>{{messageDetail.content}}</el-row>
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

  export default {
    name: 'Header',
    props: {
      newMessageNum: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        user: this.$store.state.user,
        activeIndex: '1',
        messageTable: false,
        messageDetailDialogVisible: false,
        responseDialogVisible: false,
        selectedMegs: [],
        messageDetail: '',
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
      backIndex() {
        this.$router.push('/index')
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
        this.messageDetailDialogVisible = true
        this.messageDetail = message
        this.selectedMegs.push(message)
        this.sendRead()
      },
      showReadMessage(message) {
        this.messageDetailDialogVisible = true
        this.messageDetail = message
      },
      showSendMessage(message) {
        this.messageDetailDialogVisible = true
        this.messageDetail = message
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
      }
    }
  }
</script>

<style>
  a {
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }

  .el-icon-arrow-down {
    font-size: 11px;
  }

  .el_menu_else_item {
    font-size: 11px;
    font-weight: bold;
    line-height: 34px;
    height: 34px;
  }

  .title_item {
    font-size: 16px;
    letter-spacing: 2px;
  }

  .drop_down_button {
    font-size: 11px;
    font-weight: bold;
  }

  .title_font {
    font-weight: bold;
  }

  .dialog_footer {
    text-align: center;
  }

  .el-badge__content {
    background-color: red;
    font-size: 2px;
    height: 12px;
    line-height: 12px;
    padding: 0 3px;
  }
</style>
