<template>
  <v-app-bar color="teal" :elevation="2">
    <template #prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Book-store system</v-app-bar-title>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list-item title="Book Store System" subtitle="Operation room"></v-list-item>
    <v-divider></v-divider>
    <v-list :items="items"></v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
</script>
