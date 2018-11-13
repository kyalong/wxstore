// miniprogram/manager/item/item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    features: ['商品列表', '商品分组'],
    finput: {
      '商品类别': 'class',
      '商品名称': 'subtitle',
      '供货店铺': 'shop',
      '主要图片': 'fistimage',
      '价格': 'price',
      '颜色': 'color',
      '尺码': 'size',
      '库存': 'stock',
      '商品编码': 'sku',
      '展示栏': 'group',
    },
    feature: 0,
    list: true
  },
  backhome: function(e) {
    wx.navigateBack({
      delta: 1
    })
  },
  feature: function(e) {
    this.setData({
      feature: e.currentTarget.dataset.feature,
      list: true
    })
  },
  addspu: function(e) {
    this.setData({
      list: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      h: wx.getSystemInfoSync().windowHeight
    })
    wx.showLoading({
      title: '全速加载中',
      mask: true,
      success: () => {
        wx.cloud.callFunction({
          name: 'getdata',
          data: {
            isall: 'all',
            next: 100
          }
        }).then(res => {
          console.log(res.result)
          this.setData({
            spulist: res.result.data,
            spucount: res.result.count.total
          })
          wx.hideLoading()
        })
      }
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