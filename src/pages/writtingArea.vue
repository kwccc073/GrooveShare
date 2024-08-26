<!-- 樂譜部分排版待編輯 -->
<template>
  <breadcrumbs></breadcrumbs>
  <v-form @submit.prevent="submit" :disabled="isSubmitting">
    <!-- 歌曲基本資料-------------------------------------------------------------------------- -->
    <v-row id="songInformation">
      <v-col class="v-col" cols="12" md="6">
        <span>演奏/演唱者：</span>
        <!-- 綁定欄位的 v-model、:error-messages -->
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
      <v-col class="v-col" cols="6" xl="3">
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
      <v-col class="v-col" cols="6" xl="3">
        <span>BPM：</span>
        <v-text-field
          placeholder="請輸入BPM"
          type="number" min="0"
          v-model="BPM.value.value"
          :error-messages="BPM.errorMessage.value"
        ></v-text-field>
      </v-col>
      <v-col class="v-col" cols="6" xl="3" id="signature">
        <span>拍號：</span>
        <!-- 一個小節幾拍 -->
        <!-- @update:modelValue="" 用來監測此值的變化 -->
        <v-autocomplete
          :items="signatureBeats"
          v-model="signatureBeat.value.value"
          :disabled="isDisabled"
        ></v-autocomplete>
        <span>/</span>
        <!-- 以幾分音符為一拍 -->
        <v-autocomplete
          :items="signatureNotes"
          v-model="signatureNote.value.value"
          :disabled="isDisabled"
        ></v-autocomplete>
      </v-col>
      <v-col class="v-col" cols="6" xl="3">
        <span>隱私狀態：</span>
        <v-checkbox
          label="公開"
          v-model="isPublic.value.value"
          @change="console.log(isPublic.value.value)"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="btns-nonstart">
        <v-btn @click="start()" v-if="!isStart" color="black">開始寫譜</v-btn>
      </v-col>
    </v-row>
    <!-- 樂譜部分-------------------------------------------- -->
    <v-row id="scoreArea" class="h-100" >
      <template v-for="(section, sectionIndex) in scoreHiHat.value.value" :key="sectionIndex">
        <!--  樂器(列)名稱------------------------------------- -->
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
                <!-- HiHat------------------------------------->
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
                <!-- 小鼓------------------------------------->
                <div class="snare-area noteArea w-100  d-flex">
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
      <v-col cols="12" class="btns-start">
        <v-btn id="btn-plus" @click="addSection()" :disabled="!isDisabled" v-if="isStart" prepend-icon="mdi-plus" elevation="0">新增小節</v-btn>
        <v-btn type="submit" :loading="isSubmitting" :disabled="!isDisabled" color="black" v-if="isStart" prepend-icon="mdi-upload-multiple">上傳</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
// 取得當前使用者資料
import { useUserStore } from '@/stores/user'
// 引入自定義元件
import breadcrumbs from '@/components/breadcrumbs'
import { ref } from 'vue'
// 引入驗證套件
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
// 引入useApi
import { useApi } from '@/composables/axios'
// 對話框
import { useSnackbar } from 'vuetify-use-dialog'
// 跳轉分頁用
import { useRouter } from 'vue-router'
// 引入斷點
import { useDisplay } from 'vuetify'

definePage({
  meta: {
    title: 'GrooveShare | 寫譜專區',
    // login: true
  }
})

// 取出apiAuth（要把資料傳出去都要引入這個）
const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

// 取得當前使用者資料
const user = useUserStore()
const account = user.account

const router = useRouter() // 跳到其他分頁用
const { xl } = useDisplay() // 斷點

// 歌曲基本資訊部分-----------------------------------------------------------------
// 選項（跟後端相同）--------------------------
// 曲風
const songStylies = ['流行', '龐克', '金屬', '後搖', '慢搖', '民謠', '爵士', '其他']
// 拍號：一個小節有幾拍
const signatureBeats = [2, 3, 4, 6, 9]
// 拍號－以幾分音符為一拍
const signatureNotes = [2, 4, 8]
// 禁用按鈕
const isDisabled = ref(false)

// 以schema定義格式---------------------
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
  signatureBeat: yup
    .number()
    .required('拍號必填')
    .test('issignatureBeat', '拍號錯誤', value => {
      return signatureBeats.includes(value)
    }),
  // 以幾分音符為一拍
  signatureNote: yup
    .number()
    .required('拍號必填')
    .test('issignatureNote', '音符拍數錯誤', value => {
      return signatureNotes.includes(value)
    }),
  // 加這個不影響submit
  scoreHiHat:
  // yup.string(),
  // 小節****待編輯*******
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

// useForm()建立表單－schema、初始值-------------------
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
    signatureBeat: 4,
    signatureNote: 4,
    scoreHiHat: [],
    scoreSnare: [],
    scoreKick: [],
    isPublic: true
  }
})

// useField()建立表單的各個欄位-----------
// useField('name') => 返回與 name 字段相關的值(value)和錯誤訊息(errorMessage)
// v-model和error-messages會綁這些值
// 例如上方的v-model='singer.value.value'、:error-messages="singer.errorMessage.value"
const singer = useField('singer')
const songTitle = useField('songTitle')
const songStyle = useField('songStyle')
const BPM = useField('BPM')
const signatureBeat = useField('signatureBeat') // 一小節有幾拍
const signatureNote = useField('signatureNote') // 以幾分音符為一拍
const scoreHiHat = useField('scoreHiHat')
const scoreSnare = useField('scoreSnare')
const scoreKick = useField('scoreKick')
const isPublic = useField('isPublic')

// 開始寫譜（會帶入一個小節）***可以改成帶入多個小節，待編輯***-------------------------------------------------------------
const divisions = ref(16) // 這拍是以幾分音符來寫（相當於切成 division / 4 份）
const isStart = ref(false)
const start = () => {
  if (!user.isLogin) {
    alert('請先登入會員')
    router.push('/')
  }
  isStart.value = true
  // HiHat---------------------
  scoreHiHat.value.value.push(
    // signatureBeat.value.value表示一小節有幾拍 (常見4拍)
    Array.from({ length: signatureBeat.value.value }, () =>
    // 每拍以 division 分音符為一拍，相當於切成 division / 4 份
      Array.from({ length: divisions.value / 4 }, () =>
        // 每個預設值為false
        false
      )
    )
  )
  // 小鼓----------------------
  scoreSnare.value.value.push(
    Array.from({ length: signatureBeat.value.value }, () =>
    // 每拍以 division 分音符為一拍，相當於切成 division / 4 份
      Array.from({ length: divisions.value / 4 }, () =>
        // 每個預設值為false
        false
      )
    )
  )
  // 大鼓----------------------
  scoreKick.value.value.push(
    Array.from({ length: signatureBeat.value.value }, () =>
    // 每拍以 division 分音符為一拍，相當於切成 division / 4 份
      Array.from({ length: divisions.value / 4 }, () =>
        // 每個預設值為false
        false
      )
    )
  )
  // 開始寫譜按鈕按下去後就禁止調整拍號、BPM
  isDisabled.value = !isDisabled.value
}

// 新增小節function----------------------------------------------------------------
const addSection = () => {
  // HiHat------------------
  scoreHiHat.value.value.push(
    Array.from({ length: signatureBeat.value.value }, () =>
    // 每拍以 division 分音符為一拍，相當於切成 division / 4 份
      Array.from({ length: divisions.value / 4 }, () =>
        // 每個預設值為false
        false
      )
    )
  )
  // 小鼓----------------------
  scoreSnare.value.value.push(
    Array.from({ length: signatureBeat.value.value }, () =>
    // 每拍以 division 分音符為一拍，相當於切成 division / 4 份
      Array.from({ length: divisions.value / 4 }, () =>
        // 每個預設值為false
        false
      )
    )
  )
  // 大鼓----------------------
  scoreKick.value.value.push(
    Array.from({ length: signatureBeat.value.value }, () =>
    // 每拍以 division 分音符為一拍，相當於切成 division / 4 份
      Array.from({ length: divisions.value / 4 }, () =>
        // 每個預設值為false
        false
      )
    )
  )
  console.log('新增小節')
}

// 定義送出的function-----------------------------------------------------------------
const submit = handleSubmit(async (values) => {
  try {
    const fd = new FormData()

    // 把東西放入form-data：fd.append(key, value)
    fd.append('editor', account) // 建立此歌曲的使用者
    fd.append('singer', values.singer)
    fd.append('songTitle', values.songTitle)
    fd.append('songStyle', values.songStyle)
    fd.append('BPM', values.BPM)
    fd.append('signatureBeat', values.signatureBeat)
    fd.append('signatureNote', values.signatureNote)
    // 先以JSON 字串形式傳送到後端，後端再處理
    fd.append('scoreHiHat', JSON.stringify(values.scoreHiHat))
    fd.append('scoreSnare', JSON.stringify(values.scoreSnare))
    fd.append('scoreKick', JSON.stringify(values.scoreKick))
    fd.append('isPublic', values.isPublic)
    console.log('isPublic的資料型態為', typeof (values.isPublic))

    // 新增樂譜
    await apiAuth.post('/song', fd)

    // 對話框
    createSnackbar({
      text: '建立歌曲成功',
      snackbarProps: {
        color: 'green'
      }
    })
    router.push('/myScore')
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

<style scoped lang="scss">
// 一整列------------------------------------------------------------------------------------------------
#songInformation{
  font-size: 1.2rem;
  .v-col{
    display: flex;
    // flex-direction: column;
    // justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  // 拍號
  #signature{
    display: flex;
    justify-content: center;
    align-content: center;
    .v-select{
      display: inline-block;
      width: 30%;
      height: 30%;
    }
  }
  // 隱私設定
  .v-checkbox{
    display: flex;
  }
}
.btns-nonstart{
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
  font-size: 1.2rem;
  .v-col{
    padding: 0;
    margin-bottom: 2rem;
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
  .btns-start{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
}

.v-btn{
  font-size: 1rem;
}

#btn-plus{
  border: 1px solid black;
}

.displayNone{
  display: none
}
</style>
