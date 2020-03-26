import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '../components/home/AppIndex'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
import AdminIndex from '../components/admin/AdminIndex'

Vue.use(Router)

export default new Router({
  // 从默认的hash模式设置为history模式，url不带#
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // home页面不需要被访问，只是作为为多个页面添加父导航栏的作用
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          // 元数据requireAuth该页面是否需要拦截
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/',
      name: 'index',
      redirect: '/index',
      component: AppIndex,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminIndex,
      meta: {
        requireAuth: true
      },
      children: [
      ]
    }
  ]
})

// 用于创建默认路由
export const createRouter = routes => new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Default',
      redirect: '/home',
      component: Home
    },
    {
      // home页面并不需要被访问，只是作为其它组件的父组件
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex
        }
        // {
        //   path: '/jotter',
        //   name: 'Jotter',
        //   component: Articles
        // },
        // {
        //   path: '/jotter/article',
        //   name: 'Article',
        //   component: ArticleDetails
        // },
        // {
        //   path: '/admin/content/editor',
        //   name: 'Editor',
        //   component: Editor,
        //   meta: {
        //     requireAuth: true
        //   }
        // },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminIndex,
      meta: {
        requireAuth: true
      },
      children: [
        // {
        //   path: '/admin/dashboard',
        //   name: 'Dashboard',
        //   component: DashBoard,
        //   meta: {
        //     requireAuth: true
        //   }
        // }
      ]
    }
    // {
    //   path: '*',
    //   component: Error404
    // }
  ]
})
