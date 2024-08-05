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
  // const cart = ref(0)

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
      email.value = data.result.email
      icon.value = data.result.icon
      id.value = data.result.id
      // role.value = data.result.role
      // cart.value = data.result.cart
      console.log(data.result) // 只有出現token和account
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
      account.value = data.result.account
      email.value = data.result.email
      icon.value = data.result.icon
      id.value = data.result.id
      console.log('store:' + data.result.id)
      console.log('store:' + data.result.icon)
      // id.value = data.result._id ***待編輯****
      // role.value = data.result.role
      // cart.value = data.result.cart
    } catch (error) {
      // 錯誤的話把東西清空
      token.value = ''
      account.value = ''
      email.value = ''
      icon.value = ''
      id.value = ''
      // role.value = UserRole.USER
      // cart.value = 0
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
    // cart.value = 0
  }

  // const addCart = async (product, quantity) => {
  //   try {
  //     const { data } = await apiAuth.patch('/user/cart', {
  //       product, quantity
  //     })
  //     cart.value = data.result
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

  // const checkout = async () => {
  //   try {
  //     await apiAuth.post('/order')
  //     cart.value = 0
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
    // cart,
    isLogin,
    // isAdmin,
    login,
    profile,
    logout,
    // addCart,
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
