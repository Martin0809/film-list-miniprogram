// components/film-list/film-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    filmListId: String,
    name: String,
    total: Number
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap: function () {
      wx.navigateTo({
        url: `../../pages/film-list/film-list?id=${this.data.filmListId}`
      })
    }
  }
})
