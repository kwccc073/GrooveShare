<template>
  <!-- 導覽列------------------------------------------------ -->
  <v-app-bar elevation="0" color="black" height="100">
    <!-- 改成align-end後，註冊/登入按鈕沒辦法靠下面 -->
    <div class="d-flex align-end" id="bar-container">
      <!-- LOGO及網頁標題 -->
      <router-link to="/">
        <v-app-bar-title>
          <img src="@/assets/logo/LOGO-wr.png" alt="logo" id="logoImg">
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
    </div>
  </v-app-bar>
  <!-- 手機版側邊欄------------------------------------------------------------------------------------------ -->
  <!-- 參考：https://vuetifyjs.com/en/components/navigation-drawers/#caveats -->
  <!-- 改成靠右****待編輯**** -->
  <v-navigation-drawer v-if="mobile" v-model="drawer" color="navigation-drawer-color">
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
    <v-divider></v-divider>
    <!-- 會員專區
         要登入才會顯示 -->
    <template v-if="user.isLogin">
      <h2>會員專區</h2>
      <!-- 按鈕們 -->
      <template v-for="item in memberItems" :key="item.to">
        <!-- <v-list-item :to="item.to"> -->
          <!-- <v-list-item-icon> -->
            <!-- <v-icon>{{ item.prependIcon }}</v-icon> -->
          <!-- </v-list-item-icon> -->
          <!-- <v-list-item-content> -->
            <!-- <span>{{ item.title }}</span> -->
          <!-- </v-list-item-content> -->
        <!-- </v-list-item> -->

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
    <v-list-item v-if="user.isLogin" @click="logout" title="登出" id="v-list-item-logout"></v-list-item>
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
.v-app-bar{
  #bar-container{
    /* background: blue; */
    width: 80vw;
    margin: auto;
  }
  #logoImg{
    width: auto;
    height: 70px;
  }
}

/* 手機版側邊欄----------------------------------------------------- */
.v-navigation-drawer{
  #userAccount{
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 1rem;
  }

  /* 會員專區 */
  h2{
    margin-top: 1rem;
    padding-left: 1rem;
    text-decoration: underline;
  }
  .v-list-item{
    padding: 1rem;
    /* background: rebeccapurple; */
    /* display: flex; */
    /* flex-direction: row; */
    /* justify-content: center; */
    /* text-align: center; */
  }
  #v-list-item-logout{
    background: rgb(51, 50, 50);
    text-align: center;
    font-weight: bold;
    margin-top: 1rem;
  }
}

/* 整體版面 */
.v-main{
  width: 80vw;
  /* background: cadetblue; */
  margin: auto;

  .v-container {
    width: 100%;
    /* background: chocolate; */
    margin: auto;
  }
}

</style>
