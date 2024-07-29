<template>
  <v-app>
    <!-- 導覽列------------------------------------------------ -->
    <v-app-bar>
      <v-container class="d-flex align-center">
        <!-- LOGO及網頁標題 -->
        <router-link to="/">
          <v-app-bar-title>
            <img src="" alt="logo">
            Title
          </v-app-bar-title>
        </router-link>
        <!-- 靠右待編輯************************ -->
        <!-- 當為手機尺寸時，使用漢堡按鈕 -->
        <template v-if="mobile">
          <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        </template>

        <!-- 靠右待編輯************************ -->
        <template v-else>
          <template v-for="item in navItems" :key="item.to">
            <v-btn
              :prepend-icon="item.prependIcon"
              :to="item.to">
              {{item.title}}
            </v-btn>
          </template>
          <!-- 會員專區下拉選單 -->
          <hoverMenu></hoverMenu>
          <!-- 註冊/登入 -->
          <logIn></logIn>
        </template>
      </v-container>
    </v-app-bar>
    <!-- 手機版 側欄------------------------------------------------------------------------------------------ -->
    <!-- 參考：https://vuetifyjs.com/en/components/navigation-drawers/#caveats -->
    <!-- 改成靠右****待編輯**** -->
    <v-navigation-drawer v-if="mobile" v-model="drawer">
      <!-- 非會員專區 -->
      <template v-for="item in navItems" :key="item.to">
        <v-list-item
          :prepend-icon="item.prependIcon"
          :to="item.to"
          :title="item.title"
          >
        </v-list-item>
      </template>
      <!-- 會員專區 -->
      <p>會員專區</p>
      <template v-for="item in memberItems" :key="item.to">
        <v-list-item
          :prepend-icon="item.prependIcon"
          :to="item.to"
          :title="item.title"
          >
        </v-list-item>
      </template>
      <!-- 註冊/登入 -->
      <logIn></logIn>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'

// 引入斷點
import { useDisplay } from 'vuetify'
import hoverMenu from '@/components/bar/hoverMenu'
import logIn from '@/components/bar/logIn'

// 手機斷點
const { mobile } = useDisplay()
// 判斷是否點擊漢堡按鈕
const drawer = ref(false)

const navItems = computed(() => {
  return [
    { title: '尋找練鼓室', to: '/searchTrainingRoom', prependIcon: 'mdi-map-search-outline' },
    { title: '尋找鼓譜', to: '/searchScore', prependIcon: 'mdi-text-search-variant' },
  ]
})

// 會員專區
const memberItems = computed(() => {
  return [
    { title: '寫譜專區', to: '/writtingArea', prependIcon: 'mdi-pencil-box' },
    { title: '我的鼓譜', to: '/myScore', prependIcon: 'mdi-file-document-outline' },
    { title: '我的收藏', to: '/save', prependIcon: 'mdi-content-save-all-outline' },
    { title: '我的關注', to: '/follow', prependIcon: 'mdi-account-heart' },
    { title: '會員資料', to: '/profile', prependIcon: 'mdi-account' }
  ]
})
</script>

<style>
</style>
