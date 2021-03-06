// miniprogram/pages/movie/movie.js
const { api } = require('../../utils/utils')

let id = ''
let $nav = null

Page({
  /**
   * 页面的初始数据
   */
  data: {
    descHidden: true,
    detail: {},
    wanted: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    id = options.id

    const detail = await this.fetch()

    this.setData({
      detail: detail.data,
      wanted: !!detail.data.wanted
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    $nav = this.selectComponent('#nav')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  onPageScroll: function({ scrollTop }) {
    $nav.onPageScroll(scrollTop)
  },

  fetch: function() {
    return api('movie/detail', { id })
  },

  handleCastTap: function(e) {
    const id = e.currentTarget.dataset.castId

    wx.navigateTo({
      url: `../../pages/cast/cast?id=${id}`
    })
  },

  triggerWant: function() {
    let promise = null

    wx.showLoading({ title: '', mask: true })

    if (this.data.wanted) {
      console.log('remove')
      promise = api('wanted/remove', { movieId: id })
    } else {
      console.log('add')
      promise = api('wanted/add', { movieId: id })
    }

    promise
      .then(res => {
        wx.hideLoading()

        if (res.result) {
          this.setData({
            wanted: !this.data.wanted
          })
        }
      })
      .catch(() => wx.hideLoading())
  }
})
