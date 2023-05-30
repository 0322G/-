import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import store from '@/store/index'
import Home from '@/views/home/Home.vue'
import Center from '@/views/center/Center.vue'
import SellGoods from '@/views/sell/SellGoods.vue'
import SellList from '@/views/sell/SellList.vue'
import MySell from '@/views/order/MySell.vue'
import MyBuy from '@/views/order/MyBuy.vue'
import MyCollect from '@/views/collect/MyCollect.vue'
import NotFound from '@/views/notfound/NotFound.vue'

import Shop from '@/views/Shop.vue'
const routes = [
  {
    path: '/',
    name: 'shop',
    component: Shop,
  },
  {
    path: '/Search/:value',
    name: 'Search',
    component: () => import("@/views/header/Search.vue"),
  },
  {
    path: '/Category/:value',
    name: 'Category',
    component: () => import("@/views/Category/Category.vue"),
  },
  {
    path: '/Good/:value',
    name: 'Good',
    component: () => import("@/views/good/Good.vue"),
  },
  {
    path: "/success/:gid/:oprice/:onum/:oadd",
    name: "success",
    component: () => import("@/views/good/Success.vue"),
  },
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
        path: "/sell/sellgoods",
        component: SellGoods,
      },
      {
        path: "/sell/selllist",
        component: SellList,
      },
      {
        path: "/sell/editgoods/:id",
        component: () => import('@/views/sell/GoodsEdit.vue'),
      },
      {
        path: "/order/mysell",
        component: MySell,
      },
      {
        path: "/order/mybuy",
        component: MyBuy,
      },
      {
        path: "/order/message/:oid/:sid",
        component: () => import('@/views/order/Message.vue'),
      },
      {
        path: "/mycollect",
        component: MyCollect,
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
  history: createWebHistory(),
  routes
})


// 每次跳转路由前拦截检测
router.beforeEach((to, from, next) => {
  // 进行登录或商城主页则直接跳转
  if (to.name === 'login' || to.name === "shop" || to.name === 'success') {
    next()
  } else {
    // 未授权，重定向到login
    if (!localStorage.getItem("token")) {
      next({
        path: "/login"
      })
    } else {
      // 第一次授权
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
