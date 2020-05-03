<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommendView",
    props: {
      recommends: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style scoped>
  .recommend {
    /*水平布局*/
    display: flex;
    width: 100%;
    /*居中*/
    text-align: center;
    font-size: 12px;

    /*上下边距*/
    padding: 10px 0 20px;
    /*底部阴影*/
    border-bottom: 8px solid #eee;
  }

  .recommend-item {
    /*todo 这个是什么意思? 可以让他们均等分 */
    flex: 1;
  }

  .recommend-item img {
    width: 70px;
    height: 70px;
    /*图片底部加点距离*/
    margin-bottom: 10px;
  }

</style>
