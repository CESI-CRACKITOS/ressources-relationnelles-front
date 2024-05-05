<template>
  <div class="p-5">
    <table class="w-full border border-gray-200 rounded-md">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100">
      <tr class="text-xs text-gray-700 uppercase bg-gray-100 py-4">
        <td class="px-6 py-1.5 lg:py-3 text-black">Utilisateur</td>
        <td class="px-6 py-1.5 lg:py-3 text-black">Role actuel</td>
        <td class="px-6 py-1.5 lg:py-3 text-black items-end"></td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id" class="border-b-gray-200 border-b">
        <td class="px-6 py-1.5 lg:py-3 text-black">
          <div class="flex gap-2 items-center">
            <a :href="`/profile/${user.id}`">
              <img class="h-10 w-10 rounded-full object-cover" :src="user.profilePicture" alt="" />
            </a>

            <div>
              <p class="max-w-80 truncate">{{ user.lastname }}</p>
              <p class="max-w-80 truncate">{{ user.firstname }}</p>
            </div>
          </div>
        </td>
        <td class="px-6 py-1.5 lg:py-3 text-black">{{ user.role }}</td>
        <td class="px-6 py-1.5 lg:py-3 text-black items-end ">
          <ButtonComponent class=" w-full" @click="openModal(user)">
            Modifier le role
          </ButtonComponent>
        </td>
      </tr>
      </tbody>
    </table>
    <ModalComponent
      modal-name="RelationType"
      :tabIndex="1"
      :libelle-modal="`Changer le role de ${userModal.firstname} ${userModal.lastname}`"
      :is-hidden="RelationModal"
    >
      <div class="flex justify-between w-full gap-10 max-sm:flex-col">
        <select
          class="border-indigo-600 border-2 text-indigo-600 rounded-md p-2"
          v-model="checkedOne"
          required
        >
          <option disabled selected value="U">Veuillez choisir un role</option>
          <option v-if="userModal.role !== 'U'" value="U">Utilisateur</option>
          <option v-if="userModal.role !== 'M'" value="M">Modérateur</option>
          <option v-if="userModal.role !== 'A'" value="A">Administrateur</option>
          <option v-if="userModal.role !== 'S'" value="S">Superadmin</option>
        </select>
        <div class="flex justify-between gap-2 w-full">
          <ButtonComponent :-remplis="true" @click="changeRole()">
            Valider
          </ButtonComponent>

          <ButtonComponent @click="RelationModal = false"> Annuler </ButtonComponent>
        </div>
      </div>
    </ModalComponent>
  </div>



</template>
<script setup>

import { onMounted, ref } from 'vue'
import { searchUsers, updateRole } from '@/composable/Utils/UserUtils.ts'
import { useRouter } from 'vue-router'
import ModalComponent from '@/components/App/Shared/ModalComponent.vue'
import ButtonComponent from '@/components/App/Shared/buttons/ButtonComponent.vue'


const router = useRouter();

const users = ref([]);
const userModal = ref("");
let RelationModal = ref(false)
onMounted(async () => {
  users.value = await searchUsers(router.currentRoute.value.params.query)
  console.log(users.value)
})

function openModal(user){
  userModal.value = user
  RelationModal.value = true
}
let checkedOne = ref('')
function closeModal(){
  RelationModal.value = false
}
let res = ref("")
async function changeRole() {
  res.value = await updateRole(userModal.value.id,checkedOne.value)
  RelationModal.value = false
  location.reload()
}

</script>