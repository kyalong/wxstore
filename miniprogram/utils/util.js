const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var random = function (arr) {
  let n = []
  let m = []
  if (arr.length > 50) {
    for (let i = 0; i < 56; i++) {
      // console.log(arr.splice(Math.floor(Math.random() * arr.length), 1))
      n.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0])
      // m.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0].id)
    }
  } else {
    n = arr
  }
  return n
}

module.exports = {
  formatTime: formatTime,
  random:random
}
