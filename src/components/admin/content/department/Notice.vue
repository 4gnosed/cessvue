<template>
  <div>
    <el-row style="margin: -18px 0px 18px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/welcome' }">后台管理</el-breadcrumb-item>
        <el-breadcrumb-item>就业部类管理</el-breadcrumb-item>
        <el-breadcrumb-item>公告管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <h1>公告管理</h1>
  </div>
</template>

<script>
  export default {
    name: "Notice"
  }
</script>

<style scoped>

</style>
