<script setup>
import LibraryFormItem from '@/presentation/components/LibraryFormItem.vue'
import LoginedHeader from '@/presentation/components/LoginedHeader.vue'
import { useAuthStore } from '@/repository/store/auth'
// eslint-disable-next-line no-unused-vars
import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

function submit(isbn) {
  //TODO: rent apiたたき
  //TODO: return apiたたき
  //最後に結果画面に遷移クエリとかで成功失敗判定かくか
  console.log(isbn)
  router.push({ name: 'result', params: { rentOrReturn: route.params.rentOrReturn } })
}
/**
 * Routing
 */

/**
 * life cycle hook
 */
onMounted(() => {
  console.log('RentOnMounted')
  console.log('userId:' + authStore.userId)
  console.log(router.params)
})
</script>

<template>
  <LoginedHeader />
  <LibraryFormItem @submit="submit"></LibraryFormItem>
</template>
