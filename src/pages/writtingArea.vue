<template>
  <div class="container">
    <breadcrumbs></breadcrumbs>
    <!-- 歌曲基本資料填寫 -->
    <!-- <songFormation></songFormation> -->

    <!-- 寫譜器 -->
    <!-- <editor></editor> -->
    <testEditor></testEditor>
  </div>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
// 取得當前使用者資料
import { useUserStore } from '@/stores/user'
// 引入自定義元件
import breadcrumbs from '@/components/breadcrumbs'
// import songFormation from '@/components/songFormation'
// import editor from '@/components/editor.vue'
import testEditor from '@/components/testEditor.vue'

definePage({
  meta: {
    title: '寫譜專區',
    login: true
  }
})

// 取得當前使用者資料
const user = useUserStore()
const account = user.account
console.log(account)
</script>

<style scoped lang="scss">
.container{
  width: 80vw;
  margin: auto;
  padding-top: 1rem;
}
</style>
