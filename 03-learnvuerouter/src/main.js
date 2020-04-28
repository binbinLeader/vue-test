import Vue from 'vue'
import App from './App'
import router from "./router";
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

// const obj = {
//   'name':'binbin'
// }
// Object.defineProperty(obj, 'age', 18)
//
// console.log(obj)
