const app = new Vue({
  el: '#app',
  data: {
    menus: [
      {
        id: 1,
        name: '炒馒头',
        date: '周一',
        price: 6,
        count: 1
      },
      {
        id: 2,
        name: '泡方便面',
        date: '周二',
        price: 5,
        count: 1
      },
      {
        id: 3,
        name: '炒馒头',
        date: '周三',
        price: 10,
        count: 1
      },
      {
        id: 4,
        name: '羊肉串',
        date: '周四',
        price: 8.9,
        count: 1
      }
    ]
  },
  methods: {
    // 这里我们使用过滤器来做
    getFinalPrice(price) {
      return '￥' + price.toFixed(2)
    },
    increment(index) {
      this.menus[index].count++
    },
    decrement(index) {
      this.menus[index].count--
    },
    removeMenu(index) {
      this.menus.splice(index, 1)
    }
  },
  computed: {
    totalPrice() {
      let totalPrice = 0;
      // 1. for (let i = 0; i < this.menus.length; i++)

      // 2. for (let i in this.menus)
      // for (let i in this.menus) {
      //   console.log(i);
      // }

      // 3. for (let menu of this.menus)
      for (let menu of this.menus) {
        totalPrice += menu.price * menu.count
      }

      // 4. reduce

      return totalPrice
    }
  },
  filters: {
    // 过滤器中是方法
    showPrice(price) {
      return '￥' + price.toFixed(2)
    }
  }
})

// 编程范式: 命令式编程/ 声明式编程
// 编程范式: 面向对象编程(第一公民: 对象)/ 函数式编程(第一公民: 函数) 好处: 可以进行链式编程
const nums = [1,22,3,4333,5,622]
// filter/map/reduce 函数式编程做法:
nums.filter(function (n) {
  return n < 100
}).map(function (n) {
  return n * 2
}).reduce(function (preValue, n) {
  return preValue + n
}, 0)
let newNums = []
// todo 箭头写法不会
newNums = nums.filter(n > n < 100).map(n > n * 2).reduce((pre, n) > pre + n)
console.log('链式编程：', newNums);
// 1. filter函数的使用:
// filter 中的回调函数有一个要求, 必须返回一个boolean值
// true: 当返回true时, 函数内部会自动将这次回调的n加入到新的数组中
// false: 当返回false时, 函数内部会过滤掉这次的n
let newNums = []
newNums = nums.filter(function (n) {
  return n < 100
})
console.log(newNums);

// 2. map函数的使用:
let new2Nums = []
new2Nums = newNums.map(function (n) {
  return n * 2
})
console.log(new2Nums);

// 3. reduce函数的使用
// reduce 作用是对数组中所有的内容进行汇总
// reduce(参数1: 方法, 参数2: 初始化值)
let total = 0
total = new2Nums.reduce(function (preValue, n) {
  return preValue + n
}, 0)
console.log('总数是:', total);
// 第一次: preValue 0                    n 数组中的第一个值
// 第二次: preValue 函数中计算返回的值    n 数组中的第二个值
// ...

// 链式编程示范:
let total = nums.filter(function (n) {

})




// 普通做法:
// // 1. 需求: 去除所有小于100的数字
// let newNums = []
// for (let num of nums) {
//   if (num < 100) {
//     newNums.push(num)
//   }
// }
//
// // 2. 将所有小于100的数字进行转化: 全部 * 2
// let new2Nums = []
// for (let num of newNums) {
//   new2Nums.push(num * 2)
// }
//
// // 3. 将所有new2Nums数字相加, 得到最终的结果
// let total = 0
// for (let num of new2Nums) {
//   total += num
// }
// console.log(total);

