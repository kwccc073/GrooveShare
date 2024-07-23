<template>
  <!-- 參考：https://vuetifyjs.com/en/components/dialogs/#anatomy -->
  <div class="text-center pa-4">
    <v-btn prepend-icon="mdi-account" @click="logInDialog = true">
      註冊/登入
    </v-btn>

    <v-dialog
      v-model="logInDialog"
      width="auto"
    >
      <v-card
      >
      <v-card-title>會員登入</v-card-title>
      <v-card-text>
        <!-- ******************內容待編輯************************** -->
        <p>登入待編輯，待元件register.vue完成後再改</p>
        <p>尚未註冊會員？</p>
        <v-btn  @click="registerDialog = true" id="registerBtn">
          點我註冊
        </v-btn>

        <v-dialog
          v-model="registerDialog"
          width="auto"
        >
          <v-card>
            <v-card-title>會員註冊</v-card-title>
            <v-card-text>
              <register></register>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card-text>
      </v-card>
    </v-dialog>
  </div>

</template>
<script setup>
import { ref } from 'vue'
// 引入套件
import register from '@/components/bar/register.vue'


// 彈出登入視窗用
const logInDialog = ref(false)
const registerDialog = ref(false)

</script>

<style scoped lang="scss">
.v-dialog{

  .v-card{
    width: 50vw;

    #registerBtn{
      color: skyblue;
    }
  }
}

</style>
