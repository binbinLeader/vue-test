<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <home-swiper :banners="banners"/>

    <home-recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childcomps/HomeSwiper";
  import HomeRecommendView from "./childcomps/HomeRecommendView";

  import {getHomeMulitData} from "network/home"

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      // 1. 请求多个数据
      getHomeMulitData().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
