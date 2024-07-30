// Utilities
import { createPinia } from 'pinia'
// 使pinia的資料能存在local-storage裡面
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
