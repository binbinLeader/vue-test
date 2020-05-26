import * as mutationTypes from './mutation-types'

export default {
  //
  addCart(context, payload) {
    // 此处我们使用了箭头函数
    // let oldProduct = null
    let oldProduct = context.state.cartList.find(item => item.id === payload.id);

    if (oldProduct) {
      context.commit(mutationTypes.ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      context.commit(mutationTypes.ADD_TO_CART, payload)
    }
  }
}
