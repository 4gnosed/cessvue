import Vue from 'vue'
import App from './App'
import router, {createRouter} from './router'
import ElementUI from 'element-ui'
import {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

// 引入Elementx`x`
Vue.use(ElementUI)
Vue.config.productionTip = false
var qs = require('qs')
Vue.prototype.qs = qs
Vue.prototype.$message = Message;

// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
var axios = require('axios')
Vue.prototype.$axios = axios
// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
axios.defaults.baseURL = 'http://120.77.32.19/cess/api'
// axios.defaults.baseURL = 'http://127.0.0.1:8443/api'
// 为解决跨域cookie传输问题，允许前端每次发送请求时就会带上 sessionId
axios.defaults.withCredentials = true
// 设置axios请求的token
// axios.defaults.headers.common['token'] = 'f4c902c9ae5a2a9d8f84868ad064e706'
//设置请求头
// axios.defaults.headers.post["Content-type"] = "application/json"

// .使用钩子函数判断页面是否拦截，在访问每一个路由前调用
// 判断访问的路径是否需要拦截，如果需要，判断 store 里有没有存储 user 的信息，
// 如果存在，则放行，否则跳转到登录页面，并存储访问的页面路径（以便在成功登录后跳转到要访问的页面）
router.beforeEach((to, from, next) => {

  let state = store.state;
  let username = state.user.username;
  let userId = state.user.id;
  let roleId = state.user.roleId;
  let adminId = state.adminId;
  let studentId = state.studentId;
  let enterpriseId = state.enterpriseId;
  let departmentId = state.departmentId;
  let leaderId = state.leaderId;
  let adminContentId = state.adminContentId;

  // 页面拦截：访问每个页面前都向后端发送一个请求,后端拦截器验证登录状态
  if (to.meta.requireAuth || to.path.startsWith('/admin')) {
    // Vue.prototype.$notify({
    //   message: '需要验证登录状态'
    // })
    axios.get('/authentication').then(resp => {
      if (resp.data.code === 200) {
        //页面-角色关系的验证
        //管理员
        if (to.path.startsWith('/admin')) {
          //管理员账户访问后台管理页面
          if (roleId == adminId || roleId == departmentId || roleId == adminContentId) {
            //第一次进入后台welcome页面，进行权限验证，并加载菜单
            if (!from.path.startsWith('/admin')) {
              Vue.prototype.$notify({
                message: '欢迎来到后台管理系统',
                type: 'success'
              })
              //缓存是否已有菜单
              if (store.state.adminMenus.length === 0) {
                initAdminMenu(router, store)
              }
              next()
            } else {
              //成功进入后台welcome页面后，不用加载菜单
              next()
            }
          } else {
            //非管理员账户访问后台管理页面
            confirmToLogin('管理员')
            return false
          }
        } else if (to.path.startsWith('/enterprise')) {
          //企业
          if (roleId == enterpriseId) {
            //判断该企业信息是否已经审核通过，是才可以进入招聘页面
            Vue.prototype.$axios.get('/enterprise/getOne?userId=' + userId).then(resp => {
              if (resp.data.code === 200) {
                next()
              } else if (resp.data.code === 204) {
                //提示需要完善信息认证
                next({
                  path: '/personCenter',
                })
                return false
              } else if (resp.data.code === 444) {
                //审核未通过状态
                next({
                  path: '/personCenter',
                })
                return false
              }
            })
          } else {
            confirmToLogin('企业')
            return false
          }
        } else if (to.path.startsWith('/leader')) {
          //教师
          if (roleId == leaderId) {
            next()
          } else {
            confirmToLogin('教师')
            return false
          }
        } else {
          //其它角色，这里先不处理
          next()
        }
      } else if (resp.data.code === 400) {
        Vue.prototype.$notify({
          message: '请求失败，' + resp.data.message, type: 'error'
        })
        login()
        return false
      }
    })
  } else {
    // Vue.prototype.$notify({
    //   message: '不需要验证登录状态'
    // })
    next()
  }

//登录并且携带登录成功后重定向路径
  function login() {
    next({
      path: 'login',
      query: {redirect: to.fullPath}
    })
    return
  }

//退出登录
  function logout() {
    Vue.prototype.$axios.get('/logout').then(resp => {
      if (resp.data.code === 200) {
        // 前后端状态保持一致
        Vue.prototype.$store.commit('logout')
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
      login()
    }).catch(() => {
      next(from.path)
    })
  }

// 初始化菜单
  const initAdminMenu = (router, store) => {
    // alert(to.path + '开始发起menu请求')
    axios.get('/menu').then(resp => {
      if (resp && resp.data.code === 200) {
        // alert('menu请求返回200响应，开始格式化')
        var fmtRoutes = formatRoutes(resp.data.data)

        /*清空路由，防止路由重复加载*/
        const newRouter = createRouter()
        router.matcher = newRouter.matcher

        router.addRoutes(fmtRoutes)
        store.commit('initAdminMenu', fmtRoutes)
        return
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

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
