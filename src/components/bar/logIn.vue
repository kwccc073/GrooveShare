<template>
  <!-- 參考：https://vuetifyjs.com/en/components/dialogs/#anatomy -->
  <div class="text-center pa-4">
    <v-btn prepend-icon="mdi-account" @click="logInDialog = true">
      註冊/登入
    </v-btn>

    <v-dialog
      v-model="logInDialog"
      width="auto"
    >
      <v-card>
      <v-card-title>會員登入</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submit" :disabled="isSubmitting">
          <!-- 帳號、密碼、信箱等規則先照上課範例 -->
          <v-text-field
            label="帳號"
            minlength="4" maxlength="20" counter
            v-model="account.value.value"
            :error-messages="account.errorMessage.value"
          ></v-text-field>
          <v-text-field
            label="密碼" type="password"
            minlength="4" maxlength="20" counter
            hint="請輸入英數字混合密碼"
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
          ></v-text-field>
          <v-btn type="submit" :loading="isSubmitting">登入</v-btn>
        </v-form>
        <p>尚未註冊會員？</p>
        <!-- 註冊按鈕位置待調整 -->
        <register></register>
      </v-card-text>
      </v-card>
    </v-dialog>
  </div>

</template>
<script setup>
import { ref } from 'vue'
// 引入自定義元件
import register from '@/components/bar/register.vue'
// 引入驗證套件
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
// 引入路由
import { useRouter } from 'vue-router'
// 引入store
import { useUserStore } from '@/stores/user'
// 彈出對話框
import { useSnackbar } from 'vuetify-use-dialog'

// 用於登入視窗的彈出與否
const logInDialog = ref(false)

const router = useRouter() // 路由
const user = useUserStore()
const createSnackbar = useSnackbar() // 彈出對話框

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
  password: yup
    .string()
    .required('使用者密碼必填')
    .min(4, '使用者密碼長度不符')
    .max(20, '使用者密碼長度不符')
})

// useForm()建立表單------------------------------------------------------------
// 解構出handleSubmit (處理送出表單的動作) 和 isSubmitting (判斷表單是否在送出)
// 指定驗證格式使用上方建立的schema
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})
// useField()建立表單的各個欄位---------------------------------------------
// 欄位名稱要跟跟上方schema的一樣
// v-model綁以下這些值，例如上方的v-model='account.value.value'
const account = useField('account')
const password = useField('password')

// handleSubmit()處理送出表單的動作--------------------------------------
// values表示使用者表單的內容
const submit = handleSubmit(async (values) => {
  const result = await user.login(values)
  if (result === '登入成功') {
    createSnackbar({
      text: '登入成功',
      snackbarProps: {
        color: 'green'
      }
    })
    // 登入成功會跳到首頁
    router.push('/')
    // 並關閉登入視窗
    logInDialog.value = false
  } else {
    alert(result)
  }
})
</script>

<style scoped lang="scss">
.v-dialog{

  .v-card{
    width: 50vw;
  }
}

</style>
