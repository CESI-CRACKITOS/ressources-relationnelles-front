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
        <button @click="deleteModal" class="bg-green-500 text-white rounded-md px-2 py-1">
          Non
        </button>
      </div>
    </div>
  </ModalComponent>
  <ModalComponent
    :modal-name="'updatePost' + targetId"
    tab-index="2"
    :libelle-modal="'Modifier le ' + ModalType + ' n°' + targetId"
    :isHidden="updateModalState"
  >
    <div class="flex flex-col gap-2">
      <p>Modifier le poste</p>
      <div class="flex gap-2">
        <button @click="updateModal" class="bg-red-500 text-white rounded-md px-2 py-1">Oui</button>
        <button @click="updateModal" class="bg-green-500 text-white rounded-md px-2 py-1">
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
    <div class="flex flex-col gap-2">
      <p class="text-sm">Pourquoi voulez-vous signaler ce {{ ModalType }} ?</p>
      <div class="flex flex-col gap-2 mt-5">
        <div class="flex justify-between w-full px-5">
          <label v-for="reportType in reportTypeslist" :key="reportType.id">
            <input
              @click="checkedOne = reportType.id"
              type="radio"
              name="report"
              :value="reportType.id"
            />
            {{ reportType.name }}
          </label>
        </div>

        <textarea
          class="border border-gray-200 p-3 w-full"
          v-model="reportText"
          name="reporttext"
          placeholder="Expliquez nous pourquoi vous voulez le signaler"
        ></textarea>
      </div>
      <div class="flex gap-2">
        <button @click="reportModal" class="bg-red-500 text-white rounded-md px-2 py-1">Oui</button>
        <button @click="reportModal" class="bg-green-500 text-white rounded-md px-2 py-1">
          Non
        </button>
      </div>
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import ModalComponent from '@/components/Shared/ModalComponent.vue'
import { ref, watch, onMounted } from 'vue'

import { useUserStore } from '@/stores/user'
import {
  reportComment,
  reportResource,
  reportTypes,
  reportUser
} from '@/composable/Utils/ReportUtils'

let deleteModalState = ref(false)
let updateModalState = ref(false)
let reportModalState = ref(false)
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

let checkedOne = ref()
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
  updateModalState.value = !updateModalState.value
}

function deleteModal() {
  console.log('delete')
  deleteModalState.value = !deleteModalState.value
}
async function reportModal() {
  reportModalState.value = !reportModalState.value

  switch (props.ModalType) {
    case 'post':
      await reportResource(
        user.id,
        checkedOne.value.toString(),

        props.targetId.toString(),
        reportText.value
      )
      break
    case 'comment':
      await reportComment(
        user.id,
        checkedOne.value.toString(),
        props.targetId.toString(),
        reportText.value
      )
      break
    case 'user':
      await reportUser(
        user.id,
        checkedOne.value.toString(),

        props.targetId.toString(),
        reportText.value
      )
      break
  }
}
</script>
