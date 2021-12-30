import Layout from '@/layout'
export default [
  {
    path: '/system',
    name: 'system',
    meta: {
      title: '系统管理',
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
        path: 'menu',
        name: 'menu',
        meta: {
          title: '菜单管理',
          icon: 'form',
          permissionArray: [1, 2, 3],
          sortIndex: 2,
          newTime: '2022-05-20'
        },
        index: 20,
        component: () => import('@/views/autoRouter/system/menu.vue'),
        children: []
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          title: '用户管理',
          icon: 'form',
          permissionArray: [1, 2, 3],
          sortIndex: 1,
          newTime: '2022-05-20'
        },
        index: 10,
        component: () => import('@/views/autoRouter/system/user.vue'),
        children: []
      },
      {
        path: 'role/:id',
        name: 'role_id',
        meta: {
          title: '角色管理',
          icon: 'form',
          permissionArray: [1, 2, 3],
          sortIndex: 3,
          newTime: '2022-05-20'
        },
        index: 30,
        component: () => import('@/views/autoRouter/system/role_id/index.vue'),
        children: []
      }
    ]
  }
]
