<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const emit = defineEmits(['submit'])

const isRental = computed(() => {
  return route.params.rentOrReturn == 'rent'
})
const isReturn = computed(() => {
  return route.params.rentOrReturn == 'return'
})

function fetchBookDetail() {
  //TODO: Googleの書籍APIかなんか叩く
}
function fetchRentalDetail() {
  //TODO: 貸出状態を取得
}

function submit() {
  emit('submit', isbn)
}

const isbn = ref('')
</script>
<!--NOTE: こっちで書籍api叩いて、emitで完了報告をhomeViewに送るか -->
<template>
  <template v-if="isRental">
    <h3>Rental</h3>
    <input v-model="isbn" type="text" @keyup.enter="fetchBookDetail" />
    <v-btn @click="submit">rent</v-btn>
  </template>
  <template v-if="isReturn">
    <h3>Return</h3>
    <input v-model="isbn" type="text" @keyup.enter="fetchRentalDetail" />
    <v-btn @click="submit">return</v-btn>
  </template>
</template>
