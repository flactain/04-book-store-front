<script setup>
import HomeLogoutItem from '@/presentation/components/HomeLogoutItem.vue'
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// axios.defaults.baseURL = 'https://u6q1vqf2mj.execute-api.ap-northeast-1.amazonaws.com/prd/'
const router = useRouter()

const isbn = ref('')
const qty = ref(0)
const allBooks = ref([])
const bookDetail = ref({
  title: '',
  publishesr: ''
})
//form validation
const titleValid = computed(() => {
  console.log('computed kick')
  return bookDetail.value.title == 'こちらの書籍は登録ありません' || !!bookDetail.value.title
})
const qtyValid = computed(() => {
  return qty.value > 0
})

/**
 * API Kick
 */
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
//TODO: error handling
function register() {
  axios
    .post(
      '/lib/books',
      {
        qty: qty,
        book_name: bookDetail.value.title,
        isbn: isbn
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

  <v-container>
    <h3>Register</h3>
    <v-row>
      <v-col col="5">
        <v-text-field v-model="isbn" type="text" label="ISBN" @change="getBookDetail" />
        <p>title:{{ bookDetail.title }}</p>
        <p>publisher: {{ bookDetail.publisher }}</p>
      </v-col>
      <v-col col="2">
        <v-text-field v-model="qty" label="Quantity" />
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
