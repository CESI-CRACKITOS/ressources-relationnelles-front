<template>
  <HeaderComponent/>
  <div class="px-5">
    <RouterLink to="/">
      <ButtonComponent>Retour</ButtonComponent>
    </RouterLink>
  </div>
  <div class="flex flex-col gap-10 px-5 py-3">
    <div class="flex flex-col gap-4" method="post" >
      <label for="login" class="text-lg font-bold">Identifiant</label>
      <input type="text"
             name="email"
             id="login"
             class="bg-gouv-gray-300 border-b-2 border-black w-full p-3 rounded-t-md"
             v-model="email">
      <label for="password" class="text-lg font-bold">Mot de passe</label>
      <input type="text"
             name="password"
             id="password"
             class="bg-gouv-gray-300 border-b-2 border-black w-full p-3 rounded-t-md"
             v-model="password">
      <button type="button" @click="login" class="px-5 py-2 bg-gouv-blue-500 text-white">
        Valider
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/shared/HeaderComponent.vue'
import ButtonComponent from '@/components/shared/buttons/ButtonComponent.vue'
import instanceDev  from '@/config/axios.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

let email = ref('')
let password = ref('')
const router = useRouter()


function login() {
  instanceDev
    .post('/tokens', {
      "email": email.value,
      "password": password.value
    })
    .then((res) => {
      if (res.status === 200) {
        console.log(res)
        const token = res.data.data
        const expirationTime = new Date(Date.now() + 60000) // 60 seconds from now
        document.cookie = `token=${token}; expires=${expirationTime.toUTCString()}; path=/`
        router.push('/feed')
        
      }
      
    })
}

</script>