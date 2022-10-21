import { userModule, menuInfo } from '@/services/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    btnLists: [],
    isBtnLoading: false // 全局请求状态
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_BTNLOADING: (state, loading) => {
    state.isBtnLoading = loading
  },
  SET_BTNLISTS: (state, data) => {
    state.btnLists = data
  }

}

// 列表转树
function listToTree(dataSource) {
  dataSource = dataSource.filter(el => el.menuType === 1)
  return dataSource
    .filter(e => {
      const pid = e.menuParentId
      const resultArr = dataSource.filter(ele => {
        if (!ele.children) {
          ele.children = []
        }
        if (ele.id === pid) {
          ele.children.push(e)
          ele.children.sort((a, b) => a.sort - b.sort)
          return true
        }
      })
      return resultArr.length === 0
    })
    .sort((a, b) => a.sort - b.sort)
}
const actions = {
  menuDataList({ commit }, userInfo) {
    const { getCurrentUserMenuApi } = menuInfo
    return new Promise((resolve, reject) => {
      getCurrentUserMenuApi().then((res) => {
        let menuTree = []
        if (res && res.data) {
          const btns = res.data.filter(el => el.menuType === 2)
          commit('SET_BTNLISTS', btns)
          menuTree = listToTree(res.data)
        }
        resolve(menuTree)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user login
  login({ commit }, userInfo) {
    const { postUserLoginApi } = userModule
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      postUserLoginApi({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getUserInfo({ commit, state }) {
    const { postUserInfoApi } = userModule
    return new Promise((resolve, reject) => {
      postUserInfoApi({ token: getToken() }).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { name } = data
        commit('SET_NAME', name)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

