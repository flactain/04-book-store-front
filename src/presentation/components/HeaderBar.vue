<template>
  <v-app-bar color="teal" :elevation="2">
    <template #prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Book-store system</v-app-bar-title>
    <v-spacer></v-spacer>
  </v-app-bar>

  <!-- nav barの項目こちら -->
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list-item title="Book Store System" subtitle="Operation room"></v-list-item>
    <v-divider></v-divider>
    <v-list v-if="authStore.userId">
      <v-list-item title="Home" :to="{ name: 'home' }"></v-list-item>
      <v-list-item
        title="rent"
        :to="{ name: 'rent', params: { rentOrReturn: 'rent' } }"
      ></v-list-item>
      <v-list-item
        title="return"
        :to="{ name: 'rent', params: { rentOrReturn: 'return' } }"
      ></v-list-item>
      <v-list-item title="View Rentals" :to="{ name: 'rentals' }"></v-list-item>
      <v-list-item title="Edit BookList" :to="{ name: 'books' }"></v-list-item>
      <v-list-item
        title="Logout"
        :to="{ name: 'top' }"
        @click="authStore.userId = ''"
      ></v-list-item>
    </v-list>
    <v-list v-if="!authStore.userId">
      <v-list-item title="Top" :to="{ name: 'top' }"></v-list-item>
      <v-list-item title="Login" :to="{ name: 'login' }"></v-list-item>
      <v-list-item title="Register" :to="{ name: 'userRegister' }"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useAuthStore } from '@/repository/store/auth'
import { ref } from 'vue'

const authStore = useAuthStore()
const drawer = ref(false)
</script>
