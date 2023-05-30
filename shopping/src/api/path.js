const base = {

    // 获取新商品分类
    gsinfo: "/webapi/gsinfo",
    // 获取原商品分类
    gs: "/webapi/gs",
    // 获取轮播图图片
    carousel: "/webapi/carousel",
    // 获取搜索框检索结果
    getsearch: "/webapi/getsearch",
    // 获取某类所有商品
    gsgoods: "/webapi/gsgoods",
    // 获取某个商品
    getgood: "/webapi/getgood",
    // 获取最新商品推荐
    getnew: "/webapi/getnew",
    // 获取该用户购物车该商品数量
    cartgoods: "/goodsapi/user/cartgoods",
    // 添加购物车
    addgood: "/goodsapi/user/addgood",
    // 直接购买
    buygood: "/goodsapi/user/buygood",
    // 获取订单支付情况
    indent: "/goodsapi/user/indent",
    // 生成订单
    getindent: "/goodsapi/user/getindent",

    // 用户登录检测
    login: "/adminapi/user/login",
    // 注册接口
    register: "/adminapi/user/register",
    // 更新个人信息
    upload: "/adminapi/user/upload",
    // 更新密码
    uppassword: "/adminapi/user/uppassword",

    // 发布商品
    addgoods: "/goodsapi/user/addgoods",
    // 获取用户发布商品列表
    goodslist: "/goodsapi/user/goodslist",
    // 获取某个商品新信息
    getGood: "/goodsapi/user/getgood",
    // 更新商品信息
    upgoods: "/goodsapi/user/upgoods",
    // 删除某个商品
    deletegoods: "/goodsapi/user/deletegoods",

    // 获取用户购买商品列表
    buylist: "/goodsapi/user/buylist",
    // 确认收货/去发货/货已送到
    receipt: "/goodsapi/user/receipt",
    // 删除购买/出售记录
    deletereceipt: "/goodsapi/user/deletereceipt",
    // 配送商品列表
    shipment: "/goodsapi/user/shipment",
    // 存储聊天记录
    message: "/goodsapi/user/message",
    // 获取对方手机号码和头像
    getphone: "/adminapi/user/getphone",
    // 获取聊天记录
    getmessage: "/adminapi/user/getmessage",
    // 评分
    start: "/goodsapi/user/start",

    // 获取用户购物车列表
    cartlist: "/goodsapi/user/cartlist",
    // 删除购物车商品
    deletecart: "/goodsapi/user/deletecart",

}

export default base;