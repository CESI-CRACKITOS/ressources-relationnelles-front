<template>
  <HeaderComponent/>
  <div class="px-5">
    <RouterLink to="/">
      <ButtonComponent>Retour</ButtonComponent>
    </RouterLink>
  </div>
  <div class="flex flex-col gap-10 px-5 py-3">
    <form class="flex flex-col gap-4" method="post" @submit.prevent="submit">
      <label for="login" class="text-lg font-bold">Identifiant</label>
      <input type="text"
             name="login"
             id="login"
             class="bg-gouv-gray-300 border-b-2 border-black w-full p-3 rounded-t-md"
             v-model="login.login">
      <label for="password" class="text-lg font-bold">Mot de passe</label>
      <input type="text"
             name="password"
             id="password"
             class="bg-gouv-gray-300 border-b-2 border-black w-full p-3 rounded-t-md"
             v-model="login.password">
      <button type="submit" class="px-5 py-2 bg-gouv-blue-500 text-white">
        Valider
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">

import HeaderComponent from '@/components/shared/HeaderComponent.vue'
import ButtonComponent from '@/components/shared/buttons/ButtonComponent.vue'
import axios from "axios";
import router from '@/router';
const login = {
  "login": "",
  "password": ""
}
async function submit() {

  await axios.post("/handleLogin", {
    "login": login.login,
    "password": login.password
  }).then((res)=>{
    if (res.data === true) {
      window.location.href="/feed"
    }
    // TODO Implement error message here
    router.push({ path: "/login" })
  }).catch((err)=>{
    console.log(err)
  })

}

</script>