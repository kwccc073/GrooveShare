<template>
    <v-table>
        <thead>
            <!-- 第幾行--------------------------- -->
            <tr>
              <th></th>
              <th colspan="4">第1行</th>
            </tr>
            <!-- 第幾小節------------------------- -->
            <tr>
              <th></th>
              <!-- 第1行 -->
              <th>1-1</th>
              <th>1-2</th>
              <th>1-3</th>
              <th>1-4</th>
              <!-- 第2行 -->
              <th>2-1</th>
              <th>2-2</th>
              <th>2-3</th>
              <th>2-4</th>
            </tr>
        </thead>
        <!-- 樂器 -->
        <tbody>
            <tr>
              <td v-for="num in numbers" :key="num">{{ num }}</td>
            </tr>
        </tbody>
    </v-table>
</template>

<script setup>
// 每個格子裡面都有一變數，值為true的時候一種顏色，false時則為另一種，分別表示按下/沒按
// 顏色可以用addClass來改變，true的時候有class，反之則無
// 當格子click時，改變此變數的值true/false
// 根據true/false決定是否撥放聲音

import { ref } from 'vue'

// 一個小節有幾拍 (常見4拍)------------
const signatureSection = ref(4)
// 以幾分音符為一拍 (常見4分)-----------
const signatureNote = ref(4)
// 每拍拆成幾份 (常見8,16,32分音符)-----
// 原本要用ref()包，先暫時拿掉
// 第1拍
const division1 = 16
// 第2拍
const division2 = 16
// 第3拍
const division3 = 16
// 第4拍
const division4 = 16

// 以4/3、一小節為例-----------------------------
// 第一列：第幾小節
// 一整列的colspan會等於所有division加起來
let totaldivisions = division1 + division2 + division3 + division4

// 第二列－總共幾拍
// signatureSection為幾，這裡就為幾格
// 每格的colspan會等於 division/4

// 第三列及以後
// 總共會有totalDivision格

// 創建一個陣列，從 0到totalDivision
const numbers = ref([])
for (let i = 0; i < totaldivisions; i++) {
  numbers.value.push(i)
}
console.log(numbers)

// 目前畫出第三列的格子
// 第二、第一列待編輯
</script>
