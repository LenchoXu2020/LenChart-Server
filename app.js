const Koa = require('koa')
const cors = require('koa2-cors')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')
const koaJwt = require("koa-jwt")

const index = require('./routes/index')
const landStatus = require('./routes/landStatus')
const loginRouter = require('./routes/login')
const jwtMw = require('./middleware/jwtMw')

// error handler
onerror(app)
// 设置跨域
app.use(cors({
    origin: function (ctx) {
        // 这里用 headers 和 header 属性皆可
        return ctx.header.origin;
    }
}))


// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// 静态资源
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

/* 路由权限控制 - 自定义中间件 */
// app.use(jwtMw);

// logger
/*app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})*/

// routes
app.use(index.routes(), index.allowedMethods())
app.use(landStatus.routes(), landStatus.allowedMethods())
app.use(loginRouter.routes(), loginRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app