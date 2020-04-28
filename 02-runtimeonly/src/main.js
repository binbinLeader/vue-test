import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})

// render -> vdom -> UI
// runtime-only(1. 性能更高 2. 代码量更少)

// 那么.vue文件中的template是由谁处理的呢?
// 是由vue-template-compiler
