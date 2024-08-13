// 管理要儲存的東西
// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApi } from '@/composables/axios'

export const useUserStore = defineStore('user', () => {
  const { api, apiAuth } = useApi()

  // 要抓下來的東西-------------
  const token = ref('')
  const account = ref('')
  const email = ref('')
  const icon = ref('')
  const id = ref('')
  // const role = ref(UserRole.USER) // 使用者
  // 購物車有數量，但收藏歌曲沒有，因此推測這裡應該是空陣列***待編輯***
  const saving = ref([])

  // 是否登入
  const isLogin = computed(() => {
    // 以token的值是否為0來判斷
    return token.value.length > 0
  })

  // 登入---------------------------------------------------------------------
  // 登入要對使用者的store做操作，操作成功要把上方的token、account等值換掉
  // 有些人覺得登入是表單送出，所以把請求的API放在page裡
  // 為了方便管理，老師把登入的請求放在user的store這邊(此檔案的import { useApi } from '@/composables/axios')
  const login = async (values) => {
    try {
      const { data } = await api.post('/user/login', values)
      // 跟後端的controllerss的檔案user.js登入後回傳的資料一樣
      token.value = data.result.token
      account.value = data.result.account
      // email.value = data.result.email
      // icon.value = data.result.icon
      // id.value = data.result.id
      // role.value = data.result.role
      // saving.value = data.result.saving
      console.log(data.result) // 只有出現token和account（因為登入只會傳這兩個值）
      console.log(saving.value)
      return '登入成功'
    } catch (error) {
      console.log(error)
      return error?.response?.data?.message || '發生錯誤，請稍後再試'
    }
  }

  const profile = async () => {
    if (!isLogin.value) return
    // 有登入才做處理
    try {
      // 把使用者的token帶出去
      const { data } = await apiAuth.get('/user/profile')
      // data.result.後端有傳過來的東西
      account.value = data.result.account
      email.value = data.result.email
      icon.value = data.result.icon
      id.value = data.result.id
      saving.value = data.result.saving
      console.log(data.result)
      console.log(data.result.saving) // 有成功取得收藏歌曲
    } catch (error) {
      // 錯誤的話把東西清空
      token.value = ''
      account.value = ''
      email.value = ''
      icon.value = ''
      id.value = ''
      // role.value = UserRole.USER
      saving.value = []
      console.log('user.profile失敗')
    }
  }

  // 登出------------------------------------------------------------------------------
  const logout = async () => {
    try {
      // 登出需要JWT，所以用apiAuth
      await apiAuth.delete('/user/logout')
    } catch (error) {
      // 一定要console.log(error)才看的到錯誤
      console.log(error)
    }
    // 登出要將所有值重設
    token.value = ''
    account.value = ''
    email.value = ''
    icon.value = ''
    id.value = ''
    // role.value = UserRole.USER
    saving.value = []
  }

  // saveSong相當於上課範例中的addCart
  const saveSong = async (song) => {
    try {
      // const { data } = await apiAuth.patch('/user/song', 要傳送的數據)
      const { data } = await apiAuth.patch('/user/saving', { song })
      // console.log(data)
      saving.value = data.result

      const text = ref('')
      if (data.isSaving) {
        text.value = '收藏歌曲成功-stores'
      } else {
        text.value = '取消收藏歌曲-stores'
      }
      return {
        color: 'green',
        text: text.value
      }
    } catch (error) {
      return {
        color: 'red',
        text: error?.response?.data?.message || '發生錯誤，請稍後再試'
      }
    }
  }

  // const checkout = async () => {
  //   try {
  //     await apiAuth.post('/order')
  //     saving.value = 0
  //     return {
  //       color: 'green',
  //       text: '成功'
  //     }
  //   } catch (error) {
  //     return {
  //       color: 'red',
  //       text: error?.response?.data?.message || '發生錯誤，請稍後再試'
  //     }
  //   }
  // }

  return {
    token,
    account,
    email,
    icon,
    id,
    // role,
    saving,
    isLogin,
    // isAdmin,
    login,
    profile,
    logout,
    saveSong,
    // checkout
  }
}, {
  // 保存localstorage的設定
  persist: {
    // 存儲在瀏覽器local storage中的鍵名
    key: 'web',
    // 需要持久儲存的東西
    paths: ['token']
  }
})
