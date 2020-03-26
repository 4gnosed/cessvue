import Vue from 'vue'
import Vuex from 'vuex'

// Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。
// 它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户对象记录用户信息
    user: {
      username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
    },
    adminMenus: []
  },
  mutations: {
    // 触发对用户对象赋值的方法，使用到本地缓存localStorage，登录成功后将保存用户信息，不清除缓存则登录状态一直保持
    login (state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    },
    // 退出登录，将用户信息从localStorage移除
    logout (state) {
      state.user = []
      window.localStorage.removeItem('user')
      state.adminMenus = []
    },
    initAdminMenu (state, menus) {
      state.adminMenus = menus
    }
  }
})
