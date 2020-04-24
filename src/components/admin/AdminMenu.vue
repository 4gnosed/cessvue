<template>
    <el-menu
            :default-active="currentPath"
            router
            mode="vertical"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse">
        <navigation-item v-for="(menu,i) in adminMenus" :key="i" :item="menu"/>
    </el-menu>
</template>

<script>
    import NavigationItem from "../common/NavigationItem";
    import {createRouter} from "../../router";

    export default {
        name: 'AdminMenu',
        components: {NavigationItem},
        data() {
            return {
                isCollapse: false
            }
        },
        computed: {
            adminMenus() {
                // alert('缓存的菜单路由：' + this.$store.state.adminMenus)
                let adminMenus = this.$store.state.adminMenus;

                /*清空路由，防止路由重复加载*/
                const newRouter = createRouter()
                this.$router.matcher = newRouter.matcher

                this.$router.addRoutes(adminMenus)
                return adminMenus
            },
            currentPath() {
                return this.$route.path
            }
        }
    }
</script>

<style scoped>
</style>
