// 引入套件
import axios from 'axios'
// 引入stores
import { useUserStore } from '@/stores/user'

// baseUrl是設定基準的網址，先設定baseURL，後續在請求時就不用寫那麼多
// 範例一：
// baseURL = http://localhost:4000
// axios.post('/user')
// 範例二：
// baseURL = x
// axios.post('http://localhost:4000/user')

// 建立新的一份axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API
})

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API
})

// axios的攔截器：分為請求跟回應------------------------------------------------------
// 請求攔截器：呼叫axios後、真的送出去之前可以加東西
// 回應攔截器：收到回應的時候、在回到function之間加東西
// 1. 呼叫 axios.get / axios.post ...
// 2. 進入請求攔截器 interceptors.request
// 3. 送出
// 4. 回應攔截器 interceptors.response
// 5. 回到.then() .catch()
// config表示這次請求的設定(get, post等)及帶有的資料
apiAuth.interceptors.request.use(config => {
  // 讀取當下的UserStore
  const user = useUserStore()
  // 把token加在headers裡面再送出
  config.headers.Authorization = 'Bearer ' + user.token
  return config
})

// 1. apiAuth.get(/user/profile) 執行back \ controller \user.js裡的profile
// 2. apiAuth.interceptors.request  自動加上 JWT
// 3. 傳送出去
// 4. apiAuth.interceptors.response(成功處理, 失敗處理)
// 5. 如果成功，回傳收到的資料，結束
// 6. 如果失敗，且是登入過期，自動傳送舊換新
// 7. 舊換新成功，修改 apiAuth.get(/user/profile) 的 jwt 後重新送出
// 8. 舊換新失敗，回傳 apiAuth.get(/user/profile) 的錯誤
apiAuth.interceptors.response.use(res => {
  // res是回應 (response)
  return res
}, // 如果產生錯誤則要執行以下內容
async error => {
  // 如果失敗有回應 (網路斷線也算是失敗，但網路斷線不會有回應)
  if (error.response) {
    // 如果得到登入過期的回應訊息，且url不是舊換新
    if (error.response.data.message === '登入過期' && error.config.url !== '/users/extend') {
      const user = useUserStore()
      try {
        // 傳送舊換新請求 (用patch)
        const { data } = await apiAuth.patch('/user/extend')
        // 舊換新成功，更新 store 的 token
        user.token = data.result
        // 修改原本發生錯誤的請求的設定
        error.config.headers.Authorization = 'Bearer ' + user.token
        // 重新傳送一次原本的請求
        return axios(error.config)
      } catch (_) {
        // 舊換新錯誤，登出
        user.logout()
      }
    }
  }
  // 回傳原本請求的錯誤到呼叫 apiAuth 的地方
  return Promise.reject(error)
})

export const useApi = () => {
  return {
    api, // 單純的api
    apiAuth // 加上使用者認證的資訊的api，所有要登入的才能執行的請求都用apiAuth
  }
}
