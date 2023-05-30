import axios from '../utils/request'
import path from './path'

const api = {
    // 管理员登陆
    getLogin(value) {
        return axios.post(path.login, value)
    },
    // 获取所有商品
    getgoods() {
        return axios.get(path.getgoods)
    },
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
    // 删除轮播图图片
    deleteCarousel(value) {
        return axios.post(path.deletecarousel, value)
    },
    // 添加轮播图图片
    addcarousel(value) {
        return axios.post(path.addcarousel, value)
    },
    //更新管理员信息
    getUpload(value, type) {
        return axios.post(path.upload, value, type)
    },
    //更新管理员密码
    getUppassword(value) {
        return axios.post(path.uppassword, value)
    },
    //获取用户列表
    getUserList() {
        return axios.get(path.userlist)
    },
    // 更新用户信息
    upUser(value) {
        return axios.post(path.upuser, value)
    },
    //删除用户
    deleteUser(value) {
        return axios.post(path.deleteuser, value)
    },
    // 获取所有订单
    indentlist() {
        return axios.get(path.indentlist)
    },
    // 删除某个商品
    deleteGoods(value) {
        return axios.post(path.deletegoods, value)
    },
    // 删除二级分类
    deletegs(value) {
        return axios.post(path.deletegs, value)
    },
    // 添加二级分类
    addgs(value) {
        return axios.post(path.addgs, value)
    },


}

export default api