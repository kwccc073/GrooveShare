<template>
<!-- 上課範例中，v-form標籤裡有 @submit.prevent="submit" :disabled="isSubmitting"，這裡先暫時拿掉 -->
<v-form>
  <!-- 帳號、密碼、信箱等規則先照上課範例 -->
  <!-- 上課範例中，v-text-field標籤裡有v-model、:error-messages，這裡先暫時拿掉-->
  <v-text-field
    label="帳號"
    minlength="4" maxlength="20" counter
  ></v-text-field>
  <v-text-field
    label="信箱" type="email"
  ></v-text-field>
  <v-text-field
    label="密碼" type="password"
    minlength="4" maxlength="20" counter
  ></v-text-field>
  <v-text-field
    label="確認密碼" type="password"
    minlength="4" maxlength="20" counter
  ></v-text-field>
  <div class="text-center">
    <!-- 上課範例中，v-btn標籤裡有:loading="isSubmitting"，這裡先暫時拿掉 -->
    <v-btn type="submit">註冊</v-btn>
  </div>
</v-form>
</template>

<script setup>
// 待編輯
</script>
