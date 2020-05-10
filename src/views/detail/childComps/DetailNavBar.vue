<template>
  <nav-bar>
    <div slot="left" class="back" @click="goBack">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="titles">
      <div class="title-item"
           v-for="(item, index) in titles"
           :class="{active: index === currentIndex}" @click="itemClick(index)">
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
      },
      goBack() {
        this.$router.go(-1)
        // this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .titles {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img {
    margin-top: 12px;
  }
</style>
