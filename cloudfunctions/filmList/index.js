// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = (event, context) => {
  const app = new TcbRouter({ event })
  const openId = cloud.getWXContext().OPENID

  function getWanted() {
    return cloud
      .database()
      .collection('wanted')
      .where({ openId })
      .get()
  }

  app.use(async (ctx, next) => {
    ctx.body = { result: true }

    await next() // 执行下一中间件
  })

  app.router('list', async ctx => {
    const res = await cloud
      .database()
      .collection('filmList')
      .orderBy('order', 'asc')
      .get()

    ctx.body.data = res.data
  })

  app.router('detail', async ctx => {
    const res = await cloud
      .database()
      .collection('filmList')
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
    const res = await cloud
      .database()
      .collection('filmListDetail')
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
          qs: {
            start: (event.page - 1) * event.size,
            count: event.size
          }
        }
      })
      .then(res => res)
      .catch(err => console.error(err))

    const { data: wanted } = await getWanted()
    const subjects = res.result.subjects

    wanted.forEach(item => {
      for (let i = 0; i < subjects.length; i++) {
        if (item.movie.id === subjects[i].id) {
          subjects[i].wanted = true
          break
        }
      }
    })

    ctx.body.data = res.result
  })

  app.router('getComingSoon', async ctx => {
    const res = await cloud
      .callFunction({
        name: 'api',
        data: {
          url: 'movie/coming_soon',
          qs: {
            start: (event.page - 1) * event.size,
            count: event.size
          }
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
          qs: {
            start: (event.page - 1) * event.size,
            count: event.size
          }
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
          qs: {
            start: (event.page - 1) * event.size,
            count: event.size
          }
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
          qs: {
            start: (event.page - 1) * event.size,
            count: event.size
          }
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
          qs: {
            start: (event.page - 1) * event.size,
            count: event.size
          }
        }
      })
      .then(res => res)
      .catch(err => console.error(err))

    ctx.body.data = res.result
  })

  return app.serve()
}
