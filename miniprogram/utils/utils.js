export const api = (url, data) => {
  return wx.cloud
    .callFunction({
      data,
      name: url
    })
    .then(res => res.result)
    .catch(err => console.error(err))
}
