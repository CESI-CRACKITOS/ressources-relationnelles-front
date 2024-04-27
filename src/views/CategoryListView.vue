<template>
  <div class="flex flex-col overflow-scroll h-screen">
    <CategorieTrendComponent
      :TrendRanking="category.rank"
      :name="category.name"
      :NumberOfPost="category.numberOfPost"
      :id="category.id"
      v-for="category in categories"
      :key="category.id"
    />
  </div>
</template>

<script setup lang="ts">
import CategoryEntity from '@/composable/Entities/Category'
import { getCategories } from '@/composable/Utils/CategoryUtils'
import { onMounted, ref } from 'vue'
import CategorieTrendComponent from '@/components/CategorieTrendComponent.vue'

let categories = ref<CategoryEntity[]>([])
onMounted(async () => {
  categories.value = await getCategories()
})
</script>
