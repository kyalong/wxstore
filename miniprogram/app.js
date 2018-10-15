//app.js
var tomorrow = function(i) {
  const date = new Date()
  return (date.getFullYear() * 10000000 + (date.getMonth() + 1) * 100000 + date.getDate() * 1000) + i
}
App({
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: 'boutique10'
      })

    }
    const db = wx.cloud.database({
      env: 'boutique10'
    })
    let sysinfo = wx.getSystemInfoSync()
    this.globalData.sysw = sysinfo.windowWidth
    this.globalData.sysh = sysinfo.windowHeight
    this.globalData.syssw = sysinfo.screenWidth
    this.globalData.syssh = sysinfo.screenHeight
    db.collection('cart').get().then(res => {
      if (res.data[0] == undefined) {
        wx.hideTabBarRedDot({
          index: 1,
        })
      } else {
        wx.showTabBarRedDot({
          index: 1,
        })
      }
    })

    db.collection('orderseri').where({
      date: String(tomorrow(0) / 1000)
    }).get().then(res => {
      if (res.data.length > 0) {
        this.globalData.count = res.data[0]._id
        console.log('获取当前订单号')
      } else {
        db.collection('orderseri').add({
          data: {
            'date': String(tomorrow(0) / 1000),
            'num': 1
          }
        }).then(res => {
          this.globalData.count=res._id
        })
      }
    })
    wx.cloud.callFunction({
      name:'login'
    }).then(res=>{
      this.globalData.userid = res.result.openid
    })
  },
  globalData: {
    sysw: '',
    sysh: '',
    init: '',
    cartlist: '',
    userInfo: '',
    count: '',
    userid:''
  }
})