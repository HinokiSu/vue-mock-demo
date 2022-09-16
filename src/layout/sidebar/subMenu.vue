<template>
  <div class="submenu__container" v-if="item.meta && !item.meta.hidden">
    <!-- 含children.length =1 或 =0 子级路由 -->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <link-item
        v-if="onlyOneChild.meta"
        :to-path="resolvePath(onlyOneChild.path)"
      >
        <menu-item :title="onlyOneChild.meta.title"></menu-item>
      </link-item>
    </template>

    <!-- 含有 children.length > 1 子级路由, 递归 -->
    <div v-else>
      <menu-item v-if="item.meta" :title="item.meta.title"></menu-item>
      <sub-menu
        class="submenu-set__container"
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      >
      </sub-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import MenuItem from './MenuItem.vue'
import LinkItem from './LinkItem.vue'
import { isExternal } from '@/utils/validate'
import { resolve } from 'path-browserify'

export default defineComponent({
  name: 'SubMenu',
  components: { MenuItem, LinkItem },
  props: {
    // 路由对象
    item: {
      type: Object as PropType<RouteRecordRaw | any>,
      require: true,
    },
    // 父级路由path
    basePath: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const basePath = computed(() => props.basePath)
    // 解析路由地址
    const resolvePath = (routePath: string) => {
      // 判断是否是外部地址
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(basePath.value)) {
        return basePath.value
      }
      // 将 routePath 和 basePath (父级)拼接
      return resolve(basePath.value, routePath)
    }

    const onlyOneChild = ref()
    let flag = 1
    const hasOneShowingChild = (children = [], parent: any) => {
      const showingChildren = children.filter((item: any) => {
        // 是否设置为 隐藏
        if (item.meta.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          // 临时设置，若只有一个子级 将被使用
          onlyOneChild.value = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      // 当仅有一个 子级路由，则默认显示这个子级路由
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      // 若没有可以显示的子级路由，则显示 父级路由
      if (showingChildren.length === 0) {
        console.log(flag)
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    }
    return {
      resolvePath,
      hasOneShowingChild,
      onlyOneChild,
    }
  },
})
</script>

<style lang="less" scoped>
.submenu-set__container {
  padding-left: 20px;
  background: rgba(87, 81, 109, 0.237);
}
</style>
