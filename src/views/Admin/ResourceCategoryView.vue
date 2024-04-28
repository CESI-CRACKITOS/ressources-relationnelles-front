<template>

  <div class="p-5">
    <table class="w-full border border-gray-200 rounded-md">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100">
      <tr class="text-xs text-gray-700 uppercase bg-gray-100 py-2">
        <td class="px-6 py-1.5 lg:py-3 text-black">Nom de la catégorie</td>
        <td class="px-6 py-1.5 lg:py-3 text-black"></td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="category in categories" :key="category.id" class="border-b-gray-200 border-b" :id="`category-${category.id}`">
        <td class="px-6 py-1.5 lg:py-3 text-black">{{ category.name }}</td>
        <td class="px-6 py-1.5 lg:py-3 text-black text-end">
          <ButtonComponent btnStyle="danger" @click="deleteCategory(category.id)">
            Supprimer
          </ButtonComponent>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>
<script setup>
import { index, destroy } from '@/composable/Utils/Admin/CategoryUtils.ts'
import { onMounted, ref } from 'vue'
import ButtonComponent from '@/components/Shared/buttons/ButtonComponent.vue'
const categories = ref([]);
onMounted(async () => {
  categories.value = await index()
})
const deleteCategory = (id) => {
  destroy(id)
  categories.value.filter((c) => c.id !== id);
  const node = document.getElementById(`category-${id}`)
  node.remove();
}
</script>