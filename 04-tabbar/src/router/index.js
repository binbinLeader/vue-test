import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/tabbar/home/Home')
const Category = () => import('../views/tabbar/category/Category')
const Buycart = () => import('../views/tabbar/buycart/Buycart')
const Profile = () => import('../views/tabbar/profile/Profile')

// 1. 安装插件
Vue.use(VueRouter)

// 2. 创建路由对象
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
    path: '/category',
    component: Category
  },
  {
    path: '/buycart',
    component: Buycart
  },
  {
    path: '/profile',
    component: Profile
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 3. 导出路由
export default router
