// miniprogram/pages/order/order.js
const app = getApp()
const db = wx.cloud.database({
  env: 'boutique10'
})
const _ = db.command
var tomorrow = function(i) {
  const date = new Date()
  return (date.getFullYear() * 10000000 + (date.getMonth() + 1) * 100000 + date.getDate() * 1000) + i
}
Page({


  data: {
    items: '',
    w: app.globalData.sysw,
    h: app.globalData.sysh,
    address: '新增收货地址',
    haveaddr: true,
    addressid: '',
    costoff: 400


  },
  selected: function(e) {
    wx.navigateTo({
      url: '../itemdetail/itemdetail?itemid=' + e.currentTarget.dataset.id,
    })
  },
  backhome: function() {
    wx.navigateBack({
      delta: 1
    })
  },
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
  formsubmit: function(e) {
    // console.log(e.currentTarget.dataset.items)
    let status = 0
    let idlist = (function(data) {
      let arr = []
      for (let i of data) {
        arr.push(i.cartid)
      }
      return arr
    })(e.currentTarget.dataset.items)
    db.collection('orderseri').doc(app.globalData.count).get().then(
      res => {
        let serinumid = res.data._id
        db.collection('order').add({
          data: {
            serinum: tomorrow(res.data.num),
            createtime: Date.parse(new Date()),
            paytime: '',
            delivertime: '',
            recievetime: '',
            rebacktime: '',
            commenttime: '',
            addressid: this.data.addressid,
            itemslist: e.currentTarget.dataset.items,
            status: status,
            total: e.currentTarget.dataset.total
          }
        }).then(res => {
          // console.log(res)
          wx.navigateTo({
            url: '../orderlist/orderlist?status=' + (status + 1),
          })
          wx.cloud.callFunction({
            name: 'removecart',
            data: {
              idlist: idlist
            }
          }).then(res => {
            console.log('清空购物车')
          })

          db.collection('orderseri').doc(serinumid).update({
            data: {
              num: _.inc(1)
            }
          }).then(data => {})
        })
      }
    )
    // wx.requestPayment({
    //   timeStamp: '',
    //   nonceStr: '',
    //   package: '',
    //   signType: '',
    //   paySign: '',
    //   success: res => {
    //     console.log(res)
    //   }
    // })

  },
  onLoad: function(options) {
    this.setData({
      h: wx.getSystemInfoSync().windowHeight - 64,
      items: JSON.parse(options.itemlist),
      total: options.total
    })
    db.collection('user').get().then(res => {
      if (res.data[0]) {
        this.setData({
          haveaddr: false,
          address: res.data[0].address,
          phone: res.data[0].phone,
          user: res.data[0].user,
          addressid: res.data[0]._id
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