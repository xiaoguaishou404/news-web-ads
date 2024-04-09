// require('@rushstack/eslint-patch/modern-module-resolution')

import antfu from '@antfu/eslint-config'

export default antfu({
  // formatters: true,
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
// {
//   root: true,
//   'extends': [
//     'plugin:vue/vue3-essential',
//     'eslint:recommended',
//     '@vue/eslint-config-typescript',
//     'plugin:vue/vue3-strongly-recommended'
//   ],
//   parserOptions: {
//     ecmaVersion: 'latest'
//   },
//   rules: {
//     "vue/max-attributes-per-line": ["error", {
//       "singleline": {
//         "max": 20
//       },
//       "multiline": {
//         "max": 20
//       }
//     }],
//   }
// }
)

/* eslint-env node */
