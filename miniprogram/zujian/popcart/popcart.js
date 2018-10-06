// zujian/popcart/popcart.js
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    h:{
      type:Number,
    },
    maskinfo: {
      type: Array
    },
    popup: {
      type: String,
    },
    animationData: {
      type: Object,
    },
    masknum: {
      type: Number,
      value: 1
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },
  lifetimes: {},
  /**
   * 组件的方法列表
   */
  methods: {
    popdown: function(e) {
      this.triggerEvent('popdown')
    },
    add: function (e) {
      this.triggerEvent('add')
    },
    minus: function (e) {
      this.triggerEvent('minus')
    },
    confirm: function (e) {
      
      this.triggerEvent('confirm')
    },
  }
})