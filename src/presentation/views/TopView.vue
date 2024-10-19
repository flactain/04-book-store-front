<script setup>
import { useAuthStore } from '@/repository/store/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

function toLogin() {
  router.push({ name: 'login' })
}
function toRegister() {
  router.push({ name: 'userRegister' })
}

onMounted(() => {
  console.log('TopOnMounted')
  console.log('userId:' + authStore.userId)
  console.log(router.params)
})
</script>

<template>
  <h2>Home</h2>
  <div>
    <v-btn @click="toLogin">ログイン</v-btn>
  </div>
  <div>
    <v-btn @click="toRegister">新規登録</v-btn>
  </div>
</template>
