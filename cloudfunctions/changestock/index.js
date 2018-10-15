// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'boutique10'
})
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  for (let i of event.items) {
    db.collection('item').doc(i.itemid).get().then(ress => {
      let newstock = ress.data.detail
      newstock[i.colorindex][4][i.sizeindex][1] -= i.num
      newstock[i.colorindex][4][i.sizeindex][0] += i.num
      console.log(newstock)
      db.collection('item').doc(i.itemid).update({
        data: {
          detail: _.set({
            detail: newstock
          })
        }
      }).then(res => {
        console.log(res)
      })
    })


  }
}