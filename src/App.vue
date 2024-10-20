<script setup>
// eslint-disable-next-line no-unused-vars
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import HeaderBar from './presentation/components/HeaderBar.vue'
</script>

<template>
  <v-app>
    <HeaderBar />
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer color="teal" app="true" height="auto">
      <v-row justify="center" no-gutters>
        <v-col class="text-center mt-4" cols="12"> 04_AWS moriyamato </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
