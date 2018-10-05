// miniprogram/pages/orderlist/orderlist.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles:['待付款','待发货','待收货','已完成'],
    title:0,
    w: app.globalData.sysw,
    h: app.globalData.sysh,
    detail:null
  },

  selected:function(e){
    this.setData({
      title: e.currentTarget.dataset.title
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})