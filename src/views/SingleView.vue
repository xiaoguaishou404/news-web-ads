<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'

import HeaderTop from '@/components/HeaderTop.vue'
import ArticleCard from '@/components/ArticleCard.vue'
import pageFooter from '@/components/pageFooter.vue'

const newCardleftItem = ref(null)
const newCardRightItem = ref(null)

const route = useRoute()
const newsList = ref([])
const articleData = ref({})
articleData.value = JSON.parse(route.params.data as string)
const ArticleBody = ref('')
const articleBodyref = ref(null)

watch(() => route.params.data, () => {
articleData.value = JSON.parse(route.params.data as string)

  getActicleBody()
})
function getActicleBody() {
  // window.scrollTo(0, 0)

  axios({
    url: `https://server.bigfullnews.xyz/ads/getNewsByCount`,
    method: 'get',
    params: {
      channel: 'sls',
      count: 10,
    },
  })
    .then((response) => {
      const filterResult = response.data.data.filter(item => item.image_url).sort(() => (Math.random() - 0.5))
      newCardleftItem.value = filterResult[0]
      newCardRightItem.value = filterResult[1]
      newsList.value = filterResult.splice(0, 3)
      console.log(22)

      console.log(newsList.value)
      // window.scrollTo(0, 0)
    })
  axios({
    method: 'get',
    url: 'https://server.bigfullnews.xyz/ads/getNewsArticle',
    data: {
      article: true,
      httpResponseBody: true,
      articleOptions: { extractFrom: 'httpResponseBody' },
    },
    params: {
      channel: 'sls',
      articleId: articleData.value.article_id,

    },

  },

  ).then((response: any) => {
    // function base64ToUint8Array(base64) {
    //   const binaryString = atob(base64)
    //   const len = binaryString.length
    //   const bytes = new Uint8Array(len)
    //   for (let i = 0; i < len; i++)
    //     bytes[i] = binaryString.charCodeAt(i)

    //   return bytes
    // }

    // const buffer = base64ToUint8Array(response.data.httpResponseBody)
    // console.log(buffer)
    // console.log(response)

    // //   ArticleBody.value = response.data.article

    // const httpResponseBody = Buffer.from(
    //   response.data.httpResponseBody,
    //   'base64',
    // )

    const article = response.data.data.articleBodyHtml

    ArticleBody.value = article
    setTimeout(() => {
      console.log(articleBodyref.value.querySelectorAll ('p'))
      articleBodyref.value.querySelectorAll ('p').forEach((item: any, index) => {
        if (index % 5 === 0) {
          const advertisingDiv = document.createElement('div')
          advertisingDiv.className = 'AdvertisingCard'
          advertisingDiv.textContent = '广告位'
          item.parentNode.insertBefore(advertisingDiv, item)
          // 滚动到顶部
          window.scrollTo(0, 0)
        }
      })
    })
  })
}

onMounted(() => {
  getActicleBody()
})
</script>

<template>
  <div>
    <HeaderTop />
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
      <h1>广告位</h1>
    </div>
    <div class="widewrapper main">
      <div class="container">
        <div class="row">
          <div class="col-md-8 blog-main">
            <article class="blog-post">
              <header>
                <div class="lead-image">
                  <img :src=" articleData.image_url " alt="" class="img-responsive">
                </div>
              </header>
              <div class="body">
                <h3>{{ articleData.title }}</h3>
                <div class="meta">
                  <i class="fa fa-user" /> {{ articleData.creator?.join(', ') }} <i class="fa fa-calendar" /> {{ articleData.pubDate.split(' ')[0] }} <i class="fa fa-comments" /><span class="data"><a href="#comments">{{ articleData.language }}</a></span>
                </div>

                <p v-if="ArticleBody" ref="articleBodyref" v-html="ArticleBody" />
                <!-- <p v-if="ArticleBody">
                  {{ ArticleBody }}
                </p> -->
                <h2 v-else>
                  Text request, please wait...... About 10 seconds......
                </h2>
              </div>
            </article>

            <!-- <aside class="social-icons clearfix">
              <h3>Share on </h3>
              <a href="#"><i class="fa fa-facebook" /></a> <a href="#"><i class="fa fa-twitter" /></a> <a href="#"><i class="fa fa-google" /></a>
            </aside> -->
          </div>
          <aside class="col-md-4 blog-aside">
            <div class="aside-widget">
              <header>
                <h3>More news</h3>
              </header>
              <div class="body">
                <ul v-if="newsList.length > 0" class="clean-list pad">
                  <div v-for="item, index in newsList" :key="index" :style="{ display: 'flex', alignItems: 'center', margin: '20px 0' }">
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
          <!-- <aside class="col-md-4 blog-aside">
            <div class="aside-widget">
              <header>
                <h3>Featured Post</h3>
              </header>
              <div class="body">
                <ul class="clean-list">
                  <li><a href="">Clean - Responsive HTML5 Template</a></li>
                  <li><a href="">Responsive Pricing Table</a></li>
                  <li><a href="">Yellow HTML5 Template</a></li>
                  <li><a href="">Blackor Responsive Theme</a></li>
                  <li><a href="">Portfolio Bootstrap Template</a></li>
                  <li><a href="">Clean Slider Template</a></li>
                </ul>
              </div>
            </div>

            <div class="aside-widget">
              <header>
                <h3>Related Post</h3>
              </header>
              <div class="body">
                <ul class="clean-list">
                  <li><a href="">Blackor Responsive Theme</a></li>
                  <li><a href="">Portfolio Bootstrap Template</a></li>
                  <li><a href="">Clean Slider Template</a></li>
                  <li><a href="">Clean - Responsive HTML5 Template</a></li>
                  <li><a href="">Responsive Pricing Table</a></li>
                  <li><a href="">Yellow HTML5 Template</a></li>
                </ul>
              </div>
            </div>

            <div class="aside-widget">
              <header>
                <h3>Tags</h3>
              </header>
              <div class="body clearfix">
                <ul class="tags">
                  <li><a href="#">HTML5</a></li>
                  <li><a href="#">CSS3</a></li>
                  <li><a href="#">COMPONENTS</a></li>
                  <li><a href="#">TEMPLATE</a></li>
                  <li><a href="#">PLUGIN</a></li>
                  <li><a href="#">BOOTSTRAP</a></li>
                  <li><a href="#">TUTORIAL</a></li>
                  <li><a href="#">UI/UX</a></li>
                </ul>
              </div>
            </div>
          </aside> -->
        </div>
      </div>
    </div>

    <pageFooter />
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
