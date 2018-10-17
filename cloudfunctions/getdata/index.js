// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'boutique1'
})
const _ = db.command
const MAX_LIMIT = 12
// 云函数入口函数
exports.main = async(event, context) => {
  const count = await db.collection('item').where({
    class: '男装'
  }).count()
  if (event.next < Math.ceil(count.total / MAX_LIMIT)) {
    return await db.collection('item').field({
      class: false,
      like: false,
      visit: false,
      createdate: false
    }).where({
      class: '男装'
    }).skip(event.next * MAX_LIMIT).limit(MAX_LIMIT).get()
  }
}