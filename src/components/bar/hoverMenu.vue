<template>
  <!-- 參考網址：https://vuetifyjs.com/en/components/menus/#location -->
    <div class="text-center">
      <v-menu
        open-on-hover
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            prepend-icon="mdi-account"
          >
          會員專區
          </v-btn>
        </template>

        <v-btn v-for="(item, index) in items" :key="index" :to="item.to">{{ item.title }}</v-btn>

        <!-- <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list> -->
      </v-menu>
    </div>

  </template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { title: '寫譜專區', to: '/writtingArea', prependIcon: 'mdi-pencil-box' },
  { title: '我的鼓譜', to: '/myScore', prependIcon: 'mdi-file-document-outline' },
  { title: '我的收藏', to: '/save', prependIcon: 'mdi-content-save-all-outline' },
  { title: '我的關注', to: '/follow', prependIcon: 'mdi-account-heart' },
  { title: '會員資料', to: '/profile', prependIcon: 'mdi-account' }
])
</script>
