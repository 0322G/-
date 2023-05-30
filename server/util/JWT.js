const jsonwebtoken = require("jsonwebtoken")

//自定义密钥
const secret = "Ggkey"
// token加解密函数
const JWT = {
    // 加密生成token方法
    generate(value, exprires) {  //加密内容，过期时间
        return jsonwebtoken.sign(value, secret, { expiresIn: exprires })
    },
    // 解密验证token方法
    verify(token) {
        try {
            return jsonwebtoken.verify(token, secret)
        } catch (error) {
            return false
        }
    }
}

module.exports = JWT