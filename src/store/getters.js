export default {
  goodsCount(state) {
    return state.cartList.length
  },
  goodsList(state) {
    return state.cartList
  }
}
