import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_zonst_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const preSetLocalStorageKey = 'preSetLocalStorage'
export function setPreSetLocalStorage(data) {
  return localStorage.setItem(preSetLocalStorageKey, data)
}
export function getPreSetLocalStorage() {
  return localStorage.getItem(preSetLocalStorageKey)
}

// 切换环境
const isUseMasterApiKey = 'isUseMasterApiKey'
export function setIsUseMasterApiKey(data) {
  return localStorage.setItem(isUseMasterApiKey, data)
}
export function getIsUseMasterApiKey() {
  return localStorage.getItem(isUseMasterApiKey)
}

const isGameIdKey = 'isGameIdKey'
export function setIsGameIdKey(data) {
  return localStorage.setItem(isGameIdKey, data)
}
export function getIsGameIdKey() {
  return localStorage.getItem(isGameIdKey)
}
