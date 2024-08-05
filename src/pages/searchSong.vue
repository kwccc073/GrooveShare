<template>
  <v-container>
    <breadcrumbs></breadcrumbs>
    <v-data-table-server
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
      <!-- 未收藏 -->
      <v-btn elevation="0" prepend-icon=" mdi-cards-heart-outline"></v-btn>
      <!-- 已收藏 -->
      <v-btn elevation="0" prepend-icon=" mdi-cards-heart"></v-btn>
      <!-- 觀看鼓譜 -->
      <v-btn elevation="0" prepend-icon=" mdi-file-eye-outline" to="/watchScore"></v-btn>
      <!-- 下載 -->
      <v-btn elevation="0" prepend-icon=" mdi-cloud-download-outline"></v-btn>
    </template>
  </v-data-table-server>
  <!-- 以下內容*************待刪除********** -->
    <v-table class="bg-primary">
      <thead class="thead">
        <tr>
          <th>歌手/樂團</th>
          <th>歌名</th>
          <th>曲風</th>
          <th>BPM</th>
          <th>難易度</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="song in songs"
          :key="song.name"
        >
          <td>{{ song.singer }}</td>
          <td>{{ song.songTitle }}</td>
          <td>{{ song.songStyle }}</td>
          <td>{{ song.BPM }}</td>
          <td>{{ song.degreen }}</td>
          <td>
            <!-- 我的鼓譜 ***待編輯***-------------------- -->
            <!-- 已發布 -->
            <!-- v-if的路由待編輯 -->
            <div id="postingTools" class="toolBtns" v-if="route.path==='/myScore'">
              <!-- elevation="0"是去除v-btn預設的陰影 -->
              <!-- 鎖起來的 -->
              <v-btn elevation="0" prepend-icon=" mdi-lock"></v-btn>
              <!-- 沒鎖的 -->
              <v-btn elevation="0" prepend-icon=" mdi-lock-open-variant"></v-btn>
              <!-- 觀看鼓譜 -->
              <v-btn elevation="0" prepend-icon=" mdi-file-eye-outline" to="/watchScore"></v-btn>
              <!-- 刪除 -->
              <v-btn elevation="0" prepend-icon=" mdi-trash-can-outline" to="/watchScore"></v-btn>
            </div>

            <!-- 草稿匣***待編輯*** -->
            <!-- v-if的路由待編輯 -->
            <div id="editScoreTools" class="toolBtns" v-if="route.path==='/myScore'">
              <!-- elevation="0"是去除v-btn預設的陰影 -->
              <!-- 編輯鼓譜 -->
              <v-btn elevation="0" prepend-icon=" mdi-pencil" to="/editScore"></v-btn>
              <!-- 刪除鼓譜 -->
              <v-btn elevation="0" prepend-icon=" mdi-trash-can-outline"></v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { ref } from 'vue'
// 取得現在路由
import { useRoute } from 'vue-router'
// 彈出對話框
import { useSnackbar } from 'vuetify-use-dialog'
// 引入useApi（要把資料傳出去都要引入這個，用於跟API溝通）
import { useApi } from '@/composables/axios'
// 引入自定義元件
import breadcrumbs from '@/components/breadcrumbs'

definePage({
  meta: {
    title: '尋找鼓譜',
    login: false
  }
})

const route = useRoute() // 取得現在的路由
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
  { title: '操作', align: 'center', sortable: false, key: 'action' }
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
</script>

<style scoped lang="scss">
// 樣式待編輯
.v-container{
  width: 80vw;
  margin: auto;
  padding-top: 1rem;
}

</style>
