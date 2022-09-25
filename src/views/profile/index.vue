<template>
  <div class="profile-main">
    name: {{ userInfo.name }}
    <template v-if="userInfo.roles.length > 0">
      <div v-for="role in userInfo.roles" :key="role?.index">
        {{ role }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '@/store'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'Profile',
  setup() {
    const userStore = useUserStore()
    const userInfo = computed(() => ({
      name: userStore.name,
      roles: userStore.roles,
    }))

    return { userInfo }
  },
})
</script>

<style scoped></style>
