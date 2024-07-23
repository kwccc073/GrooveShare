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
        <!-- 漢堡按鈕 ***********待編輯**************-->
        <!-- 路由連結都待編輯************************ -->
        <!-- <v-app-bar-nav-icon>
        </v-app-bar-nav-icon> -->
        <v-btn prepend-icon="mdi-map-search-outline" to="/searchTrainingRoom">尋找練鼓室</v-btn>
        <v-btn prepend-icon="mdi-text-search-variant" to="/searchScore">尋找鼓譜</v-btn>

        <!-- 會員專區下拉選單 -->
        <hoverMenu></hoverMenu>
        <!-- 註冊/登入 -->
        <logIn></logIn>
      </v-container>
    </v-app-bar>
    <!--  -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import hoverMenu from '@/components/bar/hoverMenu'
import logIn from '@/components/bar/logIn'

</script>

<style>
</style>
