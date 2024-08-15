<template>
  <v-container>
    <v-btn @click="playAudio">播放聲音</v-btn>
    <v-btn @click="pauseAudio">暫停聲音</v-btn>
    <audio ref="audioElement" src="/path/to/your/audio/file.mp3"></audio>
  </v-container>
</template>

<script>
export default {
  methods: {
    playAudio () {
      this.$refs.audioElement.play()
    },
    pauseAudio () {
      this.$refs.audioElement.pause()
    }
  }
}
</script>
