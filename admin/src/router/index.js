import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainBox from '../views/MainBox.vue'

import store from '@/store/index'

import Home from '@/views/home/Home.vue'
import Center from '@/views/center/Center.vue'
import User from '@/views/user/User.vue'
import Order from '@/views/order/Order.vue'
import Goods from '@/views/goods/Goods.vue'
import Sort from '@/views/sort/Sort.vue'
import NotFound from '@/views/notfound/NotFound.vue'

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/mainbox",
    name: "mainbox",
    component: MainBox,
    children: [
      {
        path: "/home",
        component: Home,
      },
      {
        path: "/center",
        component: Center,
      },
      {
        path: "/user",
        component: User,
      },
      {
        path: "/order",
        component: Order,
      },
      {
        path: "/goods",
        component: Goods,
      },
      {
        path: "/sort",
        component: Sort,
      },
      {
        path: "/:pathMatch(.*)*",
        name: "Notfound",
        component: NotFound
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // 进行登录则直接跳转
  if (to.name === 'login') {
    next()
  } else {
    // 未授权，重定向到login
    if (!localStorage.getItem("token")) {
      next({
        path: "/login"
      })
    } else {
      // 第一次授权，先添加嵌套路由再跳转
      if (!store.state.isGetterRouter) {
        // 修改第一次授权标志
        store.commit("changeGetterRouter", true);
        next({
          path: to.fullPath
        })
      } else {
        // 不是第一次授权，直接跳转
        next()
      }
    }
  }
})

export default router
