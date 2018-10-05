// wx.BaaS = requirePlugin('sdkPlugin')
import regeneratorRuntime from 'runtime.js'
var queryitem = (arr) => {
  return new Promise(function(resolve, reject) {
    const order = new wx.BaaS.TableObject(arr[0])
    const query = new wx.BaaS.Query()
    query.compare(arr[1], '=', arr[2])
    order.setQuery(query).find().then((res) => {
      resolve(res.data.objects[0])
    })
  })

}

module.exports = {
  queryitem: queryitem
}