import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const userId = ref('')
  const isLogin = computed(() => {
    return userId
  })
  return {
    userId: userId,
    isLogin: isLogin
  }
})
