箭头函数
	01-箭头函数的基本使用
	
	// 1. 定义函数的方式: function
	
	// 2. 对象字面量中定义函数
	
	// 3. ES6中的箭头函数
	const ccc = (参数列表) => {
	}
	
	// 1. 参数问题
	const sum = (num1, num2) => {
	}
	// 放入一个参数
	const power = (num) => {}
	const power = num => {}
	
	// 2. 函数中使用
	const mul = () => log
	
	// 03-箭头函数中的this的使用
	// 什么时候使用箭头函数? 
	函数中的参数也是一个函数
	
	// 结论
	箭头函数中的this是如何查找的呢?
	答: 向外层作用域中, 一层层查找this, 直到有this的定义.
	
	window
	obj
	
	
	
前端渲染: 浏览器中显示的网页中的都身份内容, 都是由前端写的js代码在浏览器中执行, 最终渲染出来的网页.
后端渲染

后端路由: 后端处理url和和页面之间的映射关系
前端路由: 前端处理url和和页面之间的映射关系

SPA : simple page application 单页面富应用
	整个网页只有一个 html

location.hash='aaa' // 可以改变url


history.pushState({}, '', '')
history.back()

history.go(-1) // 此时是弹出一个, 和back()的效果相同
history.go(-2) // 此时是弹出两个

history.forward() // 相当于 history.go(1)
history.go(2) // 直接入栈两个

history.replaceState({}, '', 'home')


### 一. Vue CLI
1.1 runtime-compiler 和 runtime-only的区别
    ESLint 到底是什么?
    template -> ast -> render -> vdom -> 真实dom
    render: (h) => h -> createElement

1.2 Vue CLI3
    如何通过CLI3创建项目
    CLI3的目录结构
    配置文件: 
        1. Vue UI
        2. 隐藏的配置文件
        3. 自定义vue.config.js 

### 二. Vue-Router
2.1 什么是前端路由
    后端渲染/后端路由
    前后端分离
    SPA/ 前端路由
    
2.2 路由的基本配置
    安装vue-router
    Vue.use -> 创建VueRouter对象 -> 挂载到Vue实例上
    配置映射关系: 
        1. 创建组件
        2. 配置映射关系
        3. 使用 router-link/ router-view
        
2.3 细节处理
    默认路由: redirect
    mode: history
    router-link -> tag/replace/active-class
    
2.4 动态路由
    /user/:id
    this.$route.params.id
    
2.5 参数的传递
    params
    query -> URL
2.6 路由嵌套
    children: []
    
2.7 导航守卫
    全局导航守卫
    路由独享守卫
    组件类守卫

### 三. VueX

