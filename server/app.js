var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const UserRouter = require('./routes/admin/UserRouter');
const GoodsRouter = require('./routes/admin/GoodsRouter');
const WebRouter = require('./routes/web/WebRouter');
const JWT = require('./util/JWT');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// /webapi/*   -官网使用接口
app.use('/webapi', WebRouter);

// 生成、检验token
app.use((req, res, next) => {
  if (req.url === "/adminapi/user/login" || "/adminapi/user/register" || "/adminapi/admin/login") {
    next()
    return;
  }
  const token = req.headers["authorization"].split(" ")[1]
  // 如果token有效，next
  if (token) {
    var payload = JWT.verify(token)
    if (payload) {
      const newtoken = JWT.generate({
        id: payload.id,
        password: payload.password
      }, "1d")
      res.header("Authorization", newtoken)
      next()
    } else {
      // 如果token过期，返回401错误
      res.status(401).send({ errCode: "-1", errorInfo: "token过期" })
    }
  }
})
// /adminapi/*  -后台管理员用
app.use('/adminapi', UserRouter);
// /goodsapi/*  -后台调用商品
app.use('/goodsapi', GoodsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
