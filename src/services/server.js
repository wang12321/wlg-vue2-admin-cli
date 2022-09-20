/**
 * @author ff
 * @date 2021/4/28
 * @Description:处理axios配置
 * @update by:
 */
import axios from 'axios'
import { Message } from 'element-ui'
import { addPending, removePending } from './request-intercept'
import store from '@/store'

const service = axios.create({
  headers: {}
})
// request interceptor
service.interceptors.request.use(
  config => {
    // ------------------------------------------------------------------------------------
    removePending(config) // 在请求开始前，对之前的请求做检查取消操作
    addPending(config) // 将当前请求添加到 pending 中
    // ------------------------------------------------------------
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
    removePending(response) // 在请求结束后，移除本次请求
    setTimeout(() => {
      store.commit('user/SET_BTNLOADING', false)
    }, 500)

    const res = response.data
    if (Number(res.errno) !== 0) {
      Message({
        message: '响应拦截：' + res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // sentry预留位置1 ---- 请不要删除
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  async error => {
    setTimeout(() => {
      store.commit('user/SET_BTNLOADING', false)
    }, 500)
    if (axios.isCancel(error)) {
      console.log('repeated request: ' + error.message)
      return
    }
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
      await store.dispatch('user/resetToken')
      setTimeout(() => {
        window.location.reload()
      }, 3000)
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
