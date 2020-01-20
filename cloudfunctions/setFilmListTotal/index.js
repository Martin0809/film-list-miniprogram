// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = (event, context) => {
  // 更新正在热映片单总数
  async function setInTheaters() {
    const res = await cloud
      .callFunction({
        name: 'api',
        data: {
          url: 'movie/in_theaters'
        }
      })
      .then(res => res.result)
      .catch(err => console.error(err))

    await cloud.database().collection('filmList')
      .where({
        function: 'getInTheaters'
      })
      .update({
        data: {
          total: res.total
        }
      })
  }

  // 更新即将上映片单总数
  async function setComingSoon() {
    const res = await cloud
      .callFunction({
        name: 'api',
        data: {
          url: 'movie/coming_soon'
        }
      })
      .then(res => res.result)
      .catch(err => console.error(err))

    await cloud.database().collection('filmList')
      .where({
        function: 'getComingSoon'
      })
      .update({
        data: {
          total: res.total
        }
      })
  }

  // 更新top250片单总数
  async function setTop250() {
    const res = await cloud
      .callFunction({
        name: 'api',
        data: {
          url: 'movie/top250'
        }
      })
      .then(res => res.result)
      .catch(err => console.error(err))

    await cloud.database().collection('filmList')
      .where({
        function: 'getTop250'
      })
      .update({
        data: {
          total: res.total
        }
      })
  }

  // 更新本周口碑榜片单总数
  async function setWeekly() {
    const res = await cloud
      .callFunction({
        name: 'api',
        data: {
          url: 'movie/weekly'
        }
      })
      .then(res => res.result)
      .catch(err => console.error(err))

    await cloud.database().collection('filmList')
      .where({
        function: 'getWeekly'
      })
      .update({
        data: {
          total: res.subjects.length
        }
      })
  }

  // 更新北美票房榜片单总数
  async function setUSBox() {
    const res = await cloud
      .callFunction({
        name: 'api',
        data: {
          url: 'movie/us_box'
        }
      })
      .then(res => res.result)
      .catch(err => console.error(err))

    await cloud.database().collection('filmList')
      .where({
        function: 'getUSBox'
      })
      .update({
        data: {
          total: res.subjects.length
        }
      })
  }

  // 更新北美票房榜片单总数
  async function setNewMovies() {
    const res = await cloud
      .callFunction({
        name: 'api',
        data: {
          url: 'movie/new_movies'
        }
      })
      .then(res => res.result)
      .catch(err => console.error(err))

    await cloud.database().collection('filmList')
      .where({
        function: 'getNewMovies'
      })
      .update({
        data: {
          total: res.subjects.length
        }
      })
  }
  
  setInTheaters()
  setComingSoon()
  setTop250()
  setWeekly()
  setUSBox()
  setNewMovies()
}
