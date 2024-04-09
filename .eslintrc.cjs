/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
// 这个配置是vue项目的基础配置
// 对v-for:key对代码错误检测
// volar是代码高亮，并不检测vue语法

// 如果使用antfu/eslint-config的配置单，
// 使用他的脚手架时选择vue项目，antfu/eslint-config已经包含了vue的默认配置