<template>
  <div @click="cta(action)" :class="Class">
    <i :class="icon"></i>
    <p v-if="showNumber" class="text-sm">{{ number }}</p>
  </div>
</template>

<script setup lang="ts">
import getUserFromToken from '@/composable/Utils/UserUtils'
import { onMounted, ref } from 'vue'

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
  }
})

let number = ref(0)
let showNumber = ref(false)
let Class = ref('')
onMounted(() => {
  switch (props.action) {
    case 'like':
      number.value = 10
      showNumber.value = true
      Class.value = 'flex bg-gray-100 rounded-full gap-1 justify-center items-center py-1 px-2'
      break
    case 'comment':
      showNumber.value = true

      Class.value = 'flex bg-gray-100 rounded-full gap-1 justify-center items-center py-1 px-2'
      break
    case 'retweet':
      showNumber.value = true

      Class.value = 'flex bg-gray-100 rounded-full gap-1 justify-center items-center py-1 px-2'
      break
    default:
      break
  }
})

async function cta(action: string) {
  switch (action) {
    case 'like':
      await likeResource()
      Class.value = 'flex bg-red-500 rounded-full gap-1 justify-center items-center py-1 px-2'
      break
    case 'comment':
      break
    case 'retweet':
      break
    default:
      break
  }
}
// todo get user from pinia
async function likeResource() {
  const user = await getUserFromToken('dc2288f5-3313-4d3f-9097-ee45ba0715f8')
  const response = await fetch(`http://localhost/api/like/${props.contextId}/${user.id}`, {
    method: 'PACTH',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return response
}
</script>
