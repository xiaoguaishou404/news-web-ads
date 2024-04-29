const { execSync } = require('node:child_process')

// 定义你的环境配置文件列表
const sites = ['thedailyscrollnews', 'breakingedgenews','buzzfeednews']

sites.forEach((site) => {
  console.log(`开始打包：${site}`)
  // 设置环境变量，并运行Vite的build命令
  execSync(`VITE_BUILD_SITE=${site} npx vite build --mode ${site}`, { stdio: 'inherit', shell: true  })
  console.log(`完成打包：${site}`)
})
