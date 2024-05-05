<template>

  <div class="flex flex-col bg-white max-h-[700px] max-w-[900px] overflow-y-auto rounded-md p-5 gap-5" @click.stop>
    <label for="">Type de relation</label>
    <input type="text" class="bg-gouv-gray-300 border-b-2 border-black w-full p-3 rounded-t-md" v-model="data.reportType.name">
    <button-component @click="send()">Envoyer</button-component>
  </div>

</template>
<script setup>
import { defineProps } from 'vue'
import ButtonComponent from '@/components/App/Shared/buttons/ButtonComponent.vue'
import { insert, update } from '@/composable/Utils/Admin/ReportTypeAdminUtils.ts'

const props = defineProps({
  reportType: {}
})

const data = {
  reportType: props.reportType ? props.reportType : {},
}

const send = async () => {
  if (data.reportType.id) {
    await update(data.reportType.id, data.reportType.name)
  } else {
    await insert(data.reportType.name)
  }
  window.location.reload()
}

</script>