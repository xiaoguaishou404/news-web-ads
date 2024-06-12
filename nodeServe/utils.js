let lastCallTime = Date.now()
const fs = require('node:fs')
const path = require('node:path')

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
  jsonFileProxy(fileTath, initData) {
    return new Proxy (JSON.parse(this.FileInitialization(fileTath, JSON.stringify(initData))), {
      get(target, key, receiver) {
        if (key === '__target__')
          return target
        return Reflect.get(target, key, receiver)
      },
      set(target, key, value, receiver) {
        target[key] = value
        fs.writeFileSync(fileTath, JSON.stringify(target), (err) => {
          if (err)
            throw err
        })
        return Reflect.set(target, key, value, receiver)
      },
    })
  },
  deleteFiles(dir, name) {
    fs.readdirSync(dir).forEach((file) => {
      if (file.includes(name))
        fs.unlinkSync(path.join(dir, file))
    })
  },
}
