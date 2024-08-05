<template>
  <v-container>
    <!-- 網頁介紹------------------------------------------------------- -->
    <div id="introduceArea">網頁介紹</div>

    <!-- 最新上架-------------------------------------------------------- -->
    <div id="newArea">
      <h1>最新上架</h1>
      <!-- 卡片待編輯
       會用到v-for -->
       <v-col cols="12" md="3">
        <SongCard></SongCard>
       </v-col>
      <v-card>
        <v-card-title>卡片標題</v-card-title>
        <v-card-text>卡片內容</v-card-text>
      </v-card>
    </div>

    <!-- 熱門排行榜-------------------------------------------------------- -->
    <div id="rankingArea">
      <h1>熱門排行榜</h1>
      <v-row>
        <v-col cols="12" md="4">
          <v-card id="popularSong" class="popularArea">
            <v-card-title>熱門歌曲</v-card-title>
            <v-card-text>待編輯</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card id="popularSinger" class="popularArea">
            <v-card-title>熱門歌手/樂團</v-card-title>
            <v-card-text>待編輯</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card id="popularGenres" class="popularArea">
            <v-card-title>熱門曲風</v-card-title>
            <v-card-text>待編輯</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
// 引入自定義套件
import SongCard from '@/components/SongCard.vue'

definePage({
  meta: {
    title: '首頁',
    login: false
  }
})
</script>

<style scoped lang="scss">
.container{
  width: 80vw;
  margin: auto;
}

// 網頁介紹-------------------------------------------------------------
#introduceArea{
  width: 100%;
  height: 50vh;
  margin: auto;
  border: 1px solid black;
  margin-bottom: 3rem;
}
// 最新上架-------------------------------------------------------------
#newArea{
  width: 100%;
  text-align: center;
  margin-bottom: 3rem;

  // .v-card{
  //   border: 1px solid black;
  // }
}
// 熱門排行榜------------------------------------------------------------
#rankingArea{
  width: 100%;
  text-align: center;
  margin-bottom: 3rem;
}
</style>
