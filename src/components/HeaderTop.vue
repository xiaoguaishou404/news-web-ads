<script setup lang="ts">
import { RouterLink } from 'vue-router'

const title = import.meta.env.VITE_TITLE
</script>

<template>
  <header class="headerTop">
    <div class="clearbgd widewrapper masthead">
      <div class="container">
        <RouterLink id="logo" to="/">
          <!-- <img src="@/assets/img/logo.png" alt="clean Blog"> -->
          <h1 style="color: white;">
            {{ title }}
          </h1>
        </RouterLink>

        <div id="mobile-nav-toggle" class="pull-right">
          <a href="#" data-toggle="collapse" data-target=".clean-nav .navbar-collapse">
            <!-- <i class="fa fa-bars" /> -->
          </a>
        </div>

        <nav class="pull-right clean-nav">
          <div class="collapse navbar-collapse">
            <ul class="nav nav-pills navbar-nav">
              <!-- <li>
                <RouterLink to="/">
                  Home
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/about">
                  About
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/contact">
                  Contact
                </RouterLink>
              </li> -->
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.headerTop {
  /* bannerImg.jpg */
  background-image: url(../assets/img/bannerImg.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  /* background-color: #000; */
}
.clearbgd {
  background-color: unset !important;
}
</style>
