import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  stylistic: true,
  formatters: {
    /**
     * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
     * By default uses Prettier
     */
    css: true,
    /**
     * Format HTML files
     * By default uses Prettier
     */
    html: true,
    /**
     * Format Markdown files
     * Supports Prettier and dprint
     * By default uses Prettier
     */
    // markdown: 'prettier'
  }
  // stylistic: {
  //   indent: 2, // 4, or 'tab'
  //   quotes: 'single', // or 'double'
  // },
},
)


// 如果使用antfu/eslint-config的配置单，
// 里面包含了vue项目基础的语法检测配置

// 如果不想使用eslint格式化代码方案，同时搭配Prettier代码格式化方案
// 去git历史找项目刚创建的.eslintrc.cjs文件。里面是vue项目的基础eslint配置

