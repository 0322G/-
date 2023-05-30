var express = require('express');
const UserController = require('../../controllers/admin/UserController');

var UserRouter = express.Router();

//图片上传处理
var multer = require('multer');
var upload = multer({ dest: 'public/useravatar/' });

// 用户登陆
UserRouter.post('/user/login', UserController.login);
// 用户注册
UserRouter.post('/user/register', UserController.register);
// 更新用户信息
UserRouter.post('/user/upload', upload.single("file"), UserController.upload);
// 更新用户密码
UserRouter.post('/user/uppassword', UserController.uppassword);
// 获取对方手机号码和头像
UserRouter.post('/user/getphone', UserController.getphone);
// 获取聊天记录
UserRouter.post('/user/getmessage', UserController.getmessage);

// 管理员登陆
UserRouter.post('/admin/login', UserController.adminlogin);
// 更新管理员信息
UserRouter.post('/admin/upload', upload.single("file"), UserController.adminupload);
// 更新管理员密码
UserRouter.post('/admin/uppassword', UserController.adminuppassword);
// 获取用户列表
UserRouter.get('/admin/userlist', UserController.userlist);
// 编辑用户信息
UserRouter.post('/admin/upuser', UserController.upuser);
// 删除用户
UserRouter.post('/admin/deleteuser', UserController.deleteuser);
// 获取所有订单
UserRouter.get('/admin/indentlist', UserController.indentlist);
// 删除二级分类
UserRouter.post('/admin/deletegs', UserController.deletegs);
// 添加二级分类
UserRouter.post('/admin/addgs', UserController.addgs);


module.exports = UserRouter;
