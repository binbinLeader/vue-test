import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutations-types'

// 1. 安装插件
Vue.use(Vuex)

// 2. 创建对象
const store = new Vuex.Store({
  state: {
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
  },
  mutations: {
    [types.ADDTION](state) {
      state.counter++
    },
    [types.SUBSTRACTION](state) {
      state.counter--
    },
    addCount(state, payload) {
      // 普通的提交风格:
      // console.log(count)
      // 如果这里仅仅是传了一个count, 那么就可以直接使用count
      // state.counter += count

      // 特殊的提交风格:
      // 如果这里除了count, 还传了其他的参数, 那么这里就是一个对象, 我们使用payload
      console.log(payload)
      state.counter += payload.count
    },
    addStu(state, stu) {
      state.students.push(stu)
    },
    addInfo(state) {
      // state.info['address'] = '彬彬家'
      // Vue.set(state.info, 'address', '彬彬家')
      // delete state.info.age
      Vue.delete(state.info, 'age')
    },
    [types.UPDATE_INFO](state) {
      state.info.name = '鹤一'

      // 这是一段错误的代码, 不能在这里进行异步操作
      // setTimeout(() => {
      //   state.info.name = 'switch'
      // }, 1000)
    }
  },
  getters: {
    // 这个有点像是computed属性
    powerCounter(state) {
      return state.counter * state.counter
    },
    getMore20Stu(state) {
      return state.students.filter(s => s.age >= 20)
    },
    // 这里还可以有第二个参数, getters
    getMore20StuLength(state, getters) {
      return getters.getMore20Stu.length
    },
    getAgeStu(state) {
      // return function (age) {
      //   return state.students.filter(s => s.age > age)
      // }

      // 多多使用箭头函数
      return age => {
        return state.students.filter(s => s.age > age)
      }
    }
  },
  actions: {
    // 这里的context相当于是 store, 所以在这里可以进行commit
    aUpdateInfo(context, payload) {
      // setTimeout(() => {
      //   context.commit(types.UPDATE_INFO)
      //   payload()
      // }, 1000)

      // setTimeout(() => {
      //   context.commit(types.UPDATE_INFO)
      //   console.log(payload.message)
      //   payload.success()
      // }, 1000)

      // 第三种方式, 可以直接返回一个Promise, 这样就可以知道内部已经处理完成了
      return new Promise((resolve) => {
        setTimeout(() => {
          context.commit(types.UPDATE_INFO)
          resolve('resolve 已经完成了')
        }, 1000)
      })
    }
  },

  modules: {
    a: {
      state: {
        name: '陈晨'
      },
      mutations: {},
      actions: {},
      getters: {}
    },
    b: {

    }
  }
})

// 3. 导出
export default store
