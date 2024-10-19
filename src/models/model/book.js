import { reactive, ref } from 'vue'
export function createBook() {
  const isbn = ref('')
  const bookName = ref('')
  const publisher = ref('')
  const qty = ref(0)
  function changeBookName(value) {
    bookName.value = value
  }
  function clone() {
    return reactive({
      isbn,
      bookName,
      publisher,
      qty,
      changeBookName,
      clone
    })
  }
  return reactive({
    isbn,
    bookName,
    publisher,
    qty,
    changeBookName,
    clone
  })
}
