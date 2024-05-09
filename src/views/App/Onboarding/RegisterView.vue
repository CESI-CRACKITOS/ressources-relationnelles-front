<template>
  <HeaderComponent />
  <div class="flex flex-col gap-10 px-5 py-3">
    <RouterLink to="/">
      <ButtonComponent>Retour</ButtonComponent>
    </RouterLink>
    <form class="flex flex-col gap-4" @submit.prevent="register">
      <div class="flex flex-col gap-3">
        <label for="lastname" class="text-lg font-bold">Nom</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          class="bg-gray-100 border-b-2 border-indigo-600 w-full p-3 rounded-md"
          v-model="registerData.lastname"
        />
      </div>
      <div class="flex flex-col gap-3">
        <label for="firstName" class="text-lg font-bold">Prénom</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          class="bg-gray-100 border-b-2 border-indigo-600 w-full p-3 rounded-md"
          v-model="registerData.firstname"
        />
      </div>
      <div class="flex flex-col gap-3">
        <label for="email" class="text-lg font-bold">Courriel</label>
        <input
          type="email"
          name="email"
          id="email"
          class="bg-gray-100 border-b-2 border-indigo-600 w-full p-3 rounded-md"
          v-model="registerData.email"
        />
      </div>
      <div class="flex flex-col gap-3">
        <label for="password" class="text-lg font-bold">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          class="bg-gray-100 border-b-2 border-indigo-600 w-full p-3 rounded-md"
          v-model="registerData.password"
        />
      </div>
      <div class="flex flex-col gap-3">
        <label for="confirmPassword" class="text-lg font-bold">Confirmer votre mot de passe</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          class="bg-gray-100 border-b-2 border-indigo-600 w-full p-3 rounded-md"
          v-model="registerData.confirmPassword"
        />
      </div>
      <p class="text-red-400">{{ error }}</p>
      <ButtonComponent btn-type="submit">Inscription</ButtonComponent>
    </form>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/App/Shared/buttons/ButtonComponent.vue'
import HeaderComponent from '@/components/App/Shared/HeaderComponent.vue'
import router from '@/router'
import api from '@/config/api'

import { ref } from 'vue'

type RegisterData = {
  lastname: string
  firstname: string
  email: string
  password: string
  confirmPassword: string | undefined
}

const registerData: RegisterData = {
  lastname: '',
  firstname: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const error = ref('')

async function register() {
  if (registerData.password !== registerData.confirmPassword) {
    error.value = 'Les mots de passe ne correspondent pas'
    return false
  }

  const res = fetch(`${api}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerData)
  })

  const response = await res
  const json = await response.json()
  const data = json.data
  if (json.message != 'OK') {
    error.value = json.message
  } else {
    router.push('/login?register=true')
  }
}
</script>
