import { constantRoutes, asyncRouterMap } from '@/router'
import { routerUrl as routerMaps } from '@/router/routes'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.permissionArray) {
    return roles.some(role => route.meta.permissionArray.includes(role))
  } else {
    return true
  }
}

// 左侧菜单排序
const compare = function(prop) {
  return function(obj1, obj2) {
    const val1 = obj1[prop]
    const val2 = obj2[prop]
    if (val1 < val2) {
      return -1
    } else if (val1 > val2) {
      return 1
    } else {
      return 0
    }
  }
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  routes = routes.sort(compare('index'))
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

// 映射服务器返回菜单与本地component
function generateAsyncRouter(serverRouterMap, children = false) {
  return serverRouterMap.map(item => {
    const isParent = item.children && item.children.length > 0
    const parent = generateRouter(item, !children && !isParent ? true : isParent, children)
    if (isParent) {
      parent.children = generateAsyncRouter(item.children, true)
    } else {
      if (!children) {
        parent.children = [generateRouter(item, isParent, children)]
      }
    }
    return parent
  })
}

const generateRouter = (item, isParent, children) => ({
  path: '/system/menu-manager',
  // path: (isParent || !children) ? (item.menuCode.indexOf('/') === 0 ? item.menuCode : `/${item.menuCode}`) : item.menuCode || '',
  name: (isParent && !children) ? item.menuCode + 'p' : item.menuCode || '',
  alwaysShow: false,
  meta: { title: item.menuName, icon: item.menuIcon || 'from', id: item.id, noCache: false },
  component: isParent && !children ? routerMaps['Layout'] : routerMaps['menu-manager'] || routerMaps['']
})

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  // 根据权限生成动态路由
  generateRoutes({ commit }, menuInfo) {
    return new Promise(resolve => {
      if (menuInfo) {
        console.log(1111, menuInfo)

        console.log(111, generateAsyncRouter(menuInfo))
        const accessedRoutes = generateAsyncRouter(menuInfo)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      } else {
        const accessedRoutes = filterAsyncRoutes(asyncRouterMap, [1])
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
