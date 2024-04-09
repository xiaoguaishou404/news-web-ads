<script setup lang="ts">
import axios from 'axios'

import { RouterLink, RouterView } from 'vue-router'
import TheWelcome from '../components/TheWelcome.vue'
import '@/assets/css/bootstrap.min.css'
import '@/assets/css/font-awesome/css/font-awesome.min.css'
import '@/assets/css/style.css'
import '@/assets/js/bootstrap.min.js'
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
            <span class="separator">&#x2F;</span>
            <a href="#">Bootstrap</a>
            <span class="separator">&#x2F;</span>
            <a href="#">HTML Template</a>
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
            <article class="blog-post">
              <header>
                <div class="lead-image">
                  <img src="@/assets/img/single-post.jpg" alt="" class="img-responsive">
                </div>
              </header>
              <div class="body">
                <h1>Responsive HTML5 Template</h1>
                <div class="meta">
                  <i class="fa fa-user" /> John Doe <i class="fa fa-calendar" />23 Agustus 2015<i class="fa fa-comments" /><span class="data"><a href="#comments">3 Comments</a></span>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem quas voluptatem et minima quo amet ducimus. Voluptatum soluta tenetur ducimus fugiat, sint voluptate eveniet adipisci nulla asperiores distinctio laudantium eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident tenetur, consectetur dolores nostrum, numquam facere a dicta eum nam suscipit consequuntur dolorem aspernatur molestias vero quo id tempore vel possimus.</p>

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem quas voluptatem et minima quo amet ducimus. Voluptatum soluta tenetur ducimus fugiat, sint voluptate eveniet adipisci nulla asperiores distinctio laudantium eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident tenetur, consectetur dolores nostrum, numquam facere a dicta eum nam suscipit consequuntur dolorem aspernatur molestias vero quo id tempore vel possimus.</p>

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem quas voluptatem et minima quo amet ducimus. Voluptatum soluta tenetur ducimus fugiat, sint voluptate eveniet adipisci nulla asperiores distinctio laudantium eos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident tenetur, consectetur dolores nostrum, numquam facere a dicta eum nam suscipit consequuntur dolorem aspernatur molestias vero quo id tempore vel possimus.</p>

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem quas voluptatem et minima quo amet ducimus. Voluptatum soluta tenetur ducimus fugiat, sint voluptate eveniet adipisci nulla asperiores.</p>
              </div>
            </article>

            <aside class="social-icons clearfix">
              <h3>Share on </h3>
              <a href="#"><i class="fa fa-facebook" /></a> <a href="#"><i class="fa fa-twitter" /></a> <a href="#"><i class="fa fa-google" /></a>
            </aside>

           

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
      <div class="widewrapper copyright">
        Copyright 2015
      </div>
    </footer>
  </div>
</template>
