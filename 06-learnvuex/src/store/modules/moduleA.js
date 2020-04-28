export default {
  state: {
    name: '板板'
  },
  mutations: {
    updateName(state, payload) {
      state.name = payload
    }
  },
  getters: {
    fullName(state) {
      return state.name + '1111'
    },
    fullName2(state, getters) {
      return getters.fullName + '22222'
    },
    fullName3(state, getters, rootState) {
      return getters.fullName2 + rootState.counter
    }
  },
  actions: {
    // 此处context 也有一个commit， 但是此处的commit指的是module自己的mutations
    aUpdateName(context) {
      console.log(context);
      setTimeout(() => {
        context.commit('updateName', '有有')
      }, 1000)
    },
    // 此处使用了对象的解构
    aUpdateName2({state, commit, rootState}) {
      commit('updateName') // 此处是指的mutations中的方法
    }
  }
}
