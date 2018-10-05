// miniprogram/pages/order/order.js
const app = getApp()
const db = wx.cloud.database({
  env: 'boutique10'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: {
      sku1: ['真皮', 36, 100, '../../images/item1.png', 10],
      sku2: ['牛皮', 37, 1200, '../../images/item2.png', 1],
      sku3: ['真皮', 42, 1100, '../../images/item3.png', 2],
      sku4: ['真皮', 35, 1000, '../../images/item4.png', 3],
    },
    w: app.globalData.sysw,
    h: app.globalData.sysh,
    total: 1000,
    address: '新增收货地址',
    haveaddr: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getaddr: function() {
    wx.chooseAddress({
      success: (res) => {
        console.log(res)
        this.setData({
          haveaddr: false,
          address: res.cityName + res.countyName + res.detailInfo,
          phone: res.telNumber,
          user: res.userName
        })
        db.collection('user').add({
          data: {
            phone: res.telNumber,
            address: res.cityName + res.countyName + res.detailInfo,
            user: res.userName
          }
        }).then(rep => {
          console.log('ok')
        })

      }
    })
  },
  formsubmit:function(e){
    console.log(e)
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: '',
      paySign: '',
      success:res=>{
        console.log(res)
      }
    })
  },
  onLoad: function(options) {
    db.collection('user').get().then(res => {
      // console.log(res.data)
      if (res.data[0]) {
        this.setData({
          haveaddr: false,
          address: res.data[0].address,
          phone: res.data[0].phone,
          user: res.data[0].user
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