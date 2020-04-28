<template>
  <div id="app">
    replace 属性, 浏览器返回按钮就失效了, 使用 replaceState方法 <br> <br>
    tag: 可以指定标签 <br> <br>
    active-class : 激活的属性 <br> <br>
<!--    <router-link to="/home" tag="button" replace active-class="active">首页</router-link>-->
<!--    <router-link to="/about" tag="button" replace>关于</router-link>-->
    <br> 协议://主机:端口/路径?查询#片段
    <br> scheme://host:port/path?query#fragment

    <router-link to="/home" tag="button" replace active-class="active">首页</router-link>
    <router-link to="/about" tag="button" replace>关于</router-link>

<!--    <router-link :to="'/user/' + userId" tag="button" replace>用户</router-link>-->
<!--    <router-link :to="{path: '/profile', query: {name:'binbin', age:'18'}}">档案</router-link>-->

<!--    <button @click="homeClick">首页</button>-->
<!--    <button @click="aboutClick">关于</button>-->
    <button @click="userClick">用户</button>
    <button @click="profileClick">档案</button>

<!--    <router-view></router-view>-->
    <keep-alive exclude="Profile,User">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      userId: 'zhangsan'
    }
  },
  methods: {
    homeClick() {
      // this.$router.push('home')
      this.$router.replace('home')
      console.log('homeClick点击了')
    },
    aboutClick() {
      // this.$router.push('about')
      this.$router.push('about')
      console.log('aboutClick点击了')
    },
    userClick() {
      this.$router.replace('/user/' + this.userId) // 这里只能传一个路径
    },
    profileClick() {
      this.$router.replace({
        path:'/profile',
        query: {
          name: 'jiaobin',
          age: 18
        }
      })
    }
  }
}
</script>

<style>

</style>
