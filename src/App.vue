<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Layout from './layout/index.vue'

export default defineComponent({
  setup() {
    return {}
  },
  components: { Layout },
})
</script>

<style scoped></style>
