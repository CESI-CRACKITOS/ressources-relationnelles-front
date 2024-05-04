<template>
  <div>
    <div class="p-5">
      <div class="flex justify-end py-4">
        <button-component @click="openModal()">Ajouter</button-component>
      </div>
      <table class="w-full border border-gray-200 rounded-md">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100">
        <tr class="text-xs text-gray-700 uppercase bg-gray-100 py-4">
          <td class="px-6 py-1.5 lg:py-3 text-black">Catégorie</td>
          <td class="px-6 py-1.5 lg:py-3 text-black"></td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="category in categories" :key="category.id" class="border-b-gray-200 border-b" @click="openModal(category)" :id="`category-${category.id}`">
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

    <ModalComponent :is-hidden="opened" libelle-modal="Modifier une catégorie" tab-index="1" modal-name="edit-relation-type">
      <CategoryModalComponent :category="category" v-if="opened"/>
      <CategoryModalComponent v-if="!opened"/>
    </ModalComponent>
  </div>

</template>
<script setup>
import { destroy, index } from '@/composable/Utils/Admin/CategoryAdminUtils.ts'
import { onMounted, ref } from 'vue'
import ButtonComponent from '@/components/App/Shared/buttons/ButtonComponent.vue'
import CategoryModalComponent from '@/components/Admin/Category/CategoryModalContentComponent.vue'
import ModalComponent from '@/components/App/Shared/ModalComponent.vue'

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

</script>