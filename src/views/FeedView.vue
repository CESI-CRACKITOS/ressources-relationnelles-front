<template>
  <div class="h-full overflow-hidden pb-24">
    <div class="rounded">
      <div class="w-full flex justify-between px-8 text-xl py-4">
        <div
          class="w-1/2 flex flex-col justify-center items-center hover:bg-slate-300 text-center cursor-pointer"
          @click="Display('Abonnements')"
          id="Abonnements"
        >
          <span class="p-2">Abonnements</span>
          <div class="h-1 w-10/12 rounded-full"></div>
        </div>
        <div
          class="w-1/2 flex flex-col justify-center items-center hover:bg-slate-300 text-center cursor-pointer"
          @click="Display('PourVous')"
          id="PourVous"
        >
          <span class="p-2">Pour vous</span>
          <div class="h-1 w-10/12 rounded-full"></div>
        </div>
      </div>
    </div>
    <div v-if="resources.length" class="overflow-scroll h-full flex flex-col">
      <PostComponent v-for="resource in resources" :key="resource.id" :resource="resource" />
    </div>
  </div>


</template>

<script setup lang="ts">
import PostComponent from '@/components/PostComponent.vue'
import ResourceEntity from '@/composable/Entities/Resource'
import { getResources, getRestrictedResources } from '@/composable/Utils/ResourcesUtils'
import { onMounted, ref } from 'vue'
import router from '@/router'

let resources = ref<ResourceEntity[]>([])

onMounted(async () => {
  await Display("PourVous")
})

async function Display(action?: string) {
  switch (action) {
    case 'Abonnements':
      document.getElementById('Abonnements')?.classList.add('text-blue-700')
      document.getElementById('Abonnements')?.children[1].classList.add('bg-blue-700')
      document.getElementById('PourVous')?.classList.remove('text-blue-700')
      document.getElementById('PourVous')?.children[1].classList.remove('bg-blue-700')
      resources.value = await getRestrictedResources()
      break
    case 'PourVous':
      document.getElementById('PourVous')?.classList.add('text-blue-700')
      document.getElementById('PourVous')?.children[1].classList.add('bg-blue-700')
      document.getElementById('Abonnements')?.classList.remove('text-blue-700')
      document.getElementById('Abonnements')?.children[1].classList.remove('bg-blue-700')
      resources.value = await getResources()
      break
    default:
      break
  }

}
function back(){
  router.go(-1)
}
</script>
