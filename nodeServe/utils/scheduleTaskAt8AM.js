const download = require('./download.js')

function scheduleTaskAt8AM() {
  // 获取当前时间
  const now = new Date()

  // 计算早上 8 点的时间戳
  const eightAM = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8)

  // 如果现在的时间已经过了早上 8 点，则将执行时间设置为第二天的早上 8 点
  if (now > eightAM)
    eightAM.setDate(eightAM.getDate() + 1)

  // 设置定时器，每天早上 8 点执行一次指定的函数
  setInterval(() => {
    // 调用指定的函数
    download()
  }, eightAM - now)
}

// 调用函数来启动定时任务
scheduleTaskAt8AM()
