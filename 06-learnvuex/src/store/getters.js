export default {
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
}
