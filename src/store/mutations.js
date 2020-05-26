import * as mutationTypes from './mutation-types'

export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每个方法尽可能完成的事件比较单一， 类似于dao
  [mutationTypes.ADD_COUNTER](state, payload) {
    payload.count++
  },
  [mutationTypes.ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  }
}
