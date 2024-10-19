import axios from 'axios'
export function useBookStoreApi() {
  const BookStoreApi = axios.create({
    baseURL: 'https://u6q1vqf2mj.execute-api.ap-northeast-1.amazonaws.com/prd',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
  async function fetchAllBooks() {
    return BookStoreApi.get('/lib/books')
  }
  return {
    BookStoreApi,
    fetchAllBooks
  }
}
