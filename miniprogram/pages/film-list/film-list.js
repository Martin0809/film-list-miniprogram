// pages/film-list/film-list.js
const { api } = require('../../utils/utils')

let id = ''
let functionName = ''
let $nav = null

Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    detail: {},
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    id = options.id
    functionName = options.functionName

    const promises = [this.fetchDetail(id), this.fetchList()]
    const [detail = {}, list = []] = await Promise.all(promises)

    this.setData({
      detail: detail.data,
      list: list.data.subjects
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
  onReachBottom: async function() {
    const { page, detail, list } = this.data

    if (list.length < detail.total) {
      const res = await this.fetchList(page + 1)

      this.setData({
        page: page + 1,
        list: list.concat(res.data.subjects)
      })
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  onPageScroll: function({ scrollTop }) {
    $nav.onPageScroll(scrollTop)
  },

  fetchDetail: function(id) {
    return api('filmList/detail', {
      id
    })
  },

  fetchList: function(page = 1, size = 20) {
    let url = 'movie'

    if (functionName) {
      url = functionName
    }

    return api(`filmList/${url}`, {
      id,
      page,
      size,
    })
  }
})
