// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event })
  const openId = cloud.getWXContext().OPENID

  app.use(async (ctx, next) => {
    ctx.body = { result: true }

    await next() // 执行下一中间件
  })

  // 电影详情
  app.router('detail', async ctx => {
    const res = await cloud
      .callFunction({
        name: 'api',
        data: {
          url: `movie/subject/${event.id}`
        }
      })
      .then(res => res)
      .catch(err => console.error(err))

    const { total } = await cloud
      .database()
      .collection('wanted')
      .where({
        openId,
        movie: {
          id: event.id
        }
      })
      .count()

    if (total) {
      res.result.wanted = true
    }

    ctx.body.data = res.result
  })

  return app.serve()
}
