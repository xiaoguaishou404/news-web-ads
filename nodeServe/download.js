const fs = require('node:fs')
const path = require('node:path')
const axios = require('axios')
const utils = require('./utils.js')
//  图片会多出一部分，正文需要过滤掉一部分乱码

const newsListJsonPath = path.resolve(__dirname, '../newsList.json')
const cacheFilePath = path.resolve(__dirname, './cache.json')
let nextPage
// 一分钟30条
let timer
const downloadErrCount = 5
const newsdataApi = 'https://newsdata.io/api/1/news?apikey=pub_416247a8e9c8c25b857dc9c8602f112ea7358'
const newsdataApi2 = 'https://newsdata.io/api/1/news?apikey=pub_42301702e574068bcb7a31cf745c250e5b8a0'
const countryList = ['de', 'ru', 'gb', 'us', 'wo']
const categoryList = ['business', 'crime', 'domestic', 'education', 'entertainment', 'environment', 'food', 'health', 'lifestyle', 'other', 'politics', 'science', 'sports', 'technology', 'top', 'tourism', 'world']
const num = 0
let cache = null
let maxJsonNum = 0
let articleJsonFiles = []
let articleCatalogPath = path.resolve(__dirname, './assets/article')
let newsListCatalogPath = path.resolve(__dirname, './assets/newsList')

function getCatalogMessage(CatalogPath) {
  let JsonfilesNameList = fs.readdirSync(CatalogPath).filter(file => file.endsWith('.json'))
  maxJsonNum = JsonfilesNameList.reduce((max, item) => parseInt(item) > max ? parseInt(item) : max, 0)

  return {
    fileList: JsonfilesNameList,
    maxJsonNum: JsonfilesNameList.reduce((max, item) => parseInt(item) > max ? parseInt(item) : max, 0),
  }
}


function updatearticleJsonFilesmaxNum() {
  fs.readdir(path.resolve(__dirname, './assets/article'), (err, files) => {
    if (err) {
      console.error('无法读取目录：', err)
      return
    }

    articleJsonFiles = files.filter(file => file.endsWith('.json'))
  })

  maxJsonNum = articleJsonFiles.reduce((max, item) => parseInt(item) > max ? parseInt(item) : max, 0)
}
// updatearticleJsonFilesmaxNum()

async function getnews() {
  console.log('开始获取新闻')
  await utils.awaitGetnewsControl(60000)

  // cache = JSON.parse(utils.FileInitialization(cacheFilePath, JSON.stringify({
  //   newsListJsonFIleNameNow: '0.json',
  //   newsListJsonFIleIndex: 0,
  // })))

  let newsList = JSON.parse(utils.FileInitialization(path.resolve(__dirname, `./assets/newsList/${getCatalogMessage(newsListCatalogPath).maxJsonNum}.json`), JSON.stringify([])))
  console.log('newsList:' + newsList.length);
  if (newsList.length >= 1000) {
    // cache.newsListJsonFIleIndex += 1

    // fs.writeFileSync(cacheFilePath, JSON.stringify(cache), (err) => {
    //   if (err)
    //     throw err
    // })



    newsList = JSON.parse(utils.FileInitialization(path.resolve(__dirname, `./assets/newsList/${getCatalogMessage(newsListCatalogPath).maxJsonNum + 1}.json`), JSON.stringify([])))
  }
  axios({
    method: 'get',
    url: newsdataApi,
    timeout: 20000,
    params: {
      page: nextPage,
    },
    validateStatus(code) {
      return true
      // 所有的状态码都promise都会成功，不会进入catch
    },
  }).then((response) => {
 
    if (response.data.status === 'success') {
      nextPage = response.data.nextPage
      filternews(response.data.results, newsList).then(() => {
        // console.log(666);
        getnews()
      })
    }
    else {
      if (response.status === 429) {
        downloadErrCount -= 1
        if (downloadErrCount < 0) {
          // clearInterval(timer)
          return
        }
      }
     
      getnews()
    }
  }).catch(()=>{
    console.log('news api error');
    getnews()
  })
}

function filternews(list, newsList) {
  return new Promise((resolve) => {
    // console.log(33333);
    // console.log(list.map(item => item.article_id));
    // console.log(list.map(item => item.image_url));
    downloadImages(list.filter(item => item.image_url)).then((ImagesList) => {

      // console.log(11);
      // console.log(ImagesList.map(item => item.article_id));


      downloadArticleBodys(ImagesList).then((ArticleBodysList) => {

        // console.log(22);
        // console.log(ArticleBodysList);

        newsList.push(...ArticleBodysList)
        fs.writeFileSync(path.resolve(__dirname, `./assets/newsList/${getCatalogMessage(newsListCatalogPath).maxJsonNum}.json`), JSON.stringify(newsList))
        resolve()
      })
    })
  })
}
function downloadArticleBody(url, articleId) {
  return axios(
    {
      method: 'post',
      url: 'https://api.zyte.com/v1/extract',
      timeout: 20000,
      validateStatus(code) {
        return true
        // 所有的状态码都promise都会成功，不会进入catch
      },
      data: {
        url,
        article: true,
      },
      auth: { username: '64ed11ba820a4e9dbfa432094cc4fab6' },
    },
  ).then((response) => {
    if (response.data.statusCode === 200) {


      // if (getCatalogMessage(articleCatalogPath ).fileList.length === 0) {
      //   articleJson = JSON.parse(utils.FileInitialization(path.resolve(__dirname, `./assets/article/${getCatalogMessage(articleCatalogPath ).maxJsonNum}.json`), JSON.stringify({})))
      //   updatearticleJsonFilesmaxNum()
      // }

      // if (articleJsonFiles.length > 0) {
      //   articleJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, `./assets/article/${maxJsonNum}.json`)))

      //   if (Object.keys(articleJson).length >= 10) {
      //     articleJson = JSON.parse(utils.FileInitialization(path.resolve(__dirname, `./assets/article/${maxJsonNum + 1}.json`), JSON.stringify([])))
      //     updatearticleJsonFilesmaxNum()
      //   }
      //   articleJson[articleId] = response.data.article

      //   fs.writeFileSync(path.resolve(__dirname, `./assets/article/${maxJsonNum}.json`), JSON.stringify(articleJson), (err) => {
      //     if (err)
      //       throw err
      //   })
      // }



      articleJson = JSON.parse(utils.FileInitialization(path.resolve(__dirname, `./assets/article/${getCatalogMessage(articleCatalogPath).maxJsonNum}.json`), JSON.stringify({})))
      console.log('articleJson:' + Object.keys(articleJson).length);



      if (Object.keys(articleJson).length >= 1000) {
        articleJson = JSON.parse(utils.FileInitialization(path.resolve(__dirname, `./assets/article/${getCatalogMessage(articleCatalogPath).maxJsonNum + 1}.json`), JSON.stringify({})))
      }
      articleJson[articleId] = response.data.article

      fs.writeFileSync(path.resolve(__dirname, `./assets/article/${getCatalogMessage(articleCatalogPath).maxJsonNum}.json`), JSON.stringify(articleJson), (err) => {
        if (err)
          throw err
      })
      return articleId

    }
    // console.log('errorArticleBody', articleId);

  }).catch(() => {
    // console.log('errorArticleBody', articleId);

  })
}
function downloadImg(url, fileName) {
  return axios(
    {
      method: 'get',
      url,
      timeout: 15000,
      responseType: 'stream',
      validateStatus(code) {
        return true
        // 所有的状态码都promise都会成功，不会进入catch
      },
    },
  ).then((response) => {
    if (response.status === 200) {
      const contentType = response.headers['content-type']
      const fileExtension = contentType.split('/')[1]
      response.data.pipe(fs.createWriteStream(path.resolve(__dirname, `./assets/img/${fileName}.${fileExtension}`)))
      return fileName
    }
    // console.log('imgerror', fileName);
  }).catch(() => {
    // console.log('imgerror', fileName);

  })
}
async function downloadArticleBodys(list) {
  const downloadPromises = list.map((item) => {
    return downloadArticleBody(item.link, item.article_id)
  })

  try {
    const downloadedUrls = await Promise.all(downloadPromises)
    // console.log(88888);

    // console.log(downloadedUrls);
    // console.log(99);

    // 从列表中移除下载失败的 URL
    const filteredUrls = list.filter(url => downloadedUrls.includes(url.article_id))
    return filteredUrls
  }
  catch (error) {
    // 处理错误
    // console.error(error)
    return []
  }
}
async function downloadImages(urls) {
  const downloadPromises = urls.map((url) => {
    return downloadImg(url.image_url, url.article_id)
  })

  try {
    const downloadedUrls = await Promise.all(downloadPromises)

    // 从列表中移除下载失败的 URL
    const filteredUrls = urls.filter(url => downloadedUrls.includes(url.article_id))
    return filteredUrls
  }
  catch (error) {
    // 处理错误
    // console.error(error)
    return []
  }
}
getnews()
// timer = setInterval(getnews, 1000)
// module.exports = function () {
//   timer = setInterval(getnews, 60000)
// }

