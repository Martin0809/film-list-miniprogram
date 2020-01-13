// pages/film-list/film-list.js
const { api } = require('../../utils/utils')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    functionName: '',
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function({ id, functionName }) {
    const { data, result } = await this.fetchDetail(id)

    this.setData({
      id,
      functionName,
      detail: data
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

  fetchDetail: function(id) {
    return api('filmList', {
      id,
      $url: 'detail'
    })
  },

  fetchList: function(page = 1, size = 20) {}
})
