<template>
  <div @click="cta(action)" :class="Class">
    <i :class="icon"></i>
    <p v-if="showNumber" class="text-sm">{{ number }}</p>
  </div>
</template>

<script setup lang="ts">
import { likeAResource } from '@/composable/Utils/ResourcesUtils'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userState = useUserStore()
const sessionUser = userState.user

const props = defineProps({
  icon: {
    type: String,
    required: false
  },
  action: {
    type: String,
    required: true
  },
  contextId: {
    type: Number,
    required: true
  },
  active: {
    type: String,
    required: true
  },
  numberToshow: {
    type: Number,
    required: false,
    default: 0
  }
})

let number = ref(props.numberToshow)
let showNumber = ref(true)
let Class = ref('flex bg-gray-100 rounded-full gap-1 justify-center items-center py-1 px-2')

onMounted(() => {
  if (props.active === 'true') {
    showNumber.value = true
  } else {
    showNumber.value = false
  }
})

async function cta(action: string) {
  switch (action) {
    case 'like':
      let res = await likeAResource(props.contextId, sessionUser.id)
      if (res === 2) {
        number.value++
        Class.value = 'flex bg-red-500 rounded-full gap-1 justify-center items-center py-1 px-2'
      }
      if (res === 1) {
        number.value--
        Class.value = 'flex bg-gray-100 rounded-full gap-1 justify-center items-center py-1 px-2'
      }
      if (res === 0) {
        number.value = 999
        Class.value = 'flex bg-red-500 rounded-full gap-1 justify-center items-center py-1 px-2'
      }

      break
    case 'comment':
      break
    case 'retweet':
      break
    default:
      break
  }
}
</script>
