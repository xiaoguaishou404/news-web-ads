<script setup lang="ts">
import { NVirtualList } from 'naive-ui'
import { ref } from 'vue'

import axios from 'axios'
// import { RouterLink } from 'vue-router'

import HeaderTop from '@/components/HeaderTop.vue'
import ArticleCard from '@/components/ArticleCard.vue'

// axios.get('https://dc-online-catalog.xod.zyte.group/json/article/yahoo.com').then((response) => {
//   console.log(response.data)
// })

// axios.get('https://newsdata.io/api/1/news?apikey=pub_416247a8e9c8c25b857dc9c8602f112ea7358&q=pizza').then((response) => {
//   console.log(response.data)
// })



// axios.get('api.goperigon.com/v1/all?apiKey=[KEY]&from=2024-04-07&sortBy=date&q=inflation AND prices').then((response) => {
//   console.log(response.data)
// })

const count = ref(2)
function load() {
  count.value += 10
}
</script>

<template>
  <div class="aa" v-infinite-scroll="load" infinite-scroll-distance="10" infinite-scroll-delay="10" style="overflow: auto">
    <HeaderTop />
    <div class="widewrapper main">
      <div class="container">
        <div class="row">
          <!-- <div class="col-md-8 blog-main">
            <div v-for="item in new Array(20)" :key="item" class="row">
              
            </div>
          </div> -->
          

          <ul  class="infinite-list col-md-8 blog-main" >
            <li v-for="i in count" :key="i" class="infinite-list-item row">
              <ArticleCard />
              <ArticleCard />
            </li>
          </ul>

    

          <!-- <div class="paging">
            <a href="#" class="older">Older Post</a>
          </div> -->

          <aside class="col-md-4 blog-aside">
            <div class="aside-widget">
              <header>
                <h3>More news</h3>
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
          </aside>
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
      <div class="widewrapper copyright" />
    </footer>
  </div>
</template>

<style scoped>
.aa{
  height: 100vh;
}

.infinite-list {
  /* height: 2100px; */
  /* padding: 0;
  margin: 0;
  list-style: none; */
}
/* .infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
} */
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
