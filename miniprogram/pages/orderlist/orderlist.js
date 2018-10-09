// miniprogram/pages/orderlist/orderlist.js
const app = getApp()
const db = wx.cloud.database({
  env: 'boutique10'
})
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: ['全部', '待付款', '待发货', '待收货', '已完成'],
    title: 0,
    w: app.globalData.sysw,
    h: app.globalData.sysh,
    detail: null
  },

  selected: function(e) {
    wx.showLoading({
      title: '拼命加载中',
      success: res => {
        if (e.currentTarget.dataset.title == 0) {
          db.collection('order').orderBy('serinum', 'desc').get().then(res => {
            this.setData({
              totop: 0,
              detail: res.data,
              title: e.currentTarget.dataset.title
            })
            wx.hideLoading()
          })
        } else {
          db.collection('order').orderBy('serinum', 'desc').where({
            status: Number(e.currentTarget.dataset.title) - 1
          }).get().then(res => {
            this.setData({
              totop: 0,
              title: e.currentTarget.dataset.title,
              detail: res.data
            })
            wx.hideLoading()
          })
        }

      }
    })

  },
  backhome: function() {
    wx.switchTab({
     url:'../my/my'
    })
  },
  gotodetail: function(e) {

  },
  gotoitem: function(e) {
    console.log(e.currentTarget.dataset.itemid)
    wx.navigateTo({
      url: '../itemdetail/itemdetail?itemid=' + e.currentTarget.dataset.itemid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '拼命加载中',
      success: res => {
        if (options.status == 0) {
          db.collection('order').orderBy('serinum', 'desc').get().then(res => {

            this.setData({
              title: options.status,
              detail: res.data
            })
            wx.hideLoading()

          })
        } else {
          db.collection('order').where({
            status: Number(options.status) - 1
          }).orderBy('serinum', 'desc').get().then(res => {
            this.setData({
              title: options.status,
              detail: res.data
            })
            wx.hideLoading()
          })
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      h: wx.getSystemInfoSync().windowHeight
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // db.collection('order').get().then(res => {
    //   this.setData({
    //     detail: res.data
    //   })
    // })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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