// components/movie-card/movie-card.js
const { api } = require('../../utils/utils')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },

  observers: {
    'data.genres': function(genres) {
      this.setData({
        genres: genres.join(' ')
      })
    },
    'data.casts': function(casts) {
      this.setData({
        casts: casts.map(item => item.name).join(' / ')
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap: function() {
      wx.navigateTo({
        url: `../../pages/movie/movie?id=${this.data.data.id}`
      })
    },

    handleAddWanted: function() {
      wx.showLoading({ title: '', mask: true })
      api('wanted/add', {
        movieId: this.data.data.id
      })
        .then(res => {
          wx.hideLoading()

          if (res.result) {
            this.triggerEvent('add', { id: this.data.data.id })
          }
        })
        .catch(() => wx.hideLoading())
    },

    handleRemoveWanted: function() {
      wx.showLoading({ title: '', mask: true })
      api('wanted/remove', {
        movieId: this.data.data.id
      })
        .then(res => {
          wx.hideLoading()

          if (res.result) {
            this.triggerEvent('remove', { id: this.data.data.id })
          }
        })
        .catch(() => wx.hideLoading())
    }
  }
})
