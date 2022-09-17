<template>
  <div v-if="item.meta && !item.meta.hidden">
    <!-- 含children.length =1 或 =0 子级路由 -->
    <template v-if="hasOneShowingChild(item.children, item)">
      <link-item
        v-if="onlyOneChild.meta"
        :to-path="resolvePath(onlyOneChild.path)"
      >
        <div :class="{ 'submenu-title--noDropdown': !isNest }">
          <menu-item :title="onlyOneChild.meta.title"></menu-item>
        </div>
      </link-item>
    </template>

    <!-- 含有 children.length > 1 子级路由, 递归 -->
    <div v-else>
      <!-- 父级标题 -->
      <menu-item
        class="submenu-set-title"
        v-if="item.meta"
        :title="item.meta.title"
        @click="handleClick"
      >
        <span> -> </span>
      </menu-item>
      <!-- 菜单子项合集 -->
      <div class="submenu-set__container" v-show="expanded">
        <sub-menu
          class="submenu-set__item"
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
          :is-nest="true"
        >
        </sub-menu>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  PropType,
  Ref,
  ref,
  toRef,
} from 'vue'
import { RouteRecordRaw } from 'vue-router'
import MenuItem from './MenuItem.vue'
import LinkItem from './LinkItem.vue'
import { isExternal } from '@/utils/validate'
import { resolve } from 'path-browserify'
import { handleClickSubMenuKey, openedSubMenusKey } from './keys'

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
    // 是否是子项
    isNest: {
      type: Boolean,
      default: false,
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
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      // showingChildren > 1
      return false
    }

    // 提供一个默认值，由于是响应式的所有需要ref([])将undefined类型移除
    const openedSubMenus = inject(openedSubMenusKey, ref([]))
    // 注入时为了表明提到共的默认值是个函数，需要传入第三个参数
    const handleClickSubMenu = inject(handleClickSubMenuKey, () => {}, false)

    // 控制子项菜单集的 显示
    const expanded = computed(() =>
      openedSubMenus.value.includes(basePath.value)
    )
    // 处理点击事件
    const handleClick = () => {
      handleClickSubMenu(basePath.value)
    }
    return {
      resolvePath,
      onlyOneChild,
      hasOneShowingChild,
      expanded,
      handleClick,
    }
  },
})
</script>

<style lang="less" scoped>
.submenu-title--noDropdown {
  font-weight: 400;
  color: #444;

  &:hover {
    font-weight: 500;
    color: #222;
    background-color: white;
  }
}
.submenu-set-title {
  font-size: 0.95rem;
  font-weight: 400;
  color: #555;
  cursor: pointer;

  &:hover {
    font-weight: 500;
    background-color: white;
  }
}
// 子级 菜单项
.submenu-set__container {
  background-color: rgba(144, 148, 147, 0.284);

  .submenu-set__item {
    padding-left: 20px;
    font-size: 0.95rem;
    font-weight: 400;
    color: #444;
    &:hover {
      background-color: rgb(244, 244, 244);
      font-weight: 600;
      color: #222;
      background-color: white;
    }
  }
}

// 子级 菜单项的 父级
</style>
