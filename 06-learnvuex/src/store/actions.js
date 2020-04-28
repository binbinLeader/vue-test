import * as types from "./mutations-types";

export default {
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
}
