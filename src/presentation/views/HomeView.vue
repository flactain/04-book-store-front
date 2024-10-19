<script setup>
import { useAuthStore } from '@/repository/store/auth'
// eslint-disable-next-line no-unused-vars
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import HomeLogoutItem from '@/presentation/components/HomeLogoutItem.vue'

const authStore = useAuthStore()
const router = useRouter()

/**
 * Routing
 */
function toRent() {
  router.push({ name: 'rent', params: { rentOrReturn: 'rent' } })
}
function toReturn() {
  router.push({ name: 'rent', params: { rentOrReturn: 'return' } })
}
function toRentals() {
  router.push({ name: 'rentals' })
}
function toBookList() {
  router.push({ name: 'books' })
}

/**
 * life cycle hook
 */
onMounted(() => {
  console.log('HomeOnMounted')
  console.log('userId:' + authStore.userId)
  console.log(router.params)
})
</script>

<template>
  <h2>Home</h2>
  <HomeLogoutItem />

  <div>
    <v-btn is-rental="true" @click="toRent">Rent</v-btn>
  </div>
  <div>
    <v-btn is-return="true" @click="toReturn">Return</v-btn>
  </div>
  <div>
    <v-btn @click="toBookList">BookList</v-btn>
  </div>
  <div>
    <v-btn @click="toRentals">RentalList</v-btn>
  </div>
</template>
