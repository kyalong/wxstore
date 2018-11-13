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
  if (event.isall == 'all' && event.next == 100) {
    const countResult = await db.collection('item').count()
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / 100)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('item').skip(i * 100).limit(100).get()
      tasks.push(promise)
    }
    // 等待所有
    return (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
    })
  } else {
    const count = await db.collection('item').where({
      class: _.in(['女鞋','男装'])
    }).count()
    if (event.next < Math.ceil(count.total / MAX_LIMIT)) {
      return await db.collection('item').field({
        class: false,
        like: false,
        visit: false,
        createdate: false
      }).where({
        class: _.in(['女鞋','男装'])
      }).skip(event.next * MAX_LIMIT).limit(MAX_LIMIT).get()
    }
  }


}