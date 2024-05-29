let lastCallTime = Date.now()
const fs = require('node:fs')

module.exports = {
  awaitGetnewsControl(timer) {
    const now = Date.now()
    const delay = Math.max(0, timer - (now - lastCallTime))

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
        lastCallTime = Date.now()
      }, delay)
    })
  },
  FileInitialization(filePath, initData) {
    try {
      fs.accessSync(filePath, fs.constants.F_OK)
    }
    catch {
      fs.writeFileSync(filePath, initData, (err) => {
        if (err)
          throw err
      })
    }
    return fs.readFileSync(filePath)
  },
}

