==================知识回顾==================
#### Promise
1.1 Promise的基本使用
    如何将异步操作放入到Promise中
    (resolve, reject) => then/catch

1.2 Promise的链式调用
    1. 每次return new Promise
    2. return Promise.resolve
    3. 直接返回就是一个Promise
    3.1 throw 异常

#### Vuex
    2.1 什么是状态管理
    2.2 Vuex的基本使用
        state -> 直接修改state 错误
        mutations -> devtools
    2.3 核心概念
        state -> 单一状态数
        getters ->
        mutations ->
        actions -> 异步操作(Promise)
        modules

    2.4 目录组织方式

#### 三. 网络请求封装
    3.1 网络请求方式的选择
    3.2 axios的基本使用
    3.3 axios的相关配置
    3.4 axios的创建实例
    3.5 axios的封装

#### 四. 项目开发
    创建新项目:

    1. 构建目录

    2. 引用了两个css

    3.  vue.config.js 配置别名
    	.editorconfig 配置项目代码风格

    4. 项目的模块划分: tabbar -> 路由映射关系

    5. 首页开发

    navbar的封装

    6. network 网络数据的请求
    轮播图
    推荐信息真实


1. 封装 goodslist
    goodsListItem

子组件传父组件，传递一个index
使用 switch currentType

