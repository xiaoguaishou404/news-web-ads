<script setup lang="ts">
import { Ref, computed, onActivated, onMounted, ref } from 'vue'
import axios from 'axios'
import 'v3-infinite-loading/lib/style.css'
import { onBeforeRouteEnter, onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const scrollTop = ref(0)
let nowcount = 0
const num = 12
let noMoreNews = ref(false)
const newNewsList = ref ([])
const title = ref('')
let rootlazyDom = ref(null)
const envDomain = import.meta.env.VITE_DOMAIN

onBeforeRouteLeave((to, from) => {
  scrollTop.value = document.getElementById('app').scrollTop
})

onActivated(() => {
  document.getElementById('app').scrollTop = scrollTop.value
})

function getNews() {
  return axios({
    url: `https://server.gyhserver.com/ads/getNewsByPage`,
    // url: `http://192.168.1.124:8081/ads/getNewsByPage`,
    method: 'get',
    params: {
      channel: import.meta.env.VITE_BUILD_SITE,
      count: num,
      start: nowcount,
      end: num + nowcount,
    },
  },
  ).then(async (response) => {
    const filterResult = response.data.data
    if (filterResult.length<4) {
      noMoreNews.value =true
    }
    for (let i = 0; i < filterResult.length; i += 4) {
      if (i + 4 <= filterResult.length) {
        const chunk = filterResult.slice(i, i + 4)
        nowcount += 4
        newNewsList.value.push(chunk)
      }
    }
  })
}
getNews()

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
title.value = import.meta.env.VITE_TITLE

function getTopLevelDomainWithoutPort() {
  const url = window.location.href
  const domain = url.split('/')[2]
  const [topLevelDomain, port] = domain.split(':')
  return topLevelDomain.split('.').slice(-2).join('.')
}
document.getElementById('webTitle').innerHTML = getTopLevelDomainWithoutPort()

onMounted(() => {
  rootlazyDom.value = document.querySelector('.webMainTitle')?.parentNode?.parentNode
  console.log(rootlazyDom.value)
})


</script>

<template>
  <div id="image-scroll-container" class="mainPage">
    <n-infinite-scroll style=" height: 100%;" :distance="1000" @load="getNews">
      <h3 class="webMainTitle" style="text-transform: uppercase;font-weight: bold;">
        {{ title }}
      </h3>
      <div class="AdvertisingCard">
        <h1>Advertising window</h1>
      <!-- {{ rootlazyDom?.innerHTML }} -->
      </div>
      <div v-for="group, index in newNewsList" :key="index" class="card">
        <div class="top" @click="toLink(group[0])">
          <n-image
          :preview-disabled = "true"
          class="cardImg"
            lazy
            :src="group[0].image_url "
            :intersection-observer-options="{
              root: rootlazyDom,
              rootMargin: '2000px',
              threshold: 1,
            }"
          >
            <template #placeholder>
              <div
                style="
                   width: 100vw;
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #0001;"
              >
                Loading
              </div>
            </template>
          </n-image>

          <div class="message">
            <!-- <RouterLink :to="`/singlePage/${group[0].article_id}`"> -->
            <h2>{{ group[0].title }}</h2>
            <!-- </RouterLink> -->

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
          <div v-for="item, index in group.slice(1, 4)" :key="index" class="item" @click="toLink(item)">
              

              <n-image
          :preview-disabled="true"
                width="100"
                height="100"
                object-fit="cover"
                lazy
                :src="item.image_url "
                :intersection-observer-options="{
                  root: rootlazyDom,
                  rootMargin: '2000px',
                  threshold: 1,
                }"
              >
                <template #placeholder>
                  <div
                    style="
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #0001;
          "
                  >
                    Loading
                  </div>
                </template>
              </n-image>
            <div class="message">
              <!-- <RouterLink :to="`/singlePage/${item.article_id}`">
              <h4>{{ item.title }}</h4>

            </RouterLink> -->
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
      <div v-if="noMoreNews" class="widewrapper subheader">
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
    </n-infinite-scroll>
  </div>
</template>

<style>
.pageFooter {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0px;
  color: white;
  a {
    color: white;
    /* 下划线 */
    text-decoration: underline;
  }
}
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
.webMainTitle {
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

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: nowrap;
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
  height: 100vh;
  overflow: auto;
  .card {
    .top {
      display: flex;
      flex-direction: column;
      align-items: center;
      .cardImg{
        width: 100%;
        ::v-deep img {
        width: 100%;
      }
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
