import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/tabbar/home/Home')
const Category = () => import('../views/tabbar/category/Category')
const Buycart = () => import('../views/tabbar/buycart/Buycart')
const Profile = () => import('../views/tabbar/profile/Profile')
const Detail = () => import('views/detail/Detail')

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
  },
  {
    path: '/detail/:id',
    component: Detail
  },
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 3. 导出router
export default router
