const fs = require('node:fs')
const path = require('node:path')

const newsListJsonPath = path.resolve(__dirname, './assets/0530-news.json')
const articleJsonPath = path.resolve(__dirname, './assets/article/0.json')
const newsList = JSON.parse(fs.readFileSync(newsListJsonPath))
const article = JSON.parse(fs.readFileSync(articleJsonPath))
console.log(newsList.length);

const filterArticleJson = {}
newsList.forEach((element) => {
  filterArticleJson[element.article_id] = article[element.article_id]
})
console.log(Object.keys(filterArticleJson).length);
fs.writeFileSync(path.resolve(__dirname, `./assets/0530-article.json`), JSON.stringify(filterArticleJson))
