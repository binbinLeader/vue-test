<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" v-show="tabControlIsFixed"
                 class="tab-control"/>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="getScrollPosition"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"
                   @homeSwiperImgLoad="homeSwiperImgLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2" />
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
  import HomeSwiper from "./childcomps/HomeSwiper";
  import HomeRecommendView from "./childcomps/HomeRecommendView";
  import FeatureView from "./childcomps/FeatureView";

  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";

  import NavBar from "components/common/navbar/NavBar";
  import {itemImgListenerMixin, backTopMixin} from "common/mixin";

  import {
    getHomeMulitData,
    getHomeGoods,
  } from "network/home"

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeRecommendView,
      NavBar,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins: [itemImgListenerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        tabControlOffsetTop: 0,
        popOffsetTop: 0,
        newOffsetTop: 0,
        sellOffsetTop: 0,
        scrollPosition: 0,
        tabControlIsFixed: false,
        saveY: 0,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1. 请求多个数据
      this.getHomeMulitData()

      // 2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    activated() {
      this.$refs.scroll.refresh()

      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      // 1. 保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      // 2. 取消全局事件的监听, 这里需要指定一个函数， 不然会取消所有的监听
      // 所以这里我们可以设置一个data进行监听
      this.$bus.$off('goodsItemImgLoad', this.homeItemImgLoad)
    },
    mounted() {

    },
    methods: {
      homeSwiperImgLoad() {
        // 此处我们就可以获取 轮播图的高度，从而设置tabControl的高度
        this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop

        this.popOffsetTop = this.tabControlOffsetTop
        this.newOffsetTop = this.tabControlOffsetTop
        this.sellOffsetTop = this.tabControlOffsetTop
      },
      tabClick(index) {
        // if (this.currentType === 'pop' | this.popOffsetTop === this.tabControlOffsetTop) {
        //   this.popOffsetTop = this.scrollPosition
        // } else if (this.currentType === 'new' && this.newOffsetTop === this.tabControlOffsetTop) {
        //   this.newOffsetTop = this.scrollPosition
        // } else if (this.currentType === 'sell' && this.sellOffsetTop === this.tabControlOffsetTop) {
        //   this.sellOffsetTop = this.scrollPosition
        // }
        console.log('pop:',this.popOffsetTop,' new:', this.newOffsetTop, ' sell:', this.sellOffsetTop)
        switch (index) {
          case 0:
            this.currentType = 'pop'
            this.$refs.scroll.scrollTo(0, -this.popOffsetTop, 0)
            break
          case 1:
            this.currentType = 'new'
            this.$refs.scroll.scrollTo(0, -this.newOffsetTop, 0)
            break
          case 2:
            this.currentType = 'sell'
            this.$refs.scroll.scrollTo(0, -this.sellOffsetTop, 0)
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index


      },
      getScrollPosition(position) {
        this.scrollPosition = -position.y
        // 1. 判断backTop是否提示
        this.listenerShowBackTop(position)
        // 2. 判断tabControl是否吸顶
        this.tabControlIsFixed = (-position.y) > this.tabControlOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)

        // 当加载到新的图片列表时, 可能会导致scroll计算错误, 导致无法完成拉到底部
        // 增加此方法, 重新计算即可
        this.$refs.scroll.refresh()
      },

      /**
       * 网络请求
       */
      getHomeMulitData() {
        getHomeMulitData().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*这里使用的是原生的滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }

  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/


</style>
