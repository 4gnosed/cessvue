<template>
  <div>
    <!--叶子项-->
    <template v-if="item.children===null">
      <el-menu-item :index="item.path" class="child_class">
        <span style="font-size: 10px;float: left;">
        <i :class="item.iconCls"></i>
        {{item.nameZh}}
          </span>
      </el-menu-item>
    </template>
    <!--父级菜单项-->
    <el-submenu v-else :index="item.path">
      <span slot="title" style="font-size: 12px;float: left;">
        <i :class="item.iconCls"></i>
        {{item.nameZh}}
      </span>
      <navigation-item v-for="(child,i) in item.children" :key="i" :item="child"/>
    </el-submenu>
  </div>
</template>

<script>
  export default {
    name: 'NavigationItem',
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>
