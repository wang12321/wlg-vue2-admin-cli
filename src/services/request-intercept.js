/**
 * @author ff
 * @date 2021/12/30
 * @Description:过滤axios相同请求
 * @update by: 加入全局请求状态--vuex user.js 里面
 */

import axios from 'axios'
import store from '@/store'
import { whiteConfig } from './white-list'

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()
/**
 * 添加请求
 * @param {Object} config
 */
export const addPending = (config) => {
  const url = [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data)
  ].join('&')
  if (config.method === 'post' || config.method === 'patch') {
    store.commit('user/SET_BTNLOADING', true)
  }
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
    if (!pending.has(url)) { // 如果 pending 中不存在当前请求，则添加进去
      pending.set(url, cancel)
    }
  })
}
/**
 * 移除请求
 * @param {Object} config
 */
export const removePending = (config) => {
  const url = [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data)
  ].join('&')
  const urlConfig = config.url || ''
  if (pending.has(url) && whiteConfig.filter(item => urlConfig.indexOf(item) > -1).length === 0) { // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}
/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}
