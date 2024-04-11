<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="widewrapper subheader">
    <div class="container">
      <div class="clean-breadcrumb">
        <RouterLink to="/">
          HomePage
        </RouterLink>
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
</template>
