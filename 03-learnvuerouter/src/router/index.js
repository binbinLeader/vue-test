// 配置路由相关的信息
import VueRouter from 'vue-router'
import Vue from 'vue'

// import Home from '../components/Home'
// import About from "../components/About";
// import User from "../components/User";

// 1. 通过Vue.use(插件), 安装插件
Vue.use(VueRouter)

const Home = () => import('../components/Home')
const HomeNews = () => import('../components/HomeNews')
const HomeMessage = () => import('../components/HomeMessage')
const About = () => import('../components/About')
const User = () => import('../components/User')
const Profile = () => import('../components/Profile')

// 2. 创建路由对象
const routes = [
  // 在这里配置映射关系
  {
    path: '/',
    // 重定向
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    },
    children: [
      // {
      //   path: '',
      //   redirect: 'news' // 这里指向的应该是path, 子类中不需要加/
      // },
      {
        path: 'news',
        component: HomeNews
      },
      {
        path: 'message',
        component: HomeMessage
      }
    ]
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: '关于'
    },
    // beforeEnter() {
    //   console.log('进入BeforeEnter')
    //
    // }
  },
  {
    path: '/user/:userId',
    component: User,
    meta: {
      title: '用户'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '档案'
    }
  }
]
const router = new VueRouter({
  // 配置路由和组件之间的应用关系
  routes: routes,
  mode: 'history',
  linkActiveClass : 'active'
})

// 前置守卫(guard 守卫)
router.beforeEach((to, from, next) => {
  // 从from 跳转到to
  document.title = to.matched[0].meta.title
  // console.log(to);
  next()
})

// 后置钩子(hook 钩子, 回调)
router.afterEach((to, from) => {
  console.log('后置钩子');
})

// 3. 将router对象传入到Vue实例
export default router
