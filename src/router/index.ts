import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import FeedView from '@/views/FeedView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/feed',
      name: 'feed',
      component: FeedView,
      meta: {
        requiresAuth: true
      }
    }
    
  ]
})

router.beforeEach((to, from, next) => {

  let token = document.cookie.split('; ').find(row => row.startsWith('token='))
  if (token) {
    token = token.split('=')[1]
  }
  if (to.meta.requiresAuth && !token) {
    next('/login')
  }
  else {
    next()
  }
})
export default router
