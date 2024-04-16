<template>
  <div class="h-screen rounded max-w-xl overflow-scroll max-xl:mr-0">
    <!-- Rajouter ici la creation de poste pour computer view -->
    <div class="w-full flex justify-between px-8">
      <div
        class="w-1/3 flex flex-col justify-center items-center hover:bg-slate-300 text-center"
        @click="Display('Abonnements')"
        id="Abonnements"
      >
        <span class="p-2">Abonnements</span>
        <div class="h-1 w-10/12 rounded-full"></div>
      </div>
      <div
        class="w-1/3 flex flex-col justify-center items-center hover:bg-slate-300 text-center"
        @click="Display('PourVous')"
        id="PourVous"
      >
        <span class="p-2">Pour vous</span>
        <div class="h-1 w-10/12 rounded-full"></div>
      </div>
    </div>
    <div v-if="resources.length">
      <PostComponent v-for="resource in resources" :key="resource.id" :resource="resource" />
    </div>
    <div class="flex w-full justify-center" v-else>
      <p class="w-full text-center h-full items-center p-4">Pas de resources dans vos relations</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import PostComponent from '@/components/PostComponent.vue'
import ResourceEntity from '@/composable/Entities/Resource'
import { getResources, getRestrictedResources } from '@/composable/Utils/ResourcesUtils'
import { onMounted, ref } from 'vue'

let resources = ref<ResourceEntity[]>([])

onMounted(async () => {
  Display()
})

async function Display(action?: string) {
  let cookie: string | undefined = document.cookie
    .split('; ')
    .find((row) => row.startsWith('LastSeenFeedPage='))
  cookie = cookie?.split('=')[1] ?? undefined
  if (!action) {
    action = cookie
  }

  switch (action) {
    case 'Abonnements':
      document.getElementById('Abonnements')?.classList.add('text-blue-700')
      document.getElementById('Abonnements')?.children[1].classList.add('bg-blue-700')
      document.getElementById('PourVous')?.classList.remove('text-blue-700')
      document.getElementById('PourVous')?.children[1].classList.remove('bg-blue-700')
      document.cookie = `LastSeenFeedPage="Abonnements"; path=/`

      resources.value = await getRestrictedResources()
      break
    case 'PourVous':
      document.getElementById('PourVous')?.classList.add('text-blue-700')
      document.getElementById('PourVous')?.children[1].classList.add('bg-blue-700')
      document.getElementById('Abonnements')?.classList.remove('text-blue-700')
      document.getElementById('Abonnements')?.children[1].classList.remove('bg-blue-700')
      resources.value = await getResources()

      document.cookie = `LastSeenFeedPage="PourVous"; path=/`
      break
    default:
      break
  }
}
</script>
