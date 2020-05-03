import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/tabbar/home/Home')
const Category = () => import('../views/tabbar/category/Category')
const Buycart = () => import('../views/tabbar/buycart/Buycart')
const Profile = () => import('../views/tabbar/profile/Profile')

// 1. 注册
Vue.use(VueRouter)

// 2. new 一个对象
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/Category',
    component: Category
  },,
  {
    path: '/Buycart',
    component: Buycart
  },,
  {
    path: '/Profile',
    component: Profile
  },
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 3. 导出router
export default router
