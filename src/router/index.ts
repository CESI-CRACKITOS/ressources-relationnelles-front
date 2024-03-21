import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import FeedView from '@/views/FeedView.vue'
import UserEntity from '@/composable/Entities/User'



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
				requiresAuth: true,
				requireRole: "U"
			}
		}

	]
})
 
router.beforeEach(async (to, from, next) => {

	let token: string | undefined = document.cookie.split('; ').find(row => row.startsWith('token='))
	token = token?.split('=')[1] ?? undefined
	if (to.meta.requiresAuth) {
		if (token === undefined) {
			next("/login")
		} else {
			let user = await getUserFromToken(token)
			if (user === undefined) {
				next("/login")
			} else {

				//TODO Pinia store user

				const roleMap = {
					"A": user.isAdmin,
					"U": user.isUser,
					"SA": user.isSuperAdmin,
					"M": user.isModerator
				};
			
				if (!roleMap[to.meta.requireRole]) {
					next("/");
				} else {
					next()
				} 
			}
		} 
	} else {
		next()
	}
})


async function getUserFromToken(tokenValue: string) {

	const res = fetch("http://localhost/api/users/getByToken", {
		
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			tokenValue: tokenValue
		}),
	})

	const data = await res.then(response => response.json())
	
	const user = new UserEntity(data.data)

	return user
}

export default router
