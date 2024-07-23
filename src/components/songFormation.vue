<template>
    <!-- 上課範例中，v-form標籤裡有 @submit.prevent="submit" :disabled="isSubmitting"，這裡先暫時拿掉 -->
    <v-form>
      <v-row>
        <v-col cols="12" md="6">
          <!-- 上課範例中，v-text-field標籤裡有v-model、:error-messages，這裡先暫時拿掉-->
          <span>演奏/演唱者：</span>
          <v-text-field
            placeholder="請輸入演奏/演唱者"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <!-- 上課範例中，v-text-field標籤裡有v-model、:error-messages，這裡先暫時拿掉-->
          <span>歌名：</span>
          <v-text-field
            placeholder="請輸入歌名"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <span>曲風：</span>
          <!-- 上課範例中，v-select裡有下列內容，這裡暫時先拿掉
            :items="categories"
            v-model="category.value.value"
            :error-messages="category.errorMessage.value" -->
          <v-select
            label="請選擇曲風"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <!-- 上課範例中，v-text-field標籤裡有v-model、:error-messages，這裡先暫時拿掉-->
          <span>BPM：</span>
          <v-text-field
            placeholder="請輸入BPM"
          ></v-text-field>
          <!-- 可以加上+-符號，待編輯 -->
        </v-col>
        <v-col cols="12" md="4">
          <span>拍號：</span>
          <!-- 上課範例中，v-select裡有下列內容，這裡暫時先拿掉
            :items="categories"
            v-model="category.value.value"
            :error-messages="category.errorMessage.value" -->
          <v-select></v-select>
        </v-col>
      </v-row>
    </v-form>
    </template>

<script setup>

</script>
