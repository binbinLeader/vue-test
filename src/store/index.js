import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

// 1. 注册
Vue.use(Vuex)

const state = {
  cartList: []
}
// 2. new 一个对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// 3. 导出
export default store
