import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/App/Onboarding/HomeView.vue'
import LoginView from '@/views/App/Onboarding/LoginView.vue'
import FeedView from '@/views/FeedView.vue'
import { getUserFromToken } from '@/composable/Utils/UserUtils'
import getCookieFromValue from '@/composable/Utils/CookiesUtils'
import RegisterView from '@/views/App/Onboarding/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'
import { useUserStore } from '@/stores/user'
import ResourceDetailsView from '@/views/ResourceDetailsView.vue'
import ThermsOfServiceView from '@/views/ThermsOfServiceView.vue'
import PrivacyView from '@/views/PrivacyView.vue'
import AccessibilityView from '@/views/AccessibilityView.vue'
import CookieView from '@/views/CookieView.vue'
import AppView from '@/views/AppView.vue'
import NotificationView from '@/views/NotificationView.vue'
import CategoryListView from '@/views/CategoryListView.vue'
import CategorieResourcesListeView from '@/views/CategorieResourcesListeView.vue'
import CategoryAdminView from '@/views/Admin/Category/CategoryAdminView.vue'
import UserSearchView from '@/views/App/User/UserSearchView.vue'
import AdminView from '@/views/Admin/AdminView.vue'
import ResourceAdminView from '@/views/Admin/Resource/ResourceAdminView.vue'
import RelationTypeView from '@/views/Admin/RelationType/RelationTypeAdminView.vue'
import StatisticsAdminView from '@/views/Admin/Statistics/StatisticsAdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '',
      name: 'not-found',
      component: AppView,
      redirect: '/home',
      meta: {
        requiresAuth: true,
        requireRole: 'U'
      },
      children: [
        {
          path: '/feed',
          name: 'feed',
          component: FeedView,
          meta: {
            requiresAuth: true,
            requireRole: 'U'
          }
        },
        {
          path: '/category',
          meta: {
            requiresAuth: true,
            requireRole: 'U'
          },
          children: [
            {
              path: '',
              name: 'CategoryList',
              component: CategoryListView,
              meta: {
                requiresAuth: true,
                requireRole: 'U'
              }
            },
            {
              path: ':id(\\d+)',
              name: 'categoryResourcesList',
              component: CategorieResourcesListeView,
              meta: {
                requiresAuth: true,
                requireRole: 'U'
              }
            }
          ]
        },
        {
          path: '/resources',
          name: 'resources',
          redirect: '/feed',
          meta: {
            requiresAuth: true,
            requireRole: 'U'
          },
          children: [
            {
              path: ':id(\\d+)',
              name: 'resource',
              component: ResourceDetailsView,
              meta: {
                requiresAuth: true,
                requireRole: 'U'
              }
            }
          ]
        },
        {
          path: '/notifications',
          name: 'notifications',
          component: NotificationView
        },
        {
          path: '/profile/:id(\\d+)',
          name: 'profile',
          component: ProfileView,
          meta: {
            requiresAuth: true,
            requireRole: 'U'
          }
        },
        {
          path: "/users/search/:query",
          name: 'users-search',
          component: UserSearchView,
          meta: {
            requiresAuth: true,
            requireRole: 'U'
          }
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      children: [
        {
          path: 'resources',
          name: 'admin-resources',
          component: ResourceAdminView,
          meta: {
            requiresAuth: true,
            requireRole: 'A'
          }
        },
        {
          path: '/admin/stats',
          name: 'admin-stats',
          component: StatisticsAdminView,
          meta: {
            requiresAuth: true,
            requireRole: 'A'
          }
        },
        {
          path: '/admin/categories',
          name: 'admin-categories',
          component: CategoryAdminView,
          meta: {
            requiresAuth: true,
            requireRole: 'A'
          }
        },
        {
          path: '/admin/relationTypes',
          name: 'admin-relation-types',
          component: RelationTypeView,
          meta: {
            requiresAuth: true,
            requireRole: 'A'
          }
        },
      ]
    },
    {
      path: '/tos',
      name: 'Terms of Service',
      component: ThermsOfServiceView
    },
    {
      path: '/privacy',
      name: 'Privacy Policy',
      component: PrivacyView
    },
    {
      path: '/accessibility',
      name: 'Accessibility',
      component: AccessibilityView
    },
    {
      path: '/cookie',
      name: 'Cookie Policy',
      component: CookieView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LoginView
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const token = getCookieFromValue('token')

  if (to.meta.requiresAuth) {
    if (token === undefined) {
      next('/login')
    } else {
      const user = await getUserFromToken(token)
      if (user === undefined) {
        next('/login')
      } else {
        const userState = useUserStore()
        userState.user = user

        const expectedRole: string = to.meta.requireRole as string
        const roleMap: { [key: string]: boolean } = {
          A: user.isAdmin,
          U: user.isUser,
          SA: user.isSuperAdmin,
          M: user.isModerator
        }

        if (!roleMap[expectedRole]) {
          next('/')
        } else {
          next()
        }
      }
    }
  } else {
    next()
  }
})

export default router
