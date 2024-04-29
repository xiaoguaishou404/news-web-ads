const fs = require('node:fs')
const path = require('node:path')
const axios = require('axios')

const newsListJsonPath = path.resolve(__dirname, '../newsList.json')

let nextPage

// 一分钟30条
let timer

const downloadErrCount = 5
const newsdataApi = 'https://newsdata.io/api/1/news?apikey=pub_416247a8e9c8c25b857dc9c8602f112ea7358'
const countryList = ['de', 'ru', 'gb', 'us', 'wo']
const categoryList = ['business', 'crime', 'domestic', 'education', 'entertainment', 'environment', 'food', 'health', 'lifestyle', 'other', 'politics', 'science', 'sports', 'technology', 'top', 'tourism', 'world']

let lastCallTime = Date.now()
async function getnews() {
  console.log('开始获取新闻')

  const now = Date.now()
  if (now - lastCallTime < 60 * 10)
    await new Promise(resolve => setTimeout(resolve, 60 * 10 - (now - lastCallTime)))

  lastCallTime = Date.now()

  const newsList = JSON.parse(fs.readFileSync(newsListJsonPath))
  axios({
    method: 'get',
    url: newsdataApi,
    params: {
      page: nextPage,
    },
    validateStatus(code) {
      return true
      // 所有的状态码都promise都会成功，不会进入catch
    },
  }).then((response) => {
    console.log(response.status)

    if (response.data.status === 'success') {
      nextPage = response.data.nextPage
      filternews(response.data.results, newsList).then(() => {
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
  })
}

function filternews(list, newsList) {
  return new Promise((resolve) => {
    downloadImages(list.filter(item => item.image_url)).then((data) => {
      newsList.push(...data)
      fs.writeFileSync(newsListJsonPath, JSON.stringify(newsList))
      resolve()
    })
  })
}
function downloadImg(url, fileName) {
  return axios(
    {
      method: 'get',
      url,
      responseType: 'stream',
      // validateStatus(code) {
      //   return true
      //   // 所有的状态码都promise都会成功，不会进入catch
      // },
    },
  ).then((response) => {
    if (response.status === 200) {
      const contentType = response.headers['content-type']
      const fileExtension = contentType.split('/')[1]
      response.data.pipe(fs.createWriteStream(path.resolve(__dirname, `../assets/img/${fileName}.${fileExtension}`)))
      return fileName
    }
  }).catch((error) => {
    console.log(error);
  })
}

async function downloadImages(urls) {
  const downloadPromises = urls.map((url) => {
    return downloadImg(url.image_url, url.article_id)
  })

  try {
    const downloadedUrls = await Promise.all(downloadPromises)
    // 从列表中移除下载失败的 URL
    console.log(downloadedUrls)
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
// timer = setInterval(getnews, 600)
// module.exports = function () {
//   timer = setInterval(getnews, 60000)
// }
