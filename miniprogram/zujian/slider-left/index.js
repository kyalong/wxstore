const app = getApp()
const db = wx.cloud.database({
  env: 'boutique10'
})
const _ = db.command
Component({
  properties: {
    // 阈值，往左移动超过则显示菜单项，否则隐藏（一般为菜单宽的40%）
    moveThreshold: {
      type: Number,
      value: 48
    },
    // 可以往左拖动的最大距离,同时它也是组件的初始x坐标，此时菜单不可见
    openWidth: {
      type: Number,
      value: 120
    },
    itemid: {
      type: String
    },
    isuse: {
      type: Boolean,
      value: false
    },
    // 菜单是否打开了，true表示打开，false表示关闭
    open: {
      type: Boolean,
      value: false,
      observer: function(open) {
        this.setData({
          x: open ? 0 : this.data.openWidth
        })
        this.triggerEvent('change', {
          open
        })
      }
    },
    isdel: {
      type: String,
      value: 'block'
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    x: 75, // 单位px
    h: app.globalData.sysh,
    w: app.globalData.sysw,
    currentX: 75, // 当前记录组件被拖动时的x坐标
    moveInstance: 0 // 记录往左移动的距离
  },
  attached: function() {
    this.setData({
      x: this.data.open ? 0 : this.data.openWidth
    })
  },
  methods: {
    handleChange: function(e) {
      const x = e.detail.x
      this.data.moveInstance = this.data.openWidth - x
      this.data.currentX = x
      // console.log(this.data.moveInstance)
    },
    handleTouchend: function() {
      // 如果松开手指的时候，已经被拖拽到最左边或者最右边，则不处理
      if (this.data.currentX === 0) {
        this.setData({
          open: true
        })
        return
      }
      if (this.data.currentX === this.data.openWidth) {
        this.setData({
          open: false
        })
        return
      }
      // 如果当前菜单是打开的，只要往右移动的距离大于0就马上关闭菜单
      if (this.data.open && this.data.currentX > 0) {
        this.setData({
          open: false
        })
        return
      }

      // 如果当前菜单是关着的，只要往左移动超过阀值就马上打开菜单
      if (this.data.moveInstance < this.data.moveThreshold) {
        this.setData({
          open: false,
          x: this.data.openWidth
        })
      } else {
        this.setData({
          open: true
        })
      }
    },
    // 点击删除按钮触发的事件
    del: function(e) {
      this.setData({
        isdel:'none',
        ids: e.currentTarget.dataset.id
      })
      db.collection('cart').doc(e.currentTarget.dataset.id).remove().then(
        res => {
          console.log(res)
          this.setData({
            open: false
          })
          // wx.showLoading({
          //   title: '更新购物车',
          //   success:()=>{
          wx.startPullDownRefresh({
            success: res => {
              wx.hideLoading()
              wx.stopPullDownRefresh()
            }
          })
          // }
          // })
        }
      )
      // this.triggerEvent('del', {
      //   itemid: e.currentTarget.dataset.id
      // })
    },
    share: function() {
      this.setData({
        open: false
      })
      // wx.showShareMenu({})
      this.triggerEvent('share')
    },
    // 开始左滑时触发（轻触摸的时候也会触发），主要用于显示当前删除按钮前先 隐藏掉其它项的删除按钮
    handleTouchestart: function() {
      if (!this.data.open) {
        this.triggerEvent('sliderLeftStart')
      }
    }
  }
})