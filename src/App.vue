<script setup lang="ts"></script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style>
/* hide scrollbar but allow scrolling */
* {
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
}
*::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}
</style>
>
