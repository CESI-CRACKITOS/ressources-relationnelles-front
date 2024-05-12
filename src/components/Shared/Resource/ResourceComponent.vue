<template>
  <div
    class="flex flex-col border-b first:border-t"
    @click="navigateToResourceDetails(resource.id)"
  >
    <div class="flex justify-between p-5">
      <a :href="`/profile/${resource.user?.id}`" class="h-fit w-fit" @click.stop>
        <div class="flex gap-2">
          <div class="w-12 h-fit">
            <img :src="props.resource.user?.profilePicture" class="rounded-lg" alt="" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <p>{{ resource.user?.firstname + ' ' + resource.user?.lastname }}</p>
              <span v-if="resource.isDraft" class="bg-slate-200 p-2 rounded-full text-xs w-fit"
                >Brouillon</span
              >
              <span v-if="!resource.isPublished" class="bg-slate-200 p-2 rounded-full text-xs w-fit"
                >Non Publié</span
              >
            </div>
            <p class="text-xs text-gray-700">{{ resource.category?.name }}</p>
          </div>
        </div>
      </a>
      <span>
        {{ timeFromPublish }}
      </span>
    </div>
    <div class="flex flex-col gap-1 px-5">
      <p class="text-lg font-bold">{{ resource.title }}</p>
      <p>{{ resource.text }}</p>
      <div
        v-for="content in resource.contents"
        :key="content.id"
        @click.stop
        class="flex flex-col gap-5"
      >
        <img
          v-bind:src="`${content.base64}`"
          v-if="content.base64 && content.base64.startsWith('data:image/')"
        />
        <a
          class="flex items-center justify-center border border-indigo-600 px-4 py-2 text-indigo-600 w-full hover:bg-indigo-600 hover:text-white hover:cursor-pointer"
          :download="`${content.text}`"
          v-bind:href="`${content.base64}`"
          v-if="content.base64 && content.base64.startsWith('data:application/pdf')"
        >
          {{ content?.text }}
        </a>
        <iframe
          :src="content.base64"
          class="h-[500px] w-full hidden lg:block"
          v-if="content.base64 && content.base64.startsWith('data:application/pdf')"
        ></iframe>
      </div>
    </div>
    <div class="flex justify-between items-center px-5 relative" @click.stop>
      <div class="flex gap-2 py-2">
        <IconButtonComponentVue
          icon="far fa-heart"
          action="like"
          :context-id="resource.id"
          active="true"
          :numberToshow="resource.numberOfLikes"
          cursor="cursor-pointer"
          :is-liked="resource.isLiked"
          v-if="!isAdmin"
        />
      </div>
      <div
        v-if="resource.user?.id == user.id || isAdmin"
        @click="resourceDropDown(resource.id)"
        @click.stop
        class="hover:cursor-pointer"
      >
        <i class="fa-solid fa-ellipsis"></i>
      </div>
      <div
        :id="'postDropDown' + resource.id"
        class="absolute hidden right-0 top-10 hover:cursor-pointer"
        @click.stop
      >
        <ul class="bg-white border rounded-md shadow-md">
          <li
            v-if="resource.user?.id == user.id && !isAdmin"
            @click="showEditModal = true"
            class="py-2 px-4 hover:bg-gray-100"
          >
            Modifier
          </li>
          <li
            v-if="resource.user?.id == user.id && !isAdmin"
            @click="openModal('delete')"
            class="py-2 px-4 hover:bg-gray-100"
          >
            Suprimmer
          </li>
          <li v-if="isAdmin" class="py-2 px-4 hover:bg-gray-100" @click="acceptResource">
            Accepter
          </li>
          <li v-if="isAdmin" class="py-2 px-4 hover:bg-gray-100" @click="refuseResource">
            Refuser
          </li>
        </ul>
      </div>
    </div>

    <ModalComponent
      :modal-name="`update-resource-${resource.id}`"
      tab-index="2"
      libelle-modal="Modifier la ressource"
      :isHidden="showEditModal"
    >
      <ResourceModalContent :resource="resource" />
    </ModalComponent>

    <ListActionModalComponent
      :targetId="resource.id"
      ModalType="resource"
      :modalToOpen="modalToOpen"
      v-if="show"
    >
    </ListActionModalComponent>
  </div>
</template>

<script setup lang="ts">
import ResourceEntity from '@/composable/Entities/Resource'
import IconButtonComponentVue from '@/components/Shared/Resource/ResourceButton.vue'
import ListActionModalComponent from '@/components/ListActionModalComponent.vue'
import router from '@/router'
import { calculateDates } from '@/composable/Utils/DateUtils'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import ModalComponent from '@/components/App/Shared/ModalComponent.vue'
import ResourceModalContent from '@/components/App/Resource/ResourceModalContent.vue'
import { accept, refuse } from '@/composable/Utils/Admin/ResourceAdminUtils'

const showEditModal = ref(false)
const userState = useUserStore()
const user = userState.user
const props = defineProps({
  resource: {
    type: ResourceEntity,
    required: true
  }
})
let show = ref(false)
let modalToOpen = ref('')

let timeFromPublish = ref('')

const isAdmin = router.currentRoute.value.fullPath === '/admin/resources'

onMounted(async () => {
  timeFromPublish.value = await calculateDates(props.resource.created_at)
})

function resourceDropDown(id: number) {
  show.value = true
  const dropDown = document.getElementById('postDropDown' + id)
  dropDown?.classList.toggle('hidden')
}

function navigateToResourceDetails(id: number) {
  router.push({ name: 'resource', params: { id: id } })
}

function openModal(type: string) {
  modalToOpen.value = type
}

const acceptResource = async () => {
  await accept(props.resource.id)
  window.location.reload()
}

const refuseResource = async () => {
  await refuse(props.resource.id)
  window.location.reload()
}
</script>
