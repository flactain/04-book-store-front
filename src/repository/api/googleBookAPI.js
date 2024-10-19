import axios from 'axios'
export function useGoogleBookApi() {
  const googleAPi = axios.create({
    baseURL: 'https://u6q1vqf2mj.execute-api.ap-northeast-1.amazonaws.com/prd/googleapi/books',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
  async function fetchBookDatailByIsbn(book) {
    return googleAPi.get('/volumes', {
      params: { q: 'isbn:' + book.isbn }
    })
  }
  return {
    googleAPi,
    fetchBookDatailByIsbn
  }
}
