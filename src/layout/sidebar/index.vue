<template>
  <div class="sidebar__main">
    <!-- 遍历routes,渲染 菜单子项 -->
    <sub-menu
      v-for="route in routes"
      :key="route.path"
      :item="route"
      :basePath="route.path"
    ></sub-menu>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  InjectionKey,
  onMounted,
  provide,
  ref,
} from 'vue'
import { usePermissionStore } from '../../store'
import SubMenu from './subMenu.vue'
import MenuItem from './MenuItem.vue'
import { handleClickSubMenuKey, openedSubMenusKey } from './keys'

export default defineComponent({
  components: { SubMenu, MenuItem },
  name: 'sidebar',

  setup() {
    const permissionStore = usePermissionStore()
    const routes = computed(() => permissionStore.routes)
    const openedSubMenus = ref<Array<string>>([])

    const openSubMenu = (basePath: string) => {
      openedSubMenus.value.push(basePath)
    }

    // 关闭子菜单
    const closeSubMenu = (basePath: string) => {
      openedSubMenus.value.splice(openedSubMenus.value.indexOf(basePath), 1)
      // 关闭path下的子菜单
      openedSubMenus.value = openedSubMenus.value.filter(
        (item: string) => item.indexOf(basePath + '/') !== 0
      )
    }

    // 处理子菜单点击事件
    const handleClickSubMenu = (basePath: string) => {
      // 存在已打开的 子菜单
      if (openedSubMenus.value.includes(basePath)) {
        closeSubMenu(basePath)
      } else {
        openSubMenu(basePath)
      }
    }

    provide(handleClickSubMenuKey, handleClickSubMenu)
    provide(openedSubMenusKey, openedSubMenus)

    return { routes }
  },
})
</script>

<style lang="less" scoped>
.sidebar__main {
  width: 200px;
  height: 100%;
  overflow: hidden;
  background: snow;
  box-shadow: 5px 5px 5px rgba(200, 196, 196, 0.23);
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}
</style>
