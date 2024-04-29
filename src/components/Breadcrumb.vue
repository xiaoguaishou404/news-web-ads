<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const emit = defineEmits(['search'])
const searchValue = ref('')

function handleEnter() {
  emit ('search', searchValue.value)
  searchValue.value = ''
}
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
        <input id="searchbox" v-model="searchValue" class="searchfield" type="text" placeholder="Search" @keyup.enter="handleEnter">
        <button class="searchbutton">
          <i class="fa fa-search" @click="handleEnter" />
        </button>
      </div>
    </div>
  </div>
</template>
