<template>
  <div class="flex bg-white p-3 border-b border-gray-200 gap-2">
    <a :href="`profile/${resource.user?.id}`" class="h-fit w-fit">
      <div class="w-12 h-fit">
        <img :src="props.resource.user?.profilePicture" class="rounded-lg" alt="" />
      </div>
    </a>
    <div class="flex flex-col w-full gap-2">
      <div class="flex flex-row justify-between w-full relative">
        <div class="flex flex-row gap-2 items-center">
          <h3 class="max-w-80 truncate">
            {{ resource.user?.firstname + ' ' + resource.user?.lastname }}
          </h3>
          <span class="text-xs h-fit">{{ timeFromPublish }}</span>
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
      <div @click="navigateToResourceDetails(resource.id)">
        <div>
          <p>
            {{ resource.title }}
          </p>
          <p v-for="content in resource.contents" :key="content.id">
            {{ content.text }}
          </p>
        </div>

        <div class="w-full flex flex-wrap">
          <div class="w-full h-56 flex items-center justify-center border rounded-xl">
            le gros jeu de débille
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
          />
          <IconButtonComponentVue
            icon="far fa-comment"
            action="comment"
            :context-id="resource.id"
            active="true"
            :numberToshow="resource.numberOfComments"
          />
          <IconButtonComponentVue
            icon="fas fa-retweet"
            action="retweet"
            :context-id="resource.id"
            active="true"
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
