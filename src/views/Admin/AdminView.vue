<template>
  <div class="h-screen w-screen flex flex-col-reverse md:flex-row  items-center overflow-hidden bg-slate-50">
    <AdminNavbar />
    <router-view class="md:border-s h-full w-full"/>
  </div>
</template>

<script setup>
import AdminNavbar from '@/components/Admin/Shared/AdminNavbar.vue'
</script>
