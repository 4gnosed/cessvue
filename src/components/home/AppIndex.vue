<template>
  <div style="height: 1500px;margin-top: 50px">
    <!--    <el-row :gutter="10">-->
    <!--      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">-->
    <!--        <div class="grid-content bg-purple">111111111111111111111111</div>-->
    <!--      </el-col>-->
    <!--      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">-->
    <!--        <div class="grid-content bg-purple-light">222222222222222222</div>-->
    <!--      </el-col>-->
    <!--      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">-->
    <!--        <div class="grid-content bg-purple">33333333333333333</div>-->
    <!--      </el-col>-->
    <!--      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">-->
    <!--        <div class="grid-content bg-purple-light">44444444444444</div>-->
    <!--      </el-col>-->
    <!--    </el-row>-->
  </div>
</template>

<script>
  import 'element-ui/lib/theme-chalk/display.css';

  export default {
    name: 'AppIndex'
  }
</script>

<style scoped>
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
