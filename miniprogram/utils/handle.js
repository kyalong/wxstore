import regeneratorRuntime from 'runtime.js'
// wx.BaaS = requirePlugin('sdkPlugin')
var create = function(condition) {
  return new Promise(function(resolve, reject) {
    let tables = new wx.BaaS.TableObject(condition[0])
    let record = tables.create()
    record.set(condition[1]).save().then(res => {
      resolve(res.data)
    })
  })
}

var update = function(condition) {
  return new Promise(function(resolve, reject) {
    let tables = new wx.BaaS.TableObject(condition[0])
    let record = tables.getWithoutData(condition[3])
    let data = {}
    data.condition[1] = condition[2]
    record.set(data).update().then(res => {
      resolve(res.data)
      console.log(condition[1]+' update')
    })
  })
}

var query = function(condition) {
  return new Promise(function(resolve, reject) {
    let tables = new wx.BaaS.TableObject(condition[0])
    let query = new wx.BaaS.Query()
    if (condition[1]) {
      query.compare(condition[1], '=', condition[2])
      tables.setQuery(query).find().then(res => {
        resolve(res.data.objects[0].id)
      })
    } else {
      tables.find().then(res => {
        resolve(res.data.objects)
      })
    }

  })
}
var del = function(condition) {
  return new Promise(function(resolve, reject) {
    let tables = new wx.BaaS.TableObject(condition[0])
    tables.delete(condition[2]).then(res => {
      resolve()
    })
  })
}
var uploadimage = function(path) {
  return new Promise(function(resolve, reject) {
    let MyFile = new wx.BaaS.File()
    let fileParams = {
      filePath: path
    }
    // let metaData = { categoryName: 'SDK' }
    MyFile.upload(fileParams).then(res => {
      let data = res.data
      resolve(data.path)
    }, err => {})
  })
}

module.exports = {
  create: create,
  update: update,
  del: del,
  uploadimage: uploadimage,
  query: query
}