<template>
  <v-container>
    <v-col cols="12">
      <h1>{{ song.songTitle }}</h1>
      <h2>{{ song.singer }}</h2>
    </v-col>
    <v-col cols="12">
      <p>BPM：{{ song.BPM }}</p>
      <!-- 目前沒有顯示******待編輯******** -->
      <p>拍號：{{ song.signatureSection }} / {{ song.signatureNotes }}</p>
      <v-form :disabled="isSubmitting" @submit.prevent="submit">
        <v-btn type="submit" prepend-icon="mdi-cards-heart-outline" :loading="isSubmitting">收藏歌曲</v-btn>
      </v-form>
    </v-col>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { definePage } from 'vue-router/auto'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '@/stores/user'

definePage({
  meta: {
    title: '歌曲',
    login: false
  }
})

const { api } = useApi()
const route = useRoute()
const router = useRouter()
const createSnackbar = useSnackbar()
const user = useUserStore()

// 歌曲的預設值
const song = ref({
  _id: '',
  songTitle: '',
  BPM: 0,
  singer: '',
  sell: true,
  songStyle: ''
})

const load = async () => {
  try {
    const { data } = await api.get('/song/' + route.params.id)
    song.value._id = data.result._id
    song.value.songTitle = data.result.songTitle
    song.value.BPM = data.result.BPM
    song.value.singer = data.result.singer
    song.value.songStyle = data.result.songStyle
    song.value.signatureSections = data.result.signatureSections
    song.value.signatureNotes = data.result.signatureNotes

    document.title = '購物網 | ' + song.value.songTitle
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
}
load()

const { isSubmitting, handleSubmit } = useForm({})

// *****待編輯*****
const submit = handleSubmit(async (values) => {
  if (!user.isLogin) {
    router.push('/login')
    return
  }
  const result = await user.addSong(song.value._id)
  createSnackbar({
    text: result.text,
    snackbarProps: {
      color: result.color
    }
  })
})
</script>
