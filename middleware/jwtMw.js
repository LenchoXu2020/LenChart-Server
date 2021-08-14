const jwtUtil = require("../server/utils/jwtUtil")
module.exports = function (ctx, next) {
    // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验
    if (ctx.url != '/user/login' && ctx.url != '/user/register') {
        let token = ctx.headers['token'];
        console.log('token:' + token)
        let jwt = new jwtUtil(token);
        let result = jwt.verifyToken();
        // 如果考验通过就next，否则就返回登陆信息不正确
        if (result == 'err') {
            console.log(result);
            ctx.body = {status: 403, msg: '登录已过期,请重新登录'};
            // res.render('login.html');
        } else {
            next();
        }
    } else {
        next();
    }
}