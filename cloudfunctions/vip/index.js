// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'boutique1'
})
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
  let vip = ''
  if (event.money < 600) {
    vip = ''
  } else if (event.money < 1200) {
    vip = 0
  } else if (event.money < 2000) {
    vip = 1
  } else if (event.money) {
    vip = 2
  }
  db.collection('user').where({
    _openid: event.id
  }).update({
    data: {
      vip: vip,
      point:_.inc(Number(event.money))
    }
  })
  const userinfo = await db.collection('user').get()
  return userinfo
}