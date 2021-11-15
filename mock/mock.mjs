import Koa from 'koa'
const app = new Koa()
import KoaRouter from 'koa-router'
const router = new KoaRouter()
import cors from 'koa2-cors'
import bodyparser from 'koa-bodyparser'
app.use(bodyparser())

// 跨域
app.use(cors({
  origin: function(ctx) {
    // 这里用 headers 和 header 属性皆可
    return ctx.header.origin
  }
}))

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

// 游戏
router.get('/user/gamelist', ctx => {
  const info = gamelist['data']
  ctx.body = fhcode(info)
})

// 登入
router.post('/user/login', ctx => {
  const { username } = ctx.request.body
  const token = tokens[username] || { token: 'admin-token' }
  ctx.body = fhcode(token)
})

// 用户信息
router.post('/user/info', ctx => {
  const { token } = ctx.request.body
  const info = users[token]
  ctx.body = fhcode(info)
})

// =======省外
// 登入
router.post('/sw/user/login', ctx => {
  const { username } = ctx.request.body
  const token = tokens[username]
  ctx.body = fhcode(token)
})

// 用户信息
router.post('/sw/user/info', ctx => {
  const { token } = ctx.request.body
  const info = users[token]
  ctx.body = fhcode(info)
})

// =======新环境
// 登入
router.post('/new/user/login', ctx => {
  const { username } = ctx.request.body
  const token = tokens[username]
  ctx.body = fhcode(token)
})

// 用户信息
router.post('/new/user/info', ctx => {
  const { token } = ctx.request.body
  const info = users[token]
  ctx.body = fhcode(info)
})
function fhcode(obj, msg, code) {
  return {
    errno: code || '0',
    msg: msg || '操作成功！',
    data: obj || {}
  }
}
app.use(router.routes()) // 启动路由
app.use(router.allowedMethods())
app.listen(9000, console.log('application is start at port 9000'))
