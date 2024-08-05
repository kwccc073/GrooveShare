<template>
  <div class="container">
    <breadcrumbs></breadcrumbs>
  </div>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
// 引入自定義元件
import breadcrumbs from '@/components/breadcrumbs'

definePage({
  meta: {
    title: '我的鼓譜',
    login: true
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
