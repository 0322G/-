const db = require("../../config/mysql.config")

const UserService = {

    // 用户登录检测
    login: async (id, password) => {
        const bool = await db.query("select * from user where uid=? and upw=?", [id, password])
        return bool[0]
    },
    // 用户注册检测
    register: async (id, password, pnone) => {
        var bool = true
        try {
            await db.query("insert into user (uid,upw,uphone) values (?,?,?)", [id, password, pnone])
        } catch (error) {
            bool = false
        }
        finally {
            return bool
        }
    },
    // 更新用户信息
    upload: async ({ id, name, phone, add, avatar }) => {
        if (avatar) { //如果图片发生修改
            await db.query("update user set uname=?,uavatar=?,uphone=?,uadd=? where uid=?", [name, avatar, phone, add, id])
        }
        else {//如果图片未发生修改
            await db.query("update user set uname=?,uphone=?,uadd=? where uid=?", [name, phone, add, id])
        }
    },
    // 用户密码更新
    uppassword: async (id, npw) => {
        await db.query("update user set upw=? where uid=?", [npw, id])
    },
    // 获取对方手机号码和头像
    getphone: async (id) => {
        const result = await db.query("select uphone sphone,uavatar savatar from user where uid=?", [id])
        return result[0][0]
    },
    // 获取聊天记录
    getmessage: async (oid, sid) => {
        const result = await db.query(`SELECT oid,sid,mdate,message from message 
        where (oid=? and sid=?) OR (oid=? and sid=?)
        ORDER BY mdate`, [oid, sid, sid, oid])
        return result[0]
    },

    // 管理员登录检测
    adminlogin: async (id, password) => {
        const bool = await db.query("select * from admin where aid=? and apw=?", [id, password])
        return bool[0]
    },
    // 管理员信息更新
    adminupload: async ({ id, name, phone, add, avatar }) => {
        if (avatar) { //如果图片发生修改
            await db.query("update admin set aname=?,aavatar=?,aphone=? where aid=?", [name, avatar, phone, id])
        }
        else {//如果图片未发生修改
            await db.query("update admin set aname=?,aphone=? where aid=?", [name, phone, id])
        }
    },
    // 管理员密码更新
    adminuppassword: async (id, npw) => {
        await db.query("update admin set apw=? where aid=?", [npw, id])
    },
    // 获取用户列表
    userlist: async () => {
        const bool = await db.query("select uid,upw,uname,uavatar,uphone,uadd from user")
        return bool[0]
    },
    // 编辑用户信息
    upuser: async (name, password, phone, id) => {
        await db.query("update user set uname=?,upw=?,uphone=? where uid=?", [name, password, phone, id])
    },
    // 删除用户
    deleteuser: async (id) => {
        var bool = true
        try {
            await db.query("delete from user where uid=?", [id])
        } catch (error) {
            bool = false
        } finally {
            return bool
        }
    },
    // 获取所有订单
    indentlist: async () => {
        const result = await db.query(`SELECT  
        result.*,user.uname bname,user.uphone bphone from user,
        (SELECT indent.oid,goods.gavatar avatar,goods.gname name,goods.gprice price,
        indent.onum num,indent.odate date,indent.state,goods.gid,indent.oadd,goods.sid,
        user.uname sname,user.uphone sphone,indent.bid
        from goods,indent,user 
        where goods.gid=indent.gid and indent.sid=user.uid) result
        where result.bid=user.uid;`)
        return result[0]
    },
    // 删除二级分类
    deletegs: async (sid) => {
        var bool = true
        try {
            await db.query("delete from gs where sid=?", [sid])
        } catch (error) {
            bool = false
        } finally {
            return bool
        }
    },
    // 添加二级分类
    addgs: async (sname, sparent) => {
        const num = await db.query("SELECT sid from gs order by sid DESC limit 1;")
        const sid = num[0][0].sid + 1
        var bool = true
        try {
            await db.query("insert into gs (sid,sname,sparent) values (?,?,?)", [sid, sname, sparent])
        } catch (error) {
            bool = false
        } finally {
            return bool
        }
    },

}

module.exports = UserService