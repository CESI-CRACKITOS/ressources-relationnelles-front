<template>
  <div class="flex flex-col border-b first:border-t" @click="navigateToResourceDetails(resource.id)">
    <div class="flex justify-between p-5">
      <a :href="`/profile/${resource.user?.id}`" class="h-fit w-fit">
      <div class="flex gap-2">
        <div class="w-12 h-fit">
          <img :src="props.resource.user?.profilePicture" class="rounded-lg" alt="" />
        </div>
        <div>
          <p>{{resource.user?.firstname + ' ' + resource.user?.lastname}}</p>
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
        <div v-for="content in resource.contents" :key="content.id" @click.stop class="flex flex-col gap-5">
          <p v-if="!content.base64">{{ content.text }}</p>
        </div>
        <div v-for="content in resource.contents" :key="content.id" @click.stop class="flex flex-col gap-5">
          <img v-bind:src="`${content.base64}`"
            v-if="content.base64 && content.base64.startsWith('data:image/')"
          />
          <a class="flex items-center justify-center border border-indigo-600 px-4 py-2 text-indigo-600
        w-full hover:bg-indigo-600 hover:text-white hover:cursor-pointer"
            :download="`${content.text}`" v-bind:href="`${content.base64}`"
            v-if="content.base64 && content.base64.startsWith('data:application/pdf')">
            {{ content?.text }}
          </a>
          <iframe :src="content.base64" class="h-[500px] w-full hidden lg:block"
            v-if="content.base64 && content.base64.startsWith('data:application/pdf')"
          ></iframe>
        </div>
    </div>
    <div class="flex justify-between items-center px-5 relative">
      <div class="flex gap-2 py-2">
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
      <div @click="open">
        <i class="fa-solid fa-ellipsis"></i>
      </div>
      <div :id="'postDropDown' + resource.id" v-if="showListBtn" class="absolute right-0 top-10">
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
  </div>

</template>

<script setup lang="ts">
import ResourceEntity from '@/composable/Entities/Resource'
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
