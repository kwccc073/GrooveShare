/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// 引入語言包（zhHant表示繁體中文）
import { zhHant } from 'vuetify/locale'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          // 自定義顏色 for vuetify元件
          'navigation-drawer-color': '#1A1A1A', // 手機版側邊欄
        },
      },
    },
  },
  // 使vuetify的一些東西變繁體中文
  locale: {
    locale: 'zhHant',
    messages: { zhHant }
  }
})
