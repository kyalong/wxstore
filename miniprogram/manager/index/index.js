// miniprogram/manager/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: [
      ['订单管理', ''],
      ['商品管理', ''],
      ['财务管理', ''],
      ['卡券管理', ''],
      ['会员管理', ''],
      ['退货管理', '']
    ],
    titles:'',
    count: ''
  },
  goto: function(e) {
    switch (e.currentTarget.dataset.index) {
      case 0:
        wx.navigateTo({
          url: '../order/order?status=0',
        })
        break
      case 1:
        wx.navigateTo({
          url: '/manager/item/item',
        })
        break
      case 2:
        wx.navigateTo({
          url: '/manager/income/income',
        })
        break
      case 3:
        wx.navigateTo({
          url: '/manager/card/card',
        })
        break
      case 4:
        wx.navigateTo({
          url: '/manager/vip/vip',
        })
        break
      case 5:
        wx.navigateTo({
          url: '/manager/rma/rma',
        })
        break
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
    wx.cloud.callFunction({
      name: 'static',
      data: {
        status: 0,
      }
    }).then(res => {
      this.data.title[0][1] = '('+res.result.ordercount.total+')'
      this.data.title[1][1] = '('+res.result.itemcount.total+')'
      this.setData({
        title: this.data.title
      })
    })
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