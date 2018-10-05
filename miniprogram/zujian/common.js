module.exports = Behavior({
  properties: {
    items: {
      type: Array,
    },
    h: {
      type: Number,
    },
    w: {
      type: Number,
    }
  },

  methods: {
    addcart: function (e) {
      this.triggerEvent('addcart', {
        itemid: e.currentTarget.dataset.id
      })
    },
    itemdetail: function (e) {
      this.triggerEvent('itemdetail', {
        itemid: e.currentTarget.dataset.id
      })
    },
  }
})