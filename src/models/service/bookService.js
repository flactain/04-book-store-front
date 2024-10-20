import { useBookStoreApi } from '@/repository/api/bookStoreApi'
import { useGoogleBookApi } from '@/repository/api/googleBookAPI'
export function useBookService() {
  const googleBookApi = useGoogleBookApi()
  const bookStoreApi = useBookStoreApi()

  async function getBookDetailByIsbn(book) {
    const searchedBook = book.clone()
    await googleBookApi
      .fetchBookDatailByIsbn(book)
      .then((response) => {
        if (parseInt(response.data.totalItems) > 0) {
          searchedBook.bookName = response.data.items[0].volumeInfo.title
          searchedBook.publisher = response.data.items[0].volumeInfo.publisher
        } else {
          searchedBook.bookName = 'こちらの書籍は登録ありません'
          searchedBook.publisher = 'こちらの書籍は登録ありません'
        }
      })
      .catch((error) => {
        console.log(error)
      })
    return searchedBook
  }

  async function getAllBooks() {
    var allBooks = []
    await bookStoreApi
      .fetchAllBooks()
      .then((response) => {
        allBooks = response.data
      })
      .catch((error) => {
        console.error(error)
      })
    return allBooks
  }
  return {
    getBookDetailByIsbn,
    getAllBooks
  }
}
