<template>
  <div>
    <el-row style="margin: -18px 0px 18px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/welcome' }">后台管理</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>备份恢复数据库</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <h3>数据库操作</h3>
  </div>
</template>

<script>
  export default {
    name: "DataBase"
  }
</script>

<style scoped>

</style>
