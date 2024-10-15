<script setup>
import { useAuthStore } from '@/store/auth'
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

/**
 * Routing
 */
function toTop() {
  authStore.userId = ''
  router.push({ name: 'top' })
}
// TODO: ここにログイン処理を追記する必要あり
function Login() {
  router.push({ name: 'home' })
}

/**
 * life cycle hook
 */
onUnmounted(() => {
  console.log('LoginOnUnMounted')
})
onMounted(() => {
  console.log('LoginOnMounted')
  console.log('userId:' + authStore.userId)
})
</script>

<template>
  <h2>Login</h2>
  <v-btn @click="toTop">TOP</v-btn>
  <div>
    <v-text-field v-model="authStore.userId" type="text" />
  </div>
  <div>
    <v-btn @click="Login">Login</v-btn>
  </div>
  <p>{{ authStore.userId }}</p>
</template>
