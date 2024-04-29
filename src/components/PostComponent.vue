<template>
  <div class="flex bg-slate-100 p-3 border-b border-gray-200 gap-2"  @click="navigateToResourceDetails(resource.id)">
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
              <span class="me-1.5">{{ resource.user?.firstname + ' ' + resource.user?.lastname }}</span>
              <span class="text-xs h-fit">{{ timeFromPublish }}</span>
            </div>
            <div class="flex gap-1 flex-wrap">
              <span v-for="relationType in resource.relationTypes" class="bg-green-200 rounded-lg px-2">
                {{ relationType?.name }}
              </span>
              <a :href="`/category/${resource.category?.id}`" class="flex items-center bg-blue-100 w-fit px-2 rounded-md text-sm">
                Catégorie: {{ resource.category?.name }}
              </a>
            </div>
          </div>
        </div>
        <div @click="postDropDown(resource.id)">
          <i class="fas fa-ellipsis"></i>
        </div>
        <div :id="'postDropDown' + resource.id" class="hidden absolute right-0 top-5">
          <ul class="bg-white border rounded-md shadow-md">
            <li
              v-if="resource.user?.id == user.id"
              @click="Update()"
              class="py-2 px-4 hover:bg-gray-100"
            >
              Modifier
            </li>
            <li
              v-if="resource.user?.id == user.id"
              @click="Delete()"
              class="py-2 px-4 hover:bg-gray-100"
            >
              Suprimer
            </li>
            <li
              v-if="resource.user?.id != user.id"
              @click="Report(resource.id)"
              class="py-2 px-4 hover:bg-gray-100"
            >
              Signaler
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div class="flex flex-col gap-2">
          <p>
           <span class="bg-gray-200 p-2 rounded-md">{{ resource.title }}</span>
          </p>
          <div v-for="content in resource.contents" :key="content.id" @click.stop class="flex flex-col gap-5">
            <p v-if="!content.base64">{{ content.text }}</p>
            <img v-bind:src="`${content.base64}`" v-if="content.base64 && content.base64.startsWith('data:image/')" />
            <a class="bg-blue-600 py-1.5 px-3 text-white w-fit rounded-md hover:bg-blue-800" :download="`${content.text}`" v-bind:href="`${content.base64}`" v-if="content.base64 && content.base64.startsWith('data:application/pdf')">{{ content?.text }}</a>
            <iframe :src="content.base64" class="h-[500px] w-full hidden lg:block" v-if="content.base64 && content.base64.startsWith('data:application/pdf')"></iframe>
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
  <ReportModalComponent report="Resource" :id="resource.id" v-if="show" />
</template>

<script setup lang="ts">
import ResourceEntity from '@/composable/Entities/Resource'
import ReportModalComponent from '@/components/ReportModalComponent.vue'
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

let timeFromPublish = ref('')
onMounted(async () => {
  timeFromPublish.value = await calculateDates(props.resource.created_at)
})

function navigateToResourceDetails(id: number) {
  router.push({ name: 'resource', params: { id: id } })
}
function postDropDown(id: number) {
  const dropDown = document.getElementById('postDropDown' + id)
  dropDown?.classList.toggle('hidden')
}

function Update() {}

function Delete() {}
let show = ref(false)
async function Report(id: number) {
  show.value = true
}


</script>
