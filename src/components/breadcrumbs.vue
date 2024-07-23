<template>
  <p>現在位置：{{ title }}</p>
</template>

<script setup>
// 解構
import { computed } from 'vue'
// 取得現在路由
import { useRoute } from 'vue-router'

// 取得現在的路由
const route = useRoute()

// 從現在的路由中讀取meta.title
const title = computed(() => route.meta.title)
</script>
