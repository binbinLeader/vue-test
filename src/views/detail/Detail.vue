<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>

    <scroll class="content">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="goodsDetailInfo"/>
      <detail-goods-params :goods-param-info="goodsParams"/>
    </scroll>

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

  import {
    getDetail,
    Goods,
    Shop,
    GoodsParams
  } from "network/detail"

  export default {
    name: "Detail",
    components: {
      Scroll,

      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailGoodsParams
    },
    data() {
      return {
        id: null,
        topImages: [],
        goods: {},
        shop: {},
        goodsDetailInfo: {},
        goodsParams: {}
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
      })


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
