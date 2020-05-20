<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                    @titleClick="titleClick"
                    ref="detailNavBar"/>

    <scroll class="content"
            ref="scroll"
            :probeType="3"
            @scroll="scrollContent">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="goodsDetailInfo" @detailInfoImgLoad="goodsDetailInfoImgLoad"/>
      <detail-goods-params :goods-param-info="goodsParams" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <detail-recommend-list :recommend-list="recommendList" ref="recommend"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />

    <detail-bottom-bar/>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailGoodsParams from "./childComps/DetailGoodsParams";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailRecommendList from "./childComps/DetailRecommendList";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import {
    getDetail,
    Goods,
    Shop,
    GoodsParams,
    getRecommendList
  } from "network/detail"
  import {itemImgListenerMixin, backTopMixin} from "common/mixin";
  import {debounce} from "common/utils";

  export default {
    name: "Detail",
    components: {
      Scroll,

      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailGoodsParams,
      DetailCommentInfo,
      DetailRecommendList,
      DetailBottomBar
    },
    mixins: [itemImgListenerMixin, backTopMixin],
    data() {
      return {
        id: null,
        topImages: [],
        goods: {},
        shop: {},
        goodsDetailInfo: {},
        goodsParams: {},
        commentInfo: {},
        recommendList: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    created() {
      this.id = this.$route.params.id
      getDetail(this.id).then(res => {
        // console.log(res.result);
        const data = res.result
        // 1. 轮播图
        this.topImages = data.itemInfo.topImages
        // 2. 商品基本信息的展示
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 3. 商品店铺信息
        this.shop = new Shop(data.shopInfo)
        // 4. 商品图片的展示
        this.goodsDetailInfo = data.detailInfo
        // 5. 商品参数详情展示
        this.goodsParams = new GoodsParams(data.itemParams.info, data.itemParams.rule)
        // 6. 评论信息的展示
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0]
        }

        // 7. 商品推荐信息展示
        getRecommendList().then( (res, error) => {
          this.recommendList = res.data.list
        })

        // 8. 这里虽然是created, 但是当使用debounce时, 是会访问多次的, 所以可以等到渲染结束了
        this.getThemeTopY = debounce(() => {
          // 在图片加载完了， 我们设置一下高度
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)
        }, 100)
      })

    },
    deactivated() {
      // 在这里取消加载完事件的监听
      this.$bus.$off('goodsItemImgLoad', this.itemImgLoad)
    },
    mounted() {

    },
    methods: {
      goodsDetailInfoImgLoad() {
        // 此时图片加载完了, 我们进行一次页面刷新
        // this.$refs.scroll.refresh()

        // 为了防止频繁调用， 我们使用防抖处理
        this.newRefresh()

        // debounce生成了一个新的函数, 我们在这里可以做一个调用
        this.getThemeTopY()

      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
      },
      scrollContent(position) {
        // 在这里监听滚动位置
        // positionY 在 0~themeTopYs[0] 之间时 0
        // positionY 在 themeTopYs[0]~themeTopYs[1] 之间时 1
        // positionY 在 themeTopYs[1]~themeTopYs[2] 之间时 2
        // positionY 在 themeTopYs[3]~MAX 之间时 3

        //
        const positionY = -position.y
        for (let i = 0; i < this.themeTopYs.length; i++) {
          if ( (this.currentIndex !== i)
                  && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ) {
            this.currentIndex = i
            this.$refs.detailNavBar.currentIndex = this.currentIndex
          }
        }

        this.listenerShowBackTop(position)
      }
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }

  .back-top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  }
</style>
