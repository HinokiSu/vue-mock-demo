<template>
  <section class="app-main">
    <router-view :key="key"></router-view>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'AppMain',
  setup() {
    const route = useRoute()
    const key = () => {
      return route.path
    }
    return { key }
  },
})
</script>

<style scoped></style>
