// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// TODO 传入组件
const cpn = {

}

new Vue({
  el: '#app',
  // components: { App },
  // template: '<App/>'
  render: function (createElement) {
    // 1. 普通用法: createElement('标签', {'标签的属性'}, ['标签的内容'])

    // 2. 组件用法: createElement(cpn)
  }
})

/*
runtime-compiler
步骤:
template -> ast(抽象语法树) -> render 函数 -> virtual dom -> 真实DOM
            abstract syntax tree
template -> ast 就是compiler

 */
