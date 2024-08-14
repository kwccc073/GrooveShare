<!-- 熱門排行榜******待編輯******* -->
<template>
  <v-container>
    <!-- 網頁介紹------------------------------------------------------- -->
    <div id="introduceArea">主視覺</div>

    <!-- 最新上架-------------------------------------------------------- -->
    <div id="newArea">
      <h1>最新上架</h1>
      <v-row>
       <v-col cols="12" md="2" v-for="song in newSongs" :key="song._id" class="SongCards">
        <SongCard v-bind="song"></SongCard>
       </v-col>
      </v-row>
      <!-- <v-row> -->
        <!-- <v-col cols="12"> -->
          <!-- 換頁的箭頭：https://vuetifyjs.com/en/components/paginations/-->
          <!-- <v-pagination v-model="page" :length="pages" rounded="circle" @update:model-value="loadnewSongs"></v-pagination> -->
        <!-- </v-col> -->
      <!-- </v-row> -->
    </div>

    <!-- 熱門排行榜------------------------------------------------------- -->
    <div id="popularArea">
      <h1>熱門排行</h1>
      <v-row>
       <v-col cols="12" md="2" v-for="song in popularSongs" :key="song._id" class="SongCards">
        <SongCard v-bind="song"></SongCard>
       </v-col>
      </v-row>
      <!-- <v-row> -->
        <!-- <v-col cols="12"> -->
          <!-- 換頁的箭頭：https://vuetifyjs.com/en/components/paginations/-->
          <!-- <v-pagination v-model="page" :length="pages" rounded="circle" @update:model-value="loadnewSongs"></v-pagination> -->
        <!-- </v-col> -->
      <!-- </v-row> -->
    </div>

    <!-- 熱門排行榜-------------------------------------------------------- -->
    <!-- <div id="rankingArea"> -->
      <!-- <h1>熱門排行榜</h1> -->
      <!-- <v-row> -->
        <!-- <v-col cols="12" md="4"> -->
          <!-- <v-card id="popularSong" class="popularArea"> -->
            <!-- <v-card-title>熱門歌曲</v-card-title> -->
            <!-- <v-card-text>待編輯</v-card-text> -->
          <!-- </v-card> -->
        <!-- </v-col> -->
        <!-- <v-col cols="12" md="4"> -->
          <!-- <v-card id="popularSinger" class="popularArea"> -->
            <!-- <v-card-title>熱門歌手/樂團</v-card-title> -->
            <!-- <v-card-text>待編輯</v-card-text> -->
          <!-- </v-card> -->
        <!-- </v-col> -->
        <!-- <v-col cols="12" md="4"> -->
          <!-- <v-card id="popularGenres" class="popularArea"> -->
            <!-- <v-card-title>熱門曲風</v-card-title> -->
            <!-- <v-card-text>待編輯</v-card-text> -->
          <!-- </v-card> -->
        <!-- </v-col> -->
      <!-- </v-row> -->
    <!-- </div> -->
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
// 刪除不需要的參數***待編輯***
const page = ref(1) // 現在第幾頁
const pages = ref(1) // 總共幾頁
const ITEMS_PER_PAGE = 3 // 一頁3個

// 載入最新上架的歌曲-------------------------------------------------
// 由上架時間 (新->舊)排列
// 已改成只取最新的5首歌曲*****待編輯*******
const newSongs = ref([]) // 新上架歌曲
const loadNewSongs = async () => {
  try {
    const { data } = await api.get('/song/new', {
      // 傳參數讓後端知道一頁有幾個*****待編輯*******
      params: {
        // 沒有做排序就會預設照時間排
        itemsPerPage: ITEMS_PER_PAGE,
        page: page.value
      }
    })
    pages.value = Math.ceil(data.result.total / ITEMS_PER_PAGE) // 總共幾頁
    // 把newSongs陣列裡的內容換掉：從第0個開始清除, newSongs陣列長度個,
    newSongs.value.splice(0, newSongs.value.length, ...data.result.data)
    // console.log(newSongs.value)
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

loadNewSongs()

// 載入最新上架的歌曲-------------------------------------------------
// 目前是取全部歌曲，再由上架時間 (新->舊)排列
// 已改成只取最新的5首歌曲*****待編輯*******
const popularSongs = ref([]) // 熱門歌曲
const loadPopularSongs = async () => {
  try {
    const { data } = await api.get('/song/popular', {
      // 傳參數讓後端知道一頁有幾個*****待編輯*******
      params: {
        // 沒有做排序就會預設照時間排
        itemsPerPage: ITEMS_PER_PAGE,
        page: page.value
      }
    })
    pages.value = Math.ceil(data.result.total / ITEMS_PER_PAGE) // 總共幾頁
    // 把popularSongs陣列裡的內容換掉：從第0個開始清除, popularSongs陣列長度個,
    popularSongs.value.splice(0, popularSongs.value.length, ...data.result.data)
    // console.log(popularSongs.value)
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

loadPopularSongs()
</script>

<style scoped lang="scss">
.v-container{
  width: 80vw;
  margin: auto;

  #newArea,
  #popularArea {
    width: 100%;
    text-align: center;
    margin-bottom: 3rem;
    .v-row{
      justify-content: center;
      align-items: center;
    }
  }
}

// 網頁介紹-------------------------------------------------------------
#introduceArea{
  width: 100%;
  height: 50vh;
  margin: auto;
  border: 1px solid black;
  margin-bottom: 3rem;
}
</style>
