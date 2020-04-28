<template>
  <div id="app">
    <p>-----------这里是app-------------</p>
    <p>这里是a模块中的内容</p>
    <p>{{this.$store.state.a.name}}</p>
    <button @click="updateName">修改名字</button>
    <p>{{this.$store.getters.fullName}}</p>
    <p>{{this.$store.getters.fullName2}}</p>
    <p>{{this.$store.getters.fullName3}}</p>
    <button @click="asyncUpdateName">异步修改名字</button>

    <p>这里是info, 用来测试info内容是否是响应式的</p>
    <p>{{this.$store.state.info}}</p>
    <button @click="updateInfo">修改info属性</button>
    <button @click="addInfo">增加info属性</button>

    <br>
    <br>
    <button @click="addStu">增加学生</button>
    <br>
    <br>
    <button @click="addCount(5)">增加5</button>
    <button @click="addCount(10)">增加10</button>

    <p>{{this.$store.state.counter}}</p>
    <button @click="add">+</button>
    <button @click="sub">-</button>

    <p>{{this.$store.getters.powerCounter}}</p>

    <p>{{this.$store.getters.getMore20Stu}}</p>
    <p>{{this.$store.getters.getMore20StuLength}}</p>
    <p>{{this.$store.getters.getAgeStu(18)}}</p>

    <p>---------------这里是HelloVuex-----------------</p>
    <hello-vuex></hello-vuex>
  </div>
</template>

<script>
  import HelloVuex from "./components/HelloVuex";
  import * as types from './store/mutations-types'

export default {
  name: 'App',
  components: {
    HelloVuex
  },
  methods: {
    add() {
      // this.$store.commit('addtions')
      this.$store.commit(types.ADDTION)
    },
    sub() {
      // this.$store.commit('substraction')
      this.$store.commit(types.SUBSTRACTION)
    },
    addCount(count) {
      // 1. 普通的提交风格:
      // this.$store.commit('addCount', count)
      // 2. 特殊的提交风格:
      this.$store.commit({
        type: 'addCount',
        count,
        age: 18
      })
    },
    addStu() {
      const stu = {id: 5, name: 'njnj', age: 25}
      // mutation这里传递的参数, 叫做 payload, 负载的意思
      this.$store.commit('addStu', stu)
    },
    addInfo() {
      this.$store.commit('addInfo')
    },
    updateInfo() {
      // this.$store.commit(types.UPDATE_INFO)
      // this.$store.dispatch(types.A_UPDATE_INFO, '我是payload')

      // 如果这里有其他的参数怎么办?
      // this.$store.dispatch(types.A_UPDATE_INFO, () => {
      //   console.log('里面已经完成了')
      // })

      // 这么办, 把payload变成一个对象
      // this.$store.dispatch(types.A_UPDATE_INFO, {
      //   message: '我是携带的信息',
      //   success: () => {
      //     console.log('里面已经完成了')
      //   }
      // })

      this.$store.dispatch(types.A_UPDATE_INFO, '我是携带的信息')
        .then(res => {
          console.log(res)
        })
    },
    updateName() {
      this.$store.commit('updateName', '陈晨')
    },
    asyncUpdateName() {
      this.$store.dispatch('aUpdateName')
    }
  },
  computed: {
    // getMore20Stu() {
    //   return this.$store.state.students.filter(s => {
    //     return s.age >= 19
    //   })
    // }
  }
}
</script>

<style>
</style>
