// zujian/model3/model3.js
var common = require('../common.js')

behaviors: [common],


  Component({
    /**
     * 组件的属性列表
     */
    behaviors: [common],
    properties: {
      detail: {
        type: Object
      },
      h: {
        type: Number
      }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
      addcart: function(e) {
        this.triggerEvent('addcart', {
          itemid: e.currentTarget.dataset.id,
          sku:e.currentTarget.dataset.sku
        })
      },
      itemdetail: function(e) {
        this.triggerEvent('itemdetail', {
          itemid: e.currentTarget.dataset.id,
          sku: e.currentTarget.dataset.sku
        })
      },
    }
  })