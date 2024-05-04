<template>
  <div class="h-full overflow-y-auto">
    <h1 class="text-center py-5" v-if="resources.length === 0">Rien à afficher</h1>

    <div class="flex flex-col gap-5 p-5 w-full">
        <ResourceComponent v-for="resource in resources" :key="resource.id" :resource="resource" @click.stop @click.prevent/>
    </div>
  </div>

</template>
<script setup>
import { index } from '@/composable/Utils/Admin/ResourceAdminUtils.ts'
import { onMounted, ref } from 'vue'
import ResourceComponent from '@/components/Shared/Resource/ResourceComponent.vue'

let resources = ref([])

onMounted(async () => {
  resources.value = await index()
})

</script>