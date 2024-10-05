<script setup>
import HomeLogoutItem from '@/components/HomeLogoutItem.vue'
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

//axios.defaults.baseURL = 'https://www.googleapis.com/books/v1/'
const router = useRouter()

const isbn = ref('')
const qty = ref(0)
const bookDetail = ref({
  title: '',
  publishesr: ''
})
const allBooks = ref([])

async function getBookDetail() {
  await axios
    .get(
      'https://u6q1vqf2mj.execute-api.ap-northeast-1.amazonaws.com/prd/googleapi/books/volumes?q=isbn:',
      {
        params: { q: 'isbn:' + isbn.value }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
    .then((response) => {
      if (parseInt(response.data.totalItems) > 0) {
        bookDetail.value.title = response.data.items[0].volumeInfo.title
        bookDetail.value.publisher = response.data.items[0].volumeInfo.publisher
      } else {
        bookDetail.value.title = 'こちらの書籍は登録ありません'
        bookDetail.value.publisher = 'こちらの書籍は登録ありません'
      }
    })
    .catch((error) => console.log(error))
}

//TODO: post apiを叩く。 redirectで現在のページへ
function register() {
  // books.value.push({
  //   isbn: isbn.value,
  //   bookName: bookDetail.value.title,
  //   qty: qty.value
  // })
}

async function getAllBooks() {
  await axios
    .get('https://u6q1vqf2mj.execute-api.ap-northeast-1.amazonaws.com/prd/lib/books', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((response) => {
      allBooks.value = response.data
      console.log(allBooks.value)
    })
    .catch((error) => console.log(error))
}
/**
 * lyfecycle hooks
 */
onMounted(() => {
  getAllBooks()
})
</script>

<template>
  <HomeLogoutItem />
  <h3>Register</h3>
  <span>isbn</span>
  <input v-model="isbn" type="text" @change="getBookDetail" />
  <span>qty</span>
  <input v-model="qty" type="text" />
  <v-btn @click="register">register</v-btn>
  <p>title:{{ bookDetail.title }}</p>
  <p>publisher: {{ bookDetail.publisher }}</p>

  <h3>All books</h3>
  <div v-for="book in allBooks" :key="book.isbn">
    <p>isbn:{{ book.isbn }}</p>
    <p>bookName:{{ book.book_name }}</p>
    <p>qty:{{ book.qty }}</p>
    <br />
  </div>
</template>
