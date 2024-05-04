<template>
  <div class="flex justify-center items-center h-screen w-screen bg-black bg-opacity-70 z-10 absolute" v-if="opened"
       @click="closeModal">

    <CategoryModalComponent :category="category"/>
  </div>

  <div class="p-5">
    <div class="flex justify-end py-4">
      <button-component @click="openModal()">Ajouter</button-component>
    </div>
    <table class="w-full border border-gray-200 rounded-md">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100">
      <tr class="text-xs text-gray-700 uppercase bg-gray-100 py-4">
        <td class="px-6 py-1.5 lg:py-3 text-black">Nom de la catégorie</td>
        <td class="px-6 py-1.5 lg:py-3 text-black"></td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="category in categories" :key="category.id" class="border-b-gray-200 border-b" :id="`category-${category.id}`" @click="openModal(category)">
        <td class="px-6 py-1.5 lg:py-3 text-black">{{ category.name }}</td>
        <td class="px-6 py-1.5 lg:py-3 text-black text-end">
          <ButtonComponent btnStyle="danger" @click="deleteCategory(category.id)" @click.stop>
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
import ButtonComponent from '@/components/App/Shared/buttons/ButtonComponent.vue'
import CategoryModalComponent from '@/components/Admin/Category/CategoryModalComponent.vue'

const categories = ref([]);
const opened = ref(false)
const category = ref(null)

onMounted(async () => {
  categories.value = await index()
})

const deleteCategory = (id) => {
  destroy(id)
  categories.value.filter((c) => c.id !== id);
  const node = document.getElementById(`category-${id}`)
  node.remove();
}

const openModal = async (categoryEntity) => {
  opened.value = true;
  category.value = categoryEntity
}
const closeModal = () => {
  opened.value = false
  category.value = null
}

</script>