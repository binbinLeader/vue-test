<template>
  <div>
    <h2>{{message}}</h2>
    <h2>{{this.$store.state.counter}}</h2>
  </div>
</template>

<script>
  export default {
    name: "HelloVuex",
    data() {
      return {
        message: '你好, vuex',
        // counter: 0
      }
    }
  }
</script>

<style scoped>

</style>
