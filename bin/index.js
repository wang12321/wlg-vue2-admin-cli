import Vue from 'vue'
import ElementUI from 'element-ui'

// 引入 vue-ele-component-ff css
import 'vue-ele-component-ff/lib/index/style/index.css'
// 全部引入 vue-ele-component-ff js
import VueEleComponentFF from 'vue-ele-component-ff'

// 在ElementUI后调用
Vue.use(ElementUI).use(VueEleComponentFF)

// 注册为全局组件
Vue.component('menuManager', () => import('./UIKit/MenuManager'))
Vue.component('roleManager', () => import('./UIKit/RoleManager'))
Vue.component('userManager', () => import('./UIKit/UserManager'))

export let urlGlobal = 'http://127.0.0.1:9000'
export let tokenGlobal = 'token_pc:1519215551661504952513376eda58f4d289462c3f61c4a06c2'
export function setUrlToken(url, token) {
  urlGlobal = url
  tokenGlobal = token
}
