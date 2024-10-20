<script setup>
import LoginedHeader from '@/presentation/components/LoginedHeader.vue'
import { ref } from 'vue'
import HeaderText from '../components/HeaderText.vue'
//TODO:APIたたく実装必要
const books = ref([
  {
    rentNo: '00001',
    isbn: '132403912',
    bookName: 'aws learning',
    rentDate: '2024/09/20',
    planReturnDate: '2024/10/4'
  },
  {
    rentNo: '00002',
    isbn: '12684726',
    bookName: 'GCP learning',
    rentDate: '2024/010/20',
    planReturnDate: '2024/12/4'
  },
  {
    rentNo: '00003',
    isbn: '7654216',
    bookName: 'Azure learning',
    rentDate: '2024/09/20',
    planReturnDate: '2024/10/10'
  }
])
</script>

<template>
  <v-container>
    <HeaderText>View Rentals</HeaderText>
    <LoginedHeader />
    <h3>rentals</h3>
    <div v-for="book in books" :key="book.rentNo">
      <p>rentNo:{{ book.rentNo }}</p>
      <p>isbn:{{ book.isbn }}</p>
      <p>bookName:{{ book.bookName }}</p>
      <p>rentDate:{{ book.rentDate }}</p>
      <p>planReturnDate:{{ book.planReturnDate }}</p>
      <br />
    </div>
  </v-container>
</template>
