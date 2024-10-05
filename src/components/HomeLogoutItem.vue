<script setup>
import { useAuthStore } from '@/store/auth'
// eslint-disable-next-line no-unused-vars
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

function toTop() {
  router.push({ name: 'top' })
  authStore.userId = ''
}
function toHome() {
  router.push({ name: 'home' })
}
</script>

<template>
  <h4>your account is {{ authStore.userId }}</h4>
  <v-btn @click="toHome">Top</v-btn>
  <v-btn @click="toTop">Logout</v-btn>
</template>
