import axios from '../utils/request'
import path from './path'

const api = {

    // 获取新商品分类
    getGsInfo() {
        return axios.get(path.gsinfo)
    },
    // 获取原商品分类
    getGs() {
        return axios.get(path.gs)
    },
    // 获取轮播图图片
    carousel() {
        return axios.get(path.carousel)
    },
    // 获取搜索框检索结果
    getsearch(value) {
        return axios.post(path.getsearch, value)
    },
    // 获取某类所有商品
    gsgoods(value) {
        return axios.post(path.gsgoods, value)
    },
    // 获取某个商品
    getgood(value) {
        return axios.post(path.getgood, value)
    },
    // 获取最新商品推荐
    getnew() {
        return axios.get(path.getnew)
    },
    // 获取该用户购物车该商品数量
    cartgoods(value) {
        return axios.post(path.cartgoods, value)
    },
    // 添加购物车
    addgood(value) {
        return axios.post(path.addgood, value)
    },
    // 直接购买
    buygood(value) {
        return axios.post(path.buygood, value)
    },
    // 获取订单支付情况
    indent(value) {
        return axios.post(path.indent, value)
    },
    // 生成订单
    getindent(value) {
        return axios.post(path.getindent, value)
    },

    // 登陆接口检测
    getLogin(value) {
        return axios.post(path.login, value)
    },
    // 注册接口检测
    getRegister(value) {
        return axios.post(path.register, value)
    },
    // 更新个人信息
    getUpload(value, type) {
        return axios.post(path.upload, value, type)
    },
    // 更新密码
    getUppassword(value) {
        return axios.post(path.uppassword, value)
    },

    // 发布商品接口
    addGoods(value, type) {
        return axios.post(path.addgoods, value, type)
    },
    // 获取用户发布商品列表
    goodsList() {
        return axios.get(path.goodslist)
    },
    // 获取某个商品新信息
    getGood(value) {
        return axios.post(path.getGood, value)
    },
    // 更新某个商品信息
    upGoods(value, type) {
        return axios.post(path.upgoods, value, type)
    },
    // 删除某个商品
    deleteGoods(value) {
        return axios.post(path.deletegoods, value)
    },

    // 获取用户购买商品列表
    buyList() {
        return axios.get(path.buylist)
    },
    // 确认收货/去发货/货已送到
    receipt(value) {
        return axios.post(path.receipt, value)
    },
    // 删除购买/出售记录
    deletereceipt(value) {
        return axios.post(path.deletereceipt, value)
    },
    // 配送商品列表
    shipment() {
        return axios.get(path.shipment)
    },
    // 存储聊天信息
    message(value) {
        return axios.post(path.message, value)
    },
    // 获取对方手机号码和头像
    getphone(value) {
        return axios.post(path.getphone, value)
    },
    // 获取聊天记录
    getmessage(value) {
        return axios.post(path.getmessage, value)
    },
    // 评分
    start(value) {
        return axios.post(path.start, value)
    },

    // 获取用户购物车列表
    cartlist() {
        return axios.get(path.cartlist)
    },
    // 删除购物车商品
    deletecart(value) {
        return axios.post(path.deletecart, value)
    },
}

export default api