import { URL, fileURLToPath } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     vueJsx(),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })

export default defineConfig(({ mode }) => {
  // 加载当前模式下的环境变量
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    plugins: [
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // 你可以在这里根据env或mode添加更多的配置
    build: {
      outDir: `dist/${process.env.VITE_BUILD_SITE}`,
    },
  }
})
