<template>
  <div class="recommend-info">
    <div class="info-header">热心推荐</div>
    <goods-list :goods="recommendList" />
  </div>
</template>

<script>
  import GoodsList from "components/content/goods/GoodsList";

  export default {
    name: "DetailRecommendList",
    components: {
      GoodsList
    },
    props: {
      recommendList: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend-info {
    padding: 5px;
  }

  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
</style>
