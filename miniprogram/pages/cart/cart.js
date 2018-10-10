// miniprogram/pages/cart/cart.js
import regeneratorRuntime from '../../utils/runtime.js'
const app = getApp()
const db = wx.cloud.database({
  env: 'boutique10'
})
const _ = db.command
var len = ''
var currentlist = ''
Page({

  data: {
    items: '',
    w: app.globalData.sysw,
    h: app.globalData.sysh,
    ischecked: false,
    isall: false,
    isopen: false,
    newitems: '',
    total: '',
    isnull: false
  },
  check: function(e) {
    currentlist = (function(data) {
      let arr = []
      for (let i of data) {
        arr.push(JSON.parse(i))
      }
      return arr
    })(e.detail.value)
    if (e.detail.value.length == len) {
      this.setData({
        isall: true
      })
    } else {
      this.setData({
        isall: false,
      })
    }
    this.setData({
      total: (function(data) {
        let total = 0
        for (let i of data) {
          total += JSON.parse(i).price * JSON.parse(i).num
        }
        return total
      })(e.detail.value),
      newitems: (function(data) {
        let total = []
        for (let i of data) {
          let s = JSON.parse(i)
          s.cartid = s._id
          s.userid = s._openid
          delete s._id
          delete s._openid
          total.push(s)
        }
        return total
      })(e.detail.value)
    })
  },
  all: function() {

  },
  buy: function(e) {
    let list = ''
    if (this.data.newitems == '') {
      list = (function(data) {
        let total = []
        for (let i of data) {
          i.cartid = i._id
          i.userid = i._openid
          delete i._id
          delete i._openid
          total.push(i)
        }
        return JSON.stringify(total)
      })(this.data.items)

    } else {
      list = e.currentTarget.dataset.list
    }
    wx.navigateTo({
      url: '../order/order?itemlist=' + list + '&total=' + e.currentTarget.dataset.total,
    })
  },
  cartlist: function() {
    let _this = this
    db.collection('cart').orderBy('itemid', 'desc').get().then((res) => {
      if (res.data[0] == undefined) {
        wx.hideTabBarRedDot({
          index: 1,
        })
        _this.setData({
          isall: false,
          isnull: false,
          items: ''
        })
      } else {
        wx.showTabBarRedDot({
          index: 1,
        })
        _this.setData({
          ischecked: true,
          isall: true,
          isnull: true,
          newitems: '',
          total: '',
        })
        currentlist = ''
        len = res.data.length
        this.setData({
          items: res.data,
          total: (function(res) {
            let total = 0
            for (let i of res) {
              total += i.price * i.num
            }
            return total
          })(res.data)
        })
      }
      wx.hideLoading()
    })
  },
  selected: function(e) {
    if (this.data.isall) {
      this.setData({
        ischecked: false,
        isall: false,
        total: 0
      })
    } else {
      this.setData({
        ischecked: true,
        isall: true,
        total: (function(res) {
          let total = 0
          for (let i of res) {
            total += i.price * i.num
          }
          return total
        })(this.data.items)
      })
    }
  },
  backhome: function() {
    wx.switchTab({
      url: '../shop/shop',
    })
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
    let id = e.currentTarget.dataset.id
    db.collection('cart').doc(id).update({
      data: {
        num: _.inc(1)
      }
    })
    let totals = 0
    for (let i of this.data.items) {
      if (i._id == id) {
        i.num += 1
        for (let j of currentlist) {
          if (id == j._id) {
            j.num = i.num
            totals += j.price * j.num
          } else {
            totals += j.price * j.num
          }
        }
      }
    }
    this.setData({
      items: this.data.items,
      total: currentlist[0] != undefined ? totals : (function(res) {
        let total = 0
        for (let i of res) {
          total += i.price * i.num
        }
        return total
      })(this.data.items)
    })
  },
  minus: function(e) {
    let id = e.currentTarget.dataset.id
    let totals = 0
    for (let i of this.data.items) {
      if (i._id == id && i.num > 1) {
        i.num -= 1
        db.collection('cart').doc(e.currentTarget.dataset.id).update({
          data: {
            num: _.inc(-1)
          }
        })
        for (let j of currentlist) {
          if (id == j._id) {
            j.num = i.num
            totals += j.price * j.num
          } else {
            totals += j.price * j.num
          }
        }
      } else if (i._id == id && i.num == 1) {
        totals = this.data.total
      }
    }
    this.setData({
      items: this.data.items,
      total: currentlist[0] ? totals : (function(res) {
        let total = 0
        for (let i of res) {
          total += i.price * i.num
        }
        return total
      })(this.data.items)
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
    let itemnum = ''
    wx.showLoading({
      title: '拼命加载中',
      success: () => {
        this.cartlist()
      }
    })
    db.collection('cart').count().then(res => {
      itemnum = res.total
    })
    this._observer = wx.createIntersectionObserver()
    this._observer.relativeTo('.view').observe('.intersection', (res) => {
      if (res.intersectionRatio > 0) {
        this.setData({
          title: '购物车',
          opc: 1,
          itemnum: '(' + itemnum + ')'
        })
      } else {
        this.setData({
          title: '',
          opc: 0,
          itemnum: ''
        })
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
    if (this._observer) {
      this._observer.disconnect()

    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (this._observer) {
      this._observer.disconnect()

    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.cartlist()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1500)
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