<template>
  <breadcrumbs></breadcrumbs>
  <v-data-table-server
    id="table"
    v-model:items-per-page="tableItemsPerPage"
    v-model:sort-by="tableSortBy"
    v-model:page="tablePage"
    :items="tableItems"
    :headers="tableHeaders"
    :loading="tableLoading"
    :items-length="tableItemsLength"
    :search="tableSearch"
    @update:items-per-page="tableLoadItems(false)"
    @update:sort-by="tableLoadItems(false)"
    @update:page="tableLoadItems(false)"
    hover>
    <template #top>
      <v-text-field
        label="搜尋（請輸入演唱/演奏者、歌名或曲風）"
        v-model="tableSearch"
        append-icon="mdi-magnify"
        @click-append="tableLoadItems(true)"
        @keydown.enter="tableLoadItems(true)"
      ></v-text-field>
    </template>
    <!-- 公開狀態 -->
    <!-- <template #[`item.isPublic`]="{ value }"> -->
      <!-- 公開－true -->
      <!-- <v-btn elevation="0" icon="mdi-lock-open-variant" v-if="value" @click="changeIsPublic(value)"></v-btn> -->
      <!-- 隱私－false -->
      <!-- <v-btn elevation="0" icon="mdi-lock" v-else @click="changeIsPublic(value)"></v-btn> -->
    <!-- </template> -->

    <!-- 操作按鈕 ****我的收藏page也會有這幾個按鈕****---------- -->
    <template #[`item.action`]="{ item }">
      <!-- elevation="0"是去除v-btn預設的陰影 -->
      <!-- @click="openDialog(item)" 此屬性待加上去********************* -->
      <!-- 已收藏 ***滑過去要顯示收藏OR取消收藏，待編輯***-->
      <!-- 參考：https://vuetifyjs.com/en/components/menus/#activator-and-tooltip 的 v-tooltip -->
      <v-btn elevation="0" prepend-icon=" mdi-cards-heart" @click="saveSong(item._id)" :loading="loadingSave"></v-btn>
      <!-- 觀看鼓譜 -->
      <v-btn elevation="0" prepend-icon=" mdi-file-eye-outline" :to="'/songs/' + item._id"></v-btn>
      <!-- 下載 -->
      <!-- <v-btn elevation="0" prepend-icon=" mdi-cloud-download-outline"></v-btn> -->
    </template>
  </v-data-table-server>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { ref } from 'vue'
// 取得現在路由
import { useRouter } from 'vue-router'
// 彈出對話框
import { useSnackbar } from 'vuetify-use-dialog'
// 引入useApi（要把資料傳出去都要引入這個，用於跟API溝通）
import { useApi } from '@/composables/axios'
// 引入自定義元件
import breadcrumbs from '@/components/breadcrumbs'
// store－用於取得現在的使用者
import { useUserStore } from '@/stores/user'

definePage({
  meta: {
    title: 'GrooveShare | 我的收藏',
    login: true
  }
})

// 進到網頁會先顯示原本的資料-------------------------***目前寫法抓不到頭貼，待編輯***
// router裡面有寫到：一進網頁會先取得使用者資料
const user = useUserStore()

const router = useRouter() // 取得現在的路由
const createSnackbar = useSnackbar() // 彈出對話框
const { apiAuth } = useApi() // 取出apiAuth（要做請求都要做這個）

// 一頁顯示幾個
const tableItemsPerPage = ref(10)
// 排序（先按照日期排序就好）*****待新增******
const tableSortBy = ref([
  // createdAt是建立的日期
  // order是正的或到的排，desc是倒的
  { key: 'createdAt', order: 'desc' }
])
// 頁碼，表示表格現在被翻到哪一頁
const tablePage = ref(1)
// 表格要顯示的東西
const tableItems = ref([])
// 表格欄位設定（理論上應該會固定，所以不用ref）
const tableHeaders = [
  // align: 'center'置中
  // sortable: 此欄位是否可以排序
  // key要跟資料庫的欄位對到，把相同key的值帶入這個欄位
  { title: '演唱/演奏者', align: 'center', sortable: true, key: 'singer' },
  { title: '歌名', align: 'center', sortable: true, key: 'songTitle' },
  { title: '曲風', align: 'center', sortable: true, key: 'songStyle' },
  { title: 'BPM', align: 'center', sortable: true, key: 'BPM' },
  { title: '建立者', align: 'center', sortable: false, key: 'editor' },
  // { title: '難易度', align: 'center', sortable: true, key: 'sell' },
  // { title: '公開', align: 'center', sortable: false, key: 'isPublic' },
  { title: '', align: 'center', sortable: false, key: 'action' }
]
// 預設剛點進來的時候會是載入狀態
const tableLoading = ref(true)
// 每一頁加起來總共有幾筆資料，預設為0
const tableItemsLength = ref(0)
// 現在搜尋的文字是什麼
const tableSearch = ref('')

// 操作-----------------------------------**待編輯**
const tableLoadItems = async (reset) => {
  if (reset) tablePage.value = 1
  tableLoading.value = true
  try {
    // 取得表格資料
    // 設定get參數：.get(網址,請求的設定) ***get無送出的資料***
    const { data } = await apiAuth.get('/user/saving', {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || 'createdAt',
        sortOrder: tableSortBy.value[0]?.order || 'desc',
        search: tableSearch.value,
        user: user.account
      }
    })
    // console.log(data.result)
    tableItems.value.splice(0, tableItems.value.length, ...data.result[0])
    console.log(tableItems.value.length)
    console.log(data.result[0])
    tableItemsLength.value = data.result[1]

    console.log(data.result)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
  tableLoading.value = false
}

tableLoadItems() // 第一次進來一定要呼叫

// 收藏歌曲function--------------------------------------------
const loadingSave = ref(false)
const saveSong = async (songID) => {
  // 如果沒有登入
  if (!user.isLogin) {
    alert('請先登入帳號')
    return
  }
  loadingSave.value = true // 還沒跑完的時候loading為true
  const result = await user.saveSong(songID)
  // console.log(result)
  createSnackbar({
    text: result.text,
    snackbarProps: {
      color: result.color
    }
  })
  loadingSave.value = false // 跑完的時候loading為false
  // router.go(0) // 重新加載當前的路由
  tableLoadItems()
}
</script>

<style scoped lang="scss">
#table{
  font-size: 1rem;
}

</style>
