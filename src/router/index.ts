import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import FeedView from '@/views/FeedView.vue'
import getUserFromToken from '@/composable/Utils/UserUtils'
import getCookieFromValue from '@/composable/Utils/CookiesUtils'
import RegisterView from '@/views/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'
import { useUserStore } from '@/stores/user'
import ResourceDetailsView from '@/views/ResourceDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
      path: '/feed',
      name: 'feed',
      component: FeedView,
      meta: {
        requiresAuth: true,
        requireRole: 'U'
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        requiresAuth: true,
        requireRole: 'U'
      }
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
    }
  ]
})

router.beforeEach(async (to, from, next) => {

	const token = getCookieFromValue("token")

	if (to.meta.requiresAuth) {
		if (token === undefined) {
			next("/login")
		} else {
			let user = await getUserFromToken(token)
			if (user === undefined) {
				next("/login")
			} else {

				const userState = useUserStore();
				userState.user = user;

				const expectedRole: string = to.meta.requireRole as string;
				const roleMap: { [key: string]: boolean } = {
					"A": user.isAdmin,
					"U": user.isUser,
					"SA": user.isSuperAdmin,
					"M": user.isModerator
				};

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
