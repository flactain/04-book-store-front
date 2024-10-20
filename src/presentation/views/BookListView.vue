<script setup>
import LoginedHeader from '@/presentation/components/LoginedHeader.vue'
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { createBook } from '@/models/model/book'
import { useBookService } from '@/models/service/bookService'

var inputBook = createBook()
const bookService = useBookService()

var allBooks = ref([])

//form validation
const titleValid = computed(() => {
  return inputBook.bookName == 'こちらの書籍は登録ありません' || !!inputBook.book_name
})
const qtyValid = computed(() => {
  return inputBook.qty > 0
})

/**
 * API Kick
 */
async function getBookDetail() {
  inputBook = await bookService.getBookDetailByIsbn(inputBook)
}
//TODO: post apiを叩く。 redirectで現在のページへ
//TODO: error handling
function register() {
  axios
    .post(
      '/lib/books',
      {
        qty: inputBook.qty,
        book_name: inputBook.bookName,
        isbn: inputBook.isbn
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
    .then((response) => {
      console.log(response)
      getBookDetail()
    })
    .catch((error) => console.log(error))
}
async function getAllBooks() {
  allBooks.value = await bookService.getAllBooks
}

/**
 * lyfecycle hooks
 */
onMounted(() => {
  getAllBooks()
})
</script>

<template>
  <LoginedHeader />

  <v-container>
    <h3>Register</h3>
    <v-row>
      <v-col col="5">
        <v-text-field v-model="inputBook.isbn" type="text" label="ISBN" @change="getBookDetail" />
        <p>bookName:{{ inputBook.bookName }}</p>
        <p>publisher: {{ inputBook.publisher }}</p>
      </v-col>
      <v-col col="2">
        <v-text-field v-model="inputBook.qty" label="Quantity" />
      </v-col>
    </v-row>
    <v-btn :disabled="!titleValid || !qtyValid" @click="register">register</v-btn>
  </v-container>

  <v-container>
    <h3>All books</h3>
    <div v-for="book in allBooks" :key="book.isbn">
      <p>isbn:{{ book.isbn }}</p>
      <p>bookName:{{ book.book_name }}</p>
      <p>qty:{{ book.qty }}</p>
      <br />
    </div>
  </v-container>
</template>
