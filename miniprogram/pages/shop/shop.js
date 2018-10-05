// miniprogram/pages/shop/shop.js
import regeneratorRuntime from '../../utils/runtime.js'
const app = getApp()
var tmp = require('../../utils/tmp.js')
const db = wx.cloud.database({
  env: 'boutique10'
})
const _=db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: '',
    w: app.globalData.sysw,
    h: app.globalData.sysh,
    popup: 'none',
    maskinfo: '',
    masknum: 1,
    animationData: '',
    islist: false,

  },
  itemdetail: function(e) {
    if (e.currentTarget.dataset.id){
      wx.navigateTo({
        url: '../itemdetail/itemdetail?itemid=' + e.currentTarget.dataset.id,
      })
    }else{
      wx.navigateTo({
        url: '../itemdetail/itemdetail?itemid=' + e.detail.itemid,
      })
    }
   
  },
  changemode:function(e){
    if (this.data.islist){
      this.setData({
        islist: false
      })
    }else{
      this.setData({
        islist: true
      })
    }
    
  },  /**
   * 生命周期函数--监听页面加载
   */
  async tmps() {
    return await db.collection('item').where({
      createdate: _.in(['20181001', '20181002', '20181003']) 
    }).get()
  },
  addcart: function(e) {
    let animation = this.animation
    // animation.height(this.data.h).backgroundColor('#000000b3').step({
    //   duration: 150
    // })
    animation.translateY(-this.data.h).opacity(1).step({
      duration: 200
    })
    if (e.currentTarget.dataset.id){
      db.collection('item').doc(e.currentTarget.dataset.id).get().then(res => {
        this.setData({
          maskinfo: [res.data],
          popup: 'flex',
          // animationData: animation.export(),
        })
        setTimeout(() => {
          this.setData({
            // maskinfo: [res.data],
            // popup: false,
            animationData: animation.export(),
          })
        }, 100)
      })
    }else{
      db.collection('item').doc(e.detail.itemid).get().then(res => {
        this.setData({
          maskinfo: [res.data],
          popup: 'flex',
          // animationData: animation.export(),
        })
        setTimeout(() => {
          this.setData({
            // maskinfo: [res.data],
            // popup: false,
            animationData: animation.export(),
          })
        }, 100)
      })
    }
    

  },
  popdown: function() {
    let animation = this.animation
    animation.translateY(0).step({
      duration: 300
    })
    // animation.height(0).backgroundColor('transparent').step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(() => {
      this.setData({
        popup: 'none',
      })
    }, 100)

  },
  confirm: function(e) {
    db.collection('cart').add({
      data: {
        itemid: e.currentTarget.dataset.id,
        num: 1
      }
    }).then(res => {
      wx.showToast({
        title: '添加购物车成功',
        icon: 'success',
        mask: true
      })
    })
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
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.showLoading({
      title: '拼命加载中',
      success: () => {
        this.tmps().then(res => {
          this.setData({
            items: res.data.slice(0,3),
            items2:res.data.slice(8,10),
            items1: res.data.slice(10,11)
          })
          wx.hideLoading()
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
    })
    this.animation = animation

    // this.items()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    if(this.data.popup=='flex'){
      this.popdown()
    }
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