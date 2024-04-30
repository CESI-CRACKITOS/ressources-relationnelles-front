<template>
  <Teleport to="body">
    <div id="modal" class="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div class="bg-white w-fit mx-auto mt-20 p-5 rounded-md">
        <h1 class="text-2xl font-bold">Signaler</h1>
        <p>Quelle est la raison du signalement ?</p>
        <div class="flex flex-col gap-2 mt-5">
          <div class="flex justify-between w-full">
            <select class="border-indigo-600 border-2 text-indigo-600 rounded-md p-2" v-model="checkedOne" required>
              <option disabled value="" >Veuillez choisir un motif</option>
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
          <button @click="Validate" class="bg-blue-500 text-white px-3 py-1 rounded-md">
            Envoyer
          </button>
          <button @click="closeModal" class="bg-gray-200 px-3 py-1 rounded-md">Annuler</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {
  reportTypes,
  reportResource,
  reportComment,
  reportUser
} from '@/composable/Utils/ReportUtils'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userState = useUserStore()
const user = userState.user

let reportText = ref('')

let checkedOne = ref()
let reportTypeslist = ref()

const props = defineProps({
  report: {
    type: String
  },
  id: {
    type: Number,
    required: true
  }
})
onMounted(async () => {
  reportTypeslist.value = await reportTypes()
})

function closeModal() {
  const modal = document.getElementById('modal')
  modal?.remove()
}

function Validate() {
  switch (props.report) {
    case 'Resource':
      reportResource(user.id, checkedOne.value.toString(), props.id.toString(), reportText.value)
      break
    case 'Comment':
      reportComment(user.id, checkedOne.value.toString(), props.id.toString(), reportText.value)
      break
    case 'User':
      reportUser(user.id, checkedOne.value.toString(), props.id.toString(), reportText.value)
      break
  }
  const modal = document.getElementById('modal')
  modal?.remove()
}
</script>
