<template>
	<div class="h-screen rounded max-w-xl overflow-scroll max-xl:mr-0">
		<!-- Rajouter ici la creation de poste pour computer view -->
		<PostComponent v-for="resource in resources" :key="resource.id" :resource="resource" />
	</div>
</template>

<script setup lang="ts">
import PostComponent from '@/components/PostComponent.vue'
import ResourceEntity from '@/composable/Entities/Resource'
import { getResources } from '@/composable/Utils/ResourcesUtils'
import { onMounted, ref } from 'vue'

let resources = ref<ResourceEntity[]>([])

onMounted(async () => {
	resources.value = await getResources()
})
</script>
