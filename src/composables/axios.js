import axios from 'axios'

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

export const useApi = () => {
  return { api }
}
