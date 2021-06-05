
const tokens = {
  superadmin: {
    token: 'superadmin-token'
  },
  admin: {
    token: 'admin-token'
  },
  employees: {
    token: 'employees-token'
  }
}

const users = {
  'superadmin-token': {
    permission: [1],
    introduction: 'I am a super admin',
    name: '超级管理员'
  },
  'admin-token': {
    permission: [2],
    introduction: 'I am an admin',
    name: '管理员'
  },
  'employees-token': {
    permission: [3],
    introduction: 'I am an employees',
    name: '普通员工'
  }
}

const menu = {
  'data': [{
    'menuID': '10000000',
    'menuName': '系统管理',
    'icon': 'form',
    'url': 'system',
    'newTime': '2021-05-30',
    'children': [
      {
        'menuID': '10001000',
        'menuName': '用户管理',
        'icon': 'form',
        'url': 'user/:id',
        'children': null,
        'newTime': '2021-05-30'
      },
      {
        'menuID': '10002000',
        'menuName': '菜单管理',
        'icon': 'form',
        'url': 'menu',
        'children': null
      }
    ]
  }]
}
const gamelist = {
  'data': [
    {
      'game_id': 66,
      'game_name': '赣牌圈',
      'category_id': 2,
      'status': 1
    },
    {
      'game_id': 28,
      'game_name': '余干麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 30,
      'game_name': '常熟麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 35,
      'game_name': '修水麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 37,
      'game_name': '武宁麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 38,
      'game_name': '高安麻将',
      'category_id': 1,
      'status': 0
    },
    {
      'game_id': 40,
      'game_name': '鄱阳麻将',
      'category_id': 1,
      'status': 0
    },
    {
      'game_id': 42,
      'game_name': '龙南麻将',
      'category_id': 1,
      'status': 0
    },
    {
      'game_id': 8,
      'game_name': '九江麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 45,
      'game_name': '南康麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 9,
      'game_name': '上饶麻将',
      'category_id': 1,
      'status': 0
    },
    {
      'game_id': 47,
      'game_name': '德兴麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 17,
      'game_name': '赣州麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 18,
      'game_name': '新余麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 48,
      'game_name': '弋阳麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 50,
      'game_name': '婺源麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 51,
      'game_name': '汾阳麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 54,
      'game_name': '上海麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 56,
      'game_name': '乐安麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 57,
      'game_name': '南丰麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 60,
      'game_name': '泰和麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 62,
      'game_name': '瑞金麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 72,
      'game_name': '都昌棋牌',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 73,
      'game_name': '国标麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 800,
      'game_name': '测试环境',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 12,
      'game_name': '红中麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 67,
      'game_name': '赣牌圈2',
      'category_id': 2,
      'status': 1
    },
    {
      'game_id': 22,
      'game_name': '青海麻将',
      'category_id': 2,
      'status': 1
    },
    {
      'game_id': 801,
      'game_name': '测试环境test',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 10,
      'game_name': '二人麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 13,
      'game_name': '滑水麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 16,
      'game_name': '鹰潭麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 20,
      'game_name': '西安麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 29,
      'game_name': '乐平麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 36,
      'game_name': '遂川麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 43,
      'game_name': '上栗麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 44,
      'game_name': '景德镇麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 46,
      'game_name': '崇仁麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 49,
      'game_name': '安福麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 58,
      'game_name': '广昌麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 59,
      'game_name': '万年麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 64,
      'game_name': '新建麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 75,
      'game_name': '赣牌圈预留',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 99,
      'game_name': '赣牌圈',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 258,
      'game_name': 'jinganmjsrv',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 277,
      'game_name': '宝清麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 71,
      'game_name': '张家港麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 14,
      'game_name': '宜春麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 11,
      'game_name': '吉安麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 15,
      'game_name': '抚州麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 25,
      'game_name': '杭州麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 39,
      'game_name': '东乡麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 41,
      'game_name': '信丰麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 52,
      'game_name': '宁都麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 53,
      'game_name': '峡江麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 55,
      'game_name': '新疆麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 61,
      'game_name': '敦厚麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 65,
      'game_name': '横峰麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 68,
      'game_name': '广东麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 69,
      'game_name': '永修麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 70,
      'game_name': '靖江麻将',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 802,
      'game_name': 'test',
      'category_id': 2,
      'status': 1
    },
    {
      'game_id': 74,
      'game_name': '赣牌圈2',
      'category_id': 2,
      'status': 0
    },
    {
      'game_id': 81,
      'game_name': '扬州平台',
      'category_id': 2,
      'status': 1
    },
    {
      'game_id': 803,
      'game_name': '跑得快',
      'category_id': 2,
      'status': 1
    },
    {
      'game_id': 7,
      'game_name': '中至江西',
      'category_id': 2,
      'status': 0
    }
  ],
  'errno': '0'
}
module.exports = [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]
      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 200,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: '没有token'
        }
      }

      return {
        code: 200,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  // user gamelist
  {
    url: '/user/gamelist',
    type: 'get',
    response: _ => {
      const info = gamelist['data']
      return {
        code: 200,
        data: info
      }
    }
  },
  {
    url: '/user/menu',
    type: 'post',
    response: _ => {
      const info = menu['data']
      return {
        code: 200,
        data: info
      }
    }
  }

]
