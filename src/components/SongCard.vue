<!-- addCart改為saveSong*************** -->
<template>
  <v-card>
    <v-card-title>
      <router-link :to="'/songs/' + _id" class="router-link">{{ singer }} - {{ songTitle }}</router-link>
    </v-card-title>
    <v-card-subtitle>{{ songStyle }} / {{ BPM }}</v-card-subtitle>
    <v-card-actions>
      <!-- v-spacer會自動把東西推到右邊 -->
      <v-spacer></v-spacer>
      <!-- 當下的使用者不是建立者時，才會顯示收藏的按鈕 -->
      <!-- 如果已經收藏，按鈕文字要改成"取消收藏****待編輯**** -->

      <v-btn color="primary" prepend-icon="mdi-cards-heart-outline" @click="saveSong" :loading="loading" v-if="nowAccount !== editor">收藏歌曲</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useUserStore } from '@/stores/user' // stores
import { useRouter } from 'vue-router' // 路由
import { useSnackbar } from 'vuetify-use-dialog'
import { ref } from 'vue'

const user = useUserStore()
// 取得當下的使用者
const nowAccount = user.account

const router = useRouter()
const createSnackbar = useSnackbar()

// props表示元件可以接收的資料，defineProps()是script setup的固定寫法（不須import）
// 可以一個個定義每個東西的型態、預設值等
const props = defineProps(['_id', 'songStyle', 'songTitle', 'singer', 'BPM', 'signatureSection', 'signatureNotes', 'editor'])

const loading = ref(false) // UIUX用，使按下去時按鈕為載入狀態（避免一直點）

const saveSong = async () => {
  // 如果沒有登入
  if (!user.isLogin) {
    alert('請先登入帳號')
    return
  }
  loading.value = true // 還沒跑完的時候loading為true
  const result = await user.saveSong(props._id)
  // console.log(result)
  createSnackbar({
    text: result.text,
    snackbarProps: {
      color: result.color
    }
  })
  loading.value = false // 跑完的時候loading為false
}
</script>

<style scoped lang="scss">
.v-card{
  .v-card-title{
    text-decoration: none;

    .router-link{
      text-decoration: none;
      color: black;
      font-weight: bold;
    }
  }
}

</style>
