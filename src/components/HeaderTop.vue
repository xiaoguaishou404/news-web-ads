<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Breadcrumb from '@/components/Breadcrumb.vue'
</script>

<template>
  <header>
    <div class="widewrapper masthead">
      <div class="container">
        <RouterLink id="logo" to="/">
          <img src="@/assets/img/logo.png" alt="clean Blog">
        </RouterLink>

        <div id="mobile-nav-toggle" class="pull-right">
          <a href="#" data-toggle="collapse" data-target=".clean-nav .navbar-collapse">
            <i class="fa fa-bars" />
          </a>
        </div>

        <nav class="pull-right clean-nav">
          <div class="collapse navbar-collapse">
            <ul class="nav nav-pills navbar-nav">
              <li>
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
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <Breadcrumb />
  </header>
</template>
