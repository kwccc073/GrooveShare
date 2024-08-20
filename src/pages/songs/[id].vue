<template>
  <v-container>
    <!-- v-if="isEditing" => 編輯狀態；v-else => 非編輯狀態-->
    <!-- 歌曲資訊-------------------------------------------------------------------- -->
    <v-form @submit.prevent="submit" :disabled="isSubmitting">
      <!-- 歌曲資訊------------------------------------ -->
      <v-row id='songInformation'>
        <v-col cols="12" id="isEditing-title" v-if="isEditing">
          <span>編輯中</span>
          <v-btn :loading="isSubmitting" @click="isEditing = false" v-if="isEditing">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" v-if="!isEditing" style="display: flex;justify-content: center;align-items: center;">
          <h1>{{ song.singer }} - {{ song.songTitle }}</h1>
          <!-- 播放按鈕 -->
          <playSound v-bind="song" :key="song._id" v-if="!isEditing"></playSound>
        </v-col>
        <template v-if="isEditing">
          <v-col class="v-col" cols="12" md="6">
            <span>演奏/演唱者：</span>
              <v-text-field
                placeholder="請輸入演奏/演唱者"
                v-model="singer.value.value"
                :error-messages="singer.errorMessage.value"
              ></v-text-field>
          </v-col>
          <v-col class="v-col" cols="12" md="6">
            <span>歌名：</span>
              <v-text-field
                placeholder="請輸入歌名"
                v-model="songTitle.value.value"
                :error-messages="songTitle.errorMessage.value"
              ></v-text-field>
          </v-col>
        </template>
        <v-col class="v-col" cols="6" lg="3">
          <span>曲風：</span>
          <v-autocomplete
            v-if="isEditing"
            label="請選擇曲風"
            :items="songStylies"
            v-model="songStyle.value.value"
            :error-messages="songStyle.errorMessage.value"
          ></v-autocomplete>
          <span v-else>{{ song.songStyle }}</span>
        </v-col>
        <v-col class="v-col" cols="6" lg="3">
          <span>BPM：</span>
            <template v-if="isEditing">
              <v-text-field
                placeholder="請輸入BPM"
                type="number" min="0"
                v-model="BPM.value.value"
                :error-messages="BPM.errorMessage.value"
              ></v-text-field>
            </template>
            <span v-else>{{ song.BPM }}</span>
        </v-col>
        <v-col class="v-col" cols="6" lg="3" v-if="!isEditing">
          作者：{{song.editor}}
        </v-col>
        <v-col cols="6" lg="3" id="public">
          <span>隱私狀態：</span>
          <v-checkbox
            v-if="isEditing"
            v-model="isPublic.value.value"
            @change="console.log(isPublic.value.value)"
          ></v-checkbox>
          <template v-else>
            <!-- 公開－true -->
            <v-icon v-if="song.isPublic">mdi-lock-open-variant</v-icon>
            <!-- 隱私－false -->
            <v-icon v-else>mdi-lock</v-icon>
          </template>
        </v-col>
        <v-col cols="12" class="btns" style="display: flex;justify-content: end;">
          <template v-if="!isEditing">
            <!-- 如果是作者顯示編輯、刪除按鈕 -->
            <template v-if="nowAccount === song.editor">
              <v-btn prepend-icon="mdi-pencil-outline" @click="editSong(null)" >編輯</v-btn>
              <v-btn prepend-icon="mdi-trash-can-outline" @click="deleteSong(null)" >刪除</v-btn>
            </template>
            <!-- 否則顯示收藏按鈕 -->
            <!-- 如果已經收藏，按鈕文字要改成"取消收藏 -->
            <template v-else>
              <v-btn color="primary" prepend-icon="mdi-cards-heart" @click="saveSong" :loading="loadingSave" v-if="song.isSaved">取消收藏</v-btn>
              <v-btn color="primary" prepend-icon="mdi-cards-heart-outline" @click="saveSong" :loading="loadingSave" v-else>收藏</v-btn>
            </template>
          </template>
        </v-col>
      </v-row>

      <!-- 樂譜部分------------------------------------------------------------------------------ -->
      <!-- song.scoreHiHat[小節][第幾拍][第幾部分] -->
      <!-- 編輯狀態 ------------------------------------->
      <v-row id='scoreArea' class="h-100" v-if="isEditing">
        <template v-for="(section, sectionIndex) in scoreHiHat.value.value" :key="sectionIndex">
          <!-- 樂器(列)名稱------------------------------------- -->
          <!-- 最大尺寸時，sectionIndex%2==1的時候不顯示 -->
          <!-- 其他小尺寸則全都要顯示****待編輯**** -->
          <v-col cols="2" class="instruments w-100" :class="{displayNone:(sectionIndex%2==1)&&xl}">
            <div class="row-name-section"></div>
            <div class="row-name-beat"></div>
            <div class="row-name-instrument">Hi-Hat</div>
            <div class="row-name-instrument">小鼓</div>
            <div class="row-name-instrument">大鼓</div>
          </v-col>
          <!-- 小節 -->
          <v-col cols="10" xl="5" class="section v-col">
            <div class="sectionTitle">section - {{sectionIndex+1}}</div>
            <div class="allBeats">
              <!-- 一拍------------------------------------------------------------ -->
              <div class="beat w-100" v-for="(beat, beatIndex) in section" :key="beatIndex">
                <div class="beatTile">beat -  {{beatIndex + 1}}</div>
                  <div class="allNoteAreas">
                    <!-- HiHat----------------------------------- -->
                    <div class="HiHat-area noteArea w-100 d-flex">
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
                    <!-- 小鼓----------------------------------- -->
                    <div class="snare-area noteArea w-100 d-flex">
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
                    <!-- 大鼓----------------------------------- -->
                    <!-- scoreKick[第X小節][第X拍][第X拍的第X部分] -->
                    <div class="kick-area noteArea w-100 d-flex">
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
        </template>
        <v-col cols="12" class="btns-editing">
          <template v-if="isEditing">
            <v-btn @click="addSection()" prepend-icon="mdi-plus">新增小節</v-btn>
            <v-btn type="submit" :loading="isSubmitting" color="green">儲存</v-btn>
          </template>
        </v-col>
      </v-row>
    </v-form>
    <score v-bind="song" v-if="!isEditing"></score>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { definePage } from 'vue-router/auto'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '@/stores/user' // 取得現在的使用者
// 引入自定義的元件－音符
import score from '@/components/score.vue'
import playSound from '@/components/playSound.vue'
// 引入斷點
import { useDisplay } from 'vuetify'

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
const nowSaving = user.saving
const { xl } = useDisplay() // 斷點

// 頁面中歌曲的預設值
const song = ref({
  _id: '',
  songTitle: '',
  BPM: 0,
  singer: '',
  sell: true,
  songStyle: '',
  signatureBeat: 4,
  signatureNote: 4,
  scoreHiHat: [[[]]],
  scoreSnare: [[[]]],
  scoreKick: [[[]]],
  isSaved: false
})

// 抓資料下來------------------------------------------------------
const load = async () => {
  try {
    const { data } = await api.get('/song/' + route.params.id)
    // console.log(data.result)
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
    // 是否被收藏
    song.value.isSaved = nowSaving.includes(song.value._id)

    document.title = 'Title | ' + song.value.songTitle
    console.log(song)
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

onMounted(() => {
  load()
})
console.log(song)
// console.log(song.value) // 取不到
// console.log(song.value.BPM) // 取不到
// console.log(nowSaving.includes(song.value._id))

// 視窗------------------------------------
const isEditing = ref(false) // 決定對話框是否開啟

// 打開視窗 funtion******item待確認要不要放******
const editSong = async (item) => {
  isEditing.value = true

  console.log(song.value.BPM) // 取的到值
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

// 編輯功能------------------------------------------------------
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
      isEditing.value = false // 關閉視窗
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

// 收藏歌曲function------------------------------------------------------------------------------------
const loadingSave = ref(false)
const saveSong = async () => {
  // 如果沒有登入
  if (!user.isLogin) {
    alert('請先登入帳號')
    return
  }
  loadingSave.value = true // 還沒跑完的時候loading為true
  const result = await user.saveSong(song.value._id)
  // console.log(result)
  createSnackbar({
    text: result.text,
    snackbarProps: {
      color: result.color
    }
  })
  song.value.isSaved = !song.value.isSaved
  loadingSave.value = false // 跑完的時候loading為false
}

// 刪除歌曲function----------------------------------------
const deleteSong = () => {
  try {
    if (nowAccount === song.value.editor) {
      alert('確定要刪除歌曲嗎？')
      apiAuth.delete('/song/' + song.value._id)
      createSnackbar({
        text: '刪除歌曲成功',
        snackbarProps: {
          color: 'green'
        }
      })
      // 刪除成功，跳轉至"我的鼓譜"
      router.push('/myScore')
    } else {
      alert('非原作者，無權限刪除')
    }
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error?.response?.data?.message || '刪除歌曲發生錯誤',
      snackbarProps: {
        color: 'red'
      }
    })
  }
}
</script>

<style scoped lang="scss">
// 一整列------------------------------------------------------------------------------------------------
.v-container{
  .v-form{
    #songInformation{
    .v-col{
      display: flex;
      // flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
    }

    // 編輯中字樣
    #isEditing-title{
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 2rem;
      color: red;
    }

    // 隱私狀態
    #public{
      display: flex;
      align-items: center;
    }
    // 拍號
    // #signature{
      // display: flex;
      // justify-content: center;
      // align-content: center;

    //   .v-select{
    //     display: inline-block;
    //     width: 30%;
    //     height: 30%;
    //   }
    // }
    // 隱私設定
    .v-checkbox{
      display: flex;
    }
  }

  .btns{
      display: flex;
      justify-content: center;
      align-items: center;
    }
      // 樂譜部分--------------------------------------------------------------------
      #scoreArea{
        display: flex;
        box-sizing: border-box;
        // border: 1px solid black;
        padding: 0;
        text-align: center;

        .v-col{
          padding: 0;
          margin-top: 1rem
        }

        .sectionTitle,
        .beatTile,
        .row-name-section,
        .row-name-beat{
          width: 100%;
          height: 30px; // 高度待編輯
          box-sizing: border-box;
          // font-size: 1rem; // 字體大小待編輯
          padding: 0;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid black;
        }
        // 去掉中間的線
        .row-name-section{
          border-bottom: 0px solid black;
        }
        .row-name-beat{
          border-top: 0px solid black;
        }

        .allNoteAreas{
          // background: chocolate;
        }

        // 樂器(列)名稱-------------------------------------------------
        // 如果尺寸為xl時，偶數的.instruments會display:none****2待編輯*****
        // .row-name-instrument單行的高度會等於noteArea（也等於allNoteAreas/3）
        .row-name-instrument,
        .noteArea{
          box-sizing: border-box;
          border: 1px solid black;
          width: 100%;
          height: 50px;
        }

        .row-name-instrument{
          display: flex;
          justify-content: center;
          align-items: center;
        }
        // 一個小節 ----------------------------------------------------
        .section{
          padding: 0;
          display: flex;
          flex-direction: column;

          // 一個小節裡的所有拍-----------------------------
          .allBeats{
            padding: 0;
            display: flex;

            // 每一拍
            .beat{
              padding: 0rem;

              .allNoteAreas{
                .noteArea{
                  display: flex;
                  justify-content: center;

                  .v-checkbox{
                    // display: flex;
                    font-size: 0.8rem; // 勾選框大小
                  }
                }
            }
            }
          }
        }
      .btns-editing{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }
    }
  }
}

.displayNone{
  display: none
}
</style>
