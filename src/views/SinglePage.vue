<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'

const newCardleftItem = ref(null)
const newCardRightItem = ref(null)

const route = useRoute()
const newsList = ref([])
const articleData = ref({})
const ArticleBody = ref('')
const articleBodyref = ref(null)

// watch(() => route.params.data, () => {

//   getActicleBody()
// })
function getActicleBody() {
  // window.scrollTo(0, 0)

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
      articleId: route.params.id,
    },

  },

  ).then((response: any) => {
    const article = response.data.data.articleBodyHtml

    ArticleBody.value = article
    articleData.value = response.data.data
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
function convertDatetimeToString(datetimeStr) {
  const datetimeParts = datetimeStr.split(/[T:-]/)
  const year = datetimeParts[0]
  const month = datetimeParts[1]
  const day = datetimeParts[2]
  const date = new Date(Date.UTC(year, month - 1, day))
  const yearMonthDay = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
  return yearMonthDay
}
onMounted(() => {
  getActicleBody()
})
</script>

<template>
  <div>
    <!-- <HeaderTop /> -->
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
            <article v-if="articleData.headline" class="blog-post">
              <header>
                <!-- <div class="lead-image">
                  <img :src=" articleData.mainImage?.url " alt="" class="img-responsive">
                </div> -->
              </header>

              <div class="body">
                <h3>{{ articleData.headline }}</h3>
                <hr>
                <div style="width: 100%;display: flex;justify-content: end;">
                  <strong>{{ convertDatetimeToString(articleData.dateModified) }}</strong>
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

            <!-- <aside class="social-icons clearfix">
              <h3>Share on </h3>
              <a href="#"><i class="fa fa-facebook" /></a> <a href="#"><i class="fa fa-twitter" /></a> <a href="#"><i class="fa fa-google" /></a>
            </aside> -->
          </div>
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
