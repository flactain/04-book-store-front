<script setup>
import { useAuthStore } from '@/repository/store/auth'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import HeaderText from '../components/HeaderText.vue'

const authStore = useAuthStore()
const router = useRouter()

const videoRef = ref(null)
const canvasRef = ref(null)
const stream = ref(null)
const capturedImage = ref(null)
const isCapturedImage = ref(false)
const uploadStatus = ref('')
const width = 640
const height = 480

/**
 * Routing
 */
function toTop() {
  authStore.userId = ''
  router.push({ name: 'top' })
}

/**
 * functions
 */
function register() {
  uploadImage('')
  return console.log('register')
}

const startCamera = async () => {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ video: true })
    if (videoRef.value) {
      videoRef.value.srcObject = stream.value
    }
  } catch (error) {
    console.error('カメラの起動に失敗しました:', error)
  }
}

const captureImage = () => {
  if (videoRef.value) {
    const context = canvasRef.value.getContext('2d')
    context.drawImage(videoRef.value, 0, 0, width, height)
    isCapturedImage.value = true
    canvasRef.value.toBlob((blob) => {
      capturedImage.value = blob
    })
  }
}
axios.interceptors.request.use((request) => {
  console.log('Starting Request: ', request)
  return request
})
//infrastructureに移動
const uploadImage = async () => {
  if (!capturedImage.value) {
    console.error('アップロードする画像がありません。')
    return
  }

  uploadStatus.value = 'アップロード中...'

  try {
    // multipart/form-data
    const formData = new FormData()
    console.log(capturedImage.value)

    formData.append('image', capturedImage.value, authStore.userId + '.png')

    //TODO: URL書き換え
    const uploadResponse = await axios.post(
      'https://u6q1vqf2mj.execute-api.ap-northeast-1.amazonaws.com/prd/auth/register',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    if (uploadResponse.status === 200) {
      uploadStatus.value = 'アップロード成功！'
    } else {
      throw new Error('アップロードに失敗しました。')
    }
  } catch (error) {
    console.error('アップロードエラー:', error)
    uploadStatus.value = 'アップロード失敗: ' + (error.response?.data?.message || error.message)
  }
}

/**
 * life cycle hook
 */
onMounted(() => {
  startCamera()
})

onBeforeUnmount(() => {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop())
  }
})
</script>

<template>
  <v-container>
    <HeaderText>Register User</HeaderText>
    <div>
      <v-text-field v-model="authStore.userId" type="text" />
      <p>{{ authStore.userId }}</p>
    </div>
    <video
      v-show="!isCapturedImage"
      ref="videoRef"
      :width="width"
      :height="height"
      autoplay
    ></video>
    <canvas v-show="isCapturedImage" ref="canvasRef" :width="width" :height="height"></canvas>
    <div>
      <v-btn @click="isCapturedImage = false">reset</v-btn>
      <v-btn @click="captureImage">capture</v-btn>
    </div>

    <div>
      <v-btn @click="register">Register</v-btn>
    </div>
    <p>{{ uploadStatus }}</p>
  </v-container>
</template>
