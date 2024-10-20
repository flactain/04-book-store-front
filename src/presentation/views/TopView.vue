<script setup>
import { useAuthStore } from '@/repository/store/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeaderText from '../components/HeaderText.vue'

const authStore = useAuthStore()
const router = useRouter()

/**
 * Routing
 */
function toLogin() {
  router.push({ name: 'login' })
}

onMounted(() => {})
</script>

<template>
  <v-container>
    <HeaderText>Top</HeaderText>
    <v-row>
      <v-col cols="12">
        <v-btn location="center" :to="{ name: 'login' }">ログイン</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn location="center" :to="{ name: 'userRegister' }">新規登録</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
