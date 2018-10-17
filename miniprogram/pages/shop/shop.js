// miniprogram/pages/shop/shop.js
import regeneratorRuntime from '../../utils/runtime.js'
const app = getApp()
var util = require('../../utils/util.js')
const db = wx.cloud.database({
  env: 'boutique1'
})
const _ = db.command
Page({
  data: {
    items: [{
      "sku": "",
      "shop": "",
      "fistimage": "https://img.alicdn.com/bao/uploaded/i2/376934515/TB1mwbpcH2pK1RjSZFsXXaNlXXa_!!0-item_pic.jpg_500x500.jpg",
      "price": 245.0,
      "subtitle": "工厂真皮英伦大码男鞋子休闲皮鞋韩版一脚蹬特大号牛皮男士单鞋",
      "detail": [],
      "image": [],
      "createdate": "20181017",
      "title": "舒服",
      "group": 0
    }],
    items1tmp: [{
      "sku": "",
      "shop": "",
      "fistimage": "https://img.alicdn.com/bao/uploaded/i2/376934515/TB1mwbpcH2pK1RjSZFsXXaNlXXa_!!0-item_pic.jpg_500x500.jpg",
      "price": 245.0,
      "subtitle": "工厂真皮英伦大码男鞋子休闲皮鞋韩版一脚蹬特大号牛皮男士单鞋",
      "detail": [],
      "image": [],
      "createdate": "20181017",
      "title": "舒服",
      "group": 0
    }],
    items2tmp: [
      [{
        "sku": "",
        "shop": "",
        "fistimage": "https://img.alicdn.com/bao/uploaded/i2/376934515/TB1esMCiCMmBKNjSZTEXXasKpXa_!!0-item_pic.jpg_500x500.jpg",
        "price": 204.0,
        "subtitle": "夏季新款工厂断码欧美男鞋运动鞋透气休闲系带厚底鞋运动鞋网鞋",
        "detail": [],
        "image": [],
        "title": "舒服",
        "group": 0
      }, {
        "sku": "",
        "shop": "",
        "fistimage": "https://img.alicdn.com/bao/uploaded/i2/376934515/O1CN011jDuhiB4CpkHc7H_!!0-item_pic.jpg_500x500.jpg",
        "price": 168.0,
        "subtitle": "2018秋季新款断码处理真皮女鞋学生鞋韩版厚底休闲运动鞋女单鞋",
        "detail": [],
        "image": [],
        "title": "舒服",
        "group": 0
      }]
    ],
    w: app.globalData.sysw,
    h: wx.getSystemInfoSync().windowHeight - 64,
    popup: 'none',
    maskinfo: '',
    masknum: 1,
    animationData: '',
    islist: false,
    currentpage: 0,
    progress: 0
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
  // changemode: function(e) {
  //   if (this.data.islist) {
  //     this.setData({
  //       islist: false,
  //     })
  //     this._observer = wx.createIntersectionObserver(this)
  //     this._observer.relativeTo('.view').observe('.intersection', (res) => {
  //       if (res.intersectionRatio > 0) {
  //         this.setData({
  //           title: '今日推荐',
  //           opc: 1
  //         })
  //       } else {
  //         this.setData({
  //           title: '',
  //           opc: 0
  //         })
  //       }
  //     })
  //   } else {
  //     if (this._observer) {
  //       this._observer.disconnect()
  //     }
  //     this.setData({
  //       islist: true,
  //       title: '',
  //       opc: 0
  //     })
  //   }

  // },
  addcart: function(e) {
    let animation = this.animation
    animation.translateY(-this.data.h).opacity(1).step({
      duration: 200
    })
    let sku = e.detail.sku ? e.detail.sku : e.currentTarget.dataset.sku
    wx.getStorage({
      key: 'cache',
      success: res => {
        try {
          (function(data, sku) {
            for (let i of data) {
              if (i.sku == sku) {
                return i
              }
            }
          })(res.data, sku)[0]
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
        } catch (e) {
          db.collection('item').doc(id).get().then(res => {
            this.setData({
              maskinfo: [res.data],
              popup: 'flex',
            })
          })
        } finally {
          setTimeout(() => {
            this.setData({
              animationData: animation.export(),
            })
          }, 100)
        }
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
  refresh: function(e) {},
  loadcard: function(e) {},
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // wx.cloud.callFunction({
    //   name: 'getdata',
    //   data: {
    //     next: this.data.currentpage
    //   }
    // }).then(res => {
    app.firstitems = res => {
      this.data.items = res
      let items1 = (function(data) {
        let arr = []
        for (let j in data) {
          if (j % 3 == 0) {
            arr.push(data[j])
          }
        }
        return arr
      })(this.data.items)
      let items2 = (function(data) {
        let arr = []
        let arrs = []
        for (let j in data) {
          if ((j + 3) % 3 != 0) {
            arr.push(data[j])
          }
        }
        let t = arr.length
        for (let i = 0; i < t / 2; i++) {
          arrs.push(arr.slice(2 * i, 2 * (i + 1)))
        }
        return arrs
      })(this.data.items)
      this.setData({
        items: this.data.items,
        items1: items1,
        items2: items2,
      })
      wx.setStorage({
        key: 'cache',
        data: this.data.items,
        success: () => {
          wx.hideLoading()
        }
      })
    }
    // })
  },

  /** 
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    // this.setData({
    //   h: wx.getSystemInfoSync().windowHeight - 64
    // })
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
    })
    this.animation = animation
    this._observer = wx.createIntersectionObserver(this)
    wx.createIntersectionObserver().relativeToViewport({
      bottom: 1300
    }).observe('.end', (res) => {
      wx.cloud.callFunction({
        name: 'getdata',
        data: {
          next: this.data.currentpage + 1
        }
      }).then(res => {
        try {
          this.data.items = [...this.data.items, ...res.result.data]
        } catch (e) {
          console.log('end')
        }
        wx.setStorage({
          key: 'cache',
          data: this.data.items,
          success: () => {
            wx.hideLoading()
          }
        })
        let items1 = (function(data) {
          let arr = []
          for (let j in data) {
            if (j % 3 == 0) {
              arr.push(data[j])
            }
          }
          return arr
        })(this.data.items)
        let items2 = (function(data) {
          let arr = []
          let arrs = []
          for (let j in data) {
            if ((j + 3) % 3 != 0) {
              arr.push(data[j])
            }
          }
          let t = arr.length
          for (let i = 0; i < t / 2; i++) {
            arrs.push(arr.slice(2 * i, 2 * (i + 1)))
          }
          return arrs
        })(this.data.items)
        this.setData({
          currentpage: this.data.currentpage + 1,
          items: this.data.items,
          items1: items1,
          items2: items2,

        })
      })
    })
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