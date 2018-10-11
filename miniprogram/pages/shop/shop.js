// miniprogram/pages/shop/shop.js
import regeneratorRuntime from '../../utils/runtime.js'
const app = getApp()
var tmp = require('../../utils/tmp.js')
const db = wx.cloud.database({
  env: 'boutique10'
})
const _ = db.command
Page({
  data: {
    items: '',
    w: app.globalData.sysw,
    h: wx.getSystemInfoSync().windowHeight - 64,
    popup: 'none',
    maskinfo: '',
    masknum: 1,
    animationData: '',
    islist: false,

  },
  itemdetail: function(e) {
    if (e.currentTarget.dataset.id) {
      wx.navigateTo({
        url: '../itemdetail/itemdetail?itemid=' + e.currentTarget.dataset.id,
      })
    } else {
      wx.navigateTo({
        url: '../itemdetail/itemdetail?itemid=' + e.detail.itemid,
      })
    }

  },
  changemode: function(e) {
    if (this.data.islist) {
      this.setData({
        islist: false,
      })
      this._observer = wx.createIntersectionObserver(this)
      this._observer.relativeTo('.view').observe('.intersection', (res) => {
        if (res.intersectionRatio > 0) {
          this.setData({
            title: '今日推荐',
            opc: 1
          })
        } else {
          this.setData({
            title: '',
            opc: 0
          })
        }
      })
    } else {
      if (this._observer) {
        this._observer.disconnect()
      }
      this.setData({
        islist: true,
        title: '',
        opc: 0
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  async tmps() {
    return await db.collection('item').where({
      createdate: _.in(['20181001', '20181002', '20181003'])
    }).get()
  },
  addcart: function(e) {
    let animation = this.animation

    animation.translateY(-this.data.h).opacity(1).step({
      duration: 200
    })
    if (e.currentTarget.dataset.id) {
      db.collection('item').doc(e.currentTarget.dataset.id).get().then(res => {
        this.setData({
          maskinfo: [res.data],
          popup: 'flex',
        })
        setTimeout(() => {
          this.setData({
            animationData: animation.export(),
          })
        }, 100)
      })
    } else {
      db.collection('item').doc(e.detail.itemid).get().then(res => {
        this.setData({
          maskinfo: [res.data],
          popup: 'flex',
        })
        setTimeout(() => {
          this.setData({
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
    this.setData({
      masknum: 1,
      animationData: animation.export(),
    })
    setTimeout(() => {
      this.setData({
        popup: 'none',
      })
    }, 100)
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
    wx.showLoading({
      title: '拼命加载中',
      success: () => {
        this.tmps().then(res => {
          this.setData({
            items: res.data.slice(3, 6),
            items2: res.data.slice(8, 10),
            items1: res.data.slice(10, 11)
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
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
    })
    this.animation = animation
    this._observer = wx.createIntersectionObserver(this)
    this._observer.relativeTo('.view').observe('.intersection', (res) => {
      if (res.intersectionRatio > 0) {
        this.setData({
          title: '今日推荐',
          opc: 1
        })
      } else {
        this.setData({
          title: '',
          opc: 0
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    if (this.data.popup == 'flex') {
      this.popdown()
    }
    if (this._observer) {
      this._observer.disconnect()
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