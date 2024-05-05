<template>
  <div class="overflow-y-auto">
    <div class="p-5">
      <div class="flex justify-end py-4">
        <button-component @click="openModal()">Ajouter</button-component>
      </div>
      <table class="w-full border border-gray-200 rounded-md">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100">
        <tr class="text-xs text-gray-700 uppercase bg-gray-100 py-4">
          <td class="px-6 py-1.5 lg:py-3 text-black">Type de signalement</td>
          <td class="px-6 py-1.5 lg:py-3 text-black"></td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="reportType in reportTypesArray" :key="reportType.id" class="border-b-gray-200 border-b" @click="openModal(reportType)" :id="`reportType-${reportType.id}`">
          <td class="px-6 py-1.5 lg:py-3 text-black">{{ reportType.name }}</td>
          <td class="flex justify-end px-6 py-1.5 lg:py-3 text-black">
            <ButtonComponent @click="deleteReportType(reportType.id)" @click.stop>
              Supprimer
            </ButtonComponent>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <ModalComponent :is-hidden="opened" libelle-modal="Modifier un type de signalement" tab-index="1" modal-name="edit-report-type">
      <ReportTypeModalContentComponent :report-type="reportType" v-if="opened"/>
      <ReportTypeModalContentComponent v-if="!opened"/>
    </ModalComponent>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import ModalComponent from '@/components/App/Shared/ModalComponent.vue'
import ButtonComponent from '@/components/App/Shared/buttons/ButtonComponent.vue'
import { reportTypes } from '@/composable/Utils/ReportUtils.ts'
import ReportTypeModalContentComponent from '@/components/Admin/ReportType/ReportTypeModalContentComponent.vue'
import { destroy } from '@/composable/Utils/Admin/ReportTypeAdminUtils.ts'

const reportTypesArray = ref([]);
const reportType = ref(null);
const opened = ref(false)

onMounted(async () => {
  reportTypesArray.value = await reportTypes();
})


const openModal = async (reportTypeArgument) => {
  opened.value = true;
  reportType.value = reportTypeArgument
}

const deleteReportType = async (reportTypeId) => {
  await destroy(reportTypeId)
  reportTypesArray.value.filter((c) => c.id !== reportTypeId);
  const node = document.getElementById(`reportType-${reportTypeId}`)
  node.remove();
}

</script>