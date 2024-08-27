<template>
  <div>
    <img src="@/assets/breadcrumbs.png">
    <span>現在位置：{{ pageTitle }}</span>
  </div>
</template>

<script setup>
// 解構
import { computed } from 'vue'
// 取得現在路由
import { useRoute } from 'vue-router'

// 取得現在的路由
const route = useRoute()

// 從現在的路由中讀取meta.title
const pageTitle = computed(() => {
  const fullTitle = route.meta.title || ''
  // 使用正則表達式去除 GrooveShare |
  return fullTitle.replace(/^GrooveShare \| /, '')
})
</script>

<style scoped lang="scss">
div{
  // background: red;
  width: auto;
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  // 小於xs尺寸的樣式
  @media (max-width: 600px) {
    height: 35px;
    font-size: 1rem;
  }
  img{
    height: 100%;
    width: auto;
  }
}
</style>
