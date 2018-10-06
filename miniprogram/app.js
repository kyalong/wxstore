//app.js
App({
  onLaunch: function() {
    require('/sdk/sdk-v1.8.1')
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
    db.collection('cart').get().then(res=>{
      if(res.data[0]==undefined){
        wx.hideTabBarRedDot({
          index: 1,
        })
      }
      else{
        wx.showTabBarRedDot({
          index: 1,
        })
      }
    })

  },
  globalData: {
    sysw: '',
    sysh: '',
    init: '',
    cartlist:'',
    userInfo:''
  }
})