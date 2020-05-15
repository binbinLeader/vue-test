<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>

    <scroll class="content">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
    </scroll>

  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";

  import {getDetail, Goods, Shop} from "network/detail"

  export default {
    name: "Detail",
    components: {
      Scroll,

      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo
    },
    data() {
      return {
        id: null,
        topImages: [],
        goods: {},
        shop: {}
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
        console.log(this.shop);
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
