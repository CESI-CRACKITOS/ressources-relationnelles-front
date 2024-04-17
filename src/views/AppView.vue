<template>
  <div class="flex flex-row w-full justify-center" style="scrollbar-width: none items-center">
    <div class="h-screen w-screen flex items-center justify-center bg-black absolute hidden z-10 bg-opacity-50"
      id="postModal">
      <div class="flex flex-col justify-between gap-2 p-5 bg-white rounded-lg shadow" @click.stop>
        <div>
          <h1>Nouvelle ressource</h1>
          <input type="text" v-model="title" class="py-2 px-1 border-gray-300 border"
            placeholder="Titre de la ressource">
          <div v-show="contentOptionsShown" class="flex gap-2 items-center">
            <ContentButton type="input" fileType="file" acceptType="application/pdf" icon="fa-file-pdf"
              @add="addContent" />
            <ContentButton type="input" fileType="file" acceptType="image/*" icon="fa-image" @add="addContent" />
            <ContentButton type="input" fileType="file" acceptType="video/*" icon="fa-video" @add="addContent" />
            <ContentButton type="textarea" icon="fa-font" @add="addContent" />
          </div>
          <div v-for="(content, index) in contents" :key="index" class="flex gap-2 items-center">
            <input v-if="content.type === 'input'" :type="content.fileType" :accept="content.acceptType"
              v-model="content.value">
            <textarea v-else v-model="content.value" class="border border-gray-300"></textarea>
            <button @click="deleteContent(index)">{{ content.value ? 'Delete' : 'Cancel' }}</button>
          </div>
        </div>
        <button class="bg-amber-700" @click="showContentOptions" v-show="allInputsFilled && !contentOptionsShown">
          Ajouter un contenu
        </button>
        <button @click="publish" class="bg-blue-500 text-white">Publier</button>
      </div>
    </div>
    <FeedLeftComponent />
    <router-view class="w-[575px]"></router-view>
    <FeedRightComponent />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import FeedLeftComponent from '@/components/FeedLeftComponent.vue'
import FeedRightComponent from '@/components/FeedRightComponent.vue'
import ContentButton from '@/components/ContentButton.vue'

export default {
  components: {
    FeedLeftComponent,
    FeedRightComponent,
    ContentButton
  },
  setup() {
    const hideModel = () => {
      const modal = document.getElementById('postModal');
      modal?.classList.toggle('hidden');
    }

    const title = ref('');
    const contents = ref([]);
    const contentOptionsShown = ref(false);

    const allInputsFilled = computed(() => title.value && contents.value.every(content => content?.value));

    const showContentOptions = () => {
      contentOptionsShown.value = true;
    }

    const addContent = (type, fileType = null, acceptType = null) => {
      contents.value.push({ type, fileType, acceptType, value: '' });
      contentOptionsShown.value = false;
    }

    const deleteContent = (index) => {
      contents.value.splice(index, 1);
    }

    const publish = () => {
      console.log(JSON.stringify({ title: title.value, contents: contents.value }));
    }

    return {
      hideModel,
      title,
      contents,
      contentOptionsShown,
      showContentOptions,
      addContent,
      deleteContent,
      allInputsFilled,
      publish
    }
  }
}
</script>

<style>
* {
  scrollbar-width: none;
}
</style>
