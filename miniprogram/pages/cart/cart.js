// miniprogram/pages/cart/cart.js
import regeneratorRuntime from '../../utils/runtime.js'
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
    total: 1000,
    ischecked: true,
    num: 1,
    cnum: 1,
    isopen: false,
  },

  buy: function(e) {
    wx.navigateTo({
      url: '../order/order',
    })
  },
  cartlist: function() {
    let _this=this
    return new Promise(function(resolve, reject) {
      db.collection('cart').get().then((res) => {
        if (res.data[0] == undefined) {
          wx.hideTabBarRedDot({
            index: 1,
          })
          _this.setData({
            ischecked: false
          })
        } else {
          wx.showTabBarRedDot({
            index: 1,
          })
          _this.setData({
            ischecked: true
          })
        }
        let arr = []
        for (let i of res.data) {
          (function(i) {
            db.collection('item').doc(i.itemid).get().then(res => {
              res.data.num = i.num
              res.data.cartid = i._id
              arr.push(res.data)
            })
          })(i)

        }
        resolve(arr)

      })
    })
  },
  selected: function(e) {
    if (this.data.ischecked) {
      this.setData({
        ischecked: false
      })
    } else {
      this.setData({
        ischecked: true
      })
    }
  },
  gotodetail: function(e) {
    if (this.data.isopen) {
      this.setData({
        isopen: false
      })
    }
    wx.navigateTo({
      url: '../itemdetail/itemdetail?itemid=' + e.currentTarget.dataset.id,
    })
  },

  add: function(e) {
    this.setData({
      num: e.currentTarget.dataset.num + this.data.num
    })
  },
  minus: function(e) {
    let s = this.data.num
    if (s > 1) {
      this.setData({
        num: s - 1
      })
    } else if (e.currentTarget.dataset.num > 1) {
      this.data.cnum += 1
      this.setData({
        num: e.currentTarget.dataset.num - this.data.cnum
      })
    }
  },
  refresh: function() {
    this.cartlist().then(res => {
      setTimeout(() => {
        res.sort((a, b) => {
          return b.itemid - a.itemid
        })
        this.setData({
          items: res
        })
        wx.hideLoading()
      }, 1500)
    })
  },

  onLoad: function(options) {
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
    })
    this.animation = animation
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
    wx.showLoading({
      title: '拼命加载中',
      success: () => {
        // console.log(Promise.all(this.cartlist()))
        this.refresh()
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    db.collection('cart').get().then(res => {
      if (res.data[0] == undefined) {
        this.setData({
          ischecked: false
        })
        wx.hideTabBarRedDot({
          index: 1,
        })
      }
    })
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
    this.refresh()
    setTimeout(()=>{
      wx.stopPullDownRefresh()
    },1500)
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