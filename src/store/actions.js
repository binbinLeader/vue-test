import * as mutationTypes from './mutation-types'

export default {
  /**
   * 添加购物车
   * @param context
   * @param payload
   */
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 此处我们使用了箭头函数
      // let oldProduct = null
      let oldProduct = context.state.cartList.find(item => item.id === payload.id);

      if (oldProduct) {
        context.commit(mutationTypes.ADD_COUNTER, oldProduct)
        resolve('商品数量+1')
      } else {
        payload.count = 1
        context.commit(mutationTypes.ADD_TO_CART, payload)
        resolve('添加到购物车了!')
      }
    })
  }
}
