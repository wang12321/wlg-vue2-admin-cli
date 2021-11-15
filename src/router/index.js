import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)
/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // {
  //   path: '/home',
  //   component: () => import('@/views/autoRouter/home/index'),
  //   hidden: true
  // },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/404',
    component: Layout,
    children: [{
      path: '/404',
      name: '404',
      component: () => import('@/views/404'),
      meta: {
        title: '错误',
        isShowHead: 'b',
        lefttext: '返回首页'
      }
    }]
  }
]
export const asyncRouterMap = [
  ...routes,
  // 404 page must be placed at the end !!!
  { path: '*',
    redirect: '/404',
    hidden: true
  }
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
