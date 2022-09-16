<template>
  <component :is="type" v-bind="linkProps(toPath)">
    <slot />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  name: 'LinkItem',
  props: {
    toPath: {
      type: String,
      default: '',
      require: true,
    },
  },
  setup(props) {
    const isExternalType = computed(() => isExternal(props.toPath as string))
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
    return { type, linkProps }
  },
})
</script>

<style scoped></style>
