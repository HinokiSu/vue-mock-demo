<template>
  <div class="menu-item__title">
    <span>{{ title }}</span>
    <slot></slot>
  </div>
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
.menu-item__title {
  padding: 16px;
  color: rgba(153, 153, 153);
  &:hover {
    color: #444;
  }
}
</style>
