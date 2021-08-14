/*用户登录路由*/
const router = require('koa-router')()
const jwtUtil = require("../server/utils/jwtUtil")

router.prefix('/user')
router.post("/login", async (ctx) => {
    console.log('user/login')
    const {userName, password} = ctx.request.body
    if (userName == "admin" && password == "123456") {
        // 登陆成功，添加token验证
        let data = {userName, password}//也可以是数据库返回的用户ID
        // 将用户id传入并生成token
        let jwt = new jwtUtil(data);
        let token = jwt.generateToken();
        // 将 token 返回给客户端
        ctx.body = {status: 200, msg: '登陆成功', token: token};
    } else {
        ctx.body = {status: 400, msg: '账号密码错误'}
    }
});

router.get("/test", async (ctx) => {
    console.log(ctx.query)
    console.log(ctx.request.querystring)//接收get请求中配置项的参数
    ctx.body = "接收get请求"
});

module.exports = router
