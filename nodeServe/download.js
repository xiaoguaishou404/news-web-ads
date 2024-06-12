const fs = require('node:fs')
const path = require('node:path')
const axios = require('axios')
const utils = require('./utils.js')
//  正文需要过滤掉一部分乱码

const articleCatalogPath = path.resolve(__dirname, './assets/article')
const newsListCatalogPath = path.resolve(__dirname, './assets/newsList')
const cacheFilePath = path.resolve(__dirname, './cache.json')
const settingFilePath = path.resolve(__dirname, './setting.json')
const settingConfig = JSON.parse(utils.FileInitialization(settingFilePath, JSON.stringify({ newListFilemaxLength: 1000, articleFilemaxLength: 1000, awaitGetnewsControlTime: 60000 })))

const cacheProxy = utils.jsonFileProxy(cacheFilePath, { downloadErrCount: 5 })

let articleProxy = utils.jsonFileProxy(articleJsonPath(getCatalogMessage(articleCatalogPath).maxJsonNum), {})
let newsListProxy = utils.jsonFileProxy(newsListJsonPath(getCatalogMessage(newsListCatalogPath).maxJsonNum), [])

const newsdataApi = 'https://newsdata.io/api/1/news?apikey=pub_416247a8e9c8c25b857dc9c8602f112ea7358'
// const newsdataApi = 'https://newsdata.io/api/1/news?apikey=pub_42301702e574068bcb7a31cf745c250e5b8a0'
const countryList = ['de', 'ru', 'gb', 'us', 'wo']
const categoryList = ['business', 'crime', 'domestic', 'education', 'entertainment', 'environment', 'food', 'health', 'lifestyle', 'other', 'politics', 'science', 'sports', 'technology', 'top', 'tourism', 'world']

function articleJsonPath(pathUrl) {
  return path.resolve(__dirname, `./assets/article/${pathUrl}.json`)
}

function newsListJsonPath(pathUrl) {
  return path.resolve(__dirname, `./assets/newsList/${pathUrl}.json`)
}

function getCatalogMessage(CatalogPath) {
  const JsonfilesNameList = fs.readdirSync(CatalogPath).filter(file => file.endsWith('.json'))

  return {
    fileList: JsonfilesNameList,
    maxJsonNum: JsonfilesNameList.reduce((max, item) => Number.parseInt(item) > max ? Number.parseInt(item) : max, 0),
  }
}

async function getnews() {
  console.log('开始获取新闻')
  await utils.awaitGetnewsControl(settingConfig.awaitGetnewsControlTime)

  axios({
    method: 'get',
    url: newsdataApi,
    timeout: 20000,
    params: {
      page: cacheProxy.nextPage,
      language: 'en',
    },
    validateStatus(code) {
      return true
      // 所有的状态码都promise都会成功，不会进入catch
    },
  }).then((response) => {
    if (response.data.status === 'success') {
      cacheProxy.nextPage = response.data.nextPage
      filternews(response.data.results).then(() => {
        getnews()
      })
    }
    else {
      if (response.status === 429) {
        cacheProxy.downloadErrCount -= 1
        if (cacheProxy.downloadErrCount < 0)
          return
      }

      getnews()
    }
  }).catch(() => {
    console.log('news api error')
    getnews()
  })
}

function filternews(list) {
  return new Promise((resolve) => {
    downloadImages(list.filter(item => item.image_url)).then((successImagesList) => {
      downloadArticleBodys(successImagesList).then((successArticleBodysList) => {
        successArticleBodysList.forEach((item) => {
          if (newsListProxy.__target__.length >= settingConfig.newListFilemaxLength)
            newsListProxy = utils.jsonFileProxy(newsListJsonPath(getCatalogMessage(newsListCatalogPath).maxJsonNum + 1), [])

          newsListProxy.push(item)
        })

        successImagesList.filter(item => !successArticleBodysList.some(data => data.article_id === item.article_id)).forEach((item) => {
          utils.deleteFiles(path.resolve(__dirname, `./assets/img`), item.article_id)
        })
        resolve()
      })
    })
  })
}
function downloadArticleBody(item) {
  return axios(
    {
      method: 'post',
      url: 'https://api.zyte.com/v1/extract',
      timeout: 20000,
      validateStatus(code) {
        return true
      },
      data: {
        url: item.link,
        article: true,
      },
      auth: { username: '64ed11ba820a4e9dbfa432094cc4fab6' },
    },
  ).then((response) => {
    if (response.data.statusCode === 200) {
      if (Object.keys(articleProxy.__target__).length >= settingConfig.articleFilemaxLength)
        articleProxy = utils.jsonFileProxy(articleJsonPath(getCatalogMessage(articleCatalogPath).maxJsonNum + 1), {})
      articleProxy[item.article_id] = response.data.article

      return item
    }
  }).catch(() => {

  })
}
function downloadImg(item) {
  return axios(
    {
      method: 'get',
      url: item.image_url,
      timeout: 15000,
      responseType: 'stream',
      validateStatus(code) {
        return true
        // 所有的状态码都promise都会成功，不会进入catch
      },
    },
  ).then((response) => {
    if (response.status === 200) {
      // console.log(response.data.readable)
      const contentType = response.headers['content-type']
      const fileExtension = contentType.split('/')[1].split('+')[0].split(';')[0]
      const writeStream = fs.createWriteStream(path.resolve(__dirname, `./assets/img/${item.article_id}.${fileExtension}`))
      response.data.pipe(writeStream)
      return item
    }
  }).catch(() => {

  })
}

async function downloadImages(list) {
  const downloadPromises = list.map((item) => {
    return downloadImg(item)
  })

  try {
    let listResults = await Promise.all(downloadPromises)
    return listResults.filter(item => item)
  }
  catch (error) {
    console.error(error)
    return []
  }
}

async function downloadArticleBodys(list) {
  const downloadPromises = list.map((item) => {
    return downloadArticleBody(item)
  })

  try {
    let listResults = await Promise.all(downloadPromises)
    return listResults.filter(item => item)
  }
  catch (error) {
    return []
  }
}
getnews()
