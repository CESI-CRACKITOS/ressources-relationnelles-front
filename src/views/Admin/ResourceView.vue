<template>


  <div class="flex justify-center items-center h-screen w-screen bg-black bg-opacity-70 z-10 absolute" v-if="resource"
       @click="closeModal">

    <ResourceModalComponent :resource="resource" @click.stop />

  </div>

  <h1 class="text-center py-5" v-if="resources.length === 0">Rien à afficher</h1>

  <div class="flex flex-col gap-5 p-5">

    <ResourceComponent v-for="resource in resources" :key="resource.id" :resource="resource"
                       @click="openModel(resource.id)" />

  </div>

</template>
<script setup>
import { index } from '@/composable/Utils/Admin/ResourceUtils.ts'
import { onMounted, ref } from 'vue'
import ResourceComponent from '@/components/Admin/Resource/ResourceComponent.vue'
import ResourceModalComponent from '@/components/Admin/Resource/ResourceModalComponent.vue'
import { calculateDates } from '@/composable/Utils/DateUtils'
let resources = ref([])
let resource = ref(null)
onMounted(async () => {
  resources.value = await index()
})
const openModel = async (id) => {
  resource.value = resources.value.find((resource) => resource.id === id)
  resource.value.timeFromPublish = await calculateDates(resource.value.created_at)
}
const closeModal = () => {
  resource.value = null
}
</script>