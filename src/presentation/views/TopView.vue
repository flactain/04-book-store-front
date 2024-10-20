<script setup>
import HeaderText from '../components/HeaderText.vue'
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
