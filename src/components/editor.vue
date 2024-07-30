<template>
  <!-- 新增小節按鈕 -->
  <v-btn id="addSection">新增小節</v-btn>
  <v-container class="editor">
    <v-form>
      <!-- 一列 -->
      <v-row>
        <!--  樂器(列)名稱------------------------------------- -->
        <v-col class="instruments w-100">
          <div class="row-name"></div>
          <div class="row-name"></div>
          <div class="row-name">Hi-Hat</div>
          <div class="row-name">snare (小鼓)</div>
          <div class="row-name">kick (大鼓)</div>
        </v-col>
        <!-- 一個小節------------------------------------------ -->
         <v-col class="sections w-100">
          <h1 class="n-section w-100">第x小節</h1>
          <!-- 一個小節裡總共幾拍 -->
          <div class="divisions w-100">
            <!-- 每一拍 -->
            <div class="n-division w-25" v-for="(item,index) in signatureSectionItems" :key="index">
              <h2>第{{index+1}}拍</h2>
              <!-- 所有音符：HiHat、snare、kick，總共三組 -->
              <div class="notes w-1000">
                <!-- 不同聲音再拆開來 -->
                <!-- HiHat-------------------------- -->
                <div class="hiHat-notes w-100">
                  <!-- 單個按鈕 -->
                  <!-- 加顏色待編輯 -->
                  <v-checkbox
                    class="n-hiHat-note"
                    v-for="(item,index) in divisionIitems"
                    :key="index">
                  </v-checkbox>
                </div>
                <!-- 小鼓--------------------------- -->
                <div class="snare-notes w-100">
                  <!-- 單個按鈕 -->
                  <v-checkbox
                    class="n-snare-note"
                    v-for="(item,index) in divisionIitems"
                    :key="index">
                  </v-checkbox>
                </div>
                <!-- 大鼓--------------------------- -->
                <div class="kick-notes w-100">
                  <!-- 單個按鈕 -->
                  <v-checkbox
                    class="n-kick-note"
                    v-for="(item,index) in divisionIitems"
                    :key="index">
                  </v-checkbox>
                </div>
              </div>
            </div>
          </div>
         </v-col>
      </v-row>
  </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

// 1. 定義schema

// 一個小節有幾拍 (常見4拍) *****ref先拿掉*****------------
const signatureSection = 4
const signatureSectionItems = Array.from({ length: signatureSection }) // 創建一個長度為signatureSection之陣列

// 以幾分音符為一拍 (常見4分)  *****ref先拿掉*****-----------
const signatureNote = 4
const signatureNoteItems = Array.from({ length: signatureNote }) // 創建一個長度為 signatureNote 之陣列

// 每拍拆成幾份 (常見8,16,32分音符)---------------
// 原本要用ref()包，先暫時拿掉
// 第1拍為16分音符
const division1 = 16
// 第2拍
// const division2 = 16

// 產生按鈕---------------------------------------------------
// 8分音符 => 每拍會拆成2份
// 16分音符 => 每拍會拆成4份
// 32分音符 => 每拍會拆成8份
// 得到：n分音符 => 每拍會拆成 n/4 份
// v-for要用陣列，因此將 n/4 份 拆成陣列，拆成幾份就有幾個值
const divisionIitems = Array.from({ length: division1 / 4 }) // 創建一個長度為 division1 / 4 之陣列
// 判斷每個按鈕是否被點擊之變數
const isActive = ref((Array(divisionIitems.length).fill(false))) // 創建與陣列divisionIitems相同長度的陣列，並指定所有元素為falsue

// 定義點擊時用到的函數******改成checkbox應該就不需要了******
// function toggleClass (key) {
//   // 點擊時布林值會切換
//   isActive.value[key] = !isActive.value[key]
//   console.log(isActive.value[key]) // 確定布林值會切換
//   // 改變顏色待編輯
// }

// 以4/3、一小節為例-----------------------------
// 第一列：第幾小節
// 一整列的colspan會等於所有division加起來

// 第二列－總共幾拍
// signatureSection為幾，這裡就為幾格
// 每格的colspan會等於 division/4

// 第三列及以後
// 總共會有totalDivision格

// 目前畫出第三列的格子
// 第二、第一列待編輯
</script>

<style scoped lang="scss">
// 一整列------------------------------------------------------------------------------------------------
.v-row{
  background: lavenderblush;
  padding: 0;
  // 樂器(列)名稱-------------------------------------------------
  .instruments{
    background: lawngreen;
    padding: 0;
    .row-name{
      height: 20%;
      background: orange;
      width: 100%;
    }
  }

  // 一個小節 ----------------------------------------------------
  .sections{
    background: lemonchiffon;
    padding: 0;
    // 標題：第X小節---------------------------------
    .n-section{
      height: 20%;
      background: darkgoldenrod;
      font-size: 1rem; // 字體大小待編輯
      padding: 0;
    }
    // 一個小節裡總共幾拍-----------------------------
    .divisions{
      background: darkcyan;
      display: flex;
      justify-content: space-around;
      gap: 0.5rem; // 彈性項目之間的間距
      padding: 0;
      .n-division{
        padding: 0;
        // 標題：第x拍
        h2{
          font-size: 1rem;
        }

        // 所有音符--------------------
        .notes{
          background: olivedrab;
          display: flex;
          flex-direction: column;
          gap: 0.5rem; // 彈性項目之間的間距

          .hiHat-notes,
          .snare-notes,
          .kick-notes{
            display: flex;
            justify-content:space-between;
            background: chartreuse;

          }

          // 單個按鈕
          .n-hiHat-note,
          .n-snare-note,
          .n-kick-note{
            width: 20%;
            background: darkmagenta;
          }
        }
      }
    }
  }
}

.active{
  background: red;
}
</style>
