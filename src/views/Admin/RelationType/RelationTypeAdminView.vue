<template>
  <div>
    <div class="p-5">
      <div class="flex justify-end py-4">
        <button-component @click="openModal()">Ajouter</button-component>
      </div>
      <table class="w-full border border-gray-200 rounded-md">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100">
        <tr class="text-xs text-gray-700 uppercase bg-gray-100 py-4">
          <td class="px-6 py-1.5 lg:py-3 text-black">Type de relation</td>
          <td class="px-6 py-1.5 lg:py-3 text-black"></td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="relationType in relationTypes" :key="relationType.id" class="border-b-gray-200 border-b" @click="openModal(relationType)" :id="`relationType-${relationType.id}`">
          <td class="px-6 py-1.5 lg:py-3 text-black">{{ relationType.name }}</td>
          <td class="px-6 py-1.5 lg:py-3 text-black text-end">
            <ButtonComponent btnStyle="danger" @click="deleteRelationType(relationType.id)" @click.stop>
              Supprimer
            </ButtonComponent>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <ModalComponent :is-hidden="opened" libelle-modal="Modifier un type de relation" tab-index="1" modal-name="edit-relation-type">
      <RelationTypeModalContentComponent :relation-type="relationType" v-if="opened"/>
      <RelationTypeModalContentComponent v-if="!opened"/>
    </ModalComponent>
  </div>

</template>
<script setup>
import { index, destroy } from '@/composable/Utils/Admin/RelationTypeAdminUtils.ts'
import { onMounted, ref } from 'vue'
import ButtonComponent from '@/components/App/Shared/buttons/ButtonComponent.vue'
import ModalComponent from '@/components/App/Shared/ModalComponent.vue'
import RelationTypeModalContentComponent from '@/components/Admin/RelationType/RelationTypeModalContentComponent.vue'

const relationTypes = ref([]);
const opened = ref(false)
const relationType = ref(null)

onMounted(async () => {
  relationTypes.value = await index()
})

const deleteRelationType = (id) => {
  destroy(id)
  relationTypes.value.filter((c) => c.id !== id);
  const node = document.getElementById(`relationType-${id}`)
  node.remove();
}

const openModal = async (relationTypeArgument) => {
  opened.value = true;
  relationType.value = relationTypeArgument
}

</script>