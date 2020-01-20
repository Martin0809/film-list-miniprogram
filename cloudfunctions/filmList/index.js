// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const filmList = db.collection('filmList')
const filmListDetail = db.collection('filmListDetail')

// 云函数入口函数
exports.main = (event, context) => {
  const app = new TcbRouter({ event })

  app.use(async (ctx, next) => {
    ctx.body = { result: true }

    await next() // 执行下一中间件
  })

  app.router('list', async ctx => {
    const res = await filmList.orderBy('order', 'asc').get()

    ctx.body.data = res.data
  })

  app.router('detail', async ctx => {
    const res = await filmList
      .where({
        _id: event.id
      })
      .get()

    if (res.data.length) {
      ctx.body.data = res.data[0]
    } else {
      ctx.body.data = {}
    }
  })

  app.router('movies', async ctx => {
    const res = await filmListDetail
      .where({
        _id: event.filmListId
      })
      .get()
  })

  app.router('getInTheaters', async ctx => {
    const res = await cloud
      .callFunction({
        name: 'api',
        data: {
          url: 'movie/in_theaters',
          start: (event.start - 1) * event.size,
          count: event.size
        }
      })
      .then(res => res)
      .catch(err => console.error(err))

    ctx.body.data = res.result
  })

  app.router('getComingSoon', async ctx => {
    const res = await cloud
      .callFunction({
        name: 'api',
        data: {
          url: 'movie/coming_soon',
          start: (event.start - 1) * event.size,
          count: event.size
        }
      })
      .then(res => res)
      .catch(err => console.error(err))

    ctx.body.data = res.result
  })

  app.router('getTop250', async ctx => {
    const res = await cloud
      .callFunction({
        name: 'api',
        data: {
          url: 'movie/top250',
          start: (event.start - 1) * event.size,
          count: event.size
        }
      })
      .then(res => res)
      .catch(err => console.error(err))

    ctx.body.data = res.result
  })

  app.router('getWeekly', async ctx => {
    const res = await cloud
      .callFunction({
        name: 'api',
        data: {
          url: 'movie/weekly',
          start: (event.start - 1) * event.size,
          count: event.size
        }
      })
      .then(res => {
        const subjects = res.result.subjects

        res.result.total = subjects.length
        res.result.subjects = subjects.map(item => {
          const subject = { ...item, ...item.subject }

          delete subject.subject
          return subject
        })

        return res
      })
      .catch(err => console.error(err))

    ctx.body.data = res.result
  })

  app.router('getUSBox', async ctx => {
    const res = await cloud
      .callFunction({
        name: 'api',
        data: {
          url: 'movie/us_box',
          start: (event.start - 1) * event.size,
          count: event.size
        }
      })
      .then(res => {
        const subjects = res.result.subjects

        res.result.total = subjects.length
        res.result.subjects = subjects.map(item => {
          const subject = {
            ...item,
            ...item.subject
          }

          delete subject.subject
          return subject
        })

        return res
      })
      .catch(err => console.error(err))

    ctx.body.data = res.result
  })

  app.router('getNewMovies', async ctx => {
    const res = await cloud
      .callFunction({
        name: 'api',
        data: {
          url: 'movie/new_movies',
          start: (event.start - 1) * event.size,
          count: event.size
        }
      })
      .then(res => res)
      .catch(err => console.error(err))

    ctx.body.data = res.result
  })

  return app.serve()
}
