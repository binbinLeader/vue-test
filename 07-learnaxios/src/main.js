import Vue from 'vue'
import App from './App'
// import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})

// 1. axios普通使用
// axios({
//   url: ''
// })
// axios({
//   url: '',
//   method: 'get',
//   headers: {},
//   params: {id: 12}, // 参数
//   data: {key: 'post的方法中使用这个'}
// })

// 2. axios发送并发请求, all可以放入多个请求的结果
// axios.all([
//     axios({
//       url: ''
//     }),
//     axios({
//       url: '',
//       params: {
//         type: '',
//         page: 5
//       }
//     })
//   ])
//   .then(axios.spread((res1, res2) => {
//     console.log(res1);
//     console.log(res2);
//   }))

// // 使用全局配置
// axios.defaults.baseURL = ''
// axios.defaults.timeout = 5
//
// // 4. 创建对应的axios实例
// const instance1 = axios.create({
//   baseURL: 'http://123.207.32.32:8000',
//   timeout: 5000
// })
//
// instance1({
//   url: '/home/data',
//   params: {}
// }).then(res => {
//
// })

// 5. 封装request模块
import {request} from './network/request'

// 3. request 第三种方式进行调用, 使用new Promise()
request({
  url: '/home/multidata'
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})

// 2. request第二种方式进行调用, 都放到一个config下
// request({
//   baseConfig: '/home/multidata',
//   success: res => {
//     console.log(res);
//   },
//   failure: err => {
//     console.log(err);
//   }
// })

// 1. request第一种方式进行调用
// request({
//   url: '/home/multidata'
// }, function success(res) {
//   console.log(res);
// }, function failure(err) {
//   console.log(err);
// })

// 1. request第一种方式进行调用
// request({
//     url: '/home/multidata'
//   },
//   res => {
//     console.log(res);
//   },
//   err => {
//     console.log(err);
//   })
