// miniprogram/pages/itemdetail/itemdetail.js
const app = getApp()
const db = wx.cloud.database({
  env: 'boutique10'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: '',
    w: app.globalData.sysw,
    h: app.globalData.sysh,
    sh: app.globalData.syssh,
    sw: app.globalData.syssw,
    imagelist: '',
    popup: 'none',
    maskinfo: '',
    masknum: 1,
    animationData: '',
  },
  backhome: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  addcart: function(e) {
    let animation = this.animation
    animation.translateY(-this.data.h).opacity(1).step({
      duration: 200
    })
    db.collection('item').doc(e.currentTarget.dataset.id).get().then(res => {
      this.setData({
        // zhijie: '',
        maskinfo: [res.data],
        popup: 'flex',
      })
      setTimeout(() => {
        this.setData({

          animationData: animation.export(),
        })
      }, 100)
    })

  },
  popdown: function() {
    let animation = this.animation
    animation.translateY(0).step({
      duration: 200
    })
    this.setData({
      masknum: 1,
      animationData: animation.export(),
    })
    setTimeout(() => {
      this.setData({
        popup: 'none',
      })
    }, 100)
  },
  add: function(e) {
    this.setData({
      masknum: this.data.masknum + 1
    })
  },
  minus: function(e) {
    let s = this.data.masknum
    if (s > 1) {
      this.setData({
        masknum: s - 1
      })
    }
  },
  buy: function(e) {
    let animation = this.animation
    animation.translateY(-this.data.h).opacity(1).step({
      duration: 200
    })
    db.collection('item').doc(e.currentTarget.dataset.id).get().then(res => {
      this.setData({
        // zhijie: e.currentTarget.dataset.zhijie,
        maskinfo: [res.data],
        popup: 'flex',
      })
      setTimeout(() => {
        this.setData({
          animationData: animation.export(),
        })
      }, 100)
    })
  },
  confirm: function(e) {
    wx.navigateTo({
      url: '../order/order?cartid=' + e.detail.cartid,
    })
  },
  onLoad: function(options) {
    this.setData({
      h: wx.getSystemInfoSync().windowHeight - 64
    })
    db.collection('item').doc(options.itemid).get().then(res => {
      this.setData({
        items: [res.data],
        imagelist: res.data.image
      })
      this._observer = wx.createIntersectionObserver()
      this._observer.relativeTo('.view').observe('.intersection', (res) => {
        if (res.intersectionRatio > 0) {
          this.setData({
            title: '宝贝Plus',
            opc: 1,

          })
        } else {
          this.setData({
            title: '',
            opc: 0,
          })
        }
      })
    })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
    })
    this.animation = animation
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.popdown()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})