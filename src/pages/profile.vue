<!-- 修改密碼待編輯 -->
<!-- 第一次進入此頁的時候email沒有顯示，需重新整理才有***待編輯*** -->
<template>
  <div id="profile-container">
    <v-row>
      <v-col cols="12">
        <breadcrumbs></breadcrumbs>
      </v-col>
      <v-col cols="12" md="4" id="col-profile">
        <img :src="nowIcon" alt="大頭貼" id="icon">
        <v-btn @click="openDialog(null)" id="btn-edit" width="150px" color="black" style="margin: auto;">上傳大頭貼</v-btn>
        <!-- <div id="information"> -->
        <div>{{ user.account }}</div>
          <!-- <p>email：{{ nowEmail }}</p> -->
        <!-- </div> -->
      </v-col>
      <v-col cols="12" md="8" id="memberArea">
        <h1 class="title">會員專區</h1>
        <div id="btns">
          <v-btn v-for="(item, index) in memberItems" :key="index" :to="item.to">{{ item.title }}</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
  <v-dialog v-model="isOpen" width="400">
    <!-- :disabled="isSubmitting"表示送出中表單停用 -->
    <v-form @submit.prevent="submit" :disabled="isSubmitting">
      <v-card>
        <!-- 關閉視窗按鈕 -->
        <!-- elevation="0" => 去除陰影-->
        <v-btn :loading="isSubmitting" @click="isOpen = false" id="btn-close" elevation="0">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <v-card-title>
          <h1>上傳大頭貼</h1>
        </v-card-title>
        <!-- 綁定欄位的 v-model、:error-messages -->
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
            id="uploadPhoto"
          ></vue-file-agent>
        </v-card-text>
        <v-card-actions class="justify-center">
          <!-- :loading="isSubmitting" => 送出的時候會轉圈，避免重複點擊 -->
          <v-btn color="" type="submit" :loading="isSubmitting">上傳</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { ref } from 'vue'
// store－用於取得現在的使用者
import { useUserStore } from '@/stores/user'
// 引入自定義元件
import breadcrumbs from '@/components/breadcrumbs'
// 引入驗證套件
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
// 引入useApi（要把資料傳出去都要引入這個，用於跟API溝通）
import { useApi } from '@/composables/axios'
// 對話框
import { useSnackbar } from 'vuetify-use-dialog'
// 跳轉分頁用
import { useRouter } from 'vue-router'

definePage({
  meta: {
    title: 'GrooveShare | 會員資料',
    login: true
  }
})

// 取出apiAuth（要把資料傳出去都要引入這個）
const { apiAuth } = useApi()

const createSnackbar = useSnackbar() // 對話框
const router = useRouter() // 跳到其他分頁用

// 要抓頁面上東西需在標籤上加ref='XXX'，並於JS中const同名的ref
const fileAgent = ref(null)

// 第一次進分頁時不知為何沒有執行profile抓頭貼資料，因此需先手動重新整理****待編輯****

// router裡面有寫到：一進網頁會先取得使用者資料
const user = useUserStore()
// console.log(user.account) // 確認store有存account
// console.log(user.email) // 確認store有存account
// console.log(user.icon) // 確認store有存icon
// const nowAccount = user.account
const nowEmail = user.email
const nowIcon = user.icon

// const { data } = await apiAuth.get('/user/profile')
// console.log(`現在：${nowAccount}、${nowEmail}、${nowIcon}`) // Icon是undifined

// 會員專區按鈕-----------------------
const memberItems = ref([
  { title: '寫譜專區', to: '/writtingArea', prependIcon: 'mdi-pencil-box' },
  { title: '我的鼓譜', to: '/myScore', prependIcon: 'mdi-file-document-outline' },
  { title: '我的收藏', to: '/mySaving', prependIcon: 'mdi-content-save-all-outline' },
  // { title: '我的關注', to: '/follow', prependIcon: 'mdi-account-heart' },
  // { title: '會員資料', to: '/profile', prependIcon: 'mdi-account' }
])

// 視窗------------------------------------
const isOpen = ref(false) // 決定對話框是否開啟

// 打開視窗 funtion******item待確認要不要放******
const openDialog = async () => {
  isOpen.value = true

  // 打開後代入store中的使用者資料
  account.value.value = user.account // 同一個使用者會固定帳號，不得修改
  email.value.value = nowEmail
  icon.value.value = nowIcon // 打開對話框沒有顯示圖片**待編輯**
  id.value.value = user.id // 同一個使用者會固定id，不得修改
  // 密碼待編輯
  // password.value.value = ''
  // passwordConfirm.value.value = ''
}

const schema = yup.object({
  email: yup
    .string()
    .required('使用者信箱必填')
    .test(
      'isEmail', '使用者信箱格式錯誤',
      (value) => {
        return validator.isEmail(value)
      }
    ),
})

// useForm()建立表單------------------------------------------------------------
// 解構出handleSubmit (處理送出表單的動作)、isSubmitting (判斷表單是否在送出)、resetForm (重設表單)
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})

// useField()建立表單的各個欄位---------------------------------------------
// useField()裡的欄位名稱要跟跟上方schema的一樣
// useField('name') => 返回與 name 字段相關的值(value)和錯誤訊息(errorMessage)

// v-model和error-messages會綁這些值
// 例如上方的v-model='account.value.value'、:error-messages="account.errorMessage.value"
//  當字段驗證失敗時，vee-validate 會自動更新 errorMessage，並顯示相應的錯誤信息（schema裡自己定義的，例如'密碼不一致'）
const account = useField('account')
const email = useField('email')
const icon = useField('icon')
const id = useField('id')

// 檔案上傳用
const fileRecords = ref([])
const rawFileRecords = ref([])

// 定義送出的function-----------------------------------------------------------------
// handleSubmit()會先上方的schema執行驗證，過了再執行下面的程式碼
const submit = handleSubmit(async (values) => {
  // handleSubmit()不會執行驗證檔案上傳（因為是引入其他套件），因此要自己寫：
  // fileRecords.value[0]是指第一個檔案
  if (fileRecords.value[0]?.error) return

  try {
    // 建立物件fd
    const fd = new FormData()
    // 把東西放入form-data：fd.append(key, value)*****待編輯*****
    // fd.append('account', values.account)
    // fd.append('email', values.email)

    // 如果有放檔案就要放入fd
    if (fileRecords.value.length > 0) {
      fd.append('icon', fileRecords.value[0].file)
    }

    // await apiAuth.patch('/user/' + 指定的使用者, fd)
    await apiAuth.patch('/user/' + id.value.value, fd)

    // 對話框
    createSnackbar({
      text: '上傳大頭貼成功',
      snackbarProps: {
        color: 'green'
      }
    })

    router.go(0) // 重新加載當前的路由
    isOpen.value = false // 關閉視窗
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

</script>

<style scoped lang="scss">
#profile-container{
  margin: auto;
  padding-top: 1rem;

  .v-row{
    #col-profile{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      gap: 1rem;

      // 大頭貼
      #icon{
        width: 150px;
        height: 150px;
        background: lightgray;
        margin: auto;
      }

        // 使用者帳號
        div{
          width: 150px;
          font-size: 1.2rem;
          text-align: center;
        }
    }
    // 會員專區------------------------------
    #memberArea{
      h1{
        font-weight: bold;
        text-decoration: underline;
        font-size: 1.5rem;
      }
      #btns{
        display: flex;
        margin-top: 1rem;
        width: 80%;
        gap: 1rem;
      }
    }

  }
}

.v-dialog{
  .v-card{
    // background: cadetblue;
    text-align: center;
    position: relative;

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
      font-weight: bold;
      font-size: 1rem;
    }
    // 內容
    .v-card-text{
      background: rgb(229, 229, 229);

      #uploadPhoto{
        background: white;
      }
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
}
</style>
