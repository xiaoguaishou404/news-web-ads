<script setup lang="ts">
import { NVirtualList } from 'naive-ui'
import { Ref, computed, onMounted, ref } from 'vue'
import axios from 'axios'
import Breadcrumb from '@/components/Breadcrumb.vue'
import pageFooter from '@/components/pageFooter.vue'

// import { RouterLink } from 'vue-router'

import HeaderTop from '@/components/HeaderTop.vue'
import ArticleCard from '@/components/ArticleCard.vue'

const newsList = ref([])
let nextPage = ''
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
onMounted(() => {
  axios({
    url: `https://server.bigfullnews.xyz/ads/getNewsByCount`,
    method: 'get',
    params: {
      channel: 'sls',
      count: 10,
    },
  },

  ).then((response) => {
    const filterResult = response.data.data.filter(item => item.image_url).sort(() => (Math.random() - 0.5))

    nextPage = response.data.nextPage
    newCardleftItem.value = filterResult[0]
    newCardRightItem.value = filterResult[1]
    newsList.value = filterResult
  })

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
  <div>
    <HeaderTop />
    <Breadcrumb @search="searchCard" />

    <Brecrumb @search="searchCard" />

    <div class="widewrapper main">
      <div class="container">
        <div class="row">
          <!-- <div class="col-md-8 blog-main">
            <div v-for="item in new Array(20)" :key="item" class="row">

            </div>
          </div> -->
          <div class="AdvertisingCard">
            <h1>广告位</h1>
          </div>

          <div class="col-md-8 blog-main">
            <ArticleCard v-if="newCardleftItem" :article-data="newCardleftItem" />
            <ArticleCard v-if="newCardRightItem" :article-data="newCardRightItem" />
            <!-- <div  class="AdvertisingCard"> -->
            <h1 class="FloatAdvertisingCard floatleft">
              广告位
            </h1>
            <!-- </div> -->
            <ArticleCard v-if="newCardleftItem" :article-data="newCardleftItem" />
            <ArticleCard v-if="newCardRightItem" :article-data="newCardRightItem" />
            <div class="paging">
              <a class="btn btn-clean-one older" href="#">TOP</a>
              <div class="clearfix">
                <!-- <a target="_blank" class="btn btn-clean-one" :href="articleData.link">read the full article</a> -->
              </div>
            </div>

            <!-- <ArticleCard v-if="newCardleftItem" :article-data="newCardleftItem" />
            <ArticleCard v-if="newCardRightItem" :article-data="newCardRightItem" />
            <ArticleCard v-if="newCardleftItem" :article-data="newCardleftItem" />
            <ArticleCard v-if="newCardRightItem" :article-data="newCardRightItem" />
            <ArticleCard v-if="newCardleftItem" :article-data="newCardleftItem" />
            <ArticleCard v-if="newCardRightItem" :article-data="newCardRightItem" /> -->
            <!-- <li v-for="item, index in newsList[0]" :key="index" class="infinite-list-item row">
            </li> -->
          </div>

          <aside class="col-md-4 blog-aside">
            <div class="aside-widget">
              <header>
                <h3>More news</h3>
              </header>
              <div class="body">
                <ul v-if="newsList.length > 0" class="clean-list pad">
                  <div v-for="item, index in doubleCount.splice(0, 3)" :key="index" :style="{ display: 'flex', alignItems: 'center', margin: '20px 0' }">
                    <div :style="{ width: '50px', height: '50px', marginRight: '10px' }">
                      <img :style="{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }" :src=" item.image_url " alt="" srcset="">
                    </div>
                    <!-- <div @click="changeCard(item)">
                      {{ item.title }}
                    </div> -->
                    <RouterLink :to="{ name: 'single', params: { data: JSON.stringify(item) } }">
                      {{ item.title }}
                    </RouterLink>
                  </div>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <!-- <div class="paging">
            <a href="#" class="older">Older Post</a>
          </div> -->

        <div class="AdvertisingCard">
          <h1>广告位</h1>
        </div>
        <br>
      </div>
    </div>

    <pageFooter />
  </div>
</template>

<style>
.pad {
  padding: 10px;
}
.FloatAdvertisingCard {
  width: 100%;
  height: 300px;
  border: 1px solid;
  margin: 10px 0;
}
@media (min-width: 768px) {
  .floatleft {
    float: left;
  }
}
</style>
