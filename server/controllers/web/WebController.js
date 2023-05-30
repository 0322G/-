const WebService = require("../../services/web/WebService");
const JWT = require("../../util/JWT");
require("../../util/JWT")

const WebController = {

    // 获取所有商品信息
    getgoods: async (req, res) => {
        const result = await WebService.getgoods()
        res.send({
            ActionType: "ok",
            data: result
        })
    },


    // 获取新商品分类
    gsinfo: async (req, res) => {
        var result = await WebService.gsinfo()
        res.send({
            //登陆成功标志
            ActionType: "ok",
            //返回商品分类信息
            data: result
        })
    },
    // 获取原商品分类
    gs: async (req, res) => {
        const result = await WebService.gs()
        res.send({
            ActionType: "ok",
            data: result
        })
    },
    // 获取轮播图信息
    carousel: async (req, res) => {
        const result = await WebService.carousel()
        res.send({
            ActionType: "ok",
            data: result
        })
    },
    // 删除轮播图图片
    deletecarousel: async (req, res) => {
        const result = await WebService.deletecarousel(req.body.id)
        if (result) {
            res.send({
                ActionType: "ok",
            })
        } else {
            res.send({
                ActionType: "no",
            })
        }
    },
    // 添加轮播图图片
    addcarousel: async (req, res) => {
        const gid = Number(req.body.gid)
        console.log(gid);
        const result = await WebService.addcarousel(gid)
        if (result) {
            res.send({
                ActionType: "ok",
            })
        } else {
            res.send({
                ActionType: "no",
            })
        }
    },
    // 获取搜索框检索结果
    getsearch: async (req, res) => {
        const search = req.body.value
        const result = await WebService.getsearch(search)
        if (result.length === 0) {
            res.send({
                ActionType: "no",
            })
        } else {
            res.send({
                ActionType: "ok",
                data: result
            })
        }
    },
    // 获取某类所有商品信息
    gsgoods: async (req, res) => {
        const gs2 = Number()
        const result = await WebService.gsgoods(Number(req.body.gs2))
        res.send({
            ActionType: "ok",
            data: result
        })
    },
    // 获取某个商品信息
    getgood: async (req, res) => {
        const result = await WebService.getgood(Number(req.body.gid))
        if (result.length === 0) {
            res.send({
                ActionType: "no",
                data: result[0]
            })
        } else {
            res.send({
                ActionType: "ok",
                data: result[0]
            })
        }
    },
    // 获取最新商品推荐
    getnew: async (req, res) => {
        const result = await WebService.getnew()
        res.send({
            ActionType: "ok",
            data: result
        })
    },


}

module.exports = WebController