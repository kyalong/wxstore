// miniprogram/manager/order/order.js
const app = getApp()
const db = wx.cloud.database({
  env: 'boutique1'
})
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: ['全部', '待付款', '待发货', '待收货', '已完成'],
    title: 0,
    w: app.globalData.sysw,
    h: app.globalData.sysh,
    detail: null,
    num: ''
  },
  backhome: function(e) {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  selected: function(e) {
    wx.showLoading({
      title: '拼命加载中',
      success: res => {
        if (e.currentTarget.dataset.title == 0) {
          wx.cloud.callFunction({
            name: 'getorder',
            data: {
              status: _.in([0, 1, 2, 3])
            }
          }).then(res => {
            this.setData({
              totop: 0,
              detail: res.result.data,
              title: e.currentTarget.dataset.title
            })
            wx.hideLoading()
          })
        } else {
          wx.cloud.callFunction({
            name: 'getorder',
            data: {
              status: Number(e.currentTarget.dataset.title) - 1
            }
          }).then(res => {
            this.setData({
              totop: 0,
              title: e.currentTarget.dataset.title,
              detail: res.result.data
            })
            wx.hideLoading()
          })
        }

      }
    })

  },
  status: function(e) {
    if (e.currentTarget.dataset.status == 1) {
      wx.cloud.callFunction({
        name: 'modifyorder',
        data: {
          id: e.currentTarget.dataset.num,
          num: this.data.num
        }
      }).then(res => {
        wx.cloud.callFunction({
          name: 'getorder',
          status: this.data.title == 0 ? _.in([0, 1, 2, 3]) : Number(this.data.title) - 1
        }).then(res => {
          this.setData({
            totop: 0,
            title: this.data.title,
            detail: res.result.data
          })
        })
      })
    }
  },
  formsubmit:function(e){
    console.log(e.detail.value.total)
  },

  input: function(e) {
    // if(e.detail.value){
    //   return ''
    // }
  },
  done: function(e) {
    this.data.num = e.detail.value
  },
  copy: function(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: () => {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },
  onLoad: function(options) {
    wx.showLoading({
      title: '拼命加载中',
      success: res => {
        if (options.status == 0) {
          wx.cloud.callFunction({
            name: 'getorder',
            data: {
              status: 0,
            }
          }).then(res => {
              this.setData({
                title: options.status,
                detail: res.result.data.data
              })
              wx.hideLoading()
          })
        } else {
          wx.cloud.callFunction({
            name: 'getorder',
            data: {
              status: Number(options.status) - 1
            }
          }).then(res => {
            this.setData({
              title: options.status,
              detail: res.result.data.data
            })
            wx.hideLoading()
          })
        }

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