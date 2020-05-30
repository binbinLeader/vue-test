<template>
  <div class="cart-list">
    <!--content高度为100%, 它外面的高度应该是一个固定的-->
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :goods-item="item"/>
    </scroll>
  </div>
</template>

<script>
  import CartListItem from "./CartListItem";

  import Scroll from "components/common/scroll/Scroll";

  import { mapGetters } from 'vuex'

  export default {
    name: "CartList",
    components: {
      CartListItem,
      Scroll
    },
    computed: {
      ...mapGetters({
        cartList: 'goodsList'
      })
    },
    activated() {
      // this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px)
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
