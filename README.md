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
    推荐信息的展示


1. 封装 goodslist
    goodsListItem

子组件传父组件，传递一个index
使用 switch currentType


一. FeatureView
    独立组件封装FeatureView
        div>a>img

二. TabControl
    独立组件的封装
        props -> titles
        div>根据titles v-for遍历 div->span{{title}}
        css相关
        选中哪一个tab, 哪一个tab的文字颜色变色, 下面border-bottom
            使用currentIndex

三. 首页商品数据的请求
    3.1 设计数据结构, 用于保存数据
    goods: {
        pop: page/list
        new: page/list
    }

    3.2 发送数据请求
    在home.js中封装getHomeGoods
    在Home.vue中, 又在 methods中getHomeGoods(type)
    调用getHomeGoods('pop')
        page: 动态的获取对应的page
    获取到的数据: res
        this.goods[type]list.push(...res.data.list)
        this.goods[type].page += 1

四. 对商品数据进行展示
    4.1 封装GoodsList.vue组件
    props: goods -> list[30]
    v-for goods -> GoodsListItem [30]
    GoodsListItem组件 -> GoodsItem(数据)

   4.2 封装GoodsListItem.vue组件
    props: goodsItem
    goodsItem: 取出数据, 并且使用正确的div/span/img基本标签进行展示

五. 对滚动进行重构: Better-Scroll
    5.1 在index.html中使用Better-Scroll
    const bscroll = new BScroll(el, { })
    注意: wrapper -> content -> 很多内容
    1. 监听滚动
        probeType: 0/1/2(手指滚动)/3(只要是滚动)
        bscroll.on('scroll', (position) => {})
    2. 上拉加载
        pullUpLoad: true
        bscroll.on('pullingUp', () => {})
    3. 监听点击
        click: true
        button 可以不写, 也可以监听
        div    必须写, 不然不会监听

    5.2 在vue项目中使用better-scroll
        在Profile.vue中简单的演示
        对Better-Scroll进行封装: Scroll.vue
        Home.vue和Scroll.vue之间进行通信
            Home.vue中将probeType设置为3
            Scroll.vue需要通过$emit,实时将时间发送到Home.vue

六. 回到顶部BackTop
    6.1 对BackTop.vue组件进行封装
        div->img

    6.2 如何监听组件的点击
        直接监听back-top的点击, 但是可以监听?
            不可以, 必须添加修饰.navtive
        回到顶部
            scroll对象, scroll.scrollTo(x, y, time), 封装成方法
            this.$refs.scroll.scrollTo(0,0,500)
    6.3 BackTop组件的显示和隐藏
        isShowBackTop: false
        监听滚动, 拿到滚动的位置:
            position.y > 1000 -> isShowBackTop: true
            (-position.y) > 1000

七. 解决首页中Better-Scroll可滚动区域的问题
    Better-Scroll在决定有多少区域可以滚动时, 是根据scrollerHeight属性决定的
        scrollerHeight 属性是根据 Better-Scroll的content中的子组件的高度
        但是我们的首页中, 刚开始在计算scrollerHeight属性时, 是没有将图片计算在内的
        所以, 计算出来的高度是错误的(1300+)
        后来图片加载进来之后, 有了新的高度, 但是scrollerHeight属性并没有进行更新,
        所以滚动出现了问题

    如何解决这个问题?
        监听每一张图片是否加载完成, 只要有一张图片加载完成了, 执行一次refresh()
        如何监听图片加载完成了?
            原生的js监听图片: img.onload = function() {}
            Vue中的监听: @load="方法"
        调用scroll的refresh()
        $bus.$emit()
        $bus.$on()
    如何将GoodsListItem.vue中的时间传入到Home.vue中?
        因为涉及到非父子组件的通信, 所以这里我们选择了 事件总线
        bus->总线
        1. Vue.prototype.$bus = new Vue()
        2. this.$bus.$emit('事件名称', 参数)
        3. this.$bus.$on('事件名称', 回调函数)

    问题一. refresh找不到的问题
        第一: 在Scroll.vue中, 调用this.scroll的方法之前, 判断this.scroll对象是否有值
        第二: 在mounted生命周期函数中使用this.$refs.scroll, 而不是在created中

    问题二. 对于refresh非常频繁的问题, 进行防抖操作
        防抖debounce/节流throttle
        防抖函数起作用的过程:
            如果我们直接执行refresh, 那么refresh函数会被执行30次.
            可以将refresh函数传入到debounce函数中, 生成一个新的函数.
            之后在调用非常频繁的时候, 就是用新生成的函数.
            而新生成的函数, 并不会非常频繁的调用, 如果下一次执行来的非常快, 那么会将上一次取消掉
            ```
                debounce(func, delay) {
                    let timer = null
                    return function(...args) {
                        if (timer) clearTimeout(timer)
                        timer = setTimeout(() => {
                            func.apply(this, args)
                        }, delay)
                    }
                }
            ```

    八. 下拉加载更多

    九. TabControl的吸顶效果
        9.1 获取到tab-control 的 offsetTop值
            必须知道滚动到多少时, 开始有吸顶效果, 这个时候就需要获取tabControl的offsetTop
            但是, 如果直接在mounted中获取tabControl的offsetTop, 那么值是不正确的,
            如何获取正确的值了?
                监听HomeSwiper中img的加载完成
                加载完成后, 发出时间, 在Home.vue中, 获取正确的值.
                不充:
                    为了不让HomeSwiper多次发出事件, 可以使用isLoad的变量进行状态的记录
                注意: 这里不进行多次调用和debounce的区别
        9.2 监听滚动, 动态改变tabControl的样式
            问题: 动态改变tabControl的样式时, 会出现两个问题:
                问题一: 下面的商品内容, 会突然上衣
                问题二: tabControl虽然设置了fixed, 但是也随着Better-Scroll一起滚出去了
            其他方案来解决停留问题:
                在最上面, 多复制了一份PlaceHolderTabControl组件对象, 利用它来实现停留效果
                当用户滚动到一定位置时, PlaceHolderTabControl显示出来
                当用户滚到没有达到一定位置时, PlaceHolderTabControl隐藏起来

十. 让Home保持原来的状态
    10.1 让Home不要随意销毁掉
        keep-alive
    10.2 让Home中的内容保持原来的位置
        离开时保存一个位置信息saveY
        进来时， 将位置设置为原来保存的位置saveY信息即可
            注意： 最好回来时， 进行一次refresh()


### 详情页实现思路:
一. 点击商品进入详情页
二. 解决-首页保持位置状态
三. 详情页的导航栏实现
四. 请求详情的数据
五. 轮播图的实现

六. 商品基本信息的展示
    数据来自四面八方
    对数据进行汇总: 一个对象当中.
    一个对象传入到子组件中
七. 店铺信息的展示

八. 商品图片的展示

九. 参数信息的展示
    老师上课遇到遍历的问题

十. 评论信息的展示
    时间格式化
    将服务器返回的时间戳->date-> 格式化

十一. 推荐数据的展示
    请求推荐数据
    GoodsList展示数据

十二. mixin的使用
    创建混入对象: const mixin = {}
    组件对象中: mixins: [mixin]


十四. 标题和内容的联动效果
    1. 点击标题, 滚动到对应的主题

十五. 顶部工具栏的封装

十六. 详情页的回到顶部
    home.vue 和 detail.vue回到顶部: mixin

十七. 点击加入购物车
    17.1 监听加入购物按钮的点击, 并且获取商品信息
        监听
        获取商品信息: iid/price/image/title/desc
    17.2 将商品添加到Vuex中
        安装Vuex
        配置Vuex
        定义mutations, 将商品添加到state.cartList
        重构代码:
            将mutations中的代码抽取到actions中(定义两个mutations)
            将mutations/actions单独抽取到文件中

十八. 购物车的展示
    18.1 购物车导航栏的展示
    18.2 购物车商品的展示
        CartList -> Scroll
        CartListItem -> CheckButton

    18.3 商品的选中和不选中切换
        修改模型对象, 改变选中和不选中

    18.4 底部工具栏的汇总
        全选按钮
        计算总价格
        去计算

十九. 购物车的全选按钮
    显示的状态
        判断是否有一个不选中, 全选就是不选中
    点击全选按钮
        如果原来都是选中, 点击一次, 全部不选中
        如果原来都是不选中(某些不选中), 全部选中


二十. 添加购物车弹窗
	20.1 Vuex的补充
		Actions可以返回一个Promise
		mapActions的映射关系
		
	20.2 Toast(土司)封装
		普通封装方式
		插件封装方式
		
二十一. 补充一些细节
	21.1 fastClick减少点击延迟
		安装fastclick
		导入
		调用attach函数

	21.2 图片的懒加载
		什么是图片懒加载?
			图片需要显示在屏幕上时, 再加载这个图片
		使用vue-lazyload
			1. 安装
			2. 导入
			3. Vue.use
			4. 修改img :src -> v-lazy
			
// 1. 在js中使用正则: /正则相关规则/
// 2. exclude中存放元素必须是正则表达式
// 3. 安装排除的文件写对应的正则:
	正则的规则:
		1. ^abc: 开头
		2. abd$: 必须以什么内容结尾



















































