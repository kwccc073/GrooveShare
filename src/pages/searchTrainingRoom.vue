<template>
  <breadcrumbs></breadcrumbs>
  <!-- 練鼓室表格--------------------------------------------------------- -->
    <!-- v-data-table-server 是有翻頁、排序功能的表格，使後端只會回傳當下那個頁面的東西（比較不會跑太久） -->
    <!-- 要綁定的屬性
    items-per-page 一頁顯示幾個
    sort-by 在表格的哪個欄位，用什麼東西去排序
    page 頁碼，表示表格現在被翻到哪一頁
    headers 表格欄位設定
    items 表示表格要顯示的東西
    items-length 每一頁加起來總共有幾筆資料
    loading 載入狀態
    search 現在搜尋的文字是什麼
    @update:items-per-page 當"每一頁顯示幾筆"改變時，要執行後方function去重新取資料
    @update:sort-by 當"排序"改變時，要執行後方function去重新取資料
    @update:page 當"翻頁"時，要執行後方function去重新取資料
    -->
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
    hover
    id="table"
  >
  <!-- 特定的東西（如圖片）要修改顯示內容的方式如下---------------------- -->
    <!-- 設定其插槽名稱為top -->
    <template #top>
      <div id="btn-and-search">
      <v-btn @click="openDialog(null)" prepend-icon="mdi-plus" color="black" id="add-btn">新增練鼓室</v-btn>
      <!-- hide-details => 隱藏顯示錯誤訊息的空間 -->
      <v-text-field
        label="請搜尋城市或名稱"
        v-model="tableSearch"
        append-icon="mdi-magnify"
        @click-append="tableLoadItems(true)"
        @keydown.enter="tableLoadItems(true)"
        hide-details
      ></v-text-field>
    </div>
    </template>
    <!-- 操作---------- -->
    <!-- { item }表示原始的東西而不是值**** -->
    <template #[`item.action`]="{ item }">
      <!-- 點擊時打開編輯視窗，並帶入item(這一列的練鼓室資料) -->
      <v-btn class="edit-and-delete" icon="mdi-pencil" variant="text" @click="openDialog(item)"></v-btn>
      <v-btn class="edit-and-delete" icon=" mdi-trash-can-outline" variant="text" @click="deleteTrainingRoom(item._id)"></v-btn>
    </template>
  </v-data-table-server>
  <!-- 新增/編輯視窗---------------------------------------- -->
  <v-dialog v-model="dialog.open" width="70vw">
    <!-- :disabled="isSubmitting"表示送出中表單停用 -->
    <v-form @submit.prevent="submit" :disabled="isSubmitting">
      <v-card>
        <v-btn :loading="isSubmitting" @click="closeDialog" id="btn-close" elevation="0">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <v-card-title>
          <!-- 如果有id => 顯示'編輯練鼓室'
               如果沒有id => 顯示'新增練鼓室' -->
          {{ dialog.id ? '編輯練鼓室' : '新增練鼓室' }}
        </v-card-title>
        <!-- 綁定欄位的 v-model、:error-messages -->
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-autocomplete
                label="縣市"
                :items="cities"
                v-model="city.value.value"
                :error-messages="city.errorMessage.value"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="地區"
                v-model="district.value.value"
                :error-messages="district.errorMessage.value"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="地址"
                v-model="address.value.value"
                :error-messages="address.errorMessage.value"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="名稱"
                v-model="trainingRoomName.value.value"
                :error-messages="trainingRoomName.errorMessage.value"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                label="連絡電話"
                v-model="phoneNumber.value.value"
                :error-messages="phoneNumber.errorMessage.value"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                label="預約方式"
                :items="reservations"
                v-model="reservation.value.value"
                :error-messages="reservation.errorMessage.value"
              ></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                label="費用（元/小時）"
                v-model="fee.value.value"
                :error-messages="fee.errorMessage.value"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <!-- :loading="isSubmitting" 表示送出的時候會轉圈，避免重複點擊 -->
          <v-btn type="submit" :loading="isSubmitting">新增</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
// 定義頁面
import { definePage } from 'vue-router/auto'
import { ref } from 'vue'
// 引入驗證套件
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
// 引入useApi（要把資料傳出去都要引入這個，用於跟API溝通）
import { useApi } from '@/composables/axios'
// 對話框
import { useSnackbar } from 'vuetify-use-dialog'
// 引入自定義元件
import breadcrumbs from '@/components/breadcrumbs'
// 引入GSAP
import { gsap } from 'gsap'

definePage({
  meta: {
    title: 'GrooveShare | 尋找練鼓室',
    login: false
  }
})

// 取出apiAuth（要把資料傳出去都要引入這個）
const { apiAuth } = useApi()

const createSnackbar = useSnackbar()

// 要抓頁面上東西需在標籤上加ref='XXX'，並於JS中const同名的ref
const fileAgent = ref(null)

// 視窗------------------------------------
const dialog = ref({
  open: false, // 預設對話框現在是關閉的狀態
  // 紀錄 id，沒有id就是新增，有id就是編輯
  id: ''
})

const openDialog = (item) => {
  // 如果有帶入練鼓室資料
  if (item) {
    // 將id傳入現在練鼓室的id，其他項目依此類推
    dialog.value.id = item._id
    city.value.value = item.city
    district.value.value = item.district
    address.value.value = item.address
    trainingRoomName.value.value = item.trainingRoomName
    phoneNumber.value.value = item.phoneNumber
    reservation.value.value = item.reservation
    fee.value.value = item.fee
  } else {
    // id是空的 => 表示現在是新增模式
    dialog.value.id = ''
  }
  dialog.value.open = true
}

// 關閉視窗funtion----------------------------------------------------
const closeDialog = () => {
  dialog.value.open = false // dialog.value.open決定對話框是否開啟
  resetForm() // 重設表單，回到initialValues
}

const cities = ['臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市', '基隆市', '新竹市', '嘉義市', '宜蘭縣', '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '屏東縣', '花蓮縣', '臺東縣', '澎湖縣']
const reservations = ['電話預約', '官網預約', '社群預約', '現場登記', '其他預約方式']
// 定義電話號碼驗證的正則表達式
const phoneNumberRegex = /^0\d{9}$/

// 以schema定義格式----------------------------------------------
const schema = yup.object({
  // 縣市----------------
  city: yup
    .string()
    .required('縣市必填-schema')
    .test('isCity', '地區分類錯誤-schema', value => {
      return cities.includes(value)
    }),
  // 地區 ***有空再改成像縣市一樣的選項***
  district: yup
    .string()
    .required('地區必填-schema'),
  // 地址-------------------------------
  address: yup
    .string()
    .required('地址必填-schema'),
  // 名稱-------------------------------
  trainingRoomName: yup
    .string()
    .required('名稱必填-schema'),
  // 連絡電話----------------------------
  phoneNumber: yup
    .string()
    .required('連絡電話必填-schema')
    .matches(phoneNumberRegex, '電話號碼格式不正確'),
  // 預約方式---------------------------
  reservation: yup
    .string()
    .required('預約方式必填-schema')
    .test('isreservation', '預約方式分類錯誤-schema', value => {
      return reservations.includes(value)
    }),
  // 費用------------------------------
  fee: yup
    .number()
    // 打的不是數字就會觸發typeError
    .typeError('格式錯誤，只能為數字-schema')
    .required('費用必填-schema')
    .min(0, '費用不能小於 0'),
})

// useForm()建立表單------------------------------------------------------------
// 解構出handleSubmit (處理送出表單的動作)、isSubmitting (判斷表單是否在送出)、resetForm (重設表單)
const { handleSubmit, isSubmitting, resetForm } = useForm({
  // 驗證格式為上方的schema
  validationSchema: schema,
  // 表單各欄位的初始值設定
  initialValues: {
    city: '',
    district: '',
    address: '',
    trainingRoomName: '',
    // 不確定格式限制為數字，初始值可不可以用''
    // 也不確定可不可以不設初始值****待編輯，若都不能就寫0*****
    phoneNumber: 0,
    reservation: '',
    fee: 0
  }
})

// useField()建立表單的各個欄位---------------------------------------------
// useField()裡的欄位名稱要跟跟上方schema的一樣
// useField('city') => 返回與 city 字段相關的值(value)和錯誤訊息(errorMessage)

// v-model和error-messages會綁這些值
// 例如上方的v-model='account.value.value'、:error-messages="account.errorMessage.value"
//  當字段驗證失敗時，vee-validate 會自動更新 errorMessage，並顯示相應的錯誤信息（schema裡自己定義的，例如'密碼不一致'）
const city = useField('city')
const district = useField('district')
const address = useField('address')
const trainingRoomName = useField('trainingRoomName')
const phoneNumber = useField('phoneNumber')
const reservation = useField('reservation')
const fee = useField('fee')

// 定義送出的function-----------------------------------------------------------------
// handleSubmit()會先上方的schema執行驗證，過了再執行下面的程式碼
const submit = handleSubmit(async (values) => {
  try {
    // 檔案上傳會用到form-data，是一種用於構建 HTTP POST 請求的內容類型，主要用於上傳文件和提交表單數據。
    // 建立物件fd
    const fd = new FormData()
    // 把東西放入form-data：fd.append(key, value)
    fd.append('city', values.city)
    fd.append('district', values.district)
    fd.append('address', values.address)
    fd.append('trainingRoomName', values.trainingRoomName)
    fd.append('phoneNumber', values.phoneNumber)
    fd.append('reservation', values.reservation)
    fd.append('fee', values.fee)

    // 如果id是空的 => 新增練鼓室---------------------
    if (dialog.value.id === '') {
      await apiAuth.post('/trainingRoom', fd)
    } else {
      // 如果id不是空的 => 編輯練鼓室-----------------
      // .patch表示更新部分資源欄位
      await apiAuth.patch('/trainingRoom/' + dialog.value.id, fd)
    }

    // 對話框
    createSnackbar({
      // 如果id是0 => 新增成功，如果有id => 編輯成功
      text: dialog.value.id === '' ? '新增練鼓室成功' : '編輯練鼓室成功',
      snackbarProps: {
        color: 'green'
      }
    })
    // 關閉視窗
    closeDialog()
    // 新增或編輯後，使重新載入表格資料以更新
    tableLoadItems(true)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤-page',
      snackbarProps: {
        color: 'red'
      }
    })
  }
})

// 表格------------------------------------------------------------------------------------
// 一頁顯示幾個
const tableItemsPerPage = ref(10)
// 排序（先按照日期排序就好）*****待新增******
const tableSortBy = ref([
  // createdAt是建立的日期
  // order是正的或到的排，desc是倒的
  { key: 'createdAt', order: 'desc' }
])
// 頁碼，表示表格現在被翻到哪一頁
// 如何從現在第幾頁、一頁幾筆算出後端要回給前端第幾筆～第幾筆的資料？
const tablePage = ref(1)
// 表格要顯示的東西
const tableItems = ref([])
// 表格欄位設定（理論上應該會固定，所以不用ref）
const tableHeaders = [
  // align: 'center'置中
  // sortable: 此欄位是否可以排序
  // key要跟資料庫的欄位對到，把相同key的值帶入這個欄位
  { title: '縣市', align: 'center', sortable: true, key: 'city' },
  { title: '地區', align: 'center', sortable: true, key: 'district' },
  { title: '地址', align: 'center', sortable: false, key: 'address' },
  { title: '名稱', align: 'center', sortable: false, key: 'trainingRoomName' },
  { title: '連絡電話', align: 'center', sortable: false, key: 'phoneNumber' },
  { title: '預約方式', align: 'center', sortable: false, key: 'reservation' },
  { title: '費用（元/小時）', align: 'center', sortable: true, key: 'fee' },
  // 原本的資烙沒有action，表示其為獨立於資料的欄位 => 在上方寫<template #[`item.action`]="{ item }"></template>
  { title: '', align: 'center', sortable: false, key: 'action' }
]
// 預設剛點進來的時候會是載入狀態
const tableLoading = ref(true)
// 每一頁加起來總共有幾筆資料，預設為0
const tableItemsLength = ref(0)
// 現在搜尋的文字是什麼
const tableSearch = ref('')

// 表格載入的funtion-------------------------------------------------------
const tableLoadItems = async (reset) => {
  // 如果重設表格會回到第一頁
  if (reset) tablePage.value = 1
  // 正在loading
  tableLoading.value = true
  try {
    // 取得表格資料
    // 設定get參數：.get(網址,請求的設定) ***get無送出的資料***
    const { data } = await apiAuth.get('/trainingRoom/all', {
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

// 刪除練鼓室function
const deleteTrainingRoom = (id) => {
  try {
    alert('確定要刪除練鼓室嗎？')
    apiAuth.delete('/trainingRoom/' + id)
    createSnackbar({
      text: '刪除歌曲成功',
      snackbarProps: {
        color: 'green'
      }
    })
    tableLoadItems()
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '刪除練鼓室發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
}

// 動畫效果-------------------------------------------------------------
gsap.to('.v-dialog', { x: 500, duration: 1 })
</script>

<style scoped lang="scss">
#table{
  font-size: 1rem;
  // 按鈕和搜尋欄的排列
  #btn-and-search{
    // background: cadetblue;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    // 按鈕
    #add-btn{
      height: 50px;
      font-size: 1rem;
      // 小於xs尺寸的樣式
      @media (max-width: 850px) {
        font-size: 0.7rem;
      }
    }
  }
  // 小尺寸的樣式
  @media (max-width: 850px) {
    font-size: 0.7rem;
  }
}

// 彈出視窗
.v-dialog{
  // background: violet; // 這是卡片旁邊區塊的顏色
  width: 50vw;
  .v-card{
    // background: cadetblue;
    text-align: center;
    padding: 1rem;
    // 關閉按鈕
    #btn-close{
      position: absolute;
      top: 10px;
      right: 0px;
      width: 32px; /* 調整按鈕寬度 */
      height: 32px; /* 調整按鈕高度 */
      font-size: 0.8rem;
    }
    // 標題
    .v-card-title{
      font-size: 2rem;
      font-weight: bold;
    }

    // 按鈕
    .v-card-actions{
      .v-btn{
        width: 100px;
        background: black;
        color: white;
        font-size: 1rem;
        margin: auto;

        &:hover{
          background: gray;
        }

      }
    }
  }
  // 小尺寸的樣式
  @media (max-width: 850px) {
    width: 95vw;
    .v-card{
      padding: 0.5rem;

      // 關閉按鈕
      #btn-close{
        width: 20px;
        height: 20px;
      }
      // 標題
      .v-card-title{
        font-size: 1rem;
      }

      .v-card-text{
        // background: cadetblue;
        .v-text-field{
          height: 40px;
        }
      }

      // 按鈕
      .v-card-actions{
        .v-btn{
          width: 50px;
          background: black;
          color: white;
          font-size: 0.7rem;
          margin: auto;

          &:hover{
            background: gray;
          }

        }
      }
    }
  }
}
</style>
