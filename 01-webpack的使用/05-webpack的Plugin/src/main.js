
// 1. 使用commonjs的模块化规范
const {add} = require('./js/mathUtils.js')

console.log(add(10, 20))

// 2. 使用ES6的模块化规范
import {name, age} from "./js/info";

console.log(name, ':', age)

// 3. 依赖css文件, 这个文件只需要依赖, 不需要定义变量
require('./css/index.css')

// ES6转换成ES5
// npm install babel-loader@7 babel-core babel-preset-es2015 --save-dev

// 使用vue进行开发
import Vue from 'vue';

// TODO 我们还可以将App import

// App.vue 加载的话需要安装, vue-loader 和 vue-template-compiler --save-dev
const App = {
  template: `
    <div>
      <h2>{{message}}</h2>
    </div>
  `,
  data() {
    return {
      message: 'hello, webpack'
    }
  },

}

new Vue({
  // 如果同时有el 和 template, 那么会将template里的内容替换了 el的内容
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
})