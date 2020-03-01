// components/desc/desc.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    top: Number,
    content: String
  },

  observers: {
    content: function(content) {
      this.setData({
        desc: JSON.parse(JSON.stringify(content))
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hidden: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap: function() {
      this.setData({
        hidden: !this.data.hidden
      })
    }
  }
})
