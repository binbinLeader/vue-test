<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Tabbar"
  }
</script>

<style scoped>
  #tab-bar {
    /*横向排列*/
    display: flex;
    /*背景色*/
    background-color: #f6f6f6;
    /*可以让整个tab-bar跑到下面*/
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /*添加阴影*/
    /*box-shadow: x轴 y轴 模糊程度 颜色*/
    box-shadow: 0px -3px 1px rgba(100,100,100,.2);
  }
</style>
