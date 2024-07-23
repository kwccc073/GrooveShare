<template>
    <v-table>
      <thead class="thead">
        <tr>
          <th>歌手/樂團</th>
          <th>歌名</th>
          <th>曲風</th>
          <th>BPM</th>
          <th>難易度</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="song in songs"
          :key="song.name"
        >
          <td>{{ song.singer }}</td>
          <td>{{ song.songTitle }}</td>
          <td>{{ song.songStyle }}</td>
          <td>{{ song.BPM }}</td>
          <td>{{ song.degreen }}</td>
          <td>
            <!-- 我的鼓譜-------------------- -->
            <!-- 已發布 -->
            <!-- v-if的路由待編輯 -->
            <div id="postingTools" class="toolBtns" v-if="route.path==='/myScore'">
              <!-- elevation="0"是去除v-btn預設的陰影 -->
              <!-- 鎖起來的 -->
              <v-btn elevation="0" prepend-icon=" mdi-lock"></v-btn>
              <!-- 沒鎖的 -->
              <v-btn elevation="0" prepend-icon=" mdi-lock-open-variant"></v-btn>
              <!-- 觀看鼓譜 -->
              <v-btn elevation="0" prepend-icon=" mdi-file-eye-outline" to="/watchScore"></v-btn>
              <!-- 刪除 -->
              <v-btn elevation="0" prepend-icon=" mdi-trash-can-outline" to="/watchScore"></v-btn>
            </div>

            <!-- 草稿匣 -->
            <!-- v-if的路由待編輯 -->
            <div id="editScoreTools" class="toolBtns" v-if="route.path==='/myScore'">
              <!-- elevation="0"是去除v-btn預設的陰影 -->
              <!-- 編輯鼓譜 -->
              <v-btn elevation="0" prepend-icon=" mdi-pencil" to="/editScore"></v-btn>
              <!-- 刪除鼓譜 -->
              <v-btn elevation="0" prepend-icon=" mdi-trash-can-outline"></v-btn>
            </div>

            <!-- 尋找鼓譜、我的收藏--------------------- -->
            <div id="seachScoreTools" class="toolBtns" v-if="route.path==='/searchScore'||route.path==='/save'">
              <!-- elevation="0"是去除v-btn預設的陰影 -->
              <!-- 未收藏 -->
              <v-btn elevation="0" prepend-icon=" mdi-cards-heart-outline"></v-btn>
              <!-- 已收藏 -->
              <v-btn elevation="0" prepend-icon=" mdi-cards-heart"></v-btn>
              <!-- 觀看鼓譜 -->
              <v-btn elevation="0" prepend-icon=" mdi-file-eye-outline" to="/watchScore"></v-btn>
              <!-- 下載 -->
              <v-btn elevation="0" prepend-icon=" mdi-cloud-download-outline"></v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </template>
<script setup>
import { ref } from 'vue'
// 取得現在路由
import { useRoute } from 'vue-router'

// 取得現在的路由
const route = useRoute()

const songs = ref([
  {
    singer: 'Green Day',
    songTitle: '21 Guns',
    songStyle: '龐克',
    BPM: 159,
    degreen: 2,
  },
  {
    singer: '周杰倫',
    songTitle: '告白氣球',
    songStyle: '流行',
    BPM: 180,
    degreen: 1,
  }

])
</script>

<style scoped lang="scss">
// 樣式待編輯
.v-table{
  thead{
    background: cadetblue;
    text-align: center;

    th:nth-child(1){
      text-align: center;
      background: yellow;
    }
  }

  tbody{
    text-align: center;
  }
}
</style>
