var express = require('express');

const result = require('../../controllers/admin/GoodsController');
const GoodsController = result.GoodsController

var GoodsRouter = express.Router();

//图片上传处理
var multer = require('multer');
var upload = multer({ dest: 'public/goodsavatar/' });

// 用户发布商品
GoodsRouter.post('/user/addgoods', upload.single("file"), GoodsController.addgoods);
// 获取用户发布商品列表
GoodsRouter.get('/user/goodslist', GoodsController.goodslist);
// 获取某个商品新信息
GoodsRouter.post('/user/getgood', GoodsController.getGood)
// 更新某个商品信息
GoodsRouter.post('/user/upgoods', upload.single("file"), GoodsController.upgoods);
// 删除某个商品
GoodsRouter.post('/user/deletegoods', GoodsController.deletegoods);
// 获取该用户购物车该商品数量
GoodsRouter.post('/user/cartgoods', GoodsController.cartgoods);
// 添加购物车
GoodsRouter.post('/user/addgood', GoodsController.addgood);
// 直接购买
GoodsRouter.post('/user/buygood', GoodsController.buygood);
// 获取订单支付情况
GoodsRouter.post('/user/indent', GoodsController.indent);
// 生成订单
GoodsRouter.post('/user/getindent', GoodsController.getindent);

// 获取用户购买商品列表
GoodsRouter.get('/user/buylist', GoodsController.buylist);
// 确认收货/去发货/货已送到
GoodsRouter.post('/user/receipt', GoodsController.receipt);
// 删除购买/出售记录
GoodsRouter.post('/user/deletereceipt', GoodsController.deletereceipt);
// 获取配送商品列表
GoodsRouter.get('/user/shipment', GoodsController.shipment);
// 存储聊天记录
GoodsRouter.post('/user/message', GoodsController.message);

// 获取用户购物车列表
GoodsRouter.get('/user/cartlist', GoodsController.cartlist);
// 删除购物车商品
GoodsRouter.post('/user/deletecart', GoodsController.deletecart);


module.exports = GoodsRouter;