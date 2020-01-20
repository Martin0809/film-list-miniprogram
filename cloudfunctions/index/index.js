// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const banner = db.collection('banner')

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event })

  app.use(async (ctx, next) => {
    ctx.body = { result: true }

    await next() // 执行下一中间件
  })

  app.router('banner', async ctx => {
    const res = await banner.orderBy('order', 'asc').get()

    ctx.body.data = res.data
  })

  return app.serve()
}
