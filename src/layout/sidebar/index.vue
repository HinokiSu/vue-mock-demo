<template>
  <div class="sidebar__main">
    <!-- 遍历routes,渲染 菜单子项 -->
    <sub-menu
      class="sub-menu__main"
      v-for="route in routes"
      :key="route.path"
      :item="route"
      :basePath="route.path"
    ></sub-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { usePermissionStore } from '../../store'
import SubMenu from './subMenu.vue'
import MenuItem from './MenuItem.vue'

export default defineComponent({
  components: { SubMenu, MenuItem },
  name: 'sidebar',
  setup() {
    const permissionStore = usePermissionStore()
    const routes = computed(() => permissionStore.routes)

    return { routes }
  },
})
</script>

<style lang="less" scoped>
.sidebar__main {
  width: 200px;
  height: 100%;
  overflow: hidden;
  background: white;
  box-shadow: 5px 5px 5px rgba(200, 196, 196, 0.23);
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  .sub-menu__main {
    padding: 12px 0;
    color: rgb(32, 79, 133);
  }
}
</style>
