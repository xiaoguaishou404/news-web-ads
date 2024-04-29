<script setup lang="ts">
import '@/assets/css/bootstrap.min.css'
import '@/assets/css/font-awesome/css/font-awesome.min.css'
import '@/assets/css/style.css'
import '@/assets/js/bootstrap.min.js'
import axios from 'axios'
import HeaderTop from '@/components/HeaderTop.vue'

const nextPage = ''

// 一分钟30条
const timer = undefined

const downloadErrCount = 5

function downloadImg(url, fileName) {
  return axios(
    {
      method: 'get',
      url,
      responseType: 'stream',
      validateStatus(code) {
        return true
      // 所有的状态码都promise都会成功，不会进入catch
      },
    },
  ).then((response) => {
    // return response
  })
  // .catch((error) => {
  //   console.log({ error });
  //   // return error
  // })
}
async function downloadImages(urls) {
  const downloadPromises = urls.map((url) => {
    return downloadImg(url.image_url, url.article_id).catch((error) => {
      console.log({ error })
    })
  })

  try {
    const downloadedUrls = await Promise.all(downloadPromises).catch((error) => {
      console.log({ error })
    })
    console.log({ downloadedUrls })

    // 从列表中移除下载失败的 URL
    const filteredUrls = urls.filter(url => downloadedUrls.includes(url))

    //   function filternews(list) {
    //     list.filter(item => item.image_url).filter(
    //       (item) => {
    //          return downloadImg(item.image_url, item.article_id).then(() => {

    //          })
    //       }
    //     )
    //   return result
    // }

    return filteredUrls
  }
  catch (error) {
    // 处理错误
    console.error(error)
    return []
  }
}
const data = [{
  article_id: '43aa7039468b233853924fa9a01a8635',
  title: 'Granite REIT Declares Distribution for April 2024',
  link: 'https://www.benzinga.com/pressreleases/24/04/b38303277/granite-reit-declares-distribution-for-april-2024',
  keywords: [
    'grp',
    'grp.u',
    'grpu',
    'tsx:grt',
    'retail sales',
    'press releases',
  ],
  creator: [
    'Business Wire',
  ],
  video_url: null,
  description: 'Granite Real Estate Investment Trust ("Granite") (TSX:GRT, NYSE:GRP) announced today that its board of trustees has declared a distribution of CDN $0.275 per stapled unit for the month of April 2024. The distribution will be paid by Granite on Wednesday, May 15, 2024 to stapled unitholders of record at the close of trading on Tuesday, April 30, 2024. Granite confirms that no portion of the distribution constitutes effectively connected income for U.S. federal tax purposes. A qualified notice providing ...Full story available on Benzinga.com',
  content: 'ONLY AVAILABLE IN PAID PLANS',
  pubDate: '2024-04-17 21:00:00',
  image_url: 'https://www.qatar-tribune.com/watanqatartribune/uploads/images/2024/04/18/181000.jpg',
  source_id: 'benzinga',
  source_priority: 3903,
  source_url: 'https://www.benzinga.com',
  source_icon: 'https://i.bytvi.com/domain_icons/benzinga.png',
  language: 'english',
  country: [
    'united states of america',
  ],
  category: [
    'business',
  ],
  ai_tag: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
  sentiment: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
  sentiment_stats: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
  ai_region: 'ONLY AVAILABLE IN CORPORATE PLANS',
}, {
  article_id: '43aa7039468b233853924fa9a01a8635',
  title: 'Granite REIT Declares Distribution for April 2024',
  link: 'https://www.benzinga.com/pressreleases/24/04/b38303277/granite-reit-declares-distribution-for-april-2024',
  keywords: [
    'grp',
    'grp.u',
    'grpu',
    'tsx:grt',
    'retail sales',
    'press releases',
  ],
  creator: [
    'Business Wire',
  ],
  video_url: null,
  description: 'Granite Real Estate Investment Trust ("Granite") (TSX:GRT, NYSE:GRP) announced today that its board of trustees has declared a distribution of CDN $0.275 per stapled unit for the month of April 2024. The distribution will be paid by Granite on Wednesday, May 15, 2024 to stapled unitholders of record at the close of trading on Tuesday, April 30, 2024. Granite confirms that no portion of the distribution constitutes effectively connected income for U.S. federal tax purposes. A qualified notice providing ...Full story available on Benzinga.com',
  content: 'ONLY AVAILABLE IN PAID PLANS',
  pubDate: '2024-04-17 21:00:00',
  image_url: 'https://sponsors.vuejs.org/images/bit.svg?v2',
  source_id: 'benzinga',
  source_priority: 3903,
  source_url: 'https://www.benzinga.com',
  source_icon: 'https://i.bytvi.com/domain_icons/benzinga.png',
  language: 'english',
  country: [
    'united states of america',
  ],
  category: [
    'business',
  ],
  ai_tag: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
  sentiment: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
  sentiment_stats: 'ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS',
  ai_region: 'ONLY AVAILABLE IN CORPORATE PLANS',
}]
// downloadImages(data)
</script>

<template>
  <div>
    <HeaderTop />

    <div class="widewrapper main">
      <div class="container">
        <div class="row">
          <div class="col-md-8 blog-main">
            <article class="blog-post">
              <header />
              <div class="body">
                <h1>
                  404 NotFound Page  <RouterLink to="/" class="btn btn-clean-one">
                    Go Home page
                  </RouterLink>
                </h1>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <div class="widewrapper footer">
        <div class="container">
          <div class="row">
            <div class="col-md-4 footer-widget">
              <h3> <i class="fa fa-user" />About</h3>

              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab animi laboriosam nostrum consequatur fugiat at, labore praesentium modi, quasi dolorum debitis reiciendis facilis, dolor saepe sint nemo, earum molestias quas.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, error aspernatur assumenda quae eveniet.</p>
            </div>

            <div class="col-md-4 footer-widget">
              <h3> <i class="fa fa-pencil" /> Recent Post</h3>
              <ul class="clean-list">
                <li><a href="">Clean - Responsive HTML5 Template</a></li>
                <li><a href="">Responsive Pricing Table</a></li>
                <li><a href="">Yellow HTML5 Template</a></li>
                <li><a href="">Blackor Responsive Theme</a></li>
                <li><a href="">Portfolio Bootstrap Template</a></li>
                <li><a href="">Clean Slider Template</a></li>
              </ul>
            </div>

            <div class="col-md-4 footer-widget">
              <h3> <i class="fa fa-envelope" />Contact Me</h3>

              <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil fugiat, cupiditate veritatis excepturi tempore explicabo.</p>
              <div class="footer-widget-icon">
                <i class="fa fa-facebook" /><i class="fa fa-twitter" /><i class="fa fa-google" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="widewrapper copyright">
        Copyright 2015
      </div>
    </footer>
  </div>
</template>
