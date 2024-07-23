<template>
  <div class="container">
    <breadcrumbs></breadcrumbs>
    <!-- 搜尋欄位，待新增 -->
    <scoreTable></scoreTable>
  </div>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
// 引入自定義元件
import breadcrumbs from '@/components/breadcrumbs'
import scoreTable from '@/components/scoreTable'

definePage({
  meta: {
    title: '尋找鼓譜',
    login: false
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
