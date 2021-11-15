import Layout from '@/layout'
export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
          isShowHead: 'showTitle',
          permissionArray: [1, 2, 3]
        },
        index: undefined,
        component: () => import('@/views/autoRouter/home/index.vue')
      },
      {
        path: 'mine',
        name: 'mine',
        meta: {
          title: '我的',
          isShowHead: 'showTitle'
        },
        index: undefined,
        component: () => import('@/views/autoRouter/mine/index.vue')
      }
    ]
  }
]
