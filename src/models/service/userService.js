import { useBookStoreApi } from '@/repository/api/bookStoreApi'
import { ref } from 'vue'

export function useUserService() {
  const bookStoreApi = useBookStoreApi()
  async function getCameraStream() {
    const stream = ref(null)
    try {
      stream.value = await await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.value) {
        videoRef.value.srcObject = stream.value
      }
    } catch (error) {
      console.error('カメラの起動に失敗しました:', error)
    }
  }
}
