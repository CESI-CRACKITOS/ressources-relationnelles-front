<template>
  <div class="flex flex-col overflow-scroll h-screen">
    <div class="w-full flex flex-row justify-center items-center text-center relative text-xl p-4">
      <div class="absolute text-start w-full p-2" @click="back()">
        <i class="fa-solid fa-arrow-left"></i>
      </div>
      <div>Catégorie(s)</div>
    </div>
    <CategorieTrendComponent class="ms-4"
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
import router from '@/router'

let categories = ref<CategoryEntity[]>([])
onMounted(async () => {
  categories.value = await getCategories()
})

function back() {
  router.go(-1)
}
</script>
