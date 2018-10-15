// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'boutique1'
})
const _ = db.command
// 云函数入口函数
exports.main = async(event, context) => {
  const countResult = await db.collection('order').count()
  const data = await db.collection('order').where({
    status: event.status
  }).orderBy('serinum', 'desc').get()
  return {
    count: countResult,
    data: data
  }
}