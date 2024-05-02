<template>
  <div @click="cta(action)" :class="Class + ' ' + cursor">
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
  },
  cursor: {
    type: String,
    required: false,
    default: "cursor-default"
  },
  isLiked: {
    type: Boolean,
    required: false,
    default: false
  },
})

let number = ref(props.numberToshow)
let showNumber = ref(true)
let Class = ref('flex gap-1 justify-center items-center py-1 px-2 text-slate-700')

onMounted(() => {
  if (props.active === 'true') {
    showNumber.value = true
  } else {
    showNumber.value = false
  }

  if (props.isLiked) {
    Class.value = 'flex text-red-500 rounded-full gap-1 justify-center items-center py-1 px-2'
  }

})

async function cta(action: string) {
  switch (action) {
    case 'like':
      let res = await likeAResource(props.contextId, sessionUser.id)
      if (res === 2) {
        number.value++
        Class.value = 'flex text-red-500 rounded-full gap-1 justify-center items-center py-1 px-2'
      }
      if (res === 1) {
        number.value--
        Class.value = 'flex bg-gray-100 rounded-full gap-1 justify-center items-center py-1 px-2'
      }
      if (res === 0) {
        number.value = 999
        Class.value = 'flex text-red-500 rounded-full gap-1 justify-center items-center py-1 px-2'
      }
      break
    default:
      break
  }
}
</script>
