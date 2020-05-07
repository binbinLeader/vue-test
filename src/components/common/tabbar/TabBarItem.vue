<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
<!--    <div :class="{active: isActive}">-->
    <div :style="isActiveStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      isActiveStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    /*均等分*/
    flex: 1;
    /*文字居中*/
    text-align: center;
    /*tab-bar的高度一般都是49px*/
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 30px;
    height: 30px;
    /*图片上方留一些空间*/
    margin-top: 3px;
    /*去除图片最下面多出来的3px个像素*/
    vertical-align: middle;
  }

  .active {
    color: red;
  }
</style>
