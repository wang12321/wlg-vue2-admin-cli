import Vue from 'vue'
import 'vant/lib/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import * as filters from './filters' // global filters
import Vant from 'vant'
// rem转换
import '@/utils/rem.js'

import Navigation from 'vue-navigation'

Vue.use(Navigation, { router })

Vue.use(Vant)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

