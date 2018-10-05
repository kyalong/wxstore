import regeneratorRuntime from 'runtime.js'

function tmpfile(list) {
  return new Promise(function(resolve, reject) {
    for (let i of list) {
      let fileids = i.image
      wx.cloud.getTempFileURL({
        fileList: fileids,
      }).then(res => {
        let arr = []
        for (let i of res.fileList) {
          arr.push(i.tempFileURL)
        }
        i.image = arr
      })
    }
    resolve(list)
  })
}

module.exports = {
  tmpfile: tmpfile
}