<template>
  <div class="menu-item__main">{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuItem',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.menu-item__main {
  padding: 8px;
  color: rgba(151, 159, 159, 0.747);

  &:hover {
    background: rgb(246, 224, 224);
  }
}
</style>
