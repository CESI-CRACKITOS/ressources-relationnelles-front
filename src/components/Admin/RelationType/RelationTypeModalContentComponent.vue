<template>

  <div class="flex flex-col bg-white max-h-[700px] max-w-[900px] overflow-y-auto rounded-md p-5 gap-5" @click.stop>
    <label for="">Type de relation</label>
    <input type="text" class="bg-gouv-gray-300 border-b-2 border-black w-full p-3 rounded-t-md" v-model="data.relationType.name">
    <button-component @click="send()">Envoyer</button-component>
  </div>

</template>
<script setup>
import { defineProps } from 'vue'
import ButtonComponent from '@/components/App/Shared/buttons/ButtonComponent.vue'
import { insert, update } from '@/composable/Utils/Admin/RelationTypeAdminUtils.ts'

const props = defineProps({
  relationType: {}
})

const data = {
  relationType: props.relationType ? props.relationType : {},
}

const send = async () => {
  if (data.relationType.id) {
    await update(data.relationType.id, data.relationType.name)
  } else {
    await insert(data.relationType.name)
  }
  window.location.reload()
}

</script>