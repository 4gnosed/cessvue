<template>
  <div>
    <div style="margin-bottom: 20px;text-align: left">
      <el-row>
        <el-col :span="1" style="line-height: 32px"><span>标 题:</span></el-col>
        <el-col :span="22">
          <el-input size="small"
                    v-model="notice.title"
                    placeholder="请输入标题..."></el-input>
        </el-col>
      </el-row>
    </div>
    <div>
      <textarea :id="tinymceId" v-model="notice.content"></textarea>
    </div>
    <div style="margin-top:  20px;text-align: center">
      <template v-if="notice.id">
        <el-button class="common_font_size" size="small" type="primary" @click="updateNotice()">更 新</el-button>
      </template>
      <template v-else>
        <el-button class="common_font_size" size="small" type="primary" @click="empty()">重 置</el-button>
        <el-button class="common_font_size" size="small" type="primary" @click="publicNotice()">发 布</el-button>
      </template>
    </div>
  </div>
</template>
<script>
  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/themes/silver/theme'
  import 'tinymce/skins/ui/oxide/skin.css'
  import '../../../../static/tinymce/langs/zh_CN.js'

  import 'tinymce/plugins/image'// 插入上传图片插件
  import 'tinymce/plugins/media'// 插入视频插件
  import 'tinymce/plugins/table'// 插入表格插件
  import 'tinymce/plugins/link' //超链接插件
  import 'tinymce/plugins/code' //代码块插件
  import 'tinymce/plugins/lists'// 列表插件
  import 'tinymce/plugins/contextmenu'  //右键菜单插件
  import 'tinymce/plugins/wordcount' // 字数统计插件
  import 'tinymce/plugins/colorpicker' //选择颜色插件
  import 'tinymce/plugins/textcolor'  //文本颜色插件
  import 'tinymce/plugins/fullscreen' //全屏
  import 'tinymce/plugins/help'
  import 'tinymce/plugins/charmap'
  import 'tinymce/plugins/paste'
  import 'tinymce/plugins/hr'
  import 'tinymce/plugins/searchreplace'
  import 'tinymce/plugins/insertdatetime'
  import 'tinymce/plugins/toc'
  import 'tinymce/plugins/codesample'

  export default {
    name: 'Notice',
    props: {
      selectedNotice: {
        type: Object,
        required: false
      }
    },
    components: {Editor},
    data() {
      const ide = Date.now()
      return {
        tinymceId: ide,
        notice: {
          id: '',
          title: '',
          content: ''
        },
        DefaultInit: {
          language_url: '/tinymce/langs/zh_CN.js',  //导入语言文件
          language: "zh_CN",//语言设置
          skin_url: '/tinymce/skins/ui/oxide',//主题样式
          height: 500, //高度
          menubar: false,// 隐藏最上方menu菜单
          toolbar: true,//false禁用工具栏（隐藏工具栏）
          browser_spellcheck: true, // 拼写检查
          branding: false, // 去水印
          statusbar: true, // 隐藏编辑器底部的状态栏
          elementpath: false,  //禁用下角的当前标签路径
          paste_data_images: true, // 允许粘贴图像
          toolbar: ['bold italic underline strikethrough blockquote|forecolor backcolor|formatselect |fontsizeselect  | alignleft aligncenter alignright alignjustify | outdent indent |codeformat blockformats| removeformat undo redo ',
            'bullist numlist toc pastetext|codesample charmap  hr insertdatetime |lists image media table link unlink |code searchreplace fullscreen help '],
          plugins: 'lists image media table wordcount code fullscreen help codesample toc insertdatetime  searchreplace  link charmap paste hr',
        }
      }
    },
    created() {
      this.getNotice()
    },
    mounted() {
      this.init()
    },
    watch: {
      //newVal是指更新后的数据
      selectedNotice: {
        handler(newVal, oldVal) {
          if (newVal) {
            this.notice = newVal
            tinyMCE.activeEditor.setContent(this.notice.content)
          }
        },
        // 代表在wacth里声明了watchNum这个方法之后立即先去执行handler方法
        immediate: true,
        deep: true,   //对象内部属性的监听，关键。
        //deep的意思就是深入观察，监听器会一层层的往下遍历，给对象的所有属性都加上这个监听器
      },
    },
    methods: {
      getNotice() {
        if (typeof this.selectedNotice !== 'undefined') {
          this.notice = this.selectedNotice
        }
      },
      init() {
        const self = this
        window.tinymce.init({
          // 默认配置
          ...this.DefaultInit,
          // 图片上传
          images_upload_handler: function (blobInfo, success, failure) {
            let formData = new FormData()
            console.log(blobInfo.filename())
            formData.append('img', blobInfo.blob())
            self.$axios.post('/admin/notice/img', formData).then(resp => {
              if (resp.data.code === 200) {
                success(resp.data.data)
                console.log(resp.data.data)
              } else {
                failure(function () {
                  this.$notify({
                    message: resp.data.message,
                    type: 'error'
                  })
                })
              }
            })
          },
          // 挂载的DOM对象
          selector: `#${this.tinymceId}`,
        })
      },
      updateNotice() {
        this.notice.content = tinyMCE.activeEditor.getContent()
        if (this.notice.title === '' || this.notice.title.match(/^[ ]*$/)) {
          this.$notify({
            message: '请输入标题',
            type: 'warning'
          })
          return
        } else if (this.notice.content === '' || this.notice.title.match(/^[ ]*$/)) {
          this.$notify({
            message: '请输入内容',
            type: 'warning'
          })
          return
        }
        this.$axios.put('/admin/notice', this.notice).then(resp => {
          if (resp.data.code === 200) {
            this.empty()
            this.$notify({
              message: '更新成功',
              type: 'success'
            })
          } else {
            this.$notify({
              message: resp.data.message,
              type: 'error'
            })
          }
        })
      },
      publicNotice() {
        this.notice.content = tinyMCE.activeEditor.getContent()
        if (this.notice.title === '' || this.notice.title.match(/^[ ]*$/)) {
          this.$notify({
            message: '请输入标题',
            type: 'warning'
          })
          return
        } else if (this.notice.content === '' || this.notice.title.match(/^[ ]*$/)) {
          this.$notify({
            message: '请输入内容',
            type: 'warning'
          })
          return
        }
        this.$axios.post('/admin/notice', this.notice).then(resp => {
          if (resp.data.code === 200) {
            this.empty()
            this.$notify({
              message: '发布成功',
              type: 'success'
            })
          } else {
            this.$notify({
              message: resp.data.message,
              type: 'error'
            })
          }
        })
      },
      empty() {
        // if(this.notice.id){
        //   this.notice.title=this.selectedNotice.title
        //   tinyMCE.activeEditor.setContent(this.selectedNotice.content)
        // }else {
        this.notice.title = ''
        this.notice.content = ''
        tinyMCE.activeEditor.setContent('')
        // }
      }
    }
  }
</script>
