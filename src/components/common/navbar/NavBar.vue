<template>
  
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    /*可以直接撑起来*/
    line-height: 44px;
    text-align: center;
    box-shadow: 0px 1px 1px rgba(100,100,100,.2);
  }

  .left, .right {
    width: 60px;
  }

  .center {
    flex: 1;
  }
</style>