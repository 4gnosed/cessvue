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
    let username = store.state.user.username;
    let roleId = store.state.user.roleId;
    let adminId = 1;
    let studentId = 2;
    let enterpriseId = 3;
    let departmentId = 4;
    let leaderId = 5;
    let adminContentId = 6;

    // 管理员
    if (to.path.startsWith('/admin')) {
      if (username) {
        if (roleId == adminId || roleId == departmentId || roleId == adminContentId) {
          axios.get('/authentication').then(resp => {
            initAdminMenu(router, store)
          })
        } else {
          Vue.prototype.$message.error('您无权限访问！')
          return false
        }
      } else {
        login()
      }
    }
    //学生
    if (to.path.startsWith('/student')) {
      if (username) {
        if (roleId == studentId) {
          getAuthority()
        } else {
          Vue.prototype.$message.error('您无权限访问！')
          return false
        }
      } else {
        login()
      }
    }
    //企业
    if (to.path.startsWith('/enterprise')) {
      if (username) {
        if (roleId == enterpriseId) {
          getAuthority()
        } else {
          Vue.prototype.$message.error('您无权限访问！')
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
          getAuthority()
        } else {
          Vue.prototype.$message.error('您无权限访问！')
          return false
        }
      } else {
        login()
      }
    }

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

    function login() {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }

    //确认权限
    function getAuthority() {
      axios.get('/authentication').then(resp => {
        if (resp.data.code === 401) {
          login()
        } else {
          next()
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
