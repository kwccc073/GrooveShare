<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <breadcrumbs></breadcrumbs>
      </v-col>
      <v-col cols="12">
        <!-- hide-default-header => 隱藏標題列 -->
        <!-- height="" => 設定表格的高度，使表格具有固定高度和滾動條 -->
        <!-- fixed-header => 固定表格的標題行，當表格滾動時標題行保持固定 -->
        <v-data-table-server
          fixed-header
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
            <!-- 操作按鈕 ****我的收藏page也會有這幾個按鈕****---------- -->
            <template #[`item.action`]="{ item }">
              <!-- elevation="0"是去除v-btn預設的陰影 -->
              <!-- @click="openDialog(item)" 此屬性待加上去********************* -->
              <!-- 當下的使用者不是建立者時，才會顯示收藏的按鈕 -->
              <template v-if="nowAccount !== item.editor">
                <!-- 已收藏和未收藏用v-if決定顯示哪個****待編輯**** -->
                <!-- 實心愛心 => 已收藏，按下去會取消收藏 -->
                <v-btn elevation="0" prepend-icon=" mdi-cards-heart" @click="saveSong(item._id)" v-if="nowSaving.includes(item._id)"></v-btn>
                <!-- 未收藏 -->
                <!-- 白色變黑色會馬上變，但黑色不會變回白色***待編輯*** -->
                <v-btn elevation="0" prepend-icon=" mdi-cards-heart-outline" @click="saveSong(item._id)" :loading="loadingSave" v-else></v-btn>
              </template>
              <!-- 觀看鼓譜 -->
              <v-btn elevation="0" prepend-icon=" mdi-file-eye-outline" :to="'/songs/' + item._id"></v-btn>
              <!-- 下載 -->
              <!-- <v-btn elevation="0" prepend-icon=" mdi-cloud-download-outline"></v-btn> -->
            </template>
          </v-data-table-server>
        </v-col>
    </v-row>
  </v-container>
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
// 引入store，可取得當下的使用者
import { useUserStore } from '@/stores/user'

definePage({
  meta: {
    title: '尋找鼓譜',
    login: false
  }
})

const createSnackbar = useSnackbar() // 彈出對話框
const { apiAuth } = useApi() // 取出apiAuth（要做請求都要做這個）

const user = useUserStore() // 引入 store
// 取得當下的使用者
const nowAccount = user.account
const nowSaving = ref(user.saving)

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
    const { data } = await apiAuth.get('/song/all', {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || 'createdAt',
        sortOrder: tableSortBy.value[0]?.order || 'desc',
        search: tableSearch.value
      }
    })
    // 從0開始刪除, 所有東西, 把回來的資料放進去
    tableItems.value.splice(0, tableItems.value.length, ...data.result.data)
    // 陣列的長度
    tableItemsLength.value = data.result.total
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
  nowSaving.value = user.saving
  loadingSave.value = false // 跑完的時候loading為false
}
</script>

<style scoped lang="scss">
// 樣式待編輯
.v-container{
}

</style>
