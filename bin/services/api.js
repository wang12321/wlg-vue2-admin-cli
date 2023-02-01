/**
 * @author ff
 * @date 2021/7/29
 * @Description: 接口请求配置按模块划分
 * @update by:
 */

import request from './request'
import { urlGlobal } from '../index'

// 模块划分
const systemUrl = urlGlobal
export const menuModule = {
  // 添加菜单,更新菜单
  postInsertOrUpdateApi(params) {
    return request.post(`${systemUrl}/v1/auth/menu/insertOrUpdate`, params)
  },
  // 删除菜单
  postDeleteByIdsApi(params) {
    return request.post(`${systemUrl}/v1/auth/menu/deleteByIds`, params)
  },
  // 分页获取菜单列表
  postQueryMenuByPageApi(params) {
    return request.post(`${systemUrl}/v1/auth/menu/queryMenuByPage/${params.page}/${params.rows}`, params)
  },
  // 获取菜单树
  getMenuTreeApi(params) {
    return request.get(`${systemUrl}/menu/getMenuTree`, params)
  },
  // 获取用户授权的菜单
  getCurrentUserMenusApi(params) {
    return request.get(`${systemUrl}/v1/auth/menu/getCurrentUserMenu`, params)
  }
}

export const roleModule = {
  // 添加/更新角色
  postRoleInsertOrUpdateApi(params) {
    return request.post(`${systemUrl}/v1/auth/role/insertOrUpdate`, params)
  },
  // 删除角色
  postRoleDeleteRoleApi(params) {
    return request.post(`${systemUrl}/v1/auth/role/deleteRole`, params)
  },
  // 分页获取角色列表
  postRoleQueryRoleByPageApi(params) {
    return request.post(`${systemUrl}/v1/auth/role/queryRoleByPage/${params.page}/${params.rows}`, params)
  }
}

export const usersModule = {
  // 添加/更新用户
  postUserInsertOrUpdateApi(params) {
    return request.post(`${systemUrl}/v1/auth/admin-user/insertOrUpdate`, params)
  },
  // 删除用户
  postUserDeleteRoleApi(params) {
    return request.post(`${systemUrl}/v1/auth/admin-user/deleteById`, params)
  },
  // 分页获取用户列表
  postUserQueryAdminUserByPageApi(params) {
    return request.post(`${systemUrl}/v1/auth/admin-user/queryAdminUserByPage/${params.page}/${params.rows}`, params)
  }
}

export const menuInfo = {
  // 菜单信息
  getCurrentUserMenuApi() {
    return request.get(`${systemUrl}/v1/auth/menu/getCurrentUserMenu`)
  }
}
