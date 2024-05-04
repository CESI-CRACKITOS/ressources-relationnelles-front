<template>

<div>

  <div class="p-5">
    <table class="w-full border border-gray-200 rounded-md">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100">
      <tr class="text-xs text-gray-700 uppercase bg-gray-100 py-4">
        <td class="px-6 py-1.5 lg:py-3 text-black">Signalé</td>
        <td class="px-6 py-1.5 lg:py-3 text-black">Type de signalement</td>
        <td class="px-6 py-1.5 lg:py-3 text-black">Commentaire</td>
        <td class="px-6 py-1.5 lg:py-3 text-black">Auteur</td>
        <td class="px-6 py-1.5 lg:py-3 text-black text-end"></td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="userReport in userReports" :key="userReport.id" class="border-b-gray-200 border-b" :id="`userReport-${userReport.id}`">
        <td class="px-6 py-1.5 lg:py-3 text-black">
          <div class="flex gap-2 items-center">
            <a :href="`/profile/${userReport.reported.id}`">
              <img class="h-10 w-10 rounded-full object-cover" :src="userReport.reported.profilePicture" alt="" />
            </a>

            <div>
              <p class="max-w-80 truncate">{{ userReport.reported.lastname }}</p>
              <p class="max-w-80 truncate">{{ userReport.reported.firstname }}</p>
            </div>
          </div>
        </td>
        <td class="px-6 py-1.5 lg:py-3 text-black">{{ userReport.report_type.name }}</td>
        <td class="px-6 py-1.5 lg:py-3 text-black">{{ userReport.content }}</td>
        <td class="px-6 py-1.5 lg:py-3 text-black">{{ userReport.reporter.firstname + " " + userReport.reporter.lastname }}</td>
        <td class="px-6 py-1.5 lg:py-3 text-black text-end ">
          <ButtonComponent @click="acceptReport(userReport.id)" class="mb-1.5 text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
            Désactiver
          </ButtonComponent>
          <ButtonComponent @click="refuseReport(userReport.id)">
            Annuler
          </ButtonComponent>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</div>

</template>
<script setup>

import { onMounted, ref } from 'vue'
import { accept, index, refuse } from '@/composable/Utils/Admin/UserReportUtils.ts'
import ButtonComponent from '@/components/App/Shared/buttons/ButtonComponent.vue'
let userReports = ref("")
onMounted(async () => {
  userReports.value = await index();
})

const acceptReport = async (id) => {
  await accept(id)
  window.location.reload()
}

const refuseReport = async (id) => {
  await refuse(id)
  window.location.reload()
}

</script>