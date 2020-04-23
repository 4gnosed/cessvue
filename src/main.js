import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import fa from "element-ui/src/locale/lang/fa";

// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
var axios = require('axios')
Vue.prototype.$axios = axios

var qs = require('qs')
Vue.prototype.qs = qs

Vue.prototype.$message = Message;

// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
axios.defaults.baseURL = 'http://localhost:8443/api'

// 为解决跨域cookie传输问题，允许前端每次发送请求时就会带上 sessionId
axios.defaults.withCredentials = true

Vue.config.productionTip = false

// 引入Element
Vue.use(ElementUI)

// .使用钩子函数判断页面是否拦截，在访问每一个路由前调用
// 判断访问的路径是否需要拦截，如果需要，判断 store 里有没有存储 user 的信息，
// 如果存在，则放行，否则跳转到登录页面，并存储访问的页面路径（以便在成功登录后跳转到要访问的页面）
router.beforeEach((to, from, next) => {
    let state = store.state;
    let username = state.user.username;
    let roleId = state.user.roleId;
    let adminId = state.adminId;
    let studentId = state.studentId;
    let enterpriseId = state.enterpriseId;
    let departmentId = state.departmentId;
    let leaderId = state.leaderId;
    let adminContentId = state.adminContentId;

    // 管理员
    if (to.path.startsWith('/admin')) {
      if (username) {
        if (roleId == adminId || roleId == departmentId || roleId == adminContentId) {
          axios.get('/authentication').then(resp => {
            initAdminMenu(router, store)
          })
        } else {
          confirmToLogin('管理员')
        }
      } else {
        login()
      }
    }
    //企业
    if (to.path.startsWith('/enterprise')) {
      if (username) {
        if (roleId == enterpriseId) {
          // getAuthority()
        } else {
          confirmToLogin('企业')
          return false
        }
      } else {
        login()
      }
    }
    //教师
    if (to.path.startsWith('/leader')) {
      if (username) {
        if (roleId == leaderId) {
          // getAuthority()
        } else {
          confirmToLogin('教师')
          return false
        }
      } else {
        login()
      }
    }

    //验证
    if (to.meta.requireAuth) {
      if (username) {
        // alert('用户角色id：'+roleId)
        // 页面拦截：访问每个页面前都向后端发送一个请求,后端拦截器验证登录状态
        getAuthority()
      } else {
        login()
      }
    } else {
      next()
    }

    //登录并且携带登录成功后重定向路径
    function login() {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }

    //退出登录
    function logout() {
      Vue.prototype.$axios.get('/logout').then(resp => {
        if (resp.data.code === 200) {
          // 前后端状态保持一致
          this.$store.commit('logout')
        }
      })
    }

    //根据当前在线用户角色进行页面权限验证
    function confirmToLogin(roleName) {
      Vue.prototype.$confirm('您不是' + roleName + '账户，是否退出重新登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        logout()
        next({
          path: 'login',
          query: {redirect: to.fullPath}
        })
      })
    }

    //确认权限
    function getAuthority() {
      axios.get('/authentication').then(resp => {
        if (resp.data.code === 200) {
          next()
        } else {
          login()
        }
      })
    }

    // 初始化菜单
    const initAdminMenu = (router, store) => {
      if (store.state.adminMenus.length > 0) {
        return
      }
      axios.get('/menu').then(resp => {
        if (resp && resp.data.code === 200) {
          var fmtRoutes = formatRoutes(resp.data.data)
          router.addRoutes(fmtRoutes)
          store.commit('initAdminMenu', fmtRoutes)
        }
      })
    }
    // 格式化菜单
    const formatRoutes = (routes) => {
      let fmtRoutes = []
      routes.forEach(route => {
        if (route.children) {
          route.children = formatRoutes(route.children)
        }
        let fmtRoute = {
          path: route.path,
          component: resolve => {
            require(['./components/admin/' + route.component + '.vue'], resolve)
          },
          name: route.name,
          nameZh: route.nameZh,
          iconCls: route.iconCls,
          meta: {
            requireAuth: true
          },
          children: route.children
        }
        fmtRoutes.push(fmtRoute)
      })
      return fmtRoutes
    }
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
