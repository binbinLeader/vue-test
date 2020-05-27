<template>
  <div>
    {{goodsItem}}
  </div>
</template>

<script>
  export default {
    name: "CartListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return null;
        }
      }
    }
  }
</script>

<style scoped>

</style>
