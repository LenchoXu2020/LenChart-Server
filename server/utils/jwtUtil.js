// 引入模块依赖
const jwt = require('jsonwebtoken');

// 创建 token 类
class Jwt {
    constructor(data) {
        this.data = data;
    }

    secret = "老舅真帅";

    //生成token
    generateToken() {
        let data = this.data;
        let token = jwt.sign(data, this.secret, {expiresIn: '30m'});//设置过期时间 1h 30m 30s
        return token;
    }

    // 校验token
    verifyToken() {
        let token = this.data;
        // let secret = fs.readFileSync(path.join(__dirname, '../pem/public_key.pem'));//公钥 可以自己生成
        let res;
        try {
            res = jwt.verify(token, this.secret) || {};
        } catch (e) {
            res = 'err';
        }
        return res;
    }
}

module.exports = Jwt;
