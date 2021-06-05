
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
      'game_id': 123,
      'game_name': '牌圈1',
      'category_id': 2,
      'status': 1
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
