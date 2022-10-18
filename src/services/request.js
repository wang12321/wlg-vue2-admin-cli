/**
 * @author ff
 * @date 2022/10/12
 * @Description: 配置get post put delete 可自定义方法扩展
 * @update by:
 */
import server from './server'

const request = {
  /**
   * methods: 请求
   * @param url 请求地址
   * @param params 请求参数
   */
  get(url, params, headers) {
    const config = {
      method: 'get',
      url: url
    }
    if (headers) {
      for (const key in headers) {
        if (headers[key]) {
          config.headers[key] = headers[key]
        }
      }
    }
    if (params) config.params = params
    return server(config)
  },
  post(url, params, headers) {
    const config = {
      method: 'post',
      url: url
    }
    if (headers) {
      for (const key in headers) {
        if (headers[key]) {
          config.headers[key] = headers[key]
        }
      }
    }
    if (params) config.data = params
    return server(config)
  },

  put(url, params, headers) {
    const config = {
      method: 'put',
      url: url
    }
    if (headers) {
      for (const key in headers) {
        if (headers[key]) {
          config.headers[key] = headers[key]
        }
      }
    }
    if (params) config.params = params
    return server(config)
  },
  delete(url, params, headers) {
    const config = {
      method: 'delete',
      url: url
    }
    if (headers) {
      for (const key in headers) {
        if (headers[key]) {
          config.headers[key] = headers[key]
        }
      }
    }
    if (params) config.params = params
    return server(config)
  }
}
export default request
