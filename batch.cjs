
const fs = require('node:fs')
const path = require('node:path')
const { execSync } = require('node:child_process')



fs.readdirSync(path.resolve(__dirname, './env')).map((item) => item.replace('.env.', '')).forEach((site) => {
  console.log(`开始打包：${site}`)
  // 设置环境变量，并运行Vite的build命令
  execSync(`VITE_BUILD_SITE=${site} npx vite build --mode ${site}`, { stdio: 'inherit', shell: true })
  console.log(`完成打包：${site}`)
})
