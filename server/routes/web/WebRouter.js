var express = require('express');
const WebController = require('../../controllers/web/WebController');

var WebRouter = express.Router();

//图片上传处理
var multer = require('multer');
var upload = multer({ dest: 'public/goodsavatar/' });

// 获取新商品分类
WebRouter.get('/gsinfo', WebController.gsinfo);
// 获取原商品分类
WebRouter.get('/gs', WebController.gs);
// 获取搜索框检索结果
WebRouter.post('/getsearch', WebController.getsearch);
// 获取轮播图图片
WebRouter.get('/carousel', WebController.carousel);
// 删除轮播图图片
WebRouter.post('/deletecarousel', WebController.deletecarousel);
// 添加轮播图图片
WebRouter.post('/addcarousel', WebController.addcarousel);
// 获取某类所有商品信息
WebRouter.post('/gsgoods', WebController.gsgoods);
// 获取某个商品信息
WebRouter.post('/getgood', WebController.getgood);
// 获取最新商品推荐
WebRouter.get('/getnew', WebController.getnew);


module.exports = WebRouter;