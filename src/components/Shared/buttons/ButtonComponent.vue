<template>
  <button :class="'px-5 py-2 ' + color" :type="btnType">
    <slot>
      Placeholder
    </slot>
  </button>
</template>

<script setup lang="ts">

const props = defineProps<{
  btnStyle?: "primary" | "danger",
  btnType?: "button" | "submit" | "reset" | undefined
}>()

let color : string = "bg-gouv-blue-500 text-white";

if (props.btnStyle == "danger"){
  color = "bg-red-500 text-white"
}

</script>