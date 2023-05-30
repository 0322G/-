const db = require("../../config/mysql.config")
const moment = require("moment")
moment.locale("zh-cn")

const GoodsService = {

    // 用户发布商品
    addgoods: async (name, gs1, gs2, price, num, content, avatar, id) => {
        // 获取当前时间
        const date1 = new Date()
        const date = moment(date1).format('yyyy-MM-DD HH:mm:ss')
        var bool = true
        try {
            await db.query("insert into goods (gname,gs1,gs2,gprice,gnum,gcontent,gavatar,gdate,sid) values (?,?,?,?,?,?,?,?,?)", [name, gs1, gs2, price, num, content, avatar, date, id])
        } catch (error) {
            bool = false
        }
        finally {
            return bool
        }
    },
    // 获取用户发布商品列表
    goodslist: async (id) => {
        const result = await db.query("select * from goods where gnum>0 and sid=?", [id])
        return result[0]
    },
    // 获取某个商品新信息
    getGood: async (gid) => {
        const result = await db.query("select * from goods where gid=?", [gid])
        return result[0]
    },
    // 更新某个商品信息
    upgoods: async (name, gs1, gs2, price, num, content, avatar, id) => {
        // 获取最新时间
        const date1 = new Date()
        const date = moment(date1).format('yyyy-MM-DD HH:mm:ss')
        if (avatar) { //如果图片发生修改
            await db.query("update goods set gname=?,gs1=?,gs2=?,gprice=?,gnum=?,gcontent=?,gavatar=?,gdate=? where gid=?", [name, gs1, gs2, price, num, content, avatar, date, id])
        }
        else {//如果图片未发生修改
            await db.query("update goods set gname=?,gs1=?,gs2=?,gprice=?,gnum=?,gcontent=?,gdate=? where gid=?", [name, gs1, gs2, price, num, content, date, id])
        }
    },
    // 删除某个商品
    deletegoods: async (gid) => {
        var bool = true
        try {
            const result = await db.query("update goods set gnum=0 where gid=?", [gid])
        } catch (error) {
            bool = false
        }
        finally {
            return bool
        }
    },

    // 获取该用户购物车该商品数量
    cartgoods: async (bid, gid) => {
        const result = await db.query("select * from cart where bid=? and gid=?", [bid, gid])
        return result[0]
    },
    // 添加购物车
    addgood: async (bid, gid, onum, cnum) => {
        // 获取当前时间
        const date1 = new Date()
        const date = moment(date1).format('yyyy-MM-DD HH:mm:ss')
        // 获取库存数量
        const result = await db.query("select gnum from goods where gid=?", [gid])
        const gnum = result[0][0].gnum
        if (cnum === 0) { //购物车还没有则添加
            if (onum > gnum) {
                onum = gnum
            }
            await db.query("insert into cart (bid,gid,cnum,cdate) values (?,?,?,?)", [bid, gid, onum, date])
        } else {
            cnum = cnum + onum
            if (cnum > gnum) {  //购物车已有则更新
                cnum = gnum
            }
            await db.query("update cart set cnum=? where bid=? and gid=?", [cnum, bid, gid])
        }
    },
    // 获取购买商品信息
    buygoodinfo: async (gid) => {
        // 获取订单号
        const result1 = await db.query("SELECT oid+1 oid from indent ORDER BY oid DESC LIMIT 1 ")
        const oid = result1[0][0].oid
        // 获取商品单价
        const result2 = await db.query("SELECT gname,gprice from goods where gid=?", [gid])
        const gprice = result2[0][0].gprice
        const gname = result2[0][0].gname
        // 返回结果
        const data = { oid: oid, gprice: gprice, gname: gname }
        return data
    },
    // 生成订单
    getindent: async (oid, bid, gid, oprice, onum, oadd) => {
        // 获取当前时间
        const date1 = new Date()
        const date = moment(date1).format('yyyy-MM-DD HH:mm:ss')
        // 获取商家sid
        const result1 = await db.query("select sid from goods where gid=?", [gid])
        const sid = result1[0][0].sid
        // 获取库存数量
        const result2 = await db.query("select gnum from goods where gid=?", [gid])
        const gnum = result2[0][0].gnum
        // 获取剩余库存
        const num = gnum - onum
        // 生成订单信息
        await db.query("insert into indent (oid,sid,bid,gid,odate,oadd,oprice,onum) values (?,?,?,?,?,?,?,?)", [oid, sid, bid, gid, date, oadd, oprice, onum])
        // 更新库存数量
        await db.query("update goods set gnum=? where gid=?", [num, gid])
        // 更新购物车信息
        if (num === 0) {
            await db.query("delete from cart where gid=?", [gid])
        } else {
            await db.query("update cart set cnum=? where gid=? and cnum>?", [num, gid, num])
        }
    },

    // 获取用户购买商品列表
    buylist: async (id) => {
        const result = await db.query(`SELECT 
        goods.gavatar avatar,goods.gname name,goods.gprice price,good.oprice,good.onum num,good.odate date,good.state,
        good.oid,good.sid,user.uname sname,user.uphone sphone,good.bid,good.gid,good.oadd,good.start
        from goods,user,(SELECT * from indent where bid=? and bsee=0) good
        where goods.gid=good.gid and user.uid=good.sid;`, [id])
        return result[0]
    },
    // 确认收货/去发货/货已送到
    receipt: async (oid, state) => {
        await db.query("update indent set state=? where oid=?", [state, oid])
    },
    // 删除购买/出售记录
    deletereceipt: async (oid, type) => {
        if (type == 1) {
            await db.query("update indent set bsee=1 where oid=?", [oid])
        } else {
            await db.query("update indent set ssee=1 where oid=?", [oid])
        }
    },
    // 获取配送商品列表
    shipment: async (id) => {
        const result = await db.query(`SELECT 
        goods.gavatar avatar,goods.gname name,goods.gprice price,good.oprice,good.onum num,good.odate date,good.state,
        good.oid,good.sid,good.bid,user.uname bname,user.uphone bphone,good.gid,good.oadd,good.start
        from goods,user,(SELECT * from indent where sid=? and ssee=0) good
        where goods.gid=good.gid and user.uid=good.bid;`, [id])
        return result[0]
    },
    // 存储聊天记录
    message: async (oid, sid, message) => {
        // 获取当前时间
        const date1 = new Date()
        const mdate = moment(date1).format('yyyy-MM-DD HH:mm:ss')
        let bool = true
        try {
            await db.query(`insert into message (oid,sid,mdate,message) values (?,?,?,?)`, [oid, sid, mdate, message])
        } catch (error) {
            bool = false
        } finally {
            return bool
        }
    },

    // 获取用户购物车列表
    cartlist: async (bid) => {
        const result = await db.query(`SELECT 
        goods.gavatar avatar,goods.gname name,goods.gprice price,good.cnum num,
        good.cdate date,goods.gcontent content,goods.sid,good.bid,goods.gid
        from goods,(SELECT * from cart where bid=?) good
        where goods.gid=good.gid;`, [bid])
        return result[0]
    },
    // 删除购物车商品
    deletecart: async (bid, gid) => {
        await db.query("delete from cart where bid=? and gid=?", [bid, gid])
    },

}

module.exports = GoodsService