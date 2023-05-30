const db = require("../../config/mysql.config")
const moment = require("moment")
moment.locale("zh-cn")

const WebService = {

    // 获取新商品分类
    gsinfo: async () => {
        const result = []
        //获取一级分类数目
        const number = await db.query("select count(*) num from gs where sparent=0;")
        const num = number[0][0].num
        // 添加分类数据
        for (let i = 1; i <= num; i++) {
            const obj = {}
            //加入一级分类信息
            const result1 = await db.query("select sid ,sname  from gs where sid=?;", [i])
            obj["value"] = result1[0][0].sid
            obj["label"] = result1[0][0].sname
            //加入二级分类信息
            const result2 = await db.query("select sid value,sname label from gs where sparent=?;", [i])
            obj["children"] = result2[0]
            // 将该数据加入最后结果
            result.push(obj)
        }
        return result
    },
    // 获取原商品分类
    gs: async () => {
        const result = await db.query("select * from gs")
        return result[0]
    },

    // 获取搜索结果
    getsearch: async (search) => {
        const arr = search.split("")
        var reg_search = '%'
        arr.forEach((item) => {
            reg_search += item + '%'
        })
        const result = await db.query(`SELECT gid id,gname name,gs1,gs2,gprice price,gnum num,
        gcontent content,gavatar avatar,gdate date,sid 
        from goods where gnum>0 and goods.gname like ?`, [reg_search])
        return result[0]
    },

    // 获取轮播图信息
    carousel: async () => {
        const result = await db.query(`SELECT goods.gid id,goods.gavatar avatar
        from goods,carousel where goods.gid=carousel.gid ORDER BY carousel.carid;`)
        return result[0]
    },

    // 删除轮播图图片
    deletecarousel: async (gid) => {
        var bool = true
        try {
            await db.query(`delete from carousel where carousel.gid=?;`, [gid])
        } catch (error) {
            bool = false
        }
        return bool
    },
    // 添加轮播图图片
    addcarousel: async (gid) => {
        var bool = true
        try {
            await db.query(`insert into carousel (gid) values (?);`, [gid])
        } catch (error) {
            bool = false
        }
        return bool
    },

    // 获取某类所有商品
    gsgoods: async (gs2) => {
        const result = await db.query(`SELECT 
        gid id,gname name,gs1,gs2,gprice price,gnum num,gcontent content,gavatar avatar,gdate date,
        sid from goods where gnum>0 and gs2=?`, [gs2])
        return result[0]
    },

    // 获取某个商品
    getgood: async (gid) => {
        const result = await db.query(`SELECT 
        gid id,gname name,gs1,gs2,gprice price,gnum num,gcontent content,gavatar avatar,gdate date,
        sid from goods where gnum>0 and gid=?`, [gid])
        return result[0]
    },
    // 获取最新商品推荐
    getnew: async () => {
        const result = await db.query(`SELECT 
        gid id,gname name,gs1,gs2,gprice price,gnum num,gcontent content,gavatar avatar,
        gdate date,sid 
        from goods where gnum>0 order by gdate desc LIMIT 10`)
        return result[0]
    },

}

module.exports = WebService