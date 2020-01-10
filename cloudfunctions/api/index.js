// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await req({
    ...event,
    url: `${event.url}?apikey=0df993c66c0c636e29ecbb5344252a4a`
  })
    .then(res => res)
    .catch(err => console.error(err))

  return res
}
