// miniprogram/pages/orderdetail/orderdetail.js
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
    w: app.globalData.sysw,
    h: app.globalData.sysh,
    costoff: 400
  },

  /**
   * 生命周期函数--监听页面加载
   */

  backhome: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  dial:function(e){
    wx.makePhoneCall({
      phoneNumber:'12345678901'
    })
  },
  wechat: function (e) { 
    
  },
  onLoad: function(options) {
    this.setData({
      h: wx.getSystemInfoSync().windowHeight
    })
    db.collection('order').doc(options.orderid).get().then(res => {
      db.collection('user').doc(res.data.addressid).get().then(re=>{
        this.setData({
          detail: [res.data],
          addrs:[re.data]
        })
      })
     
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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