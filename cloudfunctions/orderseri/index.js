// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'boutique1'
})
const _ = db.command

var tomorrow = function(i) {
  const date = new Date()
  return (date.getFullYear() * 10000000 + (date.getMonth() + 1) * 100000 + date.getDate() * 1000) + i
}
// 云函数入口函数
exports.main = async(event, context) => {
  let datas = ''
  if (event.gets == 0) {
    datas = await db.collection('orderseri').where({
      date: String(tomorrow(0) / 1000)
    }).get()
    if (datas.data.length == 0) {
      datas = await db.collection('orderseri').add({
        data: {
          date: String(tomorrow(0) / 1000),
          nums: 1
        }
      })
    }
    return datas
  }
}