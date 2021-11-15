/**
 * @author ff
 * @date 2021/7/29
 * @Description: 接口请求配置按模块划分
 * @update by:
 */

import request from './request'
import apiURL from './apiURL'
const accounts = apiURL[process.env.VUE_APP_BASE_API]
// 模块划分
const userUrl = accounts['user']
export const user = {
  login(params) {
    return request.post(`${userUrl}/user/login`, params)
  },
  getInfo(params) {
    return request.post(`${userUrl}/user/info`, params)
  },
  logout(params) {
    return request.post(`${userUrl}/user/logout`, params)
  }
}
