<template>
  <div>
    <el-row style="margin: -18px 0px 18px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/welcome' }">后台管理</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>运行情况</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <h3>运行情况</h3>
  </div>
</template>

<script>
  export default {
    name: "Run"
  }
</script>

<style scoped>

</style>
