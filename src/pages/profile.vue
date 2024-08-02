<template>
  <v-container>
    <breadcrumbs></breadcrumbs>
    <v-row class="bg-primary">會員功能</v-row>
    <v-row>
      <v-btn v-for="(item, index) in memberItems" :key="index" :to="item.to">{{ item.title }}</v-btn>
    </v-row>
    <v-row>
      <v-col cols="12">帳號：{{ nowAccount }}</v-col>
      <v-col cols="12">email：{{ nowEmail }}</v-col>
      <v-col cols="12">大頭貼：{{ nowIcon }}</v-col>
      <img :src="nowIcon" alt="大頭貼" id="icon">
    </v-row>

    <v-btn color="green" @click="openDialog(null)">修改個人檔案</v-btn>
    <v-dialog v-model="dialog.open" persistent width="500">
    <!-- :disabled="isSubmitting"表示送出中表單停用 -->
    <v-form @submit.prevent="submit" :disabled="isSubmitting">
      <v-card>
        <v-card-title>
          編輯個人檔案
        </v-card-title>
        <!-- 步驟5. 綁定欄位的 v-model、:error-messages -->
        <v-card-text>
          <!-- vue-file-agent是檔案上傳的套件 -->
          <!-- accept 接受的格式
               deletable表示可被刪除
               max-size檔案大小限制 -->
          <!-- 呼叫檔案上傳套件內建的function，需要加 ref='' -->
          <!-- 註：要抓頁面上東西需加ref='XXX'，並於JS中const同名的ref-->
          <vue-file-agent
            v-model="fileRecords"
            v-model:raw-model-value="rawFileRecords"
            accept="image/jpeg,image/png"
            deletable
            max-size="1MB"
            help-text="選擇檔案或拖曳到這裡"
            :error-text="{ type: '檔案格式不支援', size: '檔案大小不能超過 1MB' }"
            ref="fileAgent"
          ></vue-file-agent>
          <!-- 帳號 -->
          <!-- 暫時拿掉:error-messages="account.errorMessage.value" -->
          <v-text-field
            label="帳號"
            v-model="account.value.value"
          ></v-text-field>
          <!-- 暫時拿掉:error-messages="email.errorMessage.value" -->
          <v-text-field
            label="email"
            v-model="email.value.value"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <!-- :loading="isSubmitting" 表示送出的時候會轉圈，避免重複點擊 -->
          <v-btn color="red" :loading="isSubmitting" @click="closeDialog">取消</v-btn>
          <v-btn color="green" type="submit" :loading="isSubmitting">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { ref } from 'vue'
// store－用於取得現在的使用者
import { useUserStore } from '@/stores/user'
// 引入自定義元件
import breadcrumbs from '@/components/breadcrumbs'
// 步驟1-1. 引入驗證套件
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
// 步驟6-2. 引入useApi（要把資料傳出去都要引入這個，用於跟API溝通）
import { useApi } from '@/composables/axios'
// 對話框
import { useSnackbar } from 'vuetify-use-dialog'

definePage({
  meta: {
    title: '會員資料',
    // login: true
  }
})

// 進到網頁會先顯示原本的資料-------------------------***目前寫法抓不到頭貼，待編輯***
// router裡面有寫到：一進網頁會先取得使用者資料
const user = useUserStore()
const nowAccount = user.account
const nowEmail = user.email
const nowIcon = user.Icon

console.log(`現在：${nowAccount}、${nowEmail}、${nowIcon}`) // Icon是undifined

// 步驟6-3. 取出apiAuth（要把資料傳出去都要引入這個）
const { apiAuth } = useApi()

const createSnackbar = useSnackbar() // 對話框

// 要抓頁面上東西需在標籤上加ref='XXX'，並於JS中const同名的ref
const fileAgent = ref(null)

// 會員專區按鈕-----------------------
const memberItems = ref([
  { title: '寫譜專區', to: '/writtingArea', prependIcon: 'mdi-pencil-box' },
  { title: '我的鼓譜', to: '/myScore', prependIcon: 'mdi-file-document-outline' },
  { title: '我的收藏', to: '/mySave', prependIcon: 'mdi-content-save-all-outline' },
  { title: '我的關注', to: '/follow', prependIcon: 'mdi-account-heart' },
  { title: '會員資料', to: '/profile', prependIcon: 'mdi-account' }
])

// 視窗------------------------------------
const dialog = ref({
  open: false // 預設對話框現在是關閉的狀態
})

// 打開視窗******item待確認要不要放******
const openDialog = async (item) => {
  dialog.value.open = true
  const { data } = await apiAuth.get('/user/profile') // 取得使用者資料
  account.value.value = data.result.account
  email.value.value = data.result.email
  icon.value.value = data.result.icon
  id.value.value = data.result.id
  console.log('openDialog：' + data.result.account) // 這裡確定可以抓到東西***待編輯***
  console.log('openDialog：' + data.result.email) // 這裡確定可以抓到東西***待編輯***
  console.log('openDialog：' + data.result.icon) // 這裡確定可以抓到東西***待編輯***

  // 打開後要帶入使用者資料 ****待編輯*****
  // account.value.value = user.account
  // email.value.value = user.email
  // icon.value.value = user.icon
  // id.value.value = user.id
  // console.log('openDialog：' + id.value.value)
  // console.log('openDialog：' + email.value.value)
  // console.log('openDialog：' + icon.value.value) // 這裡的icon會變undifines*******
}

// 關閉視窗
const closeDialog = () => {
  dialog.value.open = false // dialog.value.open決定對話框是否開啟
  resetForm()
}

const schema = yup.object({
  account: yup
    .string() // 此欄位為文字
    .required('使用者帳號必填') // 此欄位為必填
    .min(4, '使用者帳號長度不符') // 最少4個字
    .max(20, '使用者帳號長度不符')
    .test(
      // .test(自訂驗證名稱, 錯誤訊息, 驗證 function)
      'isAlphanumeric', '使用者帳號格式錯誤',
      (value) => {
        return validator.isAlphanumeric(value)
      }
    ),
  email: yup
    .string()
    .required('使用者信箱必填')
    .test(
      'isEmail', '使用者信箱格式錯誤',
      (value) => {
        return validator.isEmail(value)
      }
    ),
// 修改密碼部分***待編輯***
//   password: yup
//     .string()
//     .required('使用者密碼必填')
//     .min(4, '使用者密碼長度不符')
//     .max(20, '使用者密碼長度不符'),
//   passwordConfirm: yup
//     .string()
//     .oneOf([yup.ref('password')], '密碼不一致')
})

// 步驟3. useForm()建立表單------------------------------------------------------------
// 解構出handleSubmit (處理送出表單的動作)、isSubmitting (判斷表單是否在送出)、resetForm (重設表單)
const { handleSubmit, isSubmitting, resetForm } = useForm({
  // 驗證格式為上方的schema
  validationSchema: schema
})

// 步驟4. useField()建立表單的各個欄位---------------------------------------------
// useField()裡的欄位名稱要跟跟上方schema的一樣
// useField('name') => 返回與 name 字段相關的值(value)和錯誤訊息(errorMessage)

// v-model和error-messages會綁這些值*****待編輯*****
// 例如上方的v-model='account.value.value'、:error-messages="account.errorMessage.value"
//  當字段驗證失敗時，vee-validate 會自動更新 errorMessage，並顯示相應的錯誤信息（schema裡自己定義的，例如'密碼不一致'）
const account = useField('account')
const email = useField('email')
const icon = useField('icon')
const id = useField('id')
// const password = useField('password')
// const passwordConfirm = useField('passwordConfirm')
// 檔案上傳用
const fileRecords = ref([])
const rawFileRecords = ref([])

// 編輯後再次打開視窗不會顯示圖片，且會員資料那邊沒有顯示編輯過後的結果
// 編輯後要重新取資料****待編輯*****
const updateProfile = async () => {
  await apiAuth.get('/user/profile')
  // account.value.value = data.result.account
  // email.value.value = data.result.email
  // icon.value.value = data.result.icon
  // console.log('updateProfile：' + data.result.account)
  // console.log('updateProfile：' + data.result.email)
  // console.log('updateProfile：' + data.result.icon)
}

// 步驟6-1. 定義送出的function-----------------------------------------------------------------
// handleSubmit()會先上方的schema執行驗證，過了再執行下面的程式碼
const submit = handleSubmit(async (values) => {
  // handleSubmit()不會執行驗證檔案上傳（因為是引入其他套件），因此要自己寫：
  // fileRecords.value[0]是指第一個檔案
  if (fileRecords.value[0]?.error) return

  try {
    // 檔案上傳會用到form-data，是一種用於構建 HTTP POST 請求的內容類型，主要用於上傳文件和提交表單數據。
    // 建立物件fd
    const fd = new FormData()
    // 把東西放入form-data：fd.append(key, value)*****待編輯*****
    fd.append('account', values.account)
    fd.append('email', values.email)

    // 如果有放檔案就要放入fd
    if (fileRecords.value.length > 0) {
      fd.append('icon', fileRecords.value[0].file)
    }

    // await apiAuth.patch('/user/' + 指定的使用者, fd)
    await apiAuth.patch('/user/' + id.value.value, fd)

    // 對話框
    createSnackbar({
      text: '編輯會員資料成功',
      snackbarProps: {
        color: 'green'
      }
    })

    updateProfile() // 更新顯示的資料
    closeDialog() // 關閉視窗
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
})

// 待解決問題******************
// 送出後頁面上的資料沒有跟著更新（但重新整理就會更新了）
// 重新整理前再按一次按鈕，上傳欄位看的到原本的圖，但重新整理後就看不到了
</script>

<style scoped lang="scss">
.v-container{
  width: 80vw;
  margin: auto;
  padding-top: 1rem;
  background: yellow;

  // 大頭貼
  #icon{
    width: 100px;
    height: 100px;
  }
}
</style>
