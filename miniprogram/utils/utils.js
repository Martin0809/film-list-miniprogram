export const api = (url, data) => {
  if (!url) {
    return console.error('url is undefined in function api')
  }

  const urls = url.split('/')

  return wx.cloud
    .callFunction({
      name: urls[0],
      data: {
        $url: urls[1],
        ...data
      }
    })
    .then(res => res.result)
    .catch(err => console.error(err))
}

export const getStatusBarHeight = () => {
  const { statusBarHeight } = wx.getSystemInfoSync()

  return statusBarHeight * 2
}
