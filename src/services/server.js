/**
 * @author ff
 * @date 2021/4/28
 * @Description:处理axios配置
 * @update by:
 */
import axios from 'axios'
import { Toast } from 'vant'

const service = axios.create({
  headers: {}
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

    if (res.errno !== '0') {
      Toast.fail(res.message || 'Error')

      // sentry预留位置1 ---- 请不要删除
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Toast.fail(error.message || 'Error')
    // sentry预留位置2 ---- 请不要删除
    return Promise.reject(error)
  }
)
export default service
