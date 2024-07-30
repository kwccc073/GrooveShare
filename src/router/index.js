/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts
})

// 進去每一頁之前
// to 去哪裡、from 從哪裡來、next 重新導向
router.beforeEach(async (to, from, next) => {
  const user = useUserStore()
  // 進來網頁的第一次導航（一定會發生）
  if (from === START_LOCATION) {
    // 取得使用者資料
    await user.profile()
  }

  if (user.isLogin && ['/register', '/login'].includes(to.path)) {
    next('/')
  } else if (to.meta.login && !user.isLogin) {
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    next('/')
  } else {
    next() // 一定要有next()呼叫下一次的動作
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
