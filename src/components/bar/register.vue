<template>
  <!-- 參考：https://vuetifyjs.com/en/components/dialogs/#anatomy -->
  <div class="text-center pa-4">
    <v-btn @click="registerDiglog = true" variant="text">
      點我註冊會員
    </v-btn>

    <v-dialog
      v-model="registerDiglog"
      width="auto"
    >
      <v-card
      >
      <v-card-title>會員註冊</v-card-title>
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
            label="信箱" type="email"
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
          ></v-text-field>
          <v-text-field
            label="確認密碼" type="password"
            minlength="4" maxlength="20" counter
            v-model="passwordConfirm.value.value"
            :error-messages="passwordConfirm.errorMessage.value"
          ></v-text-field>
          <v-text-field
            label="密碼" type="password"
            minlength="4" maxlength="20" counter
            hint="請輸入英數字混合密碼"
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
          ></v-text-field>
          <v-btn type="submit" :loading="isSubmitting">註冊</v-btn>
        </v-form>
      </v-card-text>
      </v-card>
    </v-dialog>
  </div>

</template>
<script setup>
import { ref } from 'vue'
// 引入驗證套件
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
// api
import { useApi } from '@/composables/axios'
// 彈出對話框
import { useSnackbar } from 'vuetify-use-dialog'

// 用於決定註冊視窗的彈出與否
const registerDiglog = ref(false)

const { api } = useApi() // 一定要呼叫，後續才能用
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
  email: yup
    .string()
    .required('使用者信箱必填')
    .test(
      'isEmail', '使用者信箱格式錯誤',
      (value) => {
        return validator.isEmail(value)
      }
    ),
  password: yup
    .string()
    .required('使用者密碼必填')
    .min(4, '使用者密碼長度不符')
    .max(20, '使用者密碼長度不符'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], '密碼不一致')
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
const email = useField('email')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')

// handleSubmit()處理送出表單的動作--------------------------------------
// values表示使用者表單的內容
const submit = handleSubmit(async (values) => {
  try {
    await api.post('/user', {
      // 顯示在Request payload上面
      account: values.account,
      email: values.email,
      password: values.password
      // 後端沒有確認密碼，所以不用寫確認密碼
    })
    createSnackbar({
      text: '註冊成功',
      snackbarProps: {
        color: 'green'
      }
    })
    // 關閉註冊視窗
    registerDiglog.value = false
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
.v-dialog{

  .v-card{
    width: 50vw;

    #registerBtn{
      color: skyblue;
    }
  }
}

</style>
