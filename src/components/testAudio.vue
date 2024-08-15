<template>
  <div>
    <audio :src="hiHatAudio" controls></audio>
    <audio :src="snareAudio" controls></audio>
    <audio :src="kickAudio" controls></audio>
  </div>
  <div>
    <h2>Vue 節拍器</h2>
    <label for="bpm">BPM: {{ bpm }}</label>
    <input type="range" id="bpm" v-model="bpm" min="40" max="240" />
    <button @click="toggleMetronome">{{ isPlaying ? '停止' : '開始' }}節拍器</button>
    <audio ref="metronomeSound" :src="hiHatAudio"></audio>
    <p>test: {{ BPM }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 引入音訊檔
import hiHatAudio from '@/assets/instruments/hiHat.wav'
import snareAudio from '@/assets/instruments/snare.wav'
import kickAudio from '@/assets/instruments/kick.wav'

// 外部要接收的東西
const props = defineProps(['signatureBeat', 'signatureNote', 'scoreHiHat', 'scoreSnare', 'scoreKick', 'BPM'])
console.log(props.BPM) // 有抓到
// 節拍器範例-------------------------------
const bpm = ref(120) // 預設每分鐘120拍
// console.log(props.soreSnare)
const isPlaying = ref(false) // 節拍器狀態
let intervalId = null // 初始化，以防出現undifined的錯誤
let currentBeat = 0

const metronomeSound = ref(null)

// 布林陣列，控制每拍是否有聲音
const beatPattern = ref([true, false, true, false]) // 範例：每四拍，第一和第三拍有聲音

const playClick = () => {
  const isSoundEnabled = beatPattern.value[currentBeat] // 取得當前拍子的布林值***第0個 => true ****

  // 如果當前拍子布林值為 false => 靜音(.muted=true)；當前拍子布林值為為 true => 取消靜音(.muted=false)
  metronomeSound.value.muted = !isSoundEnabled

  // 撥放音效
  // currentTime 表示當前音頻的播放時間
  metronomeSound.value.currentTime = 0
  metronomeSound.value.play() // 撥放

  // 移動到下一個拍子，並檢查是否需要回到第一拍
  currentBeat = (currentBeat + 1) % beatPattern.value.length
}

const toggleMetronome = () => {
  // 如果正在撥放，按下去會停止
  if (isPlaying.value) {
    clearInterval(intervalId) // 停止
  } else {
    // 計算拍子間隔（毫秒）
    const interval = (60 / bpm.value) * 1000
    intervalId = setInterval(playClick, interval)
  }
  isPlaying.value = !isPlaying.value
}
</script>
