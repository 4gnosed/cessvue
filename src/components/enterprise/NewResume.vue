<template>
  <div>
    <div>
      <el-collapse v-model="preview" accordion>
        <el-collapse-item name="preview">
          <div slot="title" style="width: 100%;font-size: 20px;">
            <el-row>
              <el-col :span="8">&nbsp;</el-col>
              <el-col :span="8">
                <i class="header-icon el-icon-view"></i>
                &nbsp;简历预览
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div>简历详情</div>
    <div>{{index}}</div>
  </div>
</template>

<script>
  export default {
    name: "NewResume",
    props: ['index'],
    // watch: {
    //   index: function (index) {
    //   }
    // },
    data() {
      return {
        preview: 'preview'
      }
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped>
  .el-table {
    background-color: #545c64;
  }
</style>
