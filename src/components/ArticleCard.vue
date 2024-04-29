<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

defineProps({
  articleData: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="col-md-6 col-sm-6" :style="{height:'700px'}">
    <article class=" blog-teaser">
      <header>
        <img :style="{ height: '200px',objectFit:'cover'  }" :src=" articleData.image_url " alt="">
        <h3 />
        <span class="meta">
          {{ articleData.title }}

          <hr>
          <span>{{ articleData.pubDate }}</span>
        </span>
        <hr>
      </header>
      <div class="body maxheight">
        {{ articleData.description?.substring(0, 200) }}...
      </div>
      <div class="clearfix">
        <RouterLink :to="{ name: 'single', params: { data: JSON.stringify(articleData) } }" class="btn btn-clean-one">
          read the full article
        </RouterLink>
        <!-- <a target="_blank" class="btn btn-clean-one" :href="articleData.link">read the full article</a> -->
      </div>
    </article>
  </div>
</template>

<style>
.maxheight {
  height: 200px;
}
</style>
