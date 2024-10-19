<script setup>
import LibraryFormItem from '@/presentation/components/LibraryFormItem.vue'
import HomeLogoutItem from '@/presentation/components/HomeLogoutItem.vue'
import { useAuthStore } from '@/repository/store/auth'
// eslint-disable-next-line no-unused-vars
import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

/**
 * life cycle hook
 */
onMounted(() => {
  console.log('ResultOnMounted')
  console.log('userId:' + authStore.userId)
  console.log(router.params)
})
</script>

<template>
  <HomeLogoutItem></HomeLogoutItem>
  <h2>success!</h2>
</template>
