<template>
  <v-container>
    <!-- 網頁介紹------------------------------------------------------- -->
    <div id="introduceArea">主視覺</div>

    <!-- 最新上架-------------------------------------------------------- -->
    <div id="newArea">
      <h1>最新上架</h1>
      <v-row>
       <v-col cols="12" md="4" v-for="song in songs" :key="song._id">
        <SongCard v-bind="song"></SongCard>
       </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <!-- 換頁的箭頭：https://vuetifyjs.com/en/components/paginations/-->
          <v-pagination v-model="page" :length="pages" rounded="circle" @update:model-value="loadSongs"></v-pagination>
        </v-col>
      </v-row>
    </div>

    <!-- 熱門排行榜-------------------------------------------------------- -->
    <div id="rankingArea">
      <h1>熱門排行榜</h1>
      <v-row>
        <v-col cols="12" md="4">
          <v-card id="popularSong" class="popularArea">
            <v-card-title>熱門歌曲</v-card-title>
            <v-card-text>待編輯</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card id="popularSinger" class="popularArea">
            <v-card-title>熱門歌手/樂團</v-card-title>
            <v-card-text>待編輯</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card id="popularGenres" class="popularArea">
            <v-card-title>熱門曲風</v-card-title>
            <v-card-text>待編輯</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { definePage } from 'vue-router/auto'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
// 引入自定義套件
import SongCard from '@/components/SongCard.vue'

definePage({
  meta: {
    title: '首頁',
    login: false
  }
})

const { api } = useApi()
const createSnackbar = useSnackbar()

// 取最新上架的歌曲用------------------------------------------------------------------
const page = ref(1) // 現在第幾頁
const pages = ref(1) // 總共幾頁
const ITEMS_PER_PAGE = 3 // 一頁3個
const songs = ref([]) // 商品

// 載入最新上架的歌曲
// 目前是取全部歌曲，再由上架時間 (新->舊)排列
// 改成只取最新的幾首歌曲就好*****待編輯*******
const loadSongs = async () => {
  try {
    const { data } = await api.get('/song/all', {
      // 傳參數讓後端知道一頁有幾個*****待編輯*******
      params: {
        // 沒有做排序就會預設照時間排
        itemsPerPage: ITEMS_PER_PAGE,
        page: page.value
      }
    })
    pages.value = Math.ceil(data.result.total / ITEMS_PER_PAGE) // 總共幾頁
    // 把songs陣列裡的內容換掉：從第0個開始清除, songs陣列長度個,
    songs.value.splice(0, songs.value.length, ...data.result.data)
    console.log(songs.value)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
}

loadSongs()

</script>

<style scoped lang="scss">
.container{
  width: 80vw;
  margin: auto;
}

// 網頁介紹-------------------------------------------------------------
#introduceArea{
  width: 100%;
  height: 50vh;
  margin: auto;
  border: 1px solid black;
  margin-bottom: 3rem;
}
// 最新上架-------------------------------------------------------------
#newArea{
  width: 100%;
  text-align: center;
  margin-bottom: 3rem;

  // .v-card{
  //   border: 1px solid black;
  // }
}
// 熱門排行榜------------------------------------------------------------
#rankingArea{
  width: 100%;
  text-align: center;
  margin-bottom: 3rem;
}
</style>
