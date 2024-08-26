<template>
  <div>
    <!-- 起始狀態：非播放中且currentXXX皆為0的時候顯示 -->
    <v-btn icon @click="startPlay" v-if = "!isPlaying&&(currentSection === 0 && currentBeat === 0 && currentDivision === 0)" color="black">
      <v-icon>mdi-play</v-icon>
    </v-btn>
    <!-- 非播放中且播放到一半時顯示 -->
    <v-btn icon @click="toggleMetronome" v-if = "!isPlaying&&(currentSection != 0 || currentBeat != 0 || currentDivision != 0)" color="black">
      <v-icon>mdi-play</v-icon>
    </v-btn>
    <!-- 播放到一半 => 其中一個currentXXX不為0 -->
    <v-btn icon @click="startPlay" v-if = "!isPlaying&&(currentSection != 0 || currentBeat != 0 || currentDivision != 0)" color="black">
      <v-icon>mdi-replay</v-icon>
    </v-btn>
    <!-- 正在播放的時候顯示 -->
    <v-btn icon @click="toggleMetronome" v-if = "isPlaying" color="black">
      <v-icon>mdi-stop</v-icon>
    </v-btn>
    <audio ref="hiHatSound" :src="hiHatAudio"></audio>
    <audio ref="snareSound" :src="snareAudio"></audio>
    <audio ref="kickSound" :src="kickAudio"></audio>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import $ from 'jquery'
// 引入音訊檔
import hiHatAudio from '@/assets/instruments/hiHat.wav'
import snareAudio from '@/assets/instruments/snare.wav'
import kickAudio from '@/assets/instruments/kick.wav'

// 外部要接收的東西
const props = defineProps(['signatureBeat', 'signatureNote', 'scoreHiHat', 'scoreSnare', 'scoreKick', 'BPM'])

// 節拍器範例-------------------------------
const isPlaying = ref(false) // 是否為播放狀態
// 計算每個部分的間隔 => (每拍耗費幾秒)/4 *1000毫秒
// 註： /4 是因為每拍拆成4份
const interval = (60 / props.BPM) / 4 * 1000
let intervalId = null // 初始化，以防出現undifined的錯誤
let currentSection = 0 // 現在第幾小節
let currentBeat = 0 // 現在第幾拍
let currentDivision = 0 // 現在第幾部分

const hiHatSound = ref(null)
const snareSound = ref(null)
const kickSound = ref(null)

// console.log(`整份譜總共${props.scoreHiHat.length}個小節`)
// console.log(`每個小節總共${props.scoreHiHat[currentSection].length}拍`)
// console.log(`每拍總共${props.scoreHiHat[currentSection][currentBeat].length}個部分`)

const playClick = () => {
  $(`#s${currentSection + 1}-b${currentBeat + 1}`).addClass('current')
  // console.log(`現在是#s${currentSection + 1}-b${currentBeat + 1}`)
  // isXXXXSoundEnabled => 判斷現在這份是否要播放
  const isHiHatSoundEnabled = props.scoreHiHat[currentSection][currentBeat][currentDivision]
  const isSnareSoundEnabled = props.scoreSnare[currentSection][currentBeat][currentDivision]
  const isKickSoundEnabled = props.scoreKick[currentSection][currentBeat][currentDivision]

  // 如果當前拍子布林值為 false => 靜音(.muted=true)；當前拍子布林值為為 true => 取消靜音(.muted=false)
  hiHatSound.value.muted = !isHiHatSoundEnabled
  snareSound.value.muted = !isSnareSoundEnabled
  kickSound.value.muted = !isKickSoundEnabled

  // 撥放音效
  // currentTime 表示當前音頻的播放時間
  hiHatSound.value.currentTime = 0
  snareSound.value.currentTime = 0
  kickSound.value.currentTime = 0
  hiHatSound.value.play() // 撥放
  snareSound.value.play() // 撥放
  kickSound.value.play() // 撥放

  // 移動到下一個拍子
  currentDivision = currentDivision + 1
  // 檢查：如果 currentDivision 超過每拍的總部分 => 進行下一拍的第0部分
  if (currentDivision >= props.scoreHiHat[currentSection][currentBeat].length) {
    currentBeat = currentBeat + 1
    currentDivision = 0

    // 檢查：如果currentBeat 超過每個小節的總拍數 => 進行下一小節的第0拍的第0部分
    if (currentBeat >= props.scoreHiHat[currentSection].length) {
      currentSection = currentSection + 1
      currentBeat = 0
      currentDivision = 0

      // 檢查：如果 currentSection 超過整個譜的總寫結束 => 三個值都歸零且停止
      if (currentSection >= props.scoreHiHat.length) {
        clearInterval(intervalId)
        isPlaying.value = false
        currentSection = 0
        currentBeat = 0
        currentDivision = 0
        // 全部清除class
        $('.beat').removeClass('current')
      }
    }
  }
}

const toggleMetronome = () => {
  // 如果正在撥放，按下去會停止計時器
  // 不歸零 => 可以從暫停的地方接續播放
  if (isPlaying.value) {
    clearInterval(intervalId)
  } else {
    intervalId = setInterval(playClick, interval)
  }
  isPlaying.value = !isPlaying.value
}

// 歸零並開始播放
const startPlay = () => {
  isPlaying.value = true
  currentSection = 0
  currentBeat = 0
  currentDivision = 0
  // 全部清除class
  $('.beat').removeClass('current')
  intervalId = setInterval(playClick, interval)
}
</script>

<style lang="scss">
  .current{
    background: rgb(233, 233, 233);
  }
</style>
