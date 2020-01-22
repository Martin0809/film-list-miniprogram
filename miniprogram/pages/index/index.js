// miniprogram/pages/index/index.js
const { api } = require('../../utils/utils')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    filmList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.fetchBanner()
    this.fetchList()
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

  fetchBanner: async function() {
    const res = await api('index/banner')

    this.setData({
      banner: res.data
    })
  },

  fetchList: async function () {
    const res = await api('filmList/list')

    this.setData({
      filmList: res.data
    })
  },


  handleTapAvatar: function() {
    wx.navigateTo({
      url: '../profile/profile'
    })
  }
})
