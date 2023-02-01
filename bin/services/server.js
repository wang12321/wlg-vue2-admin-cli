/**
 * @author ff
 * @date 2021/4/28
 * @Description:处理axios配置
 * @update by:
 */
import axios from 'axios'
import { Message } from 'element-ui'
import { tokenGlobal } from '../index'

const service = axios.create({
  headers: {
    Authorization: tokenGlobal
  }
})
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器
// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.errno ? Number(res.errno) !== 0 : Number(res.code) !== 200) {
      Message({
        message: '响应拦截：' + res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // sentry预留位置1 ---- 请不要删除
      return Promise.reject(new Error(res.message || res.msg || 'Error'))
    } else {
      return res
    }
  },
  async error => {
    if (!error.response) {
      Message({
        message: `${error.config.url}响应失败，请刷新浏览器重试。原因${error}`,
        type: 'error',
        duration: 3 * 1000
      })
    } else if (error.response.status === 401) {
      Message({
        type: 'error',
        message: '登录信息过期，跳转登录页401',
        duration: 3000
      })
    } else {
      Message({
        type: 'error',
        message: `错误状态码：${error.response.status}`,
        duration: 3000
      })
    }
    // sentry预留位置2 ---- 请不要删除
    return Promise.reject(error)
  }
)
export default service
