import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    // 是否第一次授权
    isGetterRouter: false,
    // 是否折叠
    isCollapsed: false,
    // 是否点击修改密码按钮
    isPassword: false,
    // 存储当前登录管理员信息
    adminInfo: {},
    // 存储所有商品信息
    goodsInfo: [],
    // 存储商品分类信息
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
    // 更新管理员信息
    changeAdminInfo(state, value) {
      state.adminInfo = {
        ...state.adminInfo,
        ...value
      }
    },
    // 更新所有商品信息
    changeGoodsInfo(state, value) {
      state.goodsInfo = []
      state.goodsInfo = [
        ...state.goodsInfo,
        ...value
      ]
    },
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
    // 是否点击修改密码
    changeisPassword(state, value) {
      state.isPassword = value
    },
    // 修改isGetterRouter方法
    changeGetterRouter(state, value) {
      state.isGetterRouter = value
    },
    // 修改侧边栏状态
    changeCollapsed(state) {
      state.isCollapsed = !state.isCollapsed
    },
    // 清空管理员信息
    clearAdminInfo(state) {
      state.adminInfo = {}
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths: ["isCollapsed", "adminInfo", "goodsInfo", "gsInfo", "gs", "carousel"]  //控制持久化
  })],
})
