const base = {
    // 管理员登录检测
    login: "/adminapi/admin/login",
    // 获取新商品分类
    gsinfo: "/webapi/gsinfo",
    // 获取原商品分类
    gs: "/webapi/gs",
    // 获取所有商品
    getgoods: "/webapi/getgoods",
    // 获取轮播图图片
    carousel: "/webapi/carousel",
    // 删除轮播图图片
    deletecarousel: "/webapi/deletecarousel",
    // 添加轮播图图片
    addcarousel: "/webapi/addcarousel",

    // 修改管理员信息
    upload: "/adminapi/admin/upload",
    // 修改管理员密码
    uppassword: "/adminapi/admin/uppassword",

    // 获取所有用户信息
    userlist: "/adminapi/admin/userlist",
    // 编辑用户信息
    upuser: "/adminapi/admin/upuser",
    // 删除用户
    deleteuser: "/adminapi/admin/deleteuser",

    // 获取所有订单
    indentlist: "/adminapi/admin/indentlist",
    // 删除某个商品
    deletegoods: "/goodsapi/user/deletegoods",

    // 删除二级分类
    deletegs: "/adminapi/admin/deletegs",
    // 添加二级分类
    addgs: "/adminapi/admin/addgs",

}
export default base;