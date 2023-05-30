import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    // 是否第一次授权
    isGetterRouter: false,
    // 是否折叠
    isCollapsed: false,
    // 是否成功购买商品
    isBuy: 0,
    // 是否点击注册按钮
    isRegister: false,
    // 是否点击修改密码按钮
    isPassword: false,
    //存储当前登录用户信息
    userInfo: {},
    //存储商品分类信息
    gs: [],      //原分类
    gsInfo: [],  //新分类
    // 存储轮播图图片
    carousel: [],
    // 订单详情
    status: ["", "待发货", "送货中", "待收货", "订单已完成"],

  },
  getters: {
  },
  mutations: {
    // 更新新商品分类
    changeGsInfo(state, value) {
      state.gsInfo = []
      state.gsInfo = [
        ...state.gsInfo,
        ...value
      ]
    },
    // 更新原商品分类
    changeGs(state, value) {
      state.gs = []
      state.gs = [
        ...state.gs,
        ...value
      ]
    },
    // 更新轮播图信息
    changeCarousel(state, value) {
      state.carousel = []
      state.carousel = [
        ...state.carousel,
        ...value
      ]
    },
    // 修改用户登陆信息
    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    // 修改是否点击注册按钮
    changeRegister(state, value) {
      state.isRegister = value
    },
    // 修改isGetterRouter方法
    changeGetterRouter(state, value) {
      state.isGetterRouter = value
    },
    // 修改是否成功购买
    changeIsBuy(state, value) {
      state.isBuy = value
    },
    // 修改侧边栏状态
    changeCollapsed(state) {
      state.isCollapsed = !state.isCollapsed
    },
    // 修改是否点击修改密码按钮
    changeisPassword(state, value) {
      state.isPassword = value
    },
    // 清空用户信息
    clearUserInfo(state) {
      state.userInfo = {}
    },

  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths: ["isCollapsed", "userInfo", "gsInfo", "gs", "carousel"]  //控制是否持久化
  })],
})
