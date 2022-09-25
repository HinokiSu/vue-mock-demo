<template>
  <div class="app-wrapper">
    <sidebar></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <div class="app-main">
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from './navbar.vue'
import sidebar from './sidebar/index.vue'
import AppMain from './appMain.vue'

export default defineComponent({
  components: { sidebar, Navbar, AppMain },
  name: 'Layout',
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
  display: flex;

  .main-container {
    flex: 1;
  }
}
</style>
