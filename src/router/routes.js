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
  }
]
