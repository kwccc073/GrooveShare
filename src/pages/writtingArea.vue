<template>
  <div class="container">
    <breadcrumbs></breadcrumbs>
    <!-- 歌曲基本資料填寫 -->
    <songFormation></songFormation>

    <!-- 開始按鈕 -->
    <v-btn>開始寫譜</v-btn>

    <!-- 寫譜器 -->
     <editor></editor>
  </div>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
// 引入自定義元件
import breadcrumbs from '@/components/breadcrumbs'
import songFormation from '@/components/songFormation'
import editor from '@/components/editor.vue'

definePage({
  meta: {
    title: '寫譜專區'
    // login: true
  }
})
</script>

<style scoped lang="scss">
.container{
  width: 80vw;
  margin: auto;
  padding-top: 1rem;
}
</style>
