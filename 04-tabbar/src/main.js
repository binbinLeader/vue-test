import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import router from './router'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
