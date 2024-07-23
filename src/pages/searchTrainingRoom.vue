<template>
  <div class="container">
    <breadcrumbs></breadcrumbs>
    <TrainingRoomTable></TrainingRoomTable>
  </div>
</template>

<script setup>
// 定義頁面
import { definePage } from 'vue-router/auto'
// 引入自定義元件
import breadcrumbs from '@/components/breadcrumbs'
import TrainingRoomTable from '@/components/TrainingRoomTable'

definePage({
  meta: {
    title: '尋找練鼓室',
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
