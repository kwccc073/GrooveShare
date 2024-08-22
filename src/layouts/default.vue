<template>
  <!-- 導覽列------------------------------------------------ -->
  <v-app-bar>
    <v-container class="d-flex align-center">
      <!-- LOGO及網頁標題 -->
      <router-link to="/">
        <v-app-bar-title>
          <img src="@/assets/logo/LOGO-br.png" alt="logo" id="logoImg">
        </v-app-bar-title>
      </router-link>
      <v-spacer></v-spacer>
      <!-- 使用漢堡按鈕 -->
      <template v-if="mobile">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </template>

      <!-- 電腦版按鈕----------------------------------------------------------- -->
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
        <v-btn v-if="user.isLogin" @click="logout">登出</v-btn>
        <!-- 註冊/登入按鈕
             沒登入才會顯示-->
        <logIn v-if="!user.isLogin"></logIn>
        <!-- 登入的使用者、登出按鈕：有登入才會顯示 -->
        <!-- 排版****待編輯**** -->
      </template>
    </v-container>
  </v-app-bar>
  <!-- 手機版 側欄------------------------------------------------------------------------------------------ -->
  <!-- 參考：https://vuetifyjs.com/en/components/navigation-drawers/#caveats -->
  <!-- 改成靠右****待編輯**** -->
  <v-navigation-drawer v-if="mobile" v-model="drawer">
    <div v-if="user.isLogin" id="userAccount">
      <img :src="nowIcon" id="icon" style="width: 40px;height: 40px;">
      <span>{{ nowAccount }}</span>
    </div>
    <v-divider></v-divider>

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
// 引入store，可取得當下的使用者
import { useUserStore } from '@/stores/user'
// 引入自定義的元件
import hoverMenu from '@/components/bar/hoverMenu'
import logIn from '@/components/bar/logIn'
// 彈出對話框
import { useSnackbar } from 'vuetify-use-dialog'
// 跳到其他分頁用
import { useRouter } from 'vue-router'

const { mobile } = useDisplay() // 手機斷點

const user = useUserStore() // 引入 store
// 取得當下的使用者
const nowAccount = user.account
const nowIcon = user.icon

const createSnackbar = useSnackbar() // 彈出對話框
const router = useRouter() // 跳到其他分頁用

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
    { title: '我的收藏', to: '/mySaving', prependIcon: 'mdi-content-save-all-outline' },
    // { title: '我的關注', to: '/follow', prependIcon: 'mdi-account-heart' },
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
  // 回到首頁
  router.push('/')
}
</script>

<style>
/* logo尺寸待編輯 */
#logoImg{
  width: auto;
  height: 50px;
}
.v-navigation-drawer{

  #userAccount{
    display: flex;
    align-items: center;
  }
}

/* 整體版面 */
.v-main{
  width: 70vw;
  /* background: cadetblue; */
  margin: auto;

  .v-container {
    width: 100%;
    /* background: chocolate; */
    margin: auto;
  }
}
</style>
