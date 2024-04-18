<template>
    <button class="bg-gray-200 p-2 w-full rounded-md" @click="$emit('add', type, fileType, acceptType)">
        <i :class="`fa-solid ${icon}`"></i>
    </button>
</template>

<script>
export default {
    props: ['type', 'fileType', 'acceptType', 'icon']
}
</script>