<template>
  <v-container>
    <!-- 把編輯的彈出視窗改掉*****待編輯*****，應該可以用v-if，條件為isEditting===true -->
    <v-btn color="primary" prepend-icon="mdi-cards-heart-outline" @click="saveSong" :loading="loading">收藏歌曲</v-btn>
    <!-- 歌曲資訊-------------------------------------------------------------------- -->
    <v-row>
      <v-col cols="12">
        <h1>歌名：{{ song.songTitle }}</h1>
        <h2>演奏/演唱者：{{ song.singer }}</h2>
        <p>作者：{{song.editor}}</p>
        <p>公開狀態： {{song.isPublic}}</p>
      </v-col>
      <v-col cols="12">
        <p>BPM：{{ song.BPM }}</p>
        <!-- 目前沒有顯示******待編輯******** -->
        <p>拍號：{{ song.signatureBeat }} / {{ song.signatureNote }}</p>
        <!-- 按鈕----------------------------------------------------------- -->
        <!-- 收藏歌曲 -->
        <!-- <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-btn type="submit" prepend-icon="mdi-cards-heart-outline" :loading="isSubmitting">收藏歌曲</v-btn>
        </v-form> -->
        <v-btn color="green" @click="openDialog(null)" v-if="nowAccount === song.editor">編輯歌曲</v-btn>
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
    <!-- 編輯視窗--------------------------------------- -->
    <v-dialog v-model="isOpen" persistent width="1000">
      <v-form @submit.prevent="submit" :disabled="isSubmitting">
          <v-card>
            <v-card-title>編輯鼓譜</v-card-title>
            <v-card-text>
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
                <v-col cols="12" md="3">
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
                <v-col cols="12" md="3">
                  <span>BPM：</span>
                  <v-text-field
                    placeholder="請輸入BPM"
                    type="number" min="0"
                    v-model="BPM.value.value"
                    :error-messages="BPM.errorMessage.value"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <p>拍號：{{ song.signatureBeat }} / {{ song.signatureNote }}</p>
                </v-col>
                <v-col cols="3">
                  <v-checkbox
                  label="公開"
                  v-model="isPublic.value.value"
                  @change="console.log(isPublic.value.value)"
                ></v-checkbox>
                </v-col>
              </v-row>
              <!-- 樂譜部分------------------------------------------------------------------------------- -->
              <v-row class="h-100" v-for="(section, sectionIndex) in scoreHiHat.value.value" :key="sectionIndex">
                <!--  樂器(列)名稱------------------------------------- -->
                <v-col cols="2" class="instruments w-100 bg-black">
                  <div class="row-name"></div>
                  <div class="row-name"></div>
                  <div class="row-name">Hi-Hat</div>
                  <div class="row-name">snare (小鼓)</div>
                  <div class="row-name">kick (大鼓)</div>
                </v-col>
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
                            v-model="scoreHiHat.value.value[sectionIndex][beatIndex][HiHatIndex]"
                            @change="console.log(`${sectionIndex+1}-${beatIndex+1}-${HiHatIndex+1}`,scoreHiHat.value.value[sectionIndex][beatIndex][HiHatIndex])"
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
                            v-model="scoreSnare.value.value[sectionIndex][beatIndex][snareIndex]"
                            @change="console.log(`${sectionIndex+1}-${beatIndex+1}-${snareIndex+1}`,scoreSnare.value.value[sectionIndex][beatIndex][snareIndex])"
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
                            v-model="scoreKick.value.value[sectionIndex][beatIndex][kickIndex]"
                            @change="console.log(`${sectionIndex+1}-${beatIndex+1}-${kickIndex+1}`,scoreKick.value.value[sectionIndex][beatIndex][kickIndex])"
                            >
                          </v-checkbox>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn color="red" :loading="isSubmitting" @click="isOpen = false">取消</v-btn>
                  <v-btn type="submit" :loading="isSubmitting">儲存</v-btn>
                  <v-btn @click="addSection()">新增小節 sections</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          </v-form>
      </v-dialog>
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
import { useUserStore } from '@/stores/user' // 取得現在的使用者

definePage({
  meta: {
    title: '歌曲',
    login: false
  }
})

const { api, apiAuth } = useApi()
const route = useRoute()
const router = useRouter()
const createSnackbar = useSnackbar()
// 取得現在的使用者
const user = useUserStore()
const nowAccount = user.account

// 頁面中歌曲的預設值
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

// 抓資料下來
const load = async () => {
  try {
    const { data } = await api.get('/song/' + route.params.id)
    console.log(data.result)
    song.value._id = data.result._id
    song.value.editor = data.result.editor
    song.value.songTitle = data.result.songTitle
    song.value.BPM = data.result.BPM
    song.value.singer = data.result.singer
    song.value.songStyle = data.result.songStyle
    song.value.signatureBeat = data.result.signatureBeat
    song.value.signatureNote = data.result.signatureNote
    song.value.scoreHiHat = data.result.scoreHiHat
    song.value.scoreSnare = data.result.scoreSnare
    song.value.scoreKick = data.result.scoreKick
    song.value.isPublic = data.result.isPublic

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

// 視窗------------------------------------
const isOpen = ref(false) // 決定對話框是否開啟

// 打開視窗 funtion******item待確認要不要放******
const openDialog = async (item) => {
  isOpen.value = true

  // 把原本的值 (song.value.XXX) 帶入表單內的值(XXX.value.value)
  singer.value.value = song.value.singer
  songTitle.value.value = song.value.songTitle
  BPM.value.value = song.value.BPM
  songStyle.value.value = song.value.songStyle
  scoreHiHat.value.value = song.value.scoreHiHat
  scoreSnare.value.value = song.value.scoreSnare
  scoreKick.value.value = song.value.scoreKick
  isPublic.value.value = song.value.isPublic
}

// 新增小節function----------------------------------------------------------------
const divisions = ref(16) // 這拍是以幾分音符來寫（相當於切成 division / 4 份）

const addSection = () => {
  // HiHat------------------
  scoreHiHat.value.value.push(
    Array.from({ length: song.value.signatureBeat }, () =>
    // 每拍以 division 分音符為一拍，相當於切成 division / 4 份
      Array.from({ length: divisions.value / 4 }, () =>
        // 每個預設值為false
        false
      )
    )
  )
  // 小鼓----------------------
  scoreSnare.value.value.push(
    Array.from({ length: song.value.signatureBeat }, () =>
    // 每拍以 division 分音符為一拍，相當於切成 division / 4 份
      Array.from({ length: divisions.value / 4 }, () =>
        // 每個預設值為false
        false
      )
    )
  )
  // 大鼓----------------------
  scoreKick.value.value.push(
    Array.from({ length: song.value.signatureBeat }, () =>
    // 每拍以 division 分音符為一拍，相當於切成 division / 4 份
      Array.from({ length: divisions.value / 4 }, () =>
        // 每個預設值為false
        false
      )
    )
  )
  console.log('新增小節')
}
// 歌曲基本資訊部分-----------------------------------------------------------------
// 選項（跟後端相同）--------------------------
// 曲風
const songStylies = ['流行', '龐克', '金屬', '後搖', '慢搖', '民謠', '爵士', '其他']

// 步驟2. 以schema定義格式---------------------
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
  // 加這個不影響submit
  scoreHiHat:
    yup.array().of(
      // 拍
      yup.array().of(
        // 拆成X份
        yup.array().of(
          yup.boolean()
        )
      )
    ),
  scoreSnare:
    yup.array().of(
      // 拍
      yup.array().of(
        // 拆成X份
        yup.array().of(
          yup.boolean()
        )
      )
    ),
  scoreKick:
    yup.array().of(
      // 拍
      yup.array().of(
        // 拆成X份
        yup.array().of(
          yup.boolean()
        )
      )
    ),
  isPublic: yup
    .boolean()
})

// 步驟3. useForm()建立表單－schema、初始值-------------------
// 解構出handleSubmit (處理送出表單的動作) 和 isSubmitting (判斷表單是否在送出)
const { handleSubmit, isSubmitting } = useForm({
  // 指定驗證格式使用上方建立的schema
  validationSchema: schema
})

// 步驟4. useField()建立表單的各個欄位-----------
// useField('name') => 返回與 name 字段相關的值(value)和錯誤訊息(errorMessage)
// v-model和error-messages會綁這些值
// 例如上方的v-model='singer.value.value'、:error-messages="singer.errorMessage.value"
const singer = useField('singer')
const songTitle = useField('songTitle')
const songStyle = useField('songStyle')
const BPM = useField('BPM')
// signatureBeat不可改，因此這裡不需要useField()
const scoreHiHat = useField('scoreHiHat')
const scoreSnare = useField('scoreSnare')
const scoreKick = useField('scoreKick')
const isPublic = useField('isPublic')

// *****待編輯*****
const submit = handleSubmit(async (values) => {
  try {
    if (nowAccount === song.value.editor) {
      const fd = new FormData()
      // 把東西放入form-data：fd.append(key, value)
      fd.append('singer', values.singer)
      fd.append('songTitle', values.songTitle)
      fd.append('songStyle', values.songStyle)
      fd.append('BPM', values.BPM)
      // 先以JSON 字串形式傳送到後端，後端再轉回來
      fd.append('scoreHiHat', JSON.stringify(values.scoreHiHat))
      fd.append('scoreSnare', JSON.stringify(values.scoreSnare))
      fd.append('scoreKick', JSON.stringify(values.scoreKick))
      fd.append('isPublic', values.isPublic)
      await apiAuth.patch('/song/' + song.value._id, fd)

      // 對話框
      createSnackbar({
        text: '編輯歌曲成功',
        snackbarProps: {
          color: 'green'
        }
      })
      isOpen.value = false // 關閉視窗
      router.go(0) // 重新加載當前的路由
    } else {
      // 應該要拋出error，待編輯******
      createSnackbar({
        text: '非原作者無法編輯',
        snackbarProps: {
          color: 'red'
        }
      })
    }
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '編輯歌曲發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
})

// 加入收藏function------------------------------------------------------------------------------------
// const props = defineProps(['_id', 'category', 'description', 'image', 'name', 'price', 'sell'])
// const loading = ref(false) // UIUX用，使按下去時按鈕為載入狀態（避免一直點）
// const saveSong = async () => {
//   // 如果沒有登入
//   if (!user.isLogin) {
//     // 就跳到登入頁
//     router.push('/login')
//     return
//   }
//   loading.value = true // 還沒跑完的時候loading為true
//   const result = await user.saveSong(props._id, 1)
//   createSnackbar({
//     text: result.text,
//     snackbarProps: {
//       color: result.color
//     }
//   })
//   loading.value = false // 跑完的時候loading為false
// }
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
