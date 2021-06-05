import Vue from 'vue'
import Router from 'vue-router'
import { routerName } from './routerName'

Vue.use(Router)
/* Layout */
import Layout from '@/layout'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

// 实现自动生成路由配置文件======================================
// 懒加载
const requireAllVueComponents = require.context('../views/autoRouter', true, /\.vue$/, 'lazy')
const routerList = []
const routerMap = {}

requireAllVueComponents.keys().forEach((allVueComponentItem) => {
  const completeName = allVueComponentItem.match(/\w+\.vue$/, '')[0]
  const routerObj = {}
  routerObj.path = '/' + allVueComponentItem.replace(/\./, 'autoRouter').replace(/.vue$/, '')
  routerObj.name = completeName.replace(/.vue$/, '')
  routerObj.component = () => requireAllVueComponents(allVueComponentItem).default || requireAllVueComponents(allVueComponentItem)

  // router 子路径
  const routerChildren = {
    path: '',
    component: routerObj.component,
    name: routerObj.name,
    meta: {
      title: '',
      icon: '',
      permissionArray: []
    }
  }
  // router 路径
  const router = {
    path: '',
    component: Layout,
    meta: {
      title: '',
      icon: '',
      permissionArray: []
    },
    children: []
  }

  const routerArr = routerObj.path.split('/')
  let isSame = true
  // 过滤所有components下的子组件，无需生成路由
  if (routerArr.includes('common')) {
    return
  }
  // 初始化属性值
  const routerAttribute = function(name, attribute) {
    const init = {
      index: 1,
      icon: 'component',
      name: name,
      permission: [1, 2, 3],
      newTime: new Date()
    }
    if (attribute === 'newTime') {
      return (routerName[name] && routerName[name] !== '' && routerName[name][attribute]) ? new Date(routerName[name][attribute]) : init[attribute]
    }
    return (routerName[name] && routerName[name] !== '' && routerName[name][attribute]) ? routerName[name][attribute] : init[attribute]
  }
  // 设置父属性值
  const parentAttribute = (name) => {
    router.index = routerAttribute(name, 'index')
    router.meta.icon = routerAttribute(name, 'icon')
    router.meta.title = routerAttribute(name, 'name')
    router.meta.permissionArray = routerAttribute(name, 'permission')
    router.meta.newTime = routerAttribute(name, 'newTime')
  }
  // 设置子属性值
  const childrenAttribute = (name) => {
    routerChildren.index = routerAttribute(name, 'index')
    routerChildren.meta.icon = routerAttribute(name, 'icon')
    routerChildren.meta.title = routerAttribute(name, 'name')
    routerChildren.meta.newTime = routerAttribute(name, 'newTime')
    routerChildren.meta.permissionArray = routerAttribute(name, 'permission')
  }
  switch (routerArr.length) {
    case 3:
      // 处理接口请求放回router情况
      routerMap[routerObj.name] = routerObj.component

      // 当路由不是嵌套路径时 直接push到routerList中
      parentAttribute(routerObj.name)
      router.children.push(routerChildren)
      routerChildren.path = routerObj.path + ((routerName[routerObj.name] && routerName[routerObj.name] !== '' && routerName[routerObj.name]['isID']) ? routerName[routerObj.name]['isID'] : '')
      childrenAttribute(routerObj.name)
      routerList.push(router)
      break
    case 4:
      // 处理接口请求放回router情况
      routerMap[routerObj.name] = routerObj.component

      // 当路由是嵌套路径时，如果routerList中包含改路径，则在children中加入子路径，否则在routerList中push。
      router.path = routerArr[2] === routerArr[3] ? '/' + routerArr[2] + 'p' : '/' + routerArr[1] + '/' + routerArr[2]
      router.name = routerArr[2] + 'p'
      router.meta.breadcrumb = routerArr[2] !== routerArr[3]
      parentAttribute(routerArr[2])
      routerChildren.path = routerArr[3] + ((routerName[routerObj.name] && routerName[routerObj.name] !== '' && routerName[routerObj.name]['isID']) ? routerName[routerObj.name]['isID'] : '')
      childrenAttribute(routerObj.name)
      routerList.forEach(item => {
        if (routerArr[2] + 'p' === item.name) {
          item.children.push(routerChildren)
          isSame = false
        }
      })
      if (isSame) {
        router.children.push(routerChildren)
        routerList.push(router)
      }
      break
  }
})

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
    }]
  }
]

// 自动获取modules配置
const files = require.context('./modules', false, /\.js$/)
let tmp
files.keys().forEach(key => {
  tmp = files(key).default
})

export const asyncRouterMap = [
  ...routerList,
  { ...tmp },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 解决router.addRoutes 报name重复警告
router.$addRoutes = (params) => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
  router.addRoutes(params)
}
export default router
