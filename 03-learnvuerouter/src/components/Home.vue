<template>
  <div>
    <h2>我是首页</h2>

    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message">消息</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        path: '/home/news'
      }
    },
    created() {
      console.log('home 创建的时候会回调')
    },
    mounted() {
      console.log('挂载到dom中的时候会回调')
    },
    updated() {
      console.log('界面发生刷新的时候会回调')
    },
    destroyed() {
      console.log('home 销毁了');
    },

    // 这两个函数, 只有该组件被保持了状态, 使用了keep-alive时, 才是有效的
    activated() {
      console.log('home activated');
      this.$router.push(this.path)
    },
    deactivated() {
      console.log('home deactivated');
    },
    beforeRouteLeave(to, from, next) {
      // 在这里对path重新赋值
      console.log(this.$route.path)
      this.path = this.$route.path

      // 此处必须有next(), 不然不会往下走了
      next()
    }
  }
</script>

<style scoped>

</style>
