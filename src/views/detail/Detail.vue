<template>
  <div>
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
    <detail-goods-info :detail-info="goods"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";

  import {getDetail, Goods} from "network/detail"

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailGoodsInfo
    },
    data() {
      return {
        id: null,
        topImages: [],
        goods: {}
      }
    },
    created() {
      this.id = this.$route.params.id
      getDetail(this.id).then(res => {
        console.log(res.result);
        const data = res.result
        // 1. 轮播图
        this.topImages = data.itemInfo.topImages
        // 2. 商品基本信息的展示
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.service)
      })


    }
  }
</script>

<style scoped>

</style>
