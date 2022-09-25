<template>
  <div class="login wrapper">
    <p>Login</p>
    <div class="container">
      <p>User:</p>
      <input type="text" v-model="loginForm.username" />
      <p>Password:</p>
      <input type="text" v-model="loginForm.password" />
    </div>
    <button class="login-btn" @click="handleLogin">Login</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {  useRouter } from 'vue-router'
import { useUserStore } from '../store'
interface ILoginData {
  username: string
  password: string
}
export default defineComponent({
  name: 'Login',
  setup() {
    const loginForm = ref<ILoginData>({
      username: '',
      password: '',
    })
    const router = useRouter()

    const userStore = useUserStore()

    const handleLogin = () => {
      userStore.login(loginForm.value).then(() => {
        router.push({path: '/'})
      })
    }

    return { loginForm, handleLogin }
  },
})
</script>

<style lang="less" scoped>
.login,
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.login-btn {
  margin-top: 16px;
}
</style>
