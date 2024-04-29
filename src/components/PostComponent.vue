<template>
  <div class="flex bg-white p-3 border-b border-gray-200 gap-2">
    <a :href="`/profile/${resource.user?.id}`" class="h-fit w-fit">
      <div class="w-12 h-fit">
        <img :src="props.resource.user?.profilePicture" class="rounded-lg" alt="" />
      </div>
    </a>
    <div class="flex flex-col w-full gap-2">
      <div class="flex flex-row justify-between w-full relative">
        <div class="flex flex-row items-start">
          <div>
            <div>
              <span class="me-1.5">{{
                resource.user?.firstname + ' ' + resource.user?.lastname
              }}</span>
              <span class="text-xs h-fit">{{ timeFromPublish }}</span>
            </div>
            <div class="flex gap-1 flex-wrap">
              <span
                v-for="relationType in resource.relationTypes"
                :key="relationType.id"
                class="bg-green-200 rounded-lg px-2"
              >
                {{ relationType?.name }}
              </span>
              <a
                :href="`/category/${resource.category?.id}`"
                class="flex items-center bg-blue-100 w-fit px-2 rounded-md text-sm"
              >
                Catégorie: {{ resource.category?.name }}
              </a>
            </div>
          </div>
        </div>
        <div @click="open()">
          <i class="fas fa-ellipsis"></i>
        </div>
        <div :id="'postDropDown' + resource.id" v-if="showListBtn" class="absolute right-0 top-5">
          <ul class="bg-white border rounded-md shadow-md">
            <li
              v-if="resource.user?.id == user.id"
              @click="OpenUpdateModal()"
              class="py-2 px-4 hover:bg-gray-100"
            >
              Modifier
            </li>
            <li
              v-if="resource.user?.id == user.id"
              @click="OpenDeleteModal()"
              class="py-2 px-4 hover:bg-gray-100"
            >
              Suprimer
            </li>
            <li
              v-if="resource.user?.id != user.id"
              @click="OpenReportModal()"
              class="py-2 px-4 hover:bg-gray-100"
            >
              Signaler
            </li>
          </ul>
        </div>
      </div>
      <div @click="navigateToResourceDetails(resource.id)">
        <div class="flex flex-col gap-2">
          <p>
            <span class="bg-gray-200 p-2 rounded-md">{{ resource.title }}</span>
          </p>
          <div
            v-for="content in resource.contents"
            :key="content.id"
            @click.stop
            class="flex flex-col gap-5"
          >
            <p v-if="!content.base64">{{ content.text }}</p>
            <img
              v-bind:src="`${content.base64}`"
              v-if="content.base64 && content.base64.startsWith('data:image/')"
            />
            <a
              class="bg-blue-600 py-1.5 px-3 text-white w-fit rounded-md hover:bg-blue-800"
              :download="`${content.text}`"
              v-bind:href="`${content.base64}`"
              v-if="content.base64 && content.base64.startsWith('data:application/pdf')"
              >{{ content?.text }}</a
            >
            <iframe
              :src="content.base64"
              class="h-[500px] w-full hidden lg:block"
              v-if="content.base64 && content.base64.startsWith('data:application/pdf')"
            ></iframe>
          </div>
        </div>
      </div>

      <div>
        <div class="flex flex-row items-center justify-start gap-2">
          <IconButtonComponentVue
            icon="far fa-heart"
            action="like"
            :context-id="resource.id"
            active="true"
            :numberToshow="resource.numberOfLikes"
            cursor="cursor-pointer"
          />
          <IconButtonComponentVue
            icon="far fa-comment"
            action="comment"
            :context-id="resource.id"
            active="true"
            :numberToshow="resource.numberOfComments"
          />
        </div>
      </div>
    </div>
  </div>
  <ListActionModalComponent
    -modal-type="post"
    :target-id="resource.id"
    :modal-to-open="modalToOpen"
    v-if="showModal"
  ></ListActionModalComponent>
</template>

<script setup lang="ts">
import ResourceEntity from '@/composable/Entities/Resource'
import ListActionModalComponent from '@/components/ListActionModalComponent.vue'
import IconButtonComponentVue from '@/components/Shared/buttons/IconButtonComponent.vue'
import router from '@/router'
import { calculateDates } from '@/composable/Utils/DateUtils'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userState = useUserStore()
const user = userState.user
const props = defineProps({
  resource: {
    type: ResourceEntity,
    required: true
  }
})
let showModal = ref(false)

let showListBtn = ref(false)
let timeFromPublish = ref('')
let modalToOpen = ref('')
onMounted(async () => {
  timeFromPublish.value = await calculateDates(props.resource.created_at)
})

function navigateToResourceDetails(id: number) {
  router.push({ name: 'resource', params: { id: id } })
}

function open() {
  showListBtn.value = !showListBtn.value

  showModal.value = true
}

function OpenReportModal() {
  if (modalToOpen.value == 'report') {
    modalToOpen.value = ''
  }
  modalToOpen.value = 'report'
}
async function OpenDeleteModal() {
  console.log('delete', showModal.value)
  modalToOpen.value = modalToOpen.value == 'delete' ? '' : 'delete'
}
function OpenUpdateModal() {
  if (modalToOpen.value == 'update') {
    modalToOpen.value = ''
  }
  modalToOpen.value = 'update'
}
</script>
