<!-- 熱門排行榜******待編輯******* -->
<template>
  <v-container>
    <!-- 網頁介紹------------------------------------------------------- -->
    <div id="introduceArea">主視覺</div>

    <!-- 最新上架-------------------------------------------------------- -->
    <div id="newArea">
      <h1>最新上架</h1>
      <v-row>
       <v-col cols="12" v-for="song in newSongs" :key="song._id">
        <SongCard v-bind="song" class="SongCard"></SongCard>
       </v-col>
      </v-row>
    </div>

    <!-- 熱門排行榜------------------------------------------------------- -->
    <div id="popularArea">
      <h1>熱門排行</h1>
      <v-row>
       <v-col cols="12" v-for="song in popularSongs" :key="song._id" class="sc2">
        <SongCard v-bind="song" class="SongCard"></SongCard>
       </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { definePage } from 'vue-router/auto'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
// 引入自定義套件
import SongCard from '@/components/SongCard.vue'
// 引入GSAP
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

definePage({
  meta: {
    title: '首頁',
    login: false
  }
})

const { api } = useApi()
const createSnackbar = useSnackbar()
// 註冊ScrollTrigger （滾動效果）
gsap.registerPlugin(ScrollTrigger)

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
    console.log(newSongs.value)
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

// 載入最多收藏的歌曲-------------------------------------------------
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

// 動畫效果------------------------------------------------------------------------------------------------------
onMounted(async () => {
  // nextTick() => 確保DOM完全渲染
  await nextTick()
  console.log('DOM已完全渲染')
  // setTimeout() => 稍微延遲執行動畫以確保所有子元件也完全渲染
  setTimeout(() => {
    gsap.to('.sc', { x: 2000, duration: 3 })

    // 最新上架------------------------------------------------------------------
    gsap.from('#newArea, #newArea .SongCard', {
      scrollTrigger: {
        trigger: '#newArea', // 觸發者
        markers: true, // 紅綠線標記
        // 第一個值為Trigger綠色線的位置，第二個值為視窗(scroll)綠色線的位置
        // 觸發條件：當兩條綠色線重疊時，觸發動畫
        // 觸發點****待編輯****
        start: 'top center', // 綠色線
        end: 'top center' // 紅色線
      },
      x: -2000,
      duration: 2,
      ease: 'ease-in',
      stagger: 0.4// 每個SongCard間隔0.2秒依次執行
    })

    gsap.from('#popularArea, #popularArea .SongCard', {
      scrollTrigger: {
        trigger: '#popularArea', // 觸發者
        markers: true, // 紅綠線標記
        // 第一個值為Trigger綠色線的位置，第二個值為視窗(scroll)綠色線的位置
        // 觸發條件：當兩條綠色線重疊時，觸發動畫
        // 觸發點****待編輯****
        start: 'top center', // 綠色線
        end: 'top center' // 紅色線
      },
      x: 2000,
      duration: 2,
      ease: 'ease-in',
      stagger: 0.4// 每個SongCard間隔0.2秒依次執行
    })
  }, 100)
})
</script>

<style scoped lang="scss">
.v-container{

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
