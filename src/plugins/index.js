/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
// 彈出對話框
import VuetifyUseDialog from 'vuetify-use-dialog'
// 引入@boindil/vue-file-agent-next（上傳檔案的功能用）
import VueFileAgentNext from '@boindil/vue-file-agent-next'
import '@boindil/vue-file-agent-next/dist/vue-file-agent-next.css'

export function registerPlugins (app) {
  app
    .use(vuetify)
    // 對話框
    .use(VuetifyUseDialog, {
      // 使全部用到snackbar的地方都使用此設定值
      snackbar: {
        showCloseButton: false, // 是否顯示關閉按鈕，預設true
        snackbarProps: {
          timeout: 2000 // 多久之後關閉
        }
      }
    })
    .use(VueFileAgentNext)
    .use(router)
    .use(pinia)
}
