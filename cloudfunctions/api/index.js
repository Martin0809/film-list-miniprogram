// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

const BASE_URL = 'http://api.douban.com/v2/'

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async ({ url, ...rest }, context) => {
  console.log(rest)
  const res = await rp({
    uri: `${BASE_URL}${url}?apikey=0df993c66c0c636e29ecbb5344252a4a`,
    json: true,
    ...rest,
  })
    .then(res => res)
    .catch(err => console.error(err))

  return res
}