import Layout from '@/layout'
export default [
  {
    path: '/reference-template',
    name: 'reference-template',
    meta: {
      title: '参考模板',
      icon: 'form',
      permissionArray: [1, 2, 3],
      sortIndex: 1,
      newTime: '2022-05-20'
    },
    index: 10,
    alwaysShow: false,
    component: Layout,
    children: [
      {
        path: 'template-one',
        name: 'template-one',
        meta: {
          title: '模板1',
          icon: 'form',
          permissionArray: [1, 2, 3],
          sortIndex: 2,
          newTime: '2022-05-20'
        },
        index: 20,
        component: () => import('@/views/auto-router/reference-template/template-one.vue'),
        children: []
      },
      {
        path: 'template-two',
        name: 'template-two',
        meta: {
          title: '模板2',
          icon: 'form',
          permissionArray: [1, 2, 3],
          sortIndex: 2,
          newTime: '2022-05-20'
        },
        index: 20,
        component: () => import('@/views/auto-router/reference-template/template-two.vue'),
        children: []
      }
    ]
  },
  {
    path: '/system-manager',
    name: 'system-manager',
    meta: {
      title: '系统管理',
      icon: 'form'
    },
    index: 99,
    alwaysShow: false,
    component: Layout,
    children: [
      {
        path: 'menu-manager',
        name: 'menu-manager',
        meta: {
          title: '菜单管理',
          icon: 'form',
          sortIndex: 3
        },
        index: 30,
        component: () => import('@/views/auto-router/system-manager/menu-manager/index.vue'),
        children: []
      },
      {
        path: 'role-manager',
        name: 'role-manager',
        meta: {
          title: '角色管理',
          icon: 'form',
          sortIndex: 3
        },
        index: 30,
        component: () => import('@/views/auto-router/system-manager/role-manager/index.vue'),
        children: []
      },
      {
        path: 'user-manager',
        name: 'user-manager',
        meta: {
          title: '用户管理',
          icon: 'form',
          sortIndex: 3
        },
        index: 30,
        component: () => import('@/views/auto-router/system-manager/user-manager/index.vue'),
        children: []
      }
    ]
  },
  {
    path: '/test',
    name: 'testp',
    meta: { title: 'test', icon: 'form' },
    index: 99,
    alwaysShow: false,
    component: Layout,
    children: [
      {
        path: '/test',
        name: 'test',
        meta: { title: 'test', icon: 'form' },
        index: 99,
        alwaysShow: false,
        component: () => import('@/views/auto-router/test.vue')
      }
    ]
  }
]

export const routerUrl = {
  Layout: () => import('@/layout/index'),
  'reference-template': () => import('@/views/auto-router/reference-template/_layout.vue'),
  'template-one': () => import('@/views/auto-router/reference-template/template-one.vue'),
  'template-two': () => import('@/views/auto-router/reference-template/template-two.vue'),
  'system-manager': () => import('@/views/auto-router/system-manager/_layout.vue'),
  'menu-manager': () => import('@/views/auto-router/system-manager/menu-manager/index.vue'),
  'role-manager': () => import('@/views/auto-router/system-manager/role-manager/index.vue'),
  'user-manager': () => import('@/views/auto-router/system-manager/user-manager/index.vue'),
  test: () => import('@/views/auto-router/test.vue')
}
