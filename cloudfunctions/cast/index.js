// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event })

  app.use(async (ctx, next) => {
    ctx.body = { result: true }

    await next() // 执行下一中间件
  })

  // 影人详情
  app.router('detail', async ctx => {
    const res = await cloud
      .callFunction({
        name: 'api',
        data: {
          url: `movie/celebrity/${event.id}`
        }
      })
      .then(res => res)
      .catch(err => console.error(err))

    ctx.body.data = res.result
  })

  return app.serve()
}
