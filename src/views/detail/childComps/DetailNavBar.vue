<template>
  <nav-bar class="detail-nav">
    <div slot="left" class="back" @click="goBack">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div class="title-item"
           v-for="(item, index) in titles"
           :class="{active: index === currentIndex}"
           @click="itemClick(index)">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        // 此处我们可以发出一个事件，告诉用户正在点击的是什么
        this.$emit('titleClick', index)
      },
      goBack() {
        this.$router.go(-1)
        // this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .detail-nav {
    background-color: #fff;
    font-weight: normal;
  }

  .title {
    display: flex;
    padding: 0 20px;
    font-size: 14px;
  }

  .title-item {
    flex: 1;
  }

  .title-item.active {
    color: var(--color-high-text);
  }

  .back {
    margin-top: 8px;
  }
</style>
