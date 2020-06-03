<template>
    <el-menu
            :default-active="$route.path"
            router
            mode="vertical"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#00c2b3"
            :collapse="isCollapse">
        <navigation-item v-for="(menu,i) in this.$store.state.adminMenus" :key="i" :item="menu"/>
    </el-menu>
</template>

<script>
    import NavigationItem from "../common/NavigationItem";

    export default {
        name: 'AdminMenu',
        components: {NavigationItem},
        data() {
            return {
                isCollapse: false
            }
        }
    }
</script>

<style scoped>
</style>
