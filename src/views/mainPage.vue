<script setup lang="ts">
import { Ref, computed, onMounted, ref } from 'vue'
import axios from 'axios'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'

async function loadData($state) {
  // calling the api

  try {
    const response = await getNews()
    const json = await response.json()
    if (json.length < 10) { $state.complete() }
    else {
      comments.value.push(...json)
      $state.loaded()
    }
    page++
  }
  catch (error) {
    $state.error()
  }
}

const newsList = ref([])
const nextPage = ''
const newCardleftItem = ref(null)
const newCardRightItem = ref(null)
const doubleCount = computed(() =>
  newsList.value.filter(item => ![newCardleftItem.value.article_id, newCardRightItem.value.article_id].includes(item.article_id)),
)

function changeCard(item) {
  newCardleftItem.value = item
  const leftIndex = newsList.value.findIndex(val => val.link === item.link)

  if (newsList.value[leftIndex + 1])
    newCardRightItem.value = newsList.value[leftIndex + 1]

  else
    newCardRightItem.value = newsList.value[0]
}
const newNewsList = ref ([])

function searchCard(val = '') {
// https://newsdata.io/api/1/news?apikey= pub_416247a8e9c8c25b857dc9c8602f112ea7358 &q=pegasus&language=en
  axios({
    url: `https://server.bigfullnews.xyz/ads/getNewsByCount`,
    method: 'get',
    params: {
      channel: 'sls',
      count: 10,
      q: val,
    },
  }).then((response) => {
    newsList.value = response.data.data.filter(item => item.image_url)
    newCardleftItem.value = newsList.value[0]
    newCardRightItem.value = newsList.value[1]
  })
}
// http://192.168.0.118:8081/ads/getNewsByPage?channel=xx&start=xx&end=xx
let nowcount = 0
const num = 12

function getNews($state) {
  return axios({
    url: `https://server.bigfullnews.xyz/ads/getNewsByPage`,
    method: 'get',
    params: {
      channel: 'sls',
      count: 12,
      start: nowcount,
      end: num + nowcount,
    },
  },

  ).then(async (response) => {
    const filterResult = response.data.data

    // nextPage = response.data.nextPage
    // newCardleftItem.value = filterResult[0]
    // newCardRightItem.value = filterResult[1]
    newsList.value = filterResult
    if (filterResult.length < 4 || filterResult === 'No more data.') {
      $state.complete()
    }
    else {
      for (let i = 0; i < newsList.value.length; i += 4) {
        if (i + 4 <= newsList.value.length) {
          const chunk = newsList.value.slice(i, i + 4)
          nowcount += 4
          newNewsList.value.push(chunk)
        }
      }
      if ($state)
        $state.loaded()
      console.log(newNewsList.value)
    }
  }).catch((error) => {
    console.log(error)
    $state.error()
  })
}
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
function toLink(url) {
  // 链接跳转
  window.open(url)
}
const title = ref('')
title.value = getTopLevelDomainWithoutPort()
function getTopLevelDomainWithoutPort() {
  const url = window.location.href
  const domain = url.split('/')[2]
  const [topLevelDomain, port] = domain.split(':')
  return topLevelDomain.split('.').slice(-2).join('.')
}
document.getElementById('webTitle').innerHTML = getTopLevelDomainWithoutPort()

onMounted(() => {
  // getNews()
  //   import('../../nodeServe/newsList.json').then((response) => {
  //     newsList.value = response.default.sort(() => (Math.random() - 0.5)).splice(0, 10).filter(item => item.image_url)

  //     // nextPage = response.data.nextPage
  //     newCardleftItem.value = newsList.value[0]
  //     newCardRightItem.value = newsList.value[1]
  //   })
})

// axios.get(`https://api.goperigon.com/v1/all?source=cnn.com&sortBy=date&apiKey=81171d2f-df92-4c4e-b070-4de0243a6ae2`).then((response) => {
//   console.log(response.data)
// })
</script>

<template>
  <div class="mainPage">
    <h3 class="title" style="text-transform: uppercase;font-weight: bold;">
      {{ title }}
    </h3>

    <div class="AdvertisingCard">
      <h1>Advertising window</h1>
    </div>
    <div v-for="group, index in newNewsList" :key="index" class="card">
      <div class="top" @click="toLink(group[0].link)">
        <div class="bgc">
          <img v-lazy="group[0].image_url" alt="">
        </div>
        <div class="message">
          <h2>{{ group[0].title }}</h2>
          <div class="info">
            <div class="keyWord">
              {{ group[0].creator?.join(' ') }}
            </div>
            <div class="time">
              {{ group[0].pubDate.split(' ')[0] }}
            </div>
          </div>
        </div>
      </div>

      <div class="main">
        <div v-for="item, index in group.slice(1, 4)" :key="index" class="item" @click="toLink(item.link)">
          <div class="bgc">
            <img v-lazy="item.image_url || ' '" alt="">
          </div>
          <div class="message">
            <h4>{{ item.title }}</h4>
            <div class="info">
              <div class="keyWord">
                {{ group[0].source_id }}
              </div>
              <div class="time">
                {{ formatDate(group[0].pubDate) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <InfiniteLoading @infinite="getNews" />
  </div>
</template>

<style>
img[lazy='loading'] {
  padding: 30px;
  /* 无限旋转 */
  animation: rotate 3s linear infinite;
}
</style>

<style lang="less" scoped>
.AdvertisingCard {
  width: 100%;
  height: 200px;
  border: 1px solid;
  margin: 10px 0;
}
.title {
  text-align: center;
}
h2 {
  /* 加粗 */
  font-weight: bold;
  -webkit-line-clamp: 3 !important;
  font-size: 20px;
  line-height: 1.2;
}
h2,
h4 {
  /* 加粗 */
  /* font-weight: bold; */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  /* min-width: 300px; */
  margin: unset;
}
h4 {
  font-weight: normal;
}

.keyWord {
  padding: 0px 6px;
  font-size: 14px;
  color: rgb(255, 255, 255);
  background-color: rgb(190, 190, 190);
  border-radius: 4px;

  white-space: nowrap;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}
.time {
  color: rgb(160, 160, 160);
  font-size: 12px;
  white-space: nowrap;
}
.mainPage {
  max-width: 1000px;
  margin: 0 auto;
  .card {
    .top {
      display: flex;
      flex-direction: column;
      align-items: center;
      .bgc {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        background-color: rgb(202, 202, 202);
        border-radius: 6px;
        overflow: hidden;
      }
      img {
        width: 100%;
      }
      img[lazy='loading'] {
        width: 100px;
        /* 无限旋转 */
        animation: rotate 3s linear infinite;
      }
      .message {
        width: 100%;
        padding: 10px 20px;
        .info {
          padding: 10px 0;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .main {
      padding: 0px 20px;
      .item {
        display: flex;
        padding: 10px 0px;
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
}
</style>
