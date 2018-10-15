// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'boutique10'
})
const _ = db.command
// 云函数入口函数
exports.main = async(event, context) => {
  const ordercount = await db.collection('order').count()
  const itemcount = await db.collection('item').count()

  return {
    ordercount: ordercount,
    itemcount: itemcount,
  }
}