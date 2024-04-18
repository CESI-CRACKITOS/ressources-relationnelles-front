<template>
  <div class="flex flex-row w-full justify-center" style="scrollbar-width: none items-center">
    <div class="h-screen w-screen flex items-center justify-center bg-black absolute hidden z-10 bg-opacity-50"
      id="postModal" @click="hideModal">
      <div class="flex flex-col h-[75%] w-[80%] justify-between gap-2 p-5 bg-white rounded-lg shadow" @click.stop>
        <div>
          <input type="text" v-model="title" class="py-2 px-1 font-bold w-full text-3xl"
            placeholder="Titre de la ressource">
          <div class="flex flex-row">
            <select v-model="selectedCategory"
              class="mt-2 block w-1/2 py-2 px-4 mr-4 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm">
              <option value="">Sélectionner une catégorie</option>
              <option v-for="(category, index) in categories" :key="index" :value="category.id">{{ category.name }}
              </option>
            </select>
            <select v-model="selectedRelation"
              class="mt-2 block w-1/2 py-2 px-4 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm">
              <option value="">Sélectionner une relation</option>
              <option v-for="(relation, index) in relations" :key="index" :value="relation.id">{{ relation.name }}
              </option>
            </select>
          </div>
          <textarea v-model="descriptionValue"
            class="mt-2 p-2 rounded-lg border border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-32"
            :placeholder="randomSentence"></textarea>
          <div v-show="contentOptionsShown" class="flex gap-4 items-center pt-3">
            <ContentButton type="input" fileType="file" acceptType="application/pdf" icon="fa-file-pdf"
              class="py-2 px-4 text-lg rounded-full" @add="addContent" />
            <ContentButton type="input" fileType="file" acceptType="image/*" icon="fa-image"
              class="py-2 px-4 text-lg rounded-full" @add="addContent" />
            <ContentButton type="input" fileType="file" acceptType="video/*" icon="fa-video"
              class="py-2 px-4 text-lg rounded-full" @add="addContent" />
          </div>
          <div v-for="(content, index) in contents" :key="index" class="flex gap-2 items-center pt-5">
            <div class="input-wrapper" v-if="content.type === 'input'">
              <input :id="'fileInput' + index" :type="content.fileType" :accept="content.acceptType"
                @change="content.value = $event.target.files[0]" class="hidden-input">
              <label :for="'fileInput' + index" class="visible-label">
                {{ content.value ? content.value.name : 'Choisissez un fichier' }}
              </label>
            </div>
            <textarea v-else v-model="content.value"
              class="p-2 rounded-lg border border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            <button @click="deleteContent(index)" class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700">
              <i class="fa-solid fa-delete-left fa-xl"></i>
            </button>
          </div>
        </div>
        <div class="flex flex-row justify-between items-end">
          <button class="font-bold py-2 px-4 rounded-full hover:bg-blue-300 bg-blue-500 text-white"
            @click="showContentOptions" v-show="allInputsFilled && !contentOptionsShown">
            Ajouter un contenu
          </button>
          <button v-if="title" @click="publish"
            class="rounded-full font-bold py-2 px-4 hover:bg-blue-300 bg-blue-500 text-white">Publier</button>
        </div>
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
import { getCategories } from '@/composable/Utils/CategoryUtils'
import { getRelations } from '@/composable/Utils/RelationUtils'

export default {
  data() {
    return {
      categories: [],
      relations: [],
      selectedCategory: '',
      selectedRelation: '',
      descriptionValue: '',
      sentences: ['Quoi de neuf ?', 'Comment ça va ?', 'Partagez quelque chose de nouveau !', 'Exprimez-vous !']
    }
  },
  computed: {
    randomSentence() {
      return this.sentences[Math.floor(Math.random() * this.sentences.length)];
    }
  },
  async created() {
    this.categories = await getCategories()
    this.relations = await getRelations()
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
    const selectedRelation = ref('');
    const contents = ref([]);
    const contentOptionsShown = ref(false);
    const descriptionValue = ref('');
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
        relationId: selectedRelation.value,
        contents: contents.value.map(content => ({ type: content.type, value: content.value, fileExtension: content.fileExtension })),
        descriptionValue: descriptionValue.value
      };
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
      selectedCategory,
      selectedRelation,
      descriptionValue
    }
  }
}
</script>

<style>
* {
  scrollbar-width: none;
}

.hidden-input {
  opacity: 0;
  position: absolute;
  z-index: -1;
}

.visible-label {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.input-wrapper {
  position: relative;
}
</style>