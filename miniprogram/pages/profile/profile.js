// miniprogram/pages/profile/profile.js
const { api } = require('../../utils/utils')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const list = await this.fetch()

    this.setData({
      movies: list.data.movies,
      total: list.data.total
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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

  fetch: function() {
    return api('wanted/list')
  },

  removeWanted: function(e) {
    const id = e.detail.id
    const movies = this.data.movies.filter(item => id !== item.id)
    const total = this.data.total - 1

    this.setData({ movies, total })
  }
})
