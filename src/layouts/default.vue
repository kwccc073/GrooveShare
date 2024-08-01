<template>
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
      <!-- 使用漢堡按鈕 -->
      <template v-if="mobile">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </template>

      <!-- 電腦版按鈕 -->
      <!-- 靠右待編輯************************ -->
      <template v-else>
        <template v-for="item in navItems" :key="item.to">
          <v-btn
            :prepend-icon="item.prependIcon"
            :to="item.to">
            {{item.title}}
          </v-btn>
        </template>
        <!-- 會員專區下拉選單
             要登入才會顯示 -->
        <hoverMenu v-if="user.isLogin"></hoverMenu>
        <!-- 註冊/登入按鈕
             沒登入才會顯示-->
        <logIn v-if="!user.isLogin"></logIn>
        <!-- 登出按鈕
             有登入才會顯示 -->
        <v-btn prepend-icon="mdi-account-arrow-right" v-if="user.isLogin" @click="logout">登出</v-btn>
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

    <!-- 會員專區
         要登入才會顯示 -->
    <template v-if="user.isLogin">
      <p>會員專區</p>
      <!-- 按鈕們 -->
      <template v-for="item in memberItems" :key="item.to">
        <v-list-item
          :prepend-icon="item.prependIcon"
          :to="item.to"
          :title="item.title"
          >
        </v-list-item>
      </template>
    </template>
    <!-- 註冊/登入按鈕
         沒登入才會顯示-->
    <logIn v-if="!user.isLogin"></logIn>
    <!-- 登出按鈕
         有登入才會顯示 -->
    <v-list-item v-if="user.isLogin" @click="logout" title="登出"></v-list-item>
  </v-navigation-drawer>
  <!-- 主要內容 -->
  <v-main>
    <router-view />
  </v-main>
</template>

<script setup>
import { ref, computed } from 'vue'
// 引入斷點
import { useDisplay } from 'vuetify'
// 引入store
import { useUserStore } from '@/stores/user'
// 引入自定義的元件
import hoverMenu from '@/components/bar/hoverMenu'
import logIn from '@/components/bar/logIn'
// 彈出對話框
import { useSnackbar } from 'vuetify-use-dialog'

const { mobile } = useDisplay() // 手機斷點
const user = useUserStore() // 引入 store
const createSnackbar = useSnackbar() // 彈出對話框

// 用於判斷是否點擊漢堡按鈕
const drawer = ref(false)

const navItems = computed(() => {
  return [
    { title: '尋找練鼓室', to: '/searchTrainingRoom', prependIcon: 'mdi-map-search-outline' },
    { title: '尋找鼓譜', to: '/searchSong', prependIcon: 'mdi-text-search-variant' },
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

// 登出
const logout = async () => {
  await user.logout()
  createSnackbar({
    text: '登出成功',
    snackbarProps: {
      color: 'green'
    }
  })
}
</script>

<style>
</style>
