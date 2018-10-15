// miniprogram/pages/shop/shop.js
import regeneratorRuntime from '../../utils/runtime.js'
const app = getApp()
var util = require('../../utils/util.js')
const db = wx.cloud.database({
  env: 'boutique10'
})
const _ = db.command
Page({
  data: {
    items: '',
    w: app.globalData.sysw,
    h: app.globalData.sysh - 64,
    popup: 'none',
    maskinfo: '',
    masknum: 1,
    animationData: '',
    islist: false,

  },
  itemdetail: function(e) {
    if (e.currentTarget.dataset.id) {
      wx.navigateTo({
        url: '../itemdetail/itemdetail?itemid=' + e.currentTarget.dataset.id + '&sku=' + e.currentTarget.dataset.sku,
      })
    } else {
      wx.navigateTo({
        url: '../itemdetail/itemdetail?itemid=' + e.detail.itemid + '&sku=' + e.detail.sku,
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
      createdate: _.in(['20181012', '20181002', '20181003'])
    }).skip(50).get()
  },
  addcart: function(e) {
    let animation = this.animation
    animation.translateY(-this.data.h).opacity(1).step({
      duration: 200
    })
    let sku = e.detail.sku ? e.detail.sku : e.currentTarget.dataset.sku
    wx.getStorage({
      key: 'cache',
      success: res => {
        this.setData({
          maskinfo: [(function(data, sku) {
            for (let i of data) {
              if (i.sku == sku) {
                return i
              }
            }
          })(res.data, sku)],
          popup: 'flex'
        })
        setTimeout(() => {
          this.setData({
            animationData: animation.export(),
          })
        }, 100)
      },
      fail: res => {
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
      }
    })

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
      mask: true,
      success: () => {
        wx.cloud.callFunction({
          name: 'getdata',
          data:{
            class:'男装'
          }
        }).then(res => {
          let newdatas = util.random(res.result.data)

          this.setData({
            items: newdatas.slice(0, 16),
            items2: (function(data) {
              let arr = []
              let t = data.length / 2
              let i = 0
              while (i < t) {
                let s1 = data.shift()
                let s2 = data.shift()
                arr.push([s1, s2])
                i += 1
              }
              return arr
            })(newdatas.slice(16, 48)),
            items3: newdatas.slice(48, 59)
          })
          wx.setStorageSync('cache', newdatas)
          wx.hideLoading()
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /** 
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      h: wx.getSystemInfoSync().windowHeight - 64
    })
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
    wx.clearStorageSync()
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