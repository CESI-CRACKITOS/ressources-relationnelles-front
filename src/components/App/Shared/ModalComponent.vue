<template>
  <Teleport to="body">
    <div
      :id="modalName"
      :tabindex="tabIndex"
      aria-hidden="true"
      :class="
        ' h-screen w-screen   overflow-y-auto overflow-x-hidden  top-0 right-0 left-0 z-50 justify-center items-center  md:inset-0  max-h-full bg-black bg-opacity-55 ' +
        Hidden
      "
    >
      <div class="h-full w-full max-h-full relative" @click="changeStatus">
        <div
          class="absolute -translate-y-2/4 -translate-x-2/4 top-2/4 left-2/4 p-4 max-w-full flex items-center justify-center"
        >
          <div class="p-4 bg-white rounded-lg shadow sm:p-5 w-full">
            <div
              class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 print:hidden"
            >
              <h3 class="text-lg font-semibold text-gray-900">{{ libelleModal }}</h3>
            </div>
            <div class="">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
const props = defineProps({
  modalName: {
    Type: String,
    required: true
  },
  tabIndex: {
    Type: Number,
    required: true
  },
  libelleModal: {
    Type: String,
    required: true
  },
  isHidden: {
    Type: Boolean,
    required: true
  }
})

let Hidden = ref('hidden')
let modalTestState = ref(false)

watch(
  () => props.isHidden,
  (newVal) => {
    modalTestState.value = newVal as boolean
    Hidden.value = newVal ? 'fixed' : 'hidden'
  }
)

function changeStatus(){
  if (Hidden.value == 'hidden'){
    Hidden.value = "fixed"
  } else {
    Hidden.value = 'hidden'
  }
}
</script>
