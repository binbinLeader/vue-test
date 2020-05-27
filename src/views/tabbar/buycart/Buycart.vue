<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{goodsCount}})</div>
    </nav-bar>

    <!--商品列表-->
    <cart-list />

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childcomps/CartList";

  import { mapGetters } from 'vuex'

  export default {
    name: "Buycart",
    components: {
      NavBar,
      CartList
    },
    computed: {
      // goodsLength() {
      //   return this.$store.state.cartList.length
      // }
      ...mapGetters([
        'goodsCount',
        'goodsList'
      ])
    }
  }
</script>

<style scoped>
  #cart {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
</style>
