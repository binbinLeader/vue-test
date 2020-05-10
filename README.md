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
                补充:
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
















