const UserService = require("../../services/admin/UserService");

// 引入token加解密函数
const JWT = require("../../util/JWT");


const UserController = {

    // 用户登陆
    login: async (req, res) => {
        var result = await UserService.login(req.body.id, req.body.password)
        // 账号密码检测
        if (result.length === 0) {
            res.send({
                code: "-1",
                error: "用户名密码不匹配"
            })
        } else {
            // 生成token
            const token = JWT.generate({
                id: result[0].uid,
                password: result[0].upw
            }, "1d")
            res.header("Authorization", token)
            res.send({
                //登陆成功标志
                ActionType: "ok",
                //返回登录用户信息
                data: {
                    id: result[0].uid,
                    password: result[0].upw,
                    name: result[0].uname,
                    avatar: result[0].uavatar,
                    phone: result[0].uphone,
                    add: result[0].uadd,
                }
            })
        }
    },
    // 用户注册
    register: async (req, res) => {
        var result = await UserService.register(req.body.id, req.body.password, req.body.phone)
        if (result) {  //注册成功
            res.send({
                ActionType: "ok",
            })
        }
        else {
            res.send({
                ActionType: "no",
            })
        }
    },
    // 更新用户信息
    upload: async (req, res) => {
        //读取出该账号的id
        const token = req.headers["authorization"].split(" ")[1]
        var payload = JWT.verify(token)
        //读取修改后的name, phone, add
        const { name, phone, add } = req.body
        //读取修改后avatar路径
        const avatar = req.file ? `/useravatar/${req.file.filename}` : ""

        await UserService.upload({
            id: payload.id,
            name, phone, add, avatar
        })
        if (avatar) {  //如果图片发生修改，将新图片路径返回
            res.send({
                ActionType: "ok",
                data: {
                    name, phone, add, avatar
                }
            })
        } else { //如果图片未发生修改
            res.send({
                ActionType: "ok",
                data: {
                    name, phone, add
                }
            })
        }
    },
    // 更新用户密码
    uppassword: async (req, res) => {
        //读取出该账号的id
        const token = req.headers["authorization"].split(" ")[1]
        var payload = JWT.verify(token)
        //读取修改后的npw
        const { npw } = req.body

        await UserService.uppassword(payload.id, npw)
        res.send({
            ActionType: "ok",
            data: { npw }
        })
    },
    // 获取对方手机号码和头像
    getphone: async (req, res) => {
        const result = await UserService.getphone(req.body.id)
        res.send({
            ActionType: "ok",
            data: result,
        })
    },
    // 获取聊天记录
    getmessage: async (req, res) => {
        const result = await UserService.getmessage(req.body.oid, req.body.sid)
        res.send({
            ActionType: "ok",
            data: result,
        })
    },


    // 管理员登陆
    adminlogin: async (req, res) => {
        var result = await UserService.adminlogin(req.body.id, req.body.password)
        if (result.length === 0) {
            res.send({
                code: "-1",
                error: "账号密码不匹配"
            })
        } else {
            // 生成token
            const token = JWT.generate({
                id: result[0].aid,
                password: result[0].apw
            }, "1d")
            res.header("Authorization", token)
            res.send({
                //登陆成功标志
                ActionType: "ok",
                //返回登录管理员信息
                data: {
                    id: result[0].aid,
                    password: result[0].apw,
                    name: result[0].aname,
                    avatar: result[0].aavatar,
                    phone: result[0].aphone,
                }
            })
        }
    },
    // 更新管理员信息
    adminupload: async (req, res) => {
        //读取出该账号的id
        const token = req.headers["authorization"].split(" ")[1]
        var payload = JWT.verify(token)
        //读取修改后的name, phone, add
        const { name, phone } = req.body
        //读取修改后avatar路径
        const avatar = req.file ? `/useravatar/${req.file.filename}` : ""

        await UserService.adminupload({
            id: payload.id,
            name, phone, avatar
        })
        if (avatar) {  //如果图片发生修改，将新图片路径返回
            res.send({
                ActionType: "ok",
                data: {
                    name, phone, avatar
                }
            })
        }
        else { //如果图片未发生修改
            res.send({
                ActionType: "ok",
                data: {
                    name, phone
                }
            })
        }
    },
    // 更新管理员密码
    adminuppassword: async (req, res) => {
        //读取出该账号的id
        const token = req.headers["authorization"].split(" ")[1]
        var payload = JWT.verify(token)
        //读取修改后的npw
        const { npw } = req.body
        await UserService.adminuppassword(payload.id, npw)
        res.send({
            ActionType: "ok",
            data: { npw }
        })
    },
    // 获取用户列表
    userlist: async (req, res) => {
        const result = await UserService.userlist()
        res.send({
            ActionType: "ok",
            data: result
        })
    },
    // 编辑用户信息
    upuser: async (req, res) => {
        await UserService.upuser(req.body.uname, req.body.upw, req.body.uphone, req.body.uid)
        res.send({
            ActionType: "ok",
        })
    },
    // 删除用户
    deleteuser: async (req, res) => {
        const result = await UserService.deleteuser(req.body.uid)
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
    // 获取所有订单
    indentlist: async (req, res) => {
        const result = await UserService.indentlist()
        res.send({
            ActionType: "ok",
            data: result
        })
    },
    // 删除二级分类
    deletegs: async (req, res) => {
        const result = await UserService.deletegs(req.body.value)
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
    // 添加二级分类
    addgs: async (req, res) => {
        const result = await UserService.addgs(req.body.sname, req.body.sparent)
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

}

module.exports = UserController