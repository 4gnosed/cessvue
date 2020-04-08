<template>
  <div>
    <el-row style="margin: -18px 0px 18px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/welcome' }">后台管理</el-breadcrumb-item>
        <el-breadcrumb-item>企业类管理</el-breadcrumb-item>
        <el-breadcrumb-item>审核资格</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <h1>审核资格</h1>
  </div>
</template>

<script>
  export default {
    name: "Qualification"
  }
</script>

<style scoped>

</style>
