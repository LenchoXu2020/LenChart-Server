/*土地利用现状查询-永久基本农田示例*/

const router = require('koa-router')()
const getData = require('../server/service/landStatusService')

router.prefix('/landStatus')

router.get('/', async (ctx) => {
    ctx.type = 'html';
    ctx.body = '<h1>hello world!</h1>';
})
    /*.get("/:themeName/:chartKey", async (ctx) => {
        const {
            themeName,
            chartKey
        } = ctx.params

        const retData = await getData(themeName, chartKey)
        ctx.body = retData
    })*/
    .get("/:themeGroup/:themeItem/:chartKey", async (ctx) => {
        const {
            themeGroup,
            themeItem,
            chartKey
        } = ctx.params
        /*console.log(themeGroup)
        console.log(themeItem)
        console.log(chartKey)
        console.log(ctx.query)*/
        const retData = await getData({
            themeGroup,
            themeItem,
            chartKey,
            queryParams: ctx.query
        })
        // console.log(retData)
        ctx.body = retData
    })
    .post("/a", async (ctx) => {

        console.log(ctx.request.body)
        ctx.body = `接收post请求`;
    })
    .get("/a", async (ctx) => {
        console.log(ctx.query)//接收url地址中的参数
        console.log(ctx.request.querystring)//接收get请求中配置项的参数
        ctx.body = "接收get请求"
    });

module.exports = router
