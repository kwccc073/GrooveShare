<template>
  <!-- 參考網址：https://vuetifyjs.com/en/components/menus/#location -->
    <div class="text-center">
      <v-menu
        open-on-hover
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
          >
          <img :src="nowIcon" id="icon" style="width: 15px;height: 15px;">
          {{ nowAccount }}
          </v-btn>
        </template>

        <v-btn v-for="(item, index) in memberItems" :key="index" :to="item.to">{{ item.title }}</v-btn>

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
//  引入store，可取得當下的使用者
import { useUserStore } from '@/stores/user'

// 取得當下的使用者
const user = useUserStore()
const nowAccount = user.account
const nowIcon = user.icon

const memberItems = ref([
  { title: '寫譜專區', to: '/writtingArea', prependIcon: 'mdi-pencil-box' },
  { title: '我的鼓譜', to: '/myScore', prependIcon: 'mdi-file-document-outline' },
  { title: '我的收藏', to: '/mySaving', prependIcon: 'mdi-content-save-all-outline' },
  // { title: '我的關注', to: '/follow', prependIcon: 'mdi-account-heart' },
  { title: '會員資料', to: '/profile', prependIcon: 'mdi-account' }
])
</script>
