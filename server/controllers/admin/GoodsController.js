const GoodsService = require("../../services/admin/GoodsService");
const axios = require('axios')

const cors = require('cors')

// 引入token加解密函数
const JWT = require("../../util/JWT");

// 引入支付宝支付
const AlipaySdk = require("alipay-sdk").default
const alipaySdk = new AlipaySdk({
    appId: '2021000122693288',//appId
    signType: 'RSA2',//签名算法
    gateway: 'https://openapi.alipaydev.com/gateway.do',//支付宝网关地址
    alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwEsYlpKKV42X5G16FXuTQG8wTk+gfJXlUsocij5NrSMav03YQGxveREEFcFzJnUsayAIrGfYtSrmuli17iXj+8NrBJ5kqMHe/+aQSWYhkBfOkddknjtg/d822KnmWwrJk61YC/fJJCKfAzlhbd+L5dfAOCiNf7T6EOpCC9psRozWR4cwaJT1BEdvAd3AJ+WaLmMy7YmmOYkN9Z33uaQh5bm3K7GQY+Y8L5lh+4c1hV+pzMuVrdBz4nTjq137FJb5fi1aWILQOFmLmg5JPJNMvUw12BueOFrACVpjfLXaA1qaz2vQufiMXiGjAH9T5OkYXV451YPJWOAD5T2MeR25FQIDAQAB',//支付宝公钥
    privateKey: 'MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCSqS4CTHvVJjl+6ncI5hUetgo8o/OxFmylEWzl4/6A2JL4V8oVp3ZIA2fIMGfDZmSndbN7ZK84vN4HKM4O989Gxg91fshMhjlr5+cfGk5dmLqohIKiFia90cfvqbD4hfiYKd3ic2Z2Ffl+i6WfeUIOHYXccvFJ4W0Jk7Xw5VE3YOpaPrHNyxV+yClFjjWv53Ym5B0Pp9PwS87eWZ6j6tlgbs4ebWEB5UosFrAR5+egVp9aN0Gr6M8KD5+0uhU6oVHajXpD1dzgolpTxa4lVwKP5mcDSpbHUwxod13wJL/dRF8exem7+G5aEFpqsZKeYVCiUsa+bRIOqqb6VxL1dDhlAgMBAAECggEBAIGRe3dGcOSHp6YLqGwxMRl3xCV8xy99WzCd63JScacNLxK+JGfrEaFfeNGwigtkK6qSXqW19uOOYC09DIbGwdWJ52BrSLPqpVJCh7q/t9oSs11r7Ckcns92RUfjx9hYK57q5f9I6o2KrmfxIbp5GzVzOa7f0XHu+TDL0aJoRc9AtionZIVC9KFsDEtTPO+oqfU3C+NDPJeTPgslEuNmGtHY/QtQsXei03MCSQK2+RAa4rXEQk7Gr5103CMpwGecf3LCkGLQpRwqPwF+c7pJEh9GgpPCBCwF+26dMh1F5rARFHyKjYyjOWW/g9TcWsZZTT8n4D6hwW2iYeEpmT3+OUUCgYEAyxiKa0PaDKJfCOGeBRZnAZlug/AxpEcQYSUiP5Wb6iDsv5sFhPitHZOTcaa9dUoZ/NPHVBWtzpro0P0YgxYk67b/EpGnmZCdMiYuITCl6rPLDQFzVddlqOpweWPRHpOLH+ApLtb0Ptof9bCxripb4RnLLWoOj761dUNjED+DcT8CgYEAuN1EfQbDOVhr8t1zpyYtgV77Cc/mmU37a5u6lVhmOdxo87ITYikY2zyRo96o4VRJhjqoSv2faFs3p7lcRTK2+GDtMT+CWMeetK5W48TBPRrbuPiH7Y+auhEgkK3gfFZ0QYzDDh6YEjCXYJ4JiGmNAT3YgGvKMbhWOLmIgA2QSVsCgYEAx27SxeA8J3nufocmp/JGtiBXkMH1zU5nPC29wtiD4VXxhXmR4vBa9pcrC0hj9OAOQuInc19SbHZbtpVCU78UBE+PjElxXe/PHSa216qw0pc5Bg1tl1bLoiKMzfcBq9fQnz18010LPQjup1GaON+pl5K/nFnv8KGiCINirNrhlPsCgYBYMO74el5uIBm3jiAbcKIq4sX+Q1lub35vMqbLkpWKKvVCtQR8QsDh7j5In/OPM6ezyo344I/IuCOP92TmejBBw/PEF9k2Q10aM0WueXH6lbKWxrIKCgU1mPAhNWIvzwq9LsrrFHtVyiqdZCeGFVy4Z+m+Mi4OlDNF8nUFKfNYmwKBgQCQxl8RHN7FSrF6FUbqPgVZoCeA1Z3whdmHL5R6Ahg0vESdytWn1GKAX/TRLOl0zAcVUA1eRX4pAdRggPCeYG0MhIc/UMaS0canMMnjUvPPZEQHmGs/DQAAoFJHkzQthfspXuEWw9tEsXkkU6PqKT4KYjeEVyLjzrh1ndj3/fxwDQ==',//应用私钥
})
const AlipayFormData = require('alipay-sdk/lib/form').default

// 引入WebSocket
function start(server) {
    var io = require('socket.io')(server, {
        allowEIO3: true,
        cors: {
            origin: "http://127.0.0.1:8080",
            methods: ["GET", "POST"],
            credentials: true,
        }
    })
    io.on('connection', (socket) => {
        // 为每个连接服务器的用户添加id字段
        socket.id = socket.handshake.query.oid
        // console.log(Array.from(io.sockets.sockets).map(item => item[1].id));

        // 接受发送方消息
        socket.on("send", (data, to) => {
            Array.from(io.sockets.sockets).forEach(item => {
                if (item[1].id === to) {
                    // 发送到对方  对方id 消息
                    item[1].emit("message", socket.id, data);
                }
            });
        });
    });
}

//登陆接口回调函数
const GoodsController = {

    // 用户发布商品
    addgoods: async (req, res) => {
        // 读取一级分类
        const gs1 = Number(req.body.gs.split(",")[0])
        // 读取一级分类
        const gs2 = Number(req.body.gs.split(",")[1])
        // 读取价格
        const price = Number(req.body.price)
        // 读取数量
        const num = Number(req.body.num)
        // 读取详细信息
        const content = req.body.content.toString()
        // 读取图片路径
        const avatar = req.file ? `/goodsavatar/${req.file.filename}` : ""
        // 读取出该账号的id
        const token = req.headers["authorization"].split(" ")[1]
        var payload = JWT.verify(token)

        const bool = await GoodsService.addgoods(req.body.name, gs1, gs2, price, num, content, avatar, payload.id)
        if (bool) {
            res.send({
                ActionType: "ok",
            })
        } else {
            res.send({
                ActionType: "no",
            })
        }
    },
    // 获取用户发布商品列表
    goodslist: async (req, res) => {
        //读取出该账号的id
        const token = req.headers["authorization"].split(" ")[1]
        var payload = JWT.verify(token)

        const result = await GoodsService.goodslist(payload.id)
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
    // 获取某个商品新信息
    getGood: async (req, res) => {
        const result1 = await GoodsService.getGood(req.body.id)
        const result = {}
        result["id"] = result1[0].gid
        result["name"] = result1[0].gname
        result["gs"] = [result1[0].gs1, result1[0].gs2]
        result["price"] = result1[0].gprice
        result["num"] = result1[0].gnum
        result["content"] = result1[0].gcontent
        result["avatar"] = result1[0].gavatar
        res.send({
            ActionType: "ok",
            data: result,
        })
    },
    // 更新某个商品信息
    upgoods: async (req, res) => {
        // 读取一级分类
        const gs1 = Number(req.body.gs.split(",")[0])
        // 读取一级分类
        const gs2 = Number(req.body.gs.split(",")[1])
        // 读取价格
        const price = Number(req.body.price)
        // 读取数量
        const num = Number(req.body.num)
        // 读取详细信息
        const content = req.body.content.toString()
        // 读取图片路径
        const avatar = req.file ? `/goodsavatar/${req.file.filename}` : ""

        await GoodsService.upgoods(req.body.name, gs1, gs2, price, num, content, avatar, req.body.id)
        res.send({
            ActionType: "ok",
        })
    },
    // 删除某个商品
    deletegoods: async (req, res) => {
        const result = await GoodsService.deletegoods(req.body.gid)
        console.log(result);
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
    // 获取该用户购物车该商品数量
    cartgoods: async (req, res) => {
        // 读取出该账号的id
        const token = req.headers["authorization"].split(" ")[1]
        var payload = JWT.verify(token)
        // 读取出商品的id
        const gid = Number(req.body.gid)

        const result = await GoodsService.cartgoods(payload.id, gid)
        if (result.length === 0) {
            res.send({
                ActionType: "no",
                data: 0
            })
        } else {
            res.send({
                ActionType: "ok",
                data: result[0].cnum
            })
        }
    },
    // 添加购物车
    addgood: async (req, res) => {
        // 读取出该账号的id
        const token = req.headers["authorization"].split(" ")[1]
        var payload = JWT.verify(token)
        const gid = Number(req.body.gid)
        await GoodsService.addgood(payload.id, gid, req.body.onum, req.body.cnum)
        res.send({
            ActionType: "ok",
        })
    },
    // 直接购买
    buygood: async (req, res) => {
        // 读取出商品的id
        const gid = Number(req.body.gid)
        // 获取订单信息
        const result1 = await GoodsService.buygoodinfo(gid)
        // 获取订单号
        const oid = result1.oid
        // 获取实际付款
        const price = Number(result1.gprice) * Number(req.body.onum)
        // 获取商品名称
        const name = result1.gname

        //对接支付宝
        const formData = new AlipayFormData()
        formData.setMethod('get')
        // 支付成功打开的链接 
        formData.addField('returnUrl', 'http://127.0.0.1:8080' + '/success/' + gid + '/' + price + '/' + req.body.onum + '/' + req.body.oadd)
        // 支付订单详情
        formData.addField('bizContent', {
            out_trade_no: oid,  //订单号
            productCode: 'FAST_INSTANT_TRADE_PAY',  //产品码
            totalAmount: price,  //实际付款
            subject: name,  //商品名称
            body: `商品价格：${price}, 购买数量：${req.body.onum}`,  //其它信息
        })
        //result为可以跳转到支付连接的url
        const result = alipaySdk.exec(
            'alipay.trade.page.pay',
            {},
            { formData: formData },
        )
        // 返回支付页面链接
        result.then((resp) => {
            res.send({
                ActionType: "ok",
                'result': resp
            })
        })
    },
    // 获取订单支付情况
    indent: async (req, res) => {
        //订单号
        let out_trade_no = req.body.out_trade_no;
        let trade_no = req.body.trade_no;
        // 支付宝配置
        const formData = new AlipayFormData();
        //调用setMethod 并传入get,会返回可以跳转到支付页面的url,
        formData.setMethod("get");
        // 支付时信息
        const bizContent = {
            out_trade_no,
            trade_no
        };
        formData.addField("bizContent", bizContent);

        // 返回promise
        const result = alipaySdk.exec(
            "alipay.trade.query",
            {},
            { formData: formData }
        )
        result.then(data => {
            axios({
                method: 'GET',
                url: data
            }).then(data => {
                let r = data.data.alipay_trade_query_response;
                if (r.code === '10000') { //接口调用成功
                    switch (r.trade_status) {
                        case 'WAIT_BUYER_PAY':
                            res.send({
                                ActionType: "ok",
                                result: {
                                    "status": 0,
                                    "massage": '交易创建，等待买家付款',
                                }
                            })
                            break;
                        case 'TRADE_CLOSED':
                            res.send({
                                ActionType: "ok",
                                result: {
                                    "status": 1,
                                    "massage": '未付款交易超时关闭，或支付完成后全额退款'
                                }
                            })
                            break;
                        case 'TRADE_SUCCESS':
                            res.send({
                                ActionType: "ok",
                                result: {
                                    "status": 2,
                                    "massage": '交易支付成功'
                                }
                            })
                            break;
                        case 'TRADE_FINISHED':
                            res.send({
                                ActionType: "ok",
                                result: {
                                    "status": 3,
                                    "massage": '交易结束，不可退款'
                                }
                            })
                            break;
                    }
                } else if (r.code === '40004') {
                    res.send({
                        ActionType: "no",
                        result: '交易不存在'
                    })
                }
            })
        })
    },
    // 生成订单
    getindent: async (req, res) => {
        // 读取出该账号的id
        const token = req.headers["authorization"].split(" ")[1]
        var payload = JWT.verify(token)
        // 读取出商品的id
        const gid = Number(req.body.gid)
        // 获取订单信息
        const result1 = await GoodsService.buygoodinfo(gid)
        // 获取订单号
        const oid = result1.oid
        // 获取商品价格
        const oprice = Number(req.body.oprice)

        // 生成订单信息
        await GoodsService.getindent(oid, payload.id, gid, oprice, req.body.onum, req.body.oadd)
        res.send({
            ActionType: "ok",
        })
    },

    // 获取用户购买商品列表
    buylist: async (req, res) => {
        //读取出顾客账号的id
        const token = req.headers["authorization"].split(" ")[1]
        var payload = JWT.verify(token)

        const result = await GoodsService.buylist(payload.id)
        res.send({
            ActionType: "ok",
            data: result
        })
    },
    // 确认收货/去发货/货已送到
    receipt: async (req, res) => {
        await GoodsService.receipt(req.body.oid, req.body.state)
        res.send({
            ActionType: "ok",
        })
    },
    // 删除购买/出售记录
    deletereceipt: async (req, res) => {
        await GoodsService.deletereceipt(req.body.oid, req.body.type)
        res.send({
            ActionType: "ok",
        })
    },
    // 获取配送商品列表
    shipment: async (req, res) => {
        //读取出商家的id
        const token = req.headers["authorization"].split(" ")[1]
        var payload = JWT.verify(token)

        const result = await GoodsService.shipment(payload.id)
        res.send({
            ActionType: "ok",
            data: result
        })
    },
    // 存储聊天记录
    message: async (req, res) => {
        const result = await GoodsService.message(req.body.oid, req.body.sid, req.body.message)
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

    // 获取用户购物车列表
    cartlist: async (req, res) => {
        //读取出用户的id
        const token = req.headers["authorization"].split(" ")[1]
        var payload = JWT.verify(token)

        const result = await GoodsService.cartlist(payload.id)
        res.send({
            ActionType: "ok",
            data: result
        })
    },
    // 删除购物车商品
    deletecart: async (req, res) => {
        await GoodsService.deletecart(req.body.bid, req.body.gid)
        res.send({
            ActionType: "ok",
        })
    },
}

module.exports = {
    GoodsController,
    start
}