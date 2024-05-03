<template>

  <div class="flex flex-col bg-white max-h-[700px] max-w-[900px] overflow-y-auto rounded-md p-5 gap-5" @click.stop>
    <label for="">Nom de la catégorie</label>
    <input type="text" class="bg-gouv-gray-300 border-b-2 border-black w-full p-3 rounded-t-md" v-model="data.category.name">
    <button-component @click="send()">Envoyer</button-component>
  </div>

</template>
<script setup>
import { defineProps } from 'vue'
import ButtonComponent from '@/components/App/Shared/buttons/ButtonComponent.vue'
import CategoryEntity from '@/composable/Entities/Category.ts'
import { insert, update } from '@/composable/Utils/Admin/CategoryUtils.ts'

const props = defineProps({
  category: {}
})

const data = {
  category: props.category ? props.category : new CategoryEntity({}),
}

const send = async () => {
  if (data.category.id) {
    await update(data.category)
  } else {
    await insert(data.category)
  }
  window.location.reload()

}

</script>