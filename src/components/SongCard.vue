<!-- addCart改為saveSong*************** -->
<template>
  <!-- v-card內建屬性：
      elevation="0" => 去除陰影
  -->
  <v-card elevation="0">
    <v-card-title>
      <router-link :to="'/songs/' + _id" class="router-link">
        <h4>
          {{ singer }} - {{ songTitle }}
      </h4>
        </router-link>
    </v-card-title>
    <v-card-subtitle>
      <span class="StyleAndBPM">{{ songStyle }} / {{ BPM }}</span>
      <!-- 有人按收藏時，收藏次數應該跟著變動***待編輯*** -->
      <!-- <v-spacer></v-spacer> -->
      <span class="savedTimes">收藏次數：{{ savedTimes }}</span>
    </v-card-subtitle>
    <!-- <v-card-actions> -->
      <!-- v-spacer會自動把東西推到右邊 -->
      <!-- <v-spacer></v-spacer> -->
      <!-- 當下的使用者不是建立者時，才會顯示收藏的按鈕 -->
      <!-- 如果已經收藏，按鈕文字要改成"取消收藏****待編輯**** -->
      <!-- <template v-if="nowAccount !== editor">
        <v-btn color="primary" prepend-icon="mdi-cards-heart" @click="saveSong" :loading="loading" v-if="nowSaving.includes(_id)">取消收藏</v-btn>
        <v-btn color="primary" prepend-icon="mdi-cards-heart-outline" @click="saveSong" :loading="loading" v-else>收藏歌曲</v-btn>
      </template> -->
    <!-- </v-card-actions> -->
  </v-card>
</template>

<script setup>
import { useUserStore } from '@/stores/user' // stores
import { useSnackbar } from 'vuetify-use-dialog'
import { ref } from 'vue'

const user = useUserStore()
// 取得當下的使用者
const nowAccount = user.account
const nowSaving = ref(user.saving)

const createSnackbar = useSnackbar()

// props表示元件可以接收的資料，defineProps()是script setup的固定寫法（不須import）
// 可以一個個定義每個東西的型態、預設值等
const props = defineProps(['_id', 'songStyle', 'songTitle', 'singer', 'BPM', 'signatureSection', 'signatureNotes', 'editor', 'savedTimes'])

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
  nowSaving.value = user.saving
  loading.value = false // 跑完的時候loading為false
}
</script>

<style scoped lang="scss">
.v-card{
  width: 100%;
  // height: 20%;
  // background: chartreuse;
  border-bottom: 1px dashed black;
  border-radius: 0;

  // 標題
  .v-card-title{
    text-decoration: none;
    // background: cadetblue;

    .router-link{
      text-decoration: none;
      color: black;
      font-weight: bold;
    }
  }

  .v-card-subtitle{
    // background: yellow;
    display: flex;
    justify-content: space-around;

  }

  .v-card-actions{
    background: chocolate;
  }
}

</style>
