<template>
    <!-- 上課範例中，v-form標籤裡有 @submit.prevent="submit" :disabled="isSubmitting"，這裡先暫時拿掉 -->
    <v-form>
      <v-row>
        <v-col cols="12" md="6">
          <!-- 上課範例中，v-text-field標籤裡有:error-messages，這裡先暫時拿掉-->
          <span>演奏/演唱者：</span>
          <v-text-field
            placeholder="請輸入演奏/演唱者"
            v-model="singer.value.value"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <!-- 上課範例中，v-text-field標籤裡有:error-messages，這裡先暫時拿掉-->
          <span>歌名：</span>
          <v-text-field
            placeholder="請輸入歌名"
            v-model="songTitle.value.value"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <span>曲風：</span>
          <!-- 上課範例中，v-select裡有下列內容，這裡暫時先拿掉
            :error-messages="category.errorMessage.value" -->
          <v-select
            label="請選擇曲風"
            :items="songStylies"
            v-model="songStyle.value.value"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <!-- 上課範例中，:error-messages，這裡先暫時拿掉-->
          <span>BPM：</span>
          <v-text-field
            placeholder="請輸入BPM"
            v-model="BPM.value.value"
          ></v-text-field>
          <!-- 可以加上+-符號，待編輯 -->
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
// 引入驗證套件
import { useForm, useField } from 'vee-validate'
// 引入格式驗證之套件
import * as yup from 'yup'
import validator from 'validator'
import { useApi } from '@/composables/axios'

const { api } = useApi() // 一定要呼叫，後續才能用

// 選項（跟後端相同）-------------------------------------------------
// 曲風
const songStylies = ['流行', '龐克', '金屬', '後搖', '慢搖', '民謠', '爵士', '其他']
// 拍號：一個小節有幾拍
const signatureSections = [2, 3, 4, 6, 9]
// 拍號－以幾分音符為一拍
const signatureNotes = [2, 4, 8]

const schema = yup.object({
  // 演唱者
  singer: yup
    .string() // 文字
    .required('演唱者必填'), // 必填
  // 歌名
  songTitle: yup
    .string()
    .required('歌名必填'),
  // 曲風
  songStyle: yup
    .string()
    .required('曲風必填')
    .test('isSongStyle', '商品分類錯誤', value => {
      return songStylies.includes(value)
    }),
  // 速度
  BPM: yup
    .number()
    .required('BPM必填'),
  // 拍號
  signature: yup.object().shape({
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
      })
  }),
})
// useForm()建立表單------------------------------------------------------------
// 解構出handleSubmit (處理送出表單的動作) 和 isSubmitting (判斷表單是否在送出)
const { handleSubmit, isSubmitting } = useForm({
  // 指定驗證格式使用上方建立的schema
  validationSchema: schema,
  // 初始值設定
  initialValues: {
    singer: '',
    songTitle: '',
    songStyle: '',
    BPM: 0,
    // 拍號先不寫
  }
})

// useField()建立表單的各個欄位---------------------------------------------
// useField()來自vee-validate套件
// 欄位名稱要跟跟上方schema的一樣
// v-model綁這些值，例如上方的v-model='singer.value.value'
const singer = useField('singer')
const songTitle = useField('songTitle')
const songStyle = useField('songStyle')
const BPM = useField('BPM')
// ***********拍號待確認***************
const signatureSection = useField('signature.signatureSection') // 一小節有幾拍
const signatureNote = useField('signature.signatureNote') // 以幾分音符為一拍

// handleSubmit()處理送出表單的動作--------------------------------------
// values表示使用者表單的內容
const submit = handleSubmit(async (values) => {
  try {
    const fd = new FormData()

    // fd.append(key, value)
    fd.append('singer', values.singer)
    fd.append('songTitle', values.songTitle)
    fd.append('songStyle', values.songStyle)
    fd.append('BPM', values.BPM)
    // 拍號先不寫
    
    // 待編輯
  } catch (error) {
    console.log(error)
  }
})
</script>
