// components/nav/nav.js
const { getStatusBarHeight } = require('../../utils/utils')

Component({
  options: {
    styleIsolation: 'apply-shared'
  },

  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    backgroundColor: String,
    color: String,
    absoluteStatusBar: Boolean,
    top: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    canBack: true,
    statusBarHeight: getStatusBarHeight(),
    opacity: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPageScroll: function(scrollTop) {
      const { top, opacity } = this.data
      let calcTop = top / 2

      if (scrollTop >= calcTop && opacity === 0) {
        this.setData({ opacity: 1 })
      } else if (scrollTop < calcTop && opacity === 1) {
        this.setData({ opacity: 0 })
      }
    },

    handleBack: function() {
      wx.navigateBack()
    }
  },

  lifetimes: {
    ready: function() {
      this.setData({ canBack: getCurrentPages().length > 1 })
    }
  }
})
