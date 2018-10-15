// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'boutique1'
})
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('cart').where({
      _id: _.in(event.idlist)
    }).remove()
  } catch (e) {
    console.error(e)
  }
}