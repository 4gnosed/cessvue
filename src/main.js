import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
var axios = require('axios')
Vue.prototype.$axios = axios

var qs = require('qs')
Vue.prototype.qs = qs

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
  if (store.state.user && to.path.startsWith('/admin')) {
    axios.get('/authentication').then(resp => {
      initAdminMenu(router, store)
    })
  }
  if (to.meta.requireAuth) {
    if (store.state.user) {
      // next()
      // 页面拦截：访问每个页面前都向后端发送一个请求,后端拦截器验证登录状态
      axios.get('/authentication').then(resp => {
        if (resp.data.code === 401) {
          login()
        } else {
          next()
        }
      })
    } else {
      login()
    }
  } else {
    next()
  }
  function login () {
    next({
      path: 'login',
      query: {redirect: to.fullPath}
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
