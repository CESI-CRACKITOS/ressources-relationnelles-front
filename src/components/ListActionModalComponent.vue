<template>
  <ModalComponent
    :modal-name="'deletePost' + targetId"
    tab-index="1"
    :libelle-modal="'Suprimer le ' + ModalType + ' n°' + targetId"
    :isHidden="deleteModalState"
  >
    <div class="flex flex-col gap-2">
      <p>Êtes-vous sûr de vouloir supprimer ce poste ?</p>
      <div class="flex gap-2">
        <button @click="deleteModal" class="bg-red-500 text-white rounded-md px-2 py-1">Oui</button>
        <button @click="closeModal" class="bg-green-500 text-white rounded-md px-2 py-1">
          Non
        </button>
      </div>
    </div>
  </ModalComponent>







  <ModalComponent
    :modal-name="'reportPost' + targetId"
    tab-index="3"
    :libelle-modal="'Signaler le ' + ModalType + ' n°' + targetId"
    :isHidden="reportModalState"
  >
    <div class="flex flex-col gap-2 mt-5">
      <div class="flex justify-between w-full">
        <select
          class="border-indigo-600 border-2 text-indigo-600 rounded-md p-2"
          v-model="checkedOne"
          required
        >
          <option disabled value="">Veuillez choisir un motif</option>
          <option v-for="reportType in reportTypeslist" :key="reportType.id" :value="reportType.id">
            {{ reportType.name }}
          </option>
        </select>
      </div>
      <textarea
        class="border border-gray-200 p-3 w-full"
        v-model="reportText"
        name="reporttext"
        placeholder="Expliquez nous pourquoi vous voulez le signaler"
      ></textarea>
    </div>
    <div class="flex justify-end gap-2 mt-5">
      <button @click="ValidateReport()" class="bg-blue-500 text-white px-3 py-1 rounded-md">
        Envoyer
      </button>
      <button @click="closeModal()" class="bg-gray-200 px-3 py-1 rounded-md">Annuler</button>
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import ModalComponent from '@/components/Shared/ModalComponent.vue'
import { ref, watch, onMounted } from 'vue'
import { deleteComment, deleteResource } from '@/composable/Utils/DeleteUtils'
import { updateComment, updateResource, updateUser } from '@/composable/Utils/UpdateUtils'
import { useUserStore } from '@/stores/user'
import {
  reportComment,
  reportResource,
  reportTypes,
  reportUser
} from '@/composable/Utils/ReportUtils'

import ResourceEntity from '@/composable/Entities/Resource'
import ResourceCommentEntity from '@/composable/Entities/ResourceComment'
import UserEntity from '@/composable/Entities/User'

let deleteModalState = ref(false)
let updateModalState = ref(false)
let reportModalState = ref(false)

let resourceEntity: ResourceEntity
let commentEntity: ResourceCommentEntity
let userEntity: UserEntity

const props = defineProps({
  targetId: {
    type: Number,
    required: true
  },
  modalToOpen: {
    type: String,
    required: false
  },
  ModalType: {
    type: String,
    required: false
  }
})
const userState = useUserStore()
const user = userState.user

let reportText = ref('')
let checkedOne = ref('')
let reportTypeslist = ref()
onMounted(async () => {
  reportTypeslist.value = await reportTypes()
})
watch(
  () => props.modalToOpen,
  (newVal) => {
    switch (newVal) {
      case 'delete':
        deleteModalState.value = true
        updateModalState.value = false
        reportModalState.value = false
        break
      case 'update':
        updateModalState.value = true
        deleteModalState.value = false
        reportModalState.value = false

        break
      case 'report':
        reportModalState.value = true
        deleteModalState.value = false
        updateModalState.value = false
        break
    }
  }
)

function updateModal() {
  switch (props.ModalType) {
    case 'resource':
      updateResource(resourceEntity)
      break
    case 'comment':
      updateComment(commentEntity)
      break
    case 'user':
      updateUser(userEntity)
      break
  }

  closeModal()
}

function deleteModal() {
  switch (props.ModalType) {
    case 'resource':
      deleteResource(props.targetId)
      break
    case 'comment':
      deleteComment(props.targetId)
      break
  }
  closeModal()
}

function ValidateReport() {
  switch (props.ModalType) {
    case 'resource':
      reportResource(
        user.id,
        checkedOne.value.toString(),
        props.targetId.toString(),
        reportText.value
      )
      break
    case 'comment':
      reportComment(
        user.id,
        checkedOne.value.toString(),
        props.targetId.toString(),
        reportText.value
      )
      break
    case 'user':
      reportUser(user.id, checkedOne.value.toString(), props.targetId.toString(), reportText.value)
      break
  }
  closeModal()
}

function closeModal() {
  reportModalState.value = false
  deleteModalState.value = false
  updateModalState.value = false
}
</script>
