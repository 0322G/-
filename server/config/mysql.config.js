const mysql2 = require("mysql2")

const options = {
    host: "127.0.0.1", //本地数据库
    port: "3306", //数据库端口
    user: "root", //用户名
    password: "123456", //密码
    database: "shop", //目标数据库名
    connectionLimit: 1 //连接数
}

const db = mysql2.createPool(options).promise();
setInterval(function () {
    db.query('SELECT 1');
}, 5000);

module.exports = db