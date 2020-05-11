<template>
  <div>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        @selection-change="readyDeleteNotices"
        ref="multipleTable"
        :data="notices"
        stripe
        border
        highlight-current-row="highlight-current-row"
        :default-sort="{prop: 'id', order: 'ascending'}"
        style="width: 100%"
        height="800px"
        class="common_font_size"
        :max-height="tableHeight">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="300"
          sortable>
        </el-table-column>
        <el-table-column
          prop="publisher"
          label="发布者用户名"
          sortable
          width="150"
          fit>
        </el-table-column>
        <el-table-column
          prop="time"
          label="发布时间"
          sortable>
        </el-table-column>
        <el-table-column
          prop="noticeType"
          label="类型"
          sortable>
        </el-table-column>
        <!--        <el-table-column-->
        <!--          prop="content"-->
        <!--          label="内容"-->
        <!--          sortable>-->
        <!--        </el-table-column>-->
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click="editNotice(scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click="readyDeleteNotice(scope.$index,scope.row)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px 0 20px 0;float: left">
        <el-button class="common_font_size" size="mini" @click="resetSelected()">取消选择</el-button>
        <el-button class="common_font_size" size="mini" @click="deleteNotices()">批量删除</el-button>
      </div>
    </el-card>
    <el-dialog
      title="确认删除？"
      :visible.sync="dialogFormVisible1"
      width="30%"
      class="common_font_size"
      center>
      <div slot="footer" class="dialog-footer">
        <el-button class="common_font_size" size="mini" @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button class="common_font_size" size="mini" type="primary" @click="deleteNotice()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "NoticeManage",
    data() {
      return {
        notices: [],
        deletedIndex: '',
        deletedNoticeId: '',
        selectedNotices: [],
        dialogFormVisible1: false,
      }
    },
    mounted() {
      this.initNotices()
    },
    computed: {
      tableHeight() {
        return window.innerHeight - 320
      }
    },
    methods: {
      initNotices() {
        this.$axios.get('/admin/notice').then(resp => {
          if (resp.data.code === 200) {
            this.notices = resp.data.data
          }
        })
      },
      resetSelected() {
        this.$refs.multipleTable.clearSelection()
      },
      editNotice() {
      },
      readyDeleteNotice(index, notice) {
        this.dialogFormVisible1 = true
        this.deletedIndex = index
        this.deletedNoticeId = notice.id
      },
      readyDeleteNotices(rows) {
        this.selectedNotices = rows
      },
      deleteNotices() {
        if (this.selectedNotices.length === 0) {
          this.$notify({
            message: '未选择用户',
            type: "error"
          })
          return
        }
        this.$axios.delete('/admin/notice/deletes', {
          data: this.selectedNotices
        }).then(resp => {
          if (resp && resp.data.code === 200) {
            this.$notify({
              message: '删除成功',
              type: "success"
            })
            this.selectedNotices.forEach(item => {
              for (let i = 0; i < this.notices.length; i++) {
                if (item.id === this.notices[i].id) {
                  this.notices.splice(i, 1)
                }
              }
            })
            this.selectedNotices = []
            this.$refs.multipleTable.clearSelection()
          }
        })
      },
      deleteNotice() {
        this.$axios.delete('/admin/notice?nid=' + this.deletedNoticeId).then(resp => {
          this.notices.splice(this.deletedIndex, 1)
          if (resp && resp.data.code === 200) {
            this.$notify({
              message: '删除成功',
              type: "success"
            })
          }
        })
        this.dialogFormVisible1 = false
      },
    }
  }
</script>

<style scoped>

</style>
