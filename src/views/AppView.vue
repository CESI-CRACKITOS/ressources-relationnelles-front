<template>
  <div class="flex flex-row w-full justify-center" style="scrollbar-width: none items-center">
    <div class="h-screen w-screen flex items-center justify-center bg-black absolute hidden z-10 bg-opacity-50"
      id="postModal" @click="hideModal">
      <div class="flex flex-col justify-between gap-2 p-5 bg-white rounded-lg shadow" @click.stop>
        <div>
          <h1 class="font-bold">Nouvelle ressource</h1>
          <input type="text" v-model="title" class="py-2 px-1 border-gray-300 border"
            placeholder="Titre de la ressource">
          <select v-model="selectedCategory"
            class="mt-2 block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option disabled value="">Sélectionner une catégorie</option>
            <option v-for="(category, index) in categories" :key="index" :value="category.id">{{ category.name }}
            </option>
          </select>
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
        <button class="rounded-full hover:bg-blue-300 bg-blue-500 text-white" @click="showContentOptions"
          v-show="allInputsFilled && !contentOptionsShown">
          Ajouter un contenu
        </button>
        <button @click="publish" class="rounded-full hover:bg-blue-300 bg-blue-500 text-white">Publier</button>
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
import { getCategory } from '@/composable/Utils/CategortUtils'

export default {

  data() {
    return {
      categories: [],
      selectedCategory: '',
    }
  },
  async created() {
    this.categories = await getCategory()
  },
  components: {
    FeedLeftComponent,
    FeedRightComponent,
    ContentButton
  },
  setup() {
    const hideModal = () => {
      const modal = document.getElementById('postModal');
      modal?.classList.toggle('hidden');
    }

    const title = ref('');
    const selectedCategory = ref('');
    const contents = ref([]);
    const contentOptionsShown = ref(false);

    const allInputsFilled = computed(() => title.value && contents.value.every(content => content?.value));

    const showContentOptions = () => {
      contentOptionsShown.value = true;
    }

    const addContent = (type, fileType = null, acceptType = null) => {
      let fileExtension = '';
      if (type === 'textarea') {
        fileExtension = 'text';
      } else if (acceptType) {
        if (acceptType === 'application/pdf') {
          fileExtension = 'pdf';
        } else if (acceptType === 'image/*') {
          fileExtension = 'image';
        } else if (acceptType === 'video/*') {
          fileExtension = 'link';
        }
      }
      contents.value.push({ type, fileType, acceptType, value: '', fileExtension });
      contentOptionsShown.value = false;
    }

    const deleteContent = (index) => {
      contents.value.splice(index, 1);
    }

    const handleFileChange = (event, content) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        content.value = reader.result;
        content.fileExtension = file.name.split('.').pop();
      }
      reader.readAsDataURL(file);
    }

    const fetchInputs = () => {
      const inputData = {
        title: title.value,
        categoryId: selectedCategory.value,
        contents: contents.value.map(content => ({ type: content.type, categoryId ,value: content.value, fileExtension: content.fileExtension }))
      };
      console.log(inputData);
      return inputData;
    }

    const publish = () => {
      const inputData = fetchInputs();
      fetch('https://example.com/api/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          hideModal();
        })
    }

    return {
      hideModal,
      title,
      contents,
      contentOptionsShown,
      showContentOptions,
      addContent,
      deleteContent,
      allInputsFilled,
      publish,
      fetchInputs,
      handleFileChange,
      selectedCategory
    }
  }
}
</script>

<style>
* {
  scrollbar-width: none;
}
</style>