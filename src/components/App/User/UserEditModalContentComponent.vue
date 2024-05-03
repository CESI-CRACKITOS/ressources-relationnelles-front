<template>

<div class="flex flex-col gap-5 w-full">
  <div class="flex flex-col gap-3 mx-auto w-1/2">
    <img :src="user.profilePicture" id="modalProfilePicture">
    <input type="file" @change="handleProfilePictureChange($event.target.files[0])">
  </div>

  <input class="border-2" v-model="inputData.firstname">
  <input class="border-2" v-model="inputData.lastname">
  <input class="border-2" v-model="inputData.email" type="email">
  <button-component @click="sendUpdate()">Enregistrer</button-component>
</div>


</template>
<script setup>

import { onMounted, ref } from 'vue';
import { getUserById } from '@/composable/Utils/UserUtils.ts'
import router from '@/router/index.ts'
import ButtonComponent from '@/components/App/Shared/buttons/ButtonComponent.vue'
import { updateUser } from '@/composable/Utils/UpdateUtils.ts'
import { getBase64 } from '@/composable/Utils/Base64Utils.js'

const user = ref({});
const inputData = ref({});
const idRouter = Number(router.currentRoute.value.params.id)

onMounted(async () => {
  user.value = await getUserById(idRouter);
  inputData.value = {
    firstname: user.value.firstname,
    lastname: user.value.lastname,
    email: user.value.email,
  }
})

const sendUpdate = async () => {
  await updateUser(inputData.value, user.value.id);
  window.location.reload();
}

const handleProfilePictureChange = async (file) => {
  inputData.value.profilePicture = await getBase64(file);
  const img = document.getElementById("modalProfilePicture");
  img.src = inputData.value.profilePicture;
}

</script>
