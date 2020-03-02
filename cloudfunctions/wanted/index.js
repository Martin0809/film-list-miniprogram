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

  app.router('list', async ctx => {
    const wanted = cloud
      .database()
      .collection('wanted')
      .where({ openId })
    const res = await wanted.get()
    const { total } = await wanted.count()
    const movies = res.data.map(item => {
      item.movie.wanted = true

      return item.movie
    })

    ctx.body.data = { movies, total }
  })

  // 想看
  app.router('add', async ctx => {
    const res = await cloud
      .callFunction({
        name: 'movie',
        data: {
          $url: 'detail',
          id: event.movieId
        }
      })
      .then(res => res)
      .catch(err => console.error(err))

    await cloud
      .database()
      .collection('wanted')
      .add({
        data: {
          openId,
          movie: res.result.data
        }
      })
  })

  // 取消想看
  app.router('remove', async ctx => {
    const res = await cloud
      .database()
      .collection('wanted')
      .where({
        openId,
        movie: {
          id: event.movieId
        }
      })
      .remove()
  })

  return app.serve()
}
