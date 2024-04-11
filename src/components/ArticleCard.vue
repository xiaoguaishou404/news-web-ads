<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="col-md-6 col-sm-6">
    <article class=" blog-teaser">
      <header>
        <img src="@/assets/img/1.jpg" alt="">
        <h3 />
        <span class="meta">19 August 2015, John Doe</span>
        <hr>
      </header>
      <div class="body">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, sit. Doloribus dolores neque eos. Velit eveniet, necessitatibus aut sit tenetur perferendis! Commodi pariatur dignissimos, quis sequi odit iusto cumque quod!
      </div>
      <div class="clearfix">
        <RouterLink to="single/1" class="btn btn-clean-one">
          Read more
        </RouterLink>
      </div>
    </article>
  </div>
</template>
