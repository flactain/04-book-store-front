<script setup>
import axios from 'axios'
import { reactive, ref, computed, onMounted } from 'vue'
import { createBook } from '@/models/model/book'
import { useBookService } from '@/models/service/bookService'
import HeaderText from '../components/HeaderText.vue'

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
  allBooks.value = await bookService.getAllBooks()
}

/**
 * lyfecycle hooks
 */
onMounted(() => {
  getAllBooks()
})
</script>

<template>
  <v-container>
    <HeaderText>Register Book</HeaderText>
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
    <v-expansion-panels>
      <h3>All books</h3>
      <!-- <v-data-table :items="allBooks"></v-data-table> -->
      <v-expansion-panel>
        <v-expansion-panel-title>
          <template #default="{ expanded }">
            <v-row no-gutters>
              <v-col class="d-flex justify-start" cols="4"> All Books </v-col>
              <v-col class="text-grey" cols="8">
                <v-fade-transition leave-absolute>
                  <span v-if="expanded" key="0"> you cannot update these data yet</span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-data-table :items="allBooks"></v-data-table>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
