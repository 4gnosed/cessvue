import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '../components/AppIndex'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
import AdminIndex from '../components/admin/AdminIndex'
import StudentIndex from "../components/student/StudentIndex";
import EnterpriseIndex from "../components/enterprise/EnterpriseIndex";
import LeaderIndex from "../components/leader/LeaderIndex";
import PersonCenter from "../components/PersonCenter";
import Resume from "../components/student/Resume";

Vue.use(Router)

export default new Router({
  // 从默认的hash模式设置为history模式，url不带#
  mode: 'history',
  routes: [
    {
      path: '/login',
      alias: '/admin/login',
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
        },
        {
          path: '/student',
          name: 'StudentIndex',
          component: StudentIndex,
        },
        {
          path: '/enterprise',
          name: 'EnterpriseIndex',
          component: EnterpriseIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/leader',
          name: 'LeaderIndex',
          component: LeaderIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/personCenter',
          name: 'PersonCenter',
          component: PersonCenter,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/resume',
          name: 'Resume',
          component: Resume,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/',
      name: 'home',
      redirect: '/home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: '/admin/welcome',
      component: AdminIndex,
      meta: {
        requireAuth: true
      }
    }
  ]
})

// 用于清空路由,防止路由重复加载
export const createRouter = routes => new Router({
  // 从默认的hash模式设置为history模式，url不带#
  mode: 'history',
  routes: [
    {
      path: '/login',
      alias: '/admin/login',
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
        },
        {
          path: '/student',
          name: 'StudentIndex',
          component: StudentIndex,
        },
        {
          path: '/enterprise',
          name: 'EnterpriseIndex',
          component: EnterpriseIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/leader',
          name: 'LeaderIndex',
          component: LeaderIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/personCenter',
          name: 'PersonCenter',
          component: PersonCenter,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/',
      name: 'home',
      redirect: '/home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: '/admin/welcome',
      component: AdminIndex,
      meta: {
        requireAuth: true
      }
    }
  ]
})
