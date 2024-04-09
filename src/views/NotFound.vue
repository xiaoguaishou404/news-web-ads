<script setup lang="ts">
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
    </header>

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
