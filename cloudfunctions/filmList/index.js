// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const filmLists = db.collection('filmLists')

// 云函数入口函数
exports.main = (event, context) => {
  const app = new TcbRouter({ event })

  app.use(async (ctx, next) => {
    ctx.data = {}
    await next() // 执行下一中间件
  })

  app.router('list', async ctx => {
    const res = await filmLists.orderBy('order', 'asc').get()

    ctx.data = res.data
    ctx.body = { result: true, data: ctx.data }
  })

  app.router('detail', async ctx => {
    const res = await filmLists
      .where({
        _id: event.id
      })
      .get()

    if (res.data.length) {
      ctx.data = res.data[0]
      ctx.body = { result: true, data: ctx.data }
    } else {
      ctx.body = { result: true, data: {} }
    }
  })

  return app.serve()
}
