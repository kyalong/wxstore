// zujian/popcart/popcart.js
const app = getApp()
const db = wx.cloud.database({
  env: 'boutique10'
})
const _ = db.command
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    h: {
      type: Number,
    },
    maskinfo: {
      type: Array
    },
    popup: {
      type: String,
    },
    animationData: {
      type: Object,
    },
    masknum: {
      type: Number,
      value: 1
    },
    zhijie: {
      type: Number,
      value: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    color: 0,
    size: 0
  },
  lifetimes: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    choosecolor: function(e) {
      this.setData({
        color: e.currentTarget.dataset.color
      })
    },
    choosesize: function(e) {
      this.setData({
        size: e.currentTarget.dataset.size
      })
    },
    popdown: function() {
      this.setData({
        color: 0,
        size: 0
      })
      this.triggerEvent('popdown')
    },
    add: function(e) {
      this.triggerEvent('add')
    },
    minus: function(e) {
      this.triggerEvent('minus')
    },
    confirm: function(e) {
      db.collection('cart').add({
        data: {
          title: e.currentTarget.dataset.title,
          itemid: e.currentTarget.dataset.id,
          num: e.currentTarget.dataset.num,
          size: e.currentTarget.dataset.size,
          color: e.currentTarget.dataset.color,
          image: e.currentTarget.dataset.image,
          price: e.currentTarget.dataset.price,
          sku:e.currentTarget.dataset.sku

        }
      }).then(res => {
        if (e.currentTarget.dataset.zhijie) {
          this.triggerEvent('confirm', {
            // title: e.currentTarget.dataset.title,
            cartid: res._id,
            // num: e.currentTarget.dataset.num,
            // size: e.currentTarget.dataset.size,
            // color: e.currentTarget.dataset.color
          })
        }
        this.popdown()
        wx.showToast({
          title: '添加购物车成功',
          icon: 'success',
          mask: true
        })
      })

    },
  }
})