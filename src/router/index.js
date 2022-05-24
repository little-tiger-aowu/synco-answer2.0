import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    // 登录、首页
  {
    path:'/',
    name:'login',
    component:()=>import('../views/login')
  },
    // 介绍
  // {
  //   path:'/introduce',
  //   name: 'introduce',
  //   component:()=>import('../views/introduce')
  // },
    // 答题
  {
    path: '/answer',
    name: 'answer',
    component: () => import('../views/answer')
  },
    // 表单
  {
    path: '/form',
    name: 'form',
    component:() => import('../views/form')
  },
    // 奖品
  {
    path:'/reward',
    name:'reward',
    component:() => import('../views/reward')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let openId = VueCookies.get("openId")
  if (openId) {
    next()
  } else {
    if (to.path === '/' || to.path === '/login') { //这就是跳出循环的关键
      next()
    } else {
      next('/')
    }
  }
})

export default router
