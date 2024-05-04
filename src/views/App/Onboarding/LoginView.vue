<template>
  <div v-if="isRegister" class="bg-green-700 p-2 text-center text-white">Inscription réussie</div>
  <div v-if="IsError" class="bg-red-700 p-2 text-center text-white">
    Identifiant ou mot de passe incorrect
  </div>
  <HeaderComponent />
  <div class="px-5">
    <RouterLink to="/">
      <ButtonComponent>Retour</ButtonComponent>
    </RouterLink>
  </div>
  <div class="flex flex-col gap-10 px-5 py-3">
    <div class="flex flex-col gap-4" method="post">
      <label for="login" class="text-lg font-bold">Identifiant</label>
      <input
        type="text"
        name="email"
        id="login"
        class="bg-gray-100 border-b-2 border-indigo-600 w-full p-3 rounded-md"
        v-model="email"
      />
      <label for="password" class="text-lg font-bold">Mot de passe</label>
      <input
        type="password"
        name="password"
        id="password"
        class="bg-gray-100 border-b-2 border-indigo-600 w-full p-3 rounded-md"
        v-model="password"
      />
      <button-component @click="login">Valider</button-component>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/App/Shared/HeaderComponent.vue'
import ButtonComponent from '@/components/App/Shared/buttons/ButtonComponent.vue'
import instanceDev from '@/config/axios.js'
import { ref } from 'vue'
import router from '@/router'

const isRegister = ref(router.currentRoute.value.query.register)

let email = ref('')
let password = ref('')
let IsError = ref(false)
function login() {
  instanceDev
    .post('/tokens', {
      email: email.value,
      password: password.value
    })
    .then((res) => {
      if (res.status === 200) {
        const token = res.data.data
        const expirationTime = new Date(Date.now() + 60 * 60 * 744 * 1000) // Expire every month
        if (res.data.message == 'ERROR') {
          IsError.value = true
        } else {
          document.cookie = `token=${token}; expires=${expirationTime.toUTCString()}; path=/`
          router.push('/feed')
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
