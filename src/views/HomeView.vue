<script setup lang="ts">
import axios from 'axios'
import { RouterLink } from 'vue-router'
import '@/assets/css/bootstrap.min.css'
import '@/assets/css/font-awesome/css/font-awesome.min.css'
import '@/assets/css/style.css'
import '@/assets/js/bootstrap.min.js'
// import '@/assets/js/modernizr.js'

// axios.get('https://newsdata.io/api/1/news?apikey=pub_416247a8e9c8c25b857dc9c8602f112ea7358&q=pizza').then((response) => {
//   console.log(response.data)
// })

axios.get('api.goperigon.com/v1/all?apiKey=[KEY]&from=2024-04-07&sortBy=date&q=inflation AND prices').then((response) => {
  console.log(response.data)
})
</script>

<template>
  <div>
    <header>
      <div class="widewrapper masthead">
        <div class="container">
          <a id="logo" href="index.html">
            <img src="@/assets/img/logo.png" alt="clean Blog">
          </a>

          <div id="mobile-nav-toggle" class="pull-right">
            <a href="#" data-toggle="collapse" data-target=".clean-nav .navbar-collapse">
              <i class="fa fa-bars" />
            </a>
          </div>

          <nav class="pull-right clean-nav">
            <div class="collapse navbar-collapse">
              <ul class="nav nav-pills navbar-nav">
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <a href="about.html">About</a>
                </li>
                <li>
                  <a href="contact.html">Contact</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div class="widewrapper subheader">
        <div class="container">
          <div class="clean-breadcrumb">
            <a href="#">Blog</a>
          </div>

          <div class="clean-searchbox">
            <form action="#" method="get" accept-charset="utf-8">
              <input id="searchbox" class="searchfield" type="text" placeholder="Search">
              <button class="searchbutton" type="submit">
                <i class="fa fa-search" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>

    <div class="widewrapper main">
      <div class="container">
        <div class="row">
          <div class="col-md-8 blog-main">
            <div v-for="item in [1, 2, 3, 4, 5]" :key="item" class="row">
              <div class="col-md-6 col-sm-6">
                <article class=" blog-teaser">
                  <header>
                    <img src="@/assets/img/1.jpg" alt="">
                    <h3>
                      <!-- <a href="single.html">How to Create Template</a> -->
                      <RouterLink to="single" class="btn btn-clean-one">
                        Read more
                      </RouterLink>
                    </h3>
                    <span class="meta">19 August 2015, John Doe</span>
                    <hr>
                  </header>
                  <div class="body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, sit. Doloribus dolores neque eos. Velit eveniet, necessitatibus aut sit tenetur perferendis! Commodi pariatur dignissimos, quis sequi odit iusto cumque quod!
                  </div>
                  <div class="clearfix">
                    <!-- <a href="single.html" class="btn btn-clean-one">Read more</a> -->
                    <RouterLink to="single" class="btn btn-clean-one">
                      Read more
                    </RouterLink>
                  </div>
                </article>
              </div>
              <div class="col-md-6 col-sm-6">
                <article class="blog-teaser">
                  <header>
                    <img src="@/assets/img/2.jpg" alt="">
                    <h3>
                      <!-- <a href="single.html">Clean Personal Blog Template</a> -->
                      <RouterLink to="single" class="btn btn-clean-one">
                        Read more
                      </RouterLink>
                    </h3>
                    <span class="meta">19 August 2015, John Doe</span>
                    <hr>
                  </header>
                  <div class="body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, sit. Doloribus dolores neque eos. Velit eveniet, necessitatibus aut sit tenetur perferendis! Commodi pariatur dignissimos, quis sequi odit iusto cumque quod!
                  </div>
                  <div class="clearfix">
                    <!-- <a href="single.html" class="btn btn-clean-one">Read more</a> -->
                    <RouterLink to="single" class="btn btn-clean-one">
                      Read more
                    </RouterLink>
                  </div>
                </article>
              </div>
            </div>

            <div class="paging">
              <a href="#" class="older">Older Post</a>
            </div>
          </div>
          <aside class="col-md-4 blog-aside">
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

