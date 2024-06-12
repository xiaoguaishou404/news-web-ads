const fs = require('node:fs')
const path = require('node:path')

const sourceDir = './assets/img'
const destinationDir = './assets/filterImg'
const list = JSON.parse(fs.readFileSync(path.resolve(__dirname, './assets/0530-news.json')))

fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error('无法读取源目录：', err)
    return
  }

  files.forEach((file) => {
    if (list.some(item => file.includes(item.article_id))) {
      const sourcePath = path.join(sourceDir, file)
      const destinationPath = path.join(destinationDir, file)

      fs.copyFile(sourcePath, destinationPath, (err) => {
        if (err)
          console.error('无法拷贝文件：', err)
        else
          console.log('文件已成功拷贝：', file)
      })
    }
  })
})
