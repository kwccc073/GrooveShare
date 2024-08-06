<template>
    <!-- 表單記得寫 @submit.prevent="submit" :disabled="isSubmitting"-->
    <!-- :disabled="isSubmitting"表示送出中表單停用 -->
    <v-form @submit.prevent="submit" :disabled="isSubmitting">
      <v-row>
        <v-col cols="12" md="6">
          <span>演奏/演唱者：</span>
          <!-- 步驟5. 綁定欄位的 v-model、:error-messages -->
          <v-text-field
            placeholder="請輸入演奏/演唱者"
            v-model="singer.value.value"
            :error-messages="singer.errorMessage.value"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <span>歌名：</span>
          <v-text-field
            placeholder="請輸入歌名"
            v-model="songTitle.value.value"
            :error-messages="songTitle.errorMessage.value"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <span>曲風：</span>
          <!-- v-autocomplete 是可以打字的下拉選單
               :items放選項的陣列-->
          <v-autocomplete
            label="請選擇曲風"
            :items="songStylies"
            v-model="songStyle.value.value"
            :error-messages="songStyle.errorMessage.value"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <span>BPM：</span>
          <v-text-field
            placeholder="請輸入BPM"
            type="number" min="0"
            v-model="BPM.value.value"
            :error-messages="BPM.errorMessage.value"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <span>拍號：</span>
          <!-- 一個小節幾拍 -->
          <v-select
            :items="signatureSections"
            v-model="signatureSection.value.value"
          ></v-select>
          <!-- 以幾分音符為一拍 -->
          <v-select
            :items="signatureNotes"
            v-model="signatureNote.value.value"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-btn type="submit" :loading="isSubmitting">儲存</v-btn>
      </v-row>
    </v-form>
    </template>

<script setup>
// 步驟1-1. 引入驗證套件
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
// 步驟6-2. 引入useApi
import { useApi } from '@/composables/axios'
// 對話框
import { useSnackbar } from 'vuetify-use-dialog'
// 取得當前使用者資料
import { useUserStore } from '@/stores/user'

// 步驟6-3. 取出apiAuth（要把資料傳出去都要引入這個）
const { apiAuth } = useApi()

const createSnackbar = useSnackbar()

// 取得當前使用者資料
const user = useUserStore()
const account = user.account

// 選項（跟後端相同）-------------------------------------------------
// 曲風
const songStylies = ['流行', '龐克', '金屬', '後搖', '慢搖', '民謠', '爵士', '其他']
// 拍號：一個小節有幾拍
const signatureSections = [2, 3, 4, 6, 9]
// 拍號－以幾分音符為一拍
const signatureNotes = [2, 4, 8]

// 步驟2. 以schema定義格式-------------------------------------------
const schema = yup.object({
  // 演唱者
  singer: yup
    .string() // 文字
    .required('演唱者必填-schema'), // 必填
  // 歌名
  songTitle: yup
    .string()
    .required('歌名必填-schema'),
  // 曲風
  songStyle: yup
    .string()
    .required('曲風必填-schema')
    .test('isSongStyle', '曲風分類錯誤-schema', value => {
      return songStylies.includes(value)
    }),
  // 速度
  BPM: yup
    .number()
    // 打的不是數字就會觸發typeError
    .typeError('格式錯誤，只能為數字-schema')
    .required('BPM必填-schema'),
  // 拍號
  // 一個小節幾拍
  signatureSection: yup
    .number()
    .required('拍號必填')
    .test('issignatureSection', '拍號錯誤', value => {
      return signatureSections.includes(value)
    }),
  // 以幾分音符為一拍
  signatureNote: yup
    .number()
    .required('拍號必填')
    .test('issignatureNote', '音符拍數錯誤', value => {
      return signatureNotes.includes(value)
    }),
})

// 步驟3. useForm()建立表單------------------------------------------------------------
// 解構出handleSubmit (處理送出表單的動作) 和 isSubmitting (判斷表單是否在送出)
const { handleSubmit, isSubmitting, resetForm } = useForm({
  // 指定驗證格式使用上方建立的schema
  validationSchema: schema,
  // 初始值設定
  initialValues: {
    singer: '',
    songTitle: '',
    songStyle: '',
    BPM: 0,
    signatureSection: 4,
    signatureNote: 4,
    // 拍號先不寫
  }
})

// 步驟4. useField()建立表單的各個欄位---------------------------------------------
// useField('name') => 返回與 name 字段相關的值(value)和錯誤訊息(errorMessage)
// v-model和error-messages會綁這些值
// 例如上方的v-model='singer.value.value'、:error-messages="singer.errorMessage.value"
const singer = useField('singer')
const songTitle = useField('songTitle')
const songStyle = useField('songStyle')
const BPM = useField('BPM')
const signatureSection = useField('signature.signatureSection') // 一小節有幾拍
const signatureNote = useField('signature.signatureNote') // 以幾分音符為一拍

// 步驟6-1. 定義送出的function-----------------------------------------------------------------
const submit = handleSubmit(async (values) => {
  try {
    // 檔案上傳會用到form-data，是一種用於構建 HTTP POST 請求的內容類型，主要用於上傳文件和提交表單數據。
    const fd = new FormData()

    // 把東西放入form-data：fd.append(key, value)
    fd.append('editor', account) // 建立此歌曲的使用者
    fd.append('singer', values.singer)
    fd.append('songTitle', values.songTitle)
    fd.append('songStyle', values.songStyle)
    fd.append('BPM', values.BPM)
    fd.append('signatureSection', values.signatureSection)
    fd.append('signatureNote', values.signatureNote)

    // 新增樂譜
    await apiAuth.post('/song', fd)

    // 另一種寫法測試
    // await apiAuth.post('/song', {
    //   singer: values.singer,
    //   songTitle: values.songTitle,
    //   songStyle: values.songStyle,
    //   BPM: values.BPM
    //   // 拍號先不寫
    // })

    // 對話框
    createSnackbar({
      text: '建立歌曲成功',
      snackbarProps: {
        color: 'green'
      }
    })
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '建立歌曲發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
})
</script>
