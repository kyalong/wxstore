// miniprogram/pages/vipcard/vipcard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    levels: ['VIP1', 'VIP2', 'VIP3'],
    rights: [{
      '积': '1:1',
      '兑': '200:1',
      '折': '96折',
    }, {
      '积': '1:1.5',
      '兑': '150:1',
      '折': '86折',
    }, {
      '积': '1:2',
      '兑': '100:1',
      '折': '8折',
    }],
    level: 2,
    point: 2000,
    xize: false,
    xizes: [{
        '>': '积分规则',
        ' VIP1:': '1元人民币积1分',
        'VIP2:': '1元人民币积1.5分',
        'VIP3:': '1元人民币积2分',
      },
      {
        '>': '兑换规则',
        ' VIP1:': '200积分兑换1元人民币',
        ' VIP2:': '150积分兑换1元人民币',
        ' VIP3:': '100积分兑换1元人民币',
      },
      {
        '>': '折扣特权',
        ' VIP1:': '实拍价96折',
        ' VIP2:': '实拍价86折',
        ' VIP3:': '实拍价76折',
      }
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  backhome: function(e) {
    wx.navigateBack({
      delta: 1
    })
  },
  xize: function(e) {
    this.setData({
      xize: true
    })
  },
  cancel: function(e) {
    this.setData({
      xize: false
    })
  },
  onLoad: function(options) {

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