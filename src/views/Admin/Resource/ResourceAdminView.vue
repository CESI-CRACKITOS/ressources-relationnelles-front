<template>
  <div>
    <h1 class="text-center py-5" v-if="resources.length === 0">Rien à afficher</h1>

    <div class="flex flex-col gap-5 p-5 w-full">
        <ResourceComponent v-for="resource in resources" :key="resource.id" :resource="resource" @click.prevent/>
    </div>

  </div>

</template>
<script setup>
import { index } from '@/composable/Utils/Admin/ResourceUtils.ts'
import { onMounted, ref } from 'vue'
import ResourceComponent from '@/components/App/Resource/ResourceComponent.vue'

let resources = ref([])
let currentResource = ref(null)
const showEditModal = ref(false);

const showModal = (resource) => {
  console.log(resource)
  showEditModal.value = true
  currentResource.value = resource
}

onMounted(async () => {
  resources.value = await index()
})

</script>