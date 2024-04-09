<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import componentDemo from './components/componentDemo.vue'
import componentDemoSetup from './components/componentDemoSetup.vue'
</script>

<template>
  <header>
    <componentDemo :title-info="{ title: 'hello', color: 'red' }" />
    <br>
    <componentDemoSetup :title-info="{ title: 'hello', color: 'blue' }" />
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125">
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">
          Home
        </RouterLink>

        <RouterLink to="/aa/ww">
          About
        </RouterLink>
      </nav>
    </div>
  </header>
  <RouterView class="RouterView" />
</template>

<style lang="less" scoped>
header {
  .logo {
    margin: 0 2rem;
  }

  .wrapper {
    nav {
      padding: 1rem 0;
    }

    nav a.router-link-exact-active {
      color: var(--color-text);
    }

    nav a.router-link-exact-active:hover {
      background-color: transparent;
    }

    nav a {
      display: inline-block;
      border-left: 1px solid var(--color-border);
      padding: 0 1rem;
    }

    nav a:first-of-type {
      border: 0;
      padding-left: 0;
    }
  }
}

// 横屏
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    margin: auto 0;
    .wrapper {
      display: flex;
      flex-direction: column;
    }
  }
}

// 竖屏
@media (max-width: 1024px) {
  header {
    // width: fit-content;
    display: flex;
    flex-direction: column;
    place-items: center;
    line-height: 1.5;
    margin: 0 auto;
  }

  nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
  }
}
</style>
