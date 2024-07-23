<template>
    <v-table>
      <thead class="thead">
        <tr>
          <th>縣市</th>
          <th>地區</th>
          <th>地址</th>
          <th>樂器行名稱</th>
          <th>連絡電話</th>
          <th>預約方式</th>
          <th>費用</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="trainingRoom in trainingRooms"
          :key="trainingRoom.name"
        >
          <td>{{ trainingRoom.city }}</td>
          <td>{{ trainingRoom.district }}</td>
          <td>{{ trainingRoom.address }}</td>
          <td>{{ trainingRoom.trainingRoomName }}</td>
          <td>{{ trainingRoom.phoneNumber }}</td>
          <td>{{ trainingRoom.reservation }}</td>
          <td>{{ trainingRoom.fee }}</td>
          <td>
            <div class="toolBtns">
              <v-btn elevation="0" prepend-icon=" mdi-pencil"></v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </template>
<script setup>
import { ref } from 'vue'

const trainingRooms = ref([
  {
    city: '台北市',
    district: '中山區',
    address: 'XX路XX號X樓（鄰近XX捷運站）',
    trainingRoomName: 'AAA樂器行',
    phoneNumber: '02-xxxx-xxxx',
    reservation: '電話預約',
    fee: '50元/小時',
  },
  {
    city: '台北市',
    district: '內湖區',
    address: 'XX路XX號X樓（鄰近XX捷運站）',
    trainingRoomName: 'BB樂器行',
    phoneNumber: '02-xxxx-xxxx',
    reservation: '電話預約',
    fee: '80元/小時',
  },

])
</script>

<style lang="scss">
// 樣式待編輯
</style>
