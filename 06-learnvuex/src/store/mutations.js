import * as types from "./mutations-types";
import Vue from "vue";

export default {
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
}
