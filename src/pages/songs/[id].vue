<template>
  <v-container>
    <!-- 歌曲資訊-------------------------------------------------------------------- -->
    <v-row>
      <v-col cols="12">
        <h1>{{ song.songTitle }}</h1>
        <h2>{{ song.singer }}</h2>
      </v-col>
      <v-col cols="12">
        <p>BPM：{{ song.BPM }}</p>
        <!-- 目前沒有顯示******待編輯******** -->
        <p>拍號：{{ song.signatureBeat }} / {{ song.signatureNote }}</p>

        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-btn type="submit" prepend-icon="mdi-cards-heart-outline" :loading="isSubmitting">收藏歌曲</v-btn>
        </v-form>
      </v-col>
    </v-row>
    <!-- 樂譜部分------------------------------------------------------------------------------ -->
    <!-- song.scoreHiHat[小節][第幾拍][第幾部分] -->
    <v-row class="h-100" v-for="(section, sectionIndex) in song.scoreHiHat" :key="sectionIndex">
      <!--  樂器(列)名稱------------------------------------- -->
      <!-- <v-col cols="2" class="instruments w-100 bg-black">
        <div class="row-name"></div>
        <div class="row-name"></div>
        <div class="row-name">Hi-Hat</div>
        <div class="row-name">snare (小鼓)</div>
        <div class="row-name">kick (大鼓)</div>
      </v-col> -->
      <!-- 小節 -->
      <v-col cols="10" lg="5" class="section">
        <div class="sectionTitle">第{{sectionIndex+1}}小節</div>
        <div class="allBeats">
        <!-- 一拍------------------------------------------------------------ -->
          <div class="beat w-100" v-for="(beat, beatIndex) in section" :key="beatIndex">
            <div class="beat-title">第 {{beatIndex + 1}} 拍</div>
            <div class="allNoteAreas">
              <!-- HiHat------------------------------------->
              <div id="HiHat-area" class="noteArea w-100 bg-info d-flex">
                <v-checkbox
                  class="n-HiHat-note"
                  v-for="(HiHat, HiHatIndex) in beat"
                  :key="HiHatIndex"
                  :value="true"
                  v-model="song.scoreHiHat[sectionIndex][beatIndex][HiHatIndex]"
                  @change="console.log(`${sectionIndex+1}-${beatIndex+1}-${HiHatIndex+1}`,song.scoreHiHat[sectionIndex][beatIndex][HiHatIndex])"
                  >
                </v-checkbox>
              </div>
              <!-- 小鼓------------------------------------->
              <div id="snare-area" class="noteArea w-100 bg-secondary d-flex">
                <v-checkbox
                  class="n-snare-note"
                  v-for="(snare, snareIndex) in beat"
                  :key="snareIndex"
                  :value="true"
                  v-model="song.scoreSnare[sectionIndex][beatIndex][snareIndex]"
                  @change="console.log(`${sectionIndex+1}-${beatIndex+1}-${snareIndex+1}`,song.scoreSnare[sectionIndex][beatIndex][snareIndex])"
                  >
                </v-checkbox>
              </div>
              <!-- 大鼓------------------------------------->
              <!-- scoreKick[第X小節][第X拍][第X拍的第X部分] -->
              <div id="kick-area" class="noteArea w-100 bg-white d-flex">
                <v-checkbox
                  class="n-kick-note"
                  v-for="(kick, kickIndex) in beat"
                  :key="kickIndex"
                  :value="true"
                  v-model="song.scoreKick[sectionIndex][beatIndex][kickIndex]"
                  @change="console.log(`${sectionIndex+1}-${beatIndex+1}-${kickIndex+1}`,song.scoreKick[sectionIndex][beatIndex][kickIndex])"
                  >
                </v-checkbox>
              </div>
            </div>
          </div>
        </div>
      </v-col>
        </v-row>
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
  songStyle: '',
  signatureBeat: 0,
  signatureNote: 0,
  scoreHiHat: [[[]]]
})

const load = async () => {
  try {
    const { data } = await api.get('/song/' + route.params.id)
    console.log(data.result)
    song.value._id = data.result._id
    song.value.songTitle = data.result.songTitle
    song.value.BPM = data.result.BPM
    song.value.singer = data.result.singer
    song.value.songStyle = data.result.songStyle
    song.value.signatureBeat = data.result.signatureBeat
    song.value.signatureNote = data.result.signatureNote
    song.value.scoreHiHat = data.result.scoreHiHat
    song.value.scoreSnare = data.result.scoreSnare
    song.value.scoreKick = data.result.scoreKick

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

<style scoped lang="scss">
// 一整列------------------------------------------------------------------------------------------------
.v-row{
  display: flex;
  background: lavenderblush;
  padding: 0;
  // 樂器(列)名稱-------------------------------------------------
  // 如果尺寸為xl時，偶數的.instruments會display:none****2待編輯*****
  .instruments{
    background: lawngreen;
    padding: 0;
    text-align: center;

    .row-name{
      height: 20%;
      background: orange;
      width: 100%;
    }
  }

  // 一個小節 ----------------------------------------------------
  .section{
    background: lemonchiffon;
    padding: 0.2rem;
    display: flex;
    flex-direction: column;

    .sectionTitle{
      background: darkgoldenrod;
      font-size: 1rem; // 字體大小待編輯
      padding: 0;
      text-align: center;
    }

    // 一個小節裡的所有拍-----------------------------
    .allBeats{
      background: darkcyan;
      display: flex;
      justify-content: space-around;
      // 每一拍
      .beat{
        padding: 0.2rem;

        .beat-title{
          text-align: center;
        }
        .allNoteAreas{
          .noteArea{
            display: flex;
            flex-direction: row;
          }
      }
      }
    }
  }
}
</style>
