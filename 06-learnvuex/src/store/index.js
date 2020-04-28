import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import moduleA from "./modules/moduleA";

// 1. 安装插件
Vue.use(Vuex)

const state = {
  counter: 1000,
  // 管理一个数组
  students: [
    {id: 1, name: 'binbin', age: 20},
    {id: 2, name: 'doudou', age: 18},
    {id: 3, name: 'ifif', age: 20},
    {id: 4, name: 'heyi', age: 25}
  ],
  info: {
    name: '梁壁荧',
    age: 18
  }
}

// 2. 创建对象
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,

  modules: {
    a: moduleA
  }
})

// 3. 导出
export default store
