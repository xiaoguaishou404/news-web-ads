<script setup lang="ts">
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { onActivated, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import axios from 'axios'

import articleListJson from '../../nodeServe/assets/article/0.json'
import newsListJson from '../../nodeServe/assets/newsList/0.json'

// const newsListJson = newsListJson.filter(item => item.language === 'english')
// console.log(newsListJson.filter(item => item.article_id === 'f59c8acb3a8daa5f98e868c080be45aa'))

const errorIdList = [
  'eec57b2e7d5a55d9353c02d6040b5aaa',
  'f03a323e42a3537d24ce68cc9a127641',
  'd58f15e4970cfc3da76228ee4fa4b176',
  '20f304b76889df632b40c847e2ca5534',
  'cba9380b4265f58296208938998e4de8',
  '5086a1f4e91b29bc7eca423fbc093bd6',
  '2365e919e6b94a53a37d7dce04ef1829',
  '6c3b7437f25efcc159b44130e62f68c4',
  '4433d6cfb938ce96def2686f64c369ad',
  '3d0314e7c1780eb61cd8878526e0f8a1',
  '0ad0ccf8c3ee3e8a5c7d0ba0fb7f9980',
  'd291917816fbb18050801ef1d8b092fb',
  '7f6b6fb8d663e293cabfddec41ced33f',
  'c0f4ba23878783f88a79f509ddfae0bc',
  '315895727600e2347e404247cb14dab2',
  '803da635e04b5f8c01692d8d1f3d0f6c',
  'c562ed1c881a2df72ac03d34c99eaac2',
  '6daf24d90b62a0d231e431b701941acd',
  'b291cb5783acb04090611b74014a99f4',
  '0879c303d84dbeeeb5170391047c374c',
  '4c3c4ec144d5583310c09eb927958a07',
  '262f07ee1680cffaaaa3558773160d32',
  'ee2f6e7d66ab720e79e25d0cf71c32f3',
  '9d10c982174c61296d9e2fc51808d9d0',
  'f1a1f6472396ec7588029cc3e7c5b409',
  '0c0f759c47ece301ec4df254c4cbae93',
  '9a821a2b164b9134536957eec93ca017',
  '5e274605ee3b50b22b6dd61257ce9b90',
  '35b29b6d30a71800f1a02704226cfaca',
  '89cded409db2b6dac41b412c1292321a',
  'cde2fae28905e51c1786ef4d8989518e',
  'ed21751a6dbfe70b1550f8d5fe2f4e42',
  '5d3f499c43bbb998a0f4b5a34e20ebef',
  '6b5ba7f258c527600dbe20aa21befe88',
  '2baa83a826635f6c254b809cfac88c22',
  '33f274de4ad5920f61c0695e7cebc907',
  'bf65051e4ff6e0956bdbcfcc7a821a0b',
  'b774d3d9ea2d73f866645dc3d3860f2c',
  '9c4d95df9d8df5b5b1ec2732b094fc94',
  '6c754883ea59a7449e61ccd4ef362353',
  'edd9b52fe9176c87ff0b4b1d4c5bae7b',
  '8a427ab1b62b75d8ffa7b0ff916f98f2',
  'be514a973b46a12ea1ec5a61e39e0236',
  '5498307e5067f0b0f6531d17e21fe234',
  '084ec74a833a0b10cbbbc288c6c29ea0',
  '8830e2d87a7c4caa6986412c289cd1e3',
  '689f0fa6a6e0fb74074092ff6c3141f2',
  '6a585cfe38916a2b8cc34fc583091982',
  'ad30f1b49082979e6cade0f3465a43a0',
  '850c6533e4374d8ba204d6364a1e9775',
  '3e567baff3b8cb8ef19e37fd3199aeb5',
  'cb20a5b475e9db94b92373ac41b79efc',
  'f59c8acb3a8daa5f98e868c080be45aa',
  'ef24090f7fa7ae340ba10d78d5478181',
  '250815881f0e9c4a558acae1531112d9',
  '383405b449a2cc1ef61ac5395765d9c1',
  '709c737ecabe6f27bc80150c28706e3b',
]

const logList = newsListJson.filter(item => !errorIdList.includes(item.article_id))
console.log(logList)

console.log(JSON.stringify(logList))



const router = useRouter()
const route = useRoute()

const newCardleftItem = ref(null)
const newCardRightItem = ref(null)

const newsList = ref([])
const articleData = ref({})
const ArticleBody = ref('')
const articleBodyref = ref(null)
const scrollTop = ref(0)
if (!route.params.id)
  router.push({ path: `/SinglePageTest/${newsListJson[0].article_id}` })
else
  getActicleBody()

function keydownFun(event) {
  if (event.key === '1') {
    if (!localStorage.getItem('error-article_id'))
      localStorage.setItem('error-article_id', JSON.stringify([]))

    const idList = JSON.parse(localStorage.getItem('error-article_id'))
    idList.push(route.params.id)

    localStorage.setItem('error-article_id', JSON.stringify(Array.from(new Set(idList))))

    nextSinglePage()
  }
  if (event.key === '2')
    nextSinglePage()
}

document.addEventListener('keydown', keydownFun)

onBeforeRouteLeave((to, from) => {
  scrollTop.value = document.getElementById('app').scrollTop
})

onActivated(() => {
  document.getElementById('app').scrollTop = scrollTop.value
})
// onBeforeUnmount(() => {
//   // document.removeEventListener('keydown', keydownFun)
// })
onBeforeRouteUpdate ((to, from) => {
  document.removeEventListener('keydown', keydownFun)
})
onMounted(() => {
  window.scrollTo(0, 0)
})
watch(ArticleBody, () => {
  articleBodyref.value.querySelectorAll('p').forEach((item: any, index) => {
    if (index % 5 === 0 && index !== 0) {
      const style = window.getComputedStyle ? window.getComputedStyle(item, null) : null || item.currentStyle

      if (Number.parseFloat(style.width) < window.screen.width * 0.8)
        return
      const advertisingDiv = document.createElement('div')
      advertisingDiv.className = 'AdvertisingCard'
      advertisingDiv.textContent = 'advertising'
      item.parentNode.insertBefore(advertisingDiv, item)
      // 滚动到顶部
      // window.scrollTo(0, 0)
    }
  })
})
function nextSinglePage() {
  let indexNow = 0
  indexNow = newsListJson.findIndex(item => item.article_id === route.params.id) + 1
  console.log(indexNow)

  router.push({ path: `/SinglePageTest/${newsListJson[indexNow].article_id}` })
}

function getActicleBody() {
  const article = articleListJson[route.params.id].articleBodyHtml

  ArticleBody.value = removeElementsFromHtml(article)
  articleData.value = articleListJson[route.params.id]
}

function removeElementsFromHtml(htmlString) {
  // 创建一个临时的DOM元素来解析HTML字符串
  const temporaryElement = document.createElement('div')
  temporaryElement.innerHTML = htmlString

  // 递归删除临时元素的所有子元素中的图片和视频元素
  function removeElements(element) {
    const children = element.children

    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i]

      // 如果子元素是图片或视频元素，则删除它
      if (child.tagName === 'IMG' || child.tagName === 'VIDEO' || child.tagName === 'IFRAME') {
        child.remove()
      }
      else {
        // 如果子元素不是图片或视频元素，则递归删除它的子元素
        removeElements(child)
      }
    }
  }

  // 调用递归函数删除临时元素的子元素中的图片和视频元素
  removeElements(temporaryElement)

  // 将临时元素的内容转换回HTML字符串
  const cleanedHtmlString = temporaryElement.innerHTML

  return cleanedHtmlString
}

function convertDatetimeToString(datetimeStr) {
  const datetimeParts = datetimeStr.split(/[T:-]/)
  const year = datetimeParts[0]
  const month = datetimeParts[1]
  const day = datetimeParts[2]
  const date = new Date(Date.UTC(year, month - 1, day))
  const yearMonthDay = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
  return yearMonthDay
}

const nowcount = Math.floor(Math.random() * 40)

const newNewsList = ref([])
function getNews() {
  return axios({
    url: `https://server.gyhserver.com/ads/getNewsByPage`,
    // url: `http://192.168.1.124:8081/ads/getNewsByPage`,
    method: 'get',
    params: {
      channel: import.meta.env.VITE_BUILD_SITE,
      count: 3,
      start: nowcount,
      end: 3 + nowcount,
    },
  },

  ).then(async (response) => {
    const filterResult = response.data.data
    newNewsList.value = filterResult
  })
}
// getNews()
function formatDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()

  const diffInSeconds = Math.floor((now - date) / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInSeconds < 60)
    return `${diffInSeconds} seconds ago`
  else if (diffInMinutes < 60)
    return `${diffInMinutes} minutes ago`
  else if (diffInHours < 24)
    return `${diffInHours} hours ago`
  else
    return `${diffInDays} days ago`
}
function toLink(item) {
  axios({
    method: 'get',
    url: 'https://server.gyhserver.com/ads/getNewsArticle',
    // url: 'http://192.168.1.124:8081/ads/getNewsArticle',
    data: {
      article: true,
      httpResponseBody: true,
      articleOptions: { extractFrom: 'httpResponseBody' },
    },
    params: {
      channel: import.meta.env.VITE_BUILD_SITE,
      articleId: item.article_id,
    },

  },

  ).then((response) => {
    router.push(`/singlePage/${item.article_id}`)
  })
}
const envDomain = import.meta.env.VITE_DOMAIN
</script>

<template>
  <div>
    <div class="widewrapper subheader">
      <div class="container">
        <div class="clean-breadcrumb">
          <RouterLink to="/">
            HomePage
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="AdvertisingCard">
      <h1>advertising</h1>
    </div>
    <div class="widewrapper main">
      <div class="container">
        <div class="row">
          <div class="col-md-8 blog-main">
            <article v-if="articleData.headline" class="blog-post">
              <header>
                <div class="lead-image">
                  <img :src=" articleData.image_url " style="width: 100%;" alt="" class="img-responsive">
                </div>
              </header>

              <div class="body">
                <h3>{{ articleData.headline }}</h3>
                <hr>
                <div style="width: 100%;display: flex;justify-content: end;">
                  <strong v-if="articleData.dateModified">{{ convertDatetimeToString(articleData.dateModified)
                  }}</strong>
                </div>
                <!-- <hr> -->

                <p v-if="ArticleBody" ref="articleBodyref" v-html="ArticleBody" />
                <!-- <p v-if="ArticleBody">
                  {{ ArticleBody }}
                </p> -->
                <h2 v-else>
                  Text request, please wait...... About 10 seconds......
                </h2>
              </div>
            </article>

            <div v-else>
              This press request has been submitted, please try again later
            </div>

            <!-- <aside class="social-icons clearfix">
              <h3>Share on </h3>
              <a href="#"><i class="fa fa-facebook" /></a> <a href="#"><i class="fa fa-twitter" /></a> <a href="#"><i class="fa fa-google" /></a>
            </aside> -->
          </div>

          <div class="card">
            <div class="MoreNews">
              <strong>
                MORE NEWS
              </strong>
            </div>
            <div class="main">
              <div v-for="item, index in newNewsList" :key="index" class="item" @click="toLink(item)">
                <div class="bgc">
                  <img v-lazy="item.image_url || ' '" alt="">
                  <!-- <img :src="item.image_url " alt="" @error="imgOnError"> -->
                </div>
                <div class="message">
                  <div>
                    <h4>{{ item.title }}</h4>
                  </div>

                  <div class="info">
                    <div class="keyWord">
                      {{ item.source_id }}
                    </div>
                    <div class="time">
                      {{ formatDate(item.pubDate) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <pageFooter /> -->
  </div>
  <div class="widewrapper subheader">
    <div class="pageFooter">
      <span>
        ©2024 {{ envDomain }} All Rights Reserved
      </span>
      <span>
        <a href="https://www.termsfeed.com/live/bfb91ebb-8c45-4917-b408-0a1437c0e638" target="_blank">Privacy Policy</a>
      </span>
      <span>
        Contact us at : tulaybultak@gmail.com
      </span>
    </div>
  </div>
</template>

<style>
.AdvertisingCard {
  width: 100%;
  height: 200px;
  border: 1px solid;
  margin: 10px 0;
}
</style>

<style lang="less" scoped>
.MoreNews {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  color: #000;
  // border底部下划线
  border-bottom: 1px dashed #000;

  margin-bottom: 10px;
}
::v-deep img {
  max-width: 100%;
}

::v-deep video {
  max-width: 100%;
}

.card {
  .main {
    padding: 0px 20px;

    .item {
      display: flex;
      padding: 10px 0px;
      // border底部下划线虚线
      border-bottom: 1px solid #000;
      margin-bottom: 10px;

      .bgc {
        flex-shrink: 0;
        width: 100px;
        height: 100px;
        background-color: rgb(202, 202, 202);
        border-radius: 6px;
        overflow: hidden;
      }

      img {
        width: 100%;
        height: 100%;
        // 图片不拉伸
        object-fit: cover;
      }

      .message {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 4px 0 4px 10px;

        .info {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
