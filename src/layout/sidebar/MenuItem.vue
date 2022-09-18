<template>
  <div class="menu-item__main">
    <component :is="type" v-bind="linkProps(path)">
      <span class="menu-item__title" :class="{ active: active }">{{
        title
      }}</span>
      <slot />
    </component>
  </div>
</template>

<script lang="ts">
import { isExternal } from '@/utils'
import { computed, defineComponent, getCurrentInstance, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'MenuItem',
  props: {
    title: {
      type: String,
      default: '',
    },
    path: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const route = useRoute()
    const active = computed(() => route.path === props.path)

    const isExternalType = computed(() => isExternal(props.path as string))
    // 标签的类型
    const type = computed(() => {
      if (isExternalType.value) {
        return 'a'
      }
      return 'router-link'
    })
    const linkProps = (toPath: string) => {
      if (isExternalType.value) {
        return {
          href: toPath,
          target: '_blank',
          rel: 'noopener',
        }
      }
      return { to: toPath }
    }

    return { linkProps, type, active }
  },
})
</script>

<style lang="less" scoped>
.menu-item__main {
  padding: 12px;
  .menu-item__title {
    color: rgba(153, 153, 153);

    &.active {
      color: orchid !important;
    }
  }
  &:hover {
    .menu-item__title {
      color: #444;
    }
  }
}
</style>
