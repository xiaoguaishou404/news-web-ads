<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive >
    <component :key=" $route.path" :is="Component" v-if="$route.meta.keepAlive" />
    </KeepAlive>
    <component :key=" $route.path" :is="Component" v-if="!$route.meta.keepAlive" />
  </RouterView>
</template>

<style>
#app {
  height: 100vh;
  overflow: auto;

}
</style>
