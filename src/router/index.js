import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import utils from '../utils/util'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
// let admin = utils.getRole() !== 0 ? true : false
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/orders',
    component: Layout,
    redirect: '/orders/list',
    name: 'Orders',
    // hidden: admin,
    meta: { title: '订单', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'ordersList',
        component: () => import('@/views/order/order'),
        meta: { title: '订单', icon: 'table' }
      }
    ]
  },
  {
    path: '/notification',
    component: Layout,
    redirect: '/notification/create',
    name: 'Notifications',
    meta: { title: '服务号推送', icon: 'example' },
    children: [
      {
        path: 'create',
        name: 'createNotifications',
        component: () => import('@/views/notification/create'),
        meta: { title: '服务号推送', icon: 'table' }
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    meta: { title: '用户', icon: 'user' },
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'listUser',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表', icon: 'chart' }
      },
      {
        path: 'create',
        name: 'createUser',
        component: () => import('@/views/user/create'),
        meta: { title: '创建用户', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/weChat',
    name: 'Wechat',
    meta: { title: '微信公众平台', icon: 'wechat' },
    component: Layout,
    children: [
      {
        path: 'reply',
        name: 'Reply',
        component: () => import('@/views/weChat/reply/reply.vue'),
        meta: { title: '自动回复', icon: 'message' }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/weChat/menu/menu.vue'),
        meta: { title: '自定义菜单', icon: 'documentation' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
