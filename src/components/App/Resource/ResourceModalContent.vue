<template>
  <div class="flex flex-col gap-5 w-full">
    <input type="text" v-model="inputData.title" class="border-indigo-600 border-2 p-2 rounded-md" placeholder="Titre" autocomplete="off" />
    <div class="flex flex-col items-center gap-4 md:flex-row">
      <div class="flex flex-col gap-2">
        <label for="">Catégorie</label>
        <select class="border-indigo-600 border-2 text-indigo-600 rounded-md p-2 w-80" v-model="inputData.categoryId" required>
          <option value="" disabled>Selectionnez une catégorie</option>
          <option v-for="category in categories" :value="category.id" :key="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="flex flex-col gap-2">
        <label for="">Type de ressource</label>
        <select class="border-indigo-600 border-2 text-indigo-600 rounded-md p-2 w-80" v-model="inputData.resourceTypeId" required>
          <option value="" disabled selected>Selectionnez un type de ressource</option>
          <option v-for="resourceType in resourceTypes" :value="resourceType.id" :key="resourceType.id">
            {{ resourceType.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="relative flex flex-col gap-2">
      <label for="">Relations</label>
      <div class="group">
        <button class="border-indigo-600 border-2 text-indigo-600 rounded-md p-2 w-full">
          Relations
        </button>

        <div class="absolute left-0 w-full origin-top-left bg-white border-2 divide-y divide-gray-100 rounded-md
          shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300
          overflow-y-auto max-h-32">
          <div class="py-1 w-full">
            <div v-for="relationType in relationTypes" :key="relationType.id" class="flex items-center gap-2 px-2 w-full">
              <input type="checkbox" @change="handleRelation(relationType.id)" :checked="inputData.relationTypeIds.includes(relationType.id)">
              {{ relationType.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <textarea v-model="inputData.text" class="border-2 border-indigo-600 p-2 rounded-lg"
      placeholder="Comment allez vous ?" required />

    <div v-show="contentOptionsShown" class="flex gap-4 items-center pt-3">
      <ContentButton icon="fa-file-pdf" class="py-2 px-4 text-lg rounded-full" @add="addContent('application/pdf')" />
      <ContentButton icon="fa-image" class="py-2 px-4 text-lg rounded-full" @add="addContent('image/*')" />
    </div>

    <div>
      <div v-for="(content, index) in inputData.contents" :key="index" class="flex  items-center pt-5">

        <div class="input-wrapper" v-if="!content.id">
          <input :id="'fileInput' + index" type="file" :accept="content.acceptType" @change="handleUpload($event.target.files[0], content)" class="hidden-input" />
          <label :for="'fileInput' + index" class="visible-label">
            {{ content.value ? content.value.name : 'Choisissez un fichier' }}
          </label>
          <button @click="deleteContent(content, false)">
            <i class="fa-solid fa-delete-left fa-xl"></i>
          </button>
        </div>

        <div class="flex justify-between w-full" v-if="content.id">
          <label>{{ content.text }}</label>
          <button @click="deleteContent(content, true)">
            <i class="fa-solid fa-delete-left fa-xl"></i>
          </button>
        </div>

      </div>
    </div>



    <div class="flex flex-col gap-1">
      <div class="flex gap-2 items-center">
        <label for="">Brouillon</label>
        <input type="checkbox" v-model="inputData.isDraft">
      </div>
      <button-component @click="contentOptionsShown = true" v-show="allInputsFilled && !contentOptionsShown">Ajouter un contenu</button-component>
    </div>

    <button-component @click="publish">Envoyer</button-component>
  </div>
</template>
<script setup>
import ButtonComponent from '@/components/App/Shared/buttons/ButtonComponent.vue'
import { computed, onMounted, ref, defineEmits, defineProps } from 'vue'
import ContentButton from '@/components/ContentButton.vue'
import { getCategories } from '@/composable/Utils/CategoryUtils.ts'
import { getResourceTypes } from '@/composable/Utils/ResourceTypeUtils.ts'
import { getRelations } from '@/composable/Utils/RelationUtils.ts'
import ResourceEntity from '@/composable/Entities/Resource.ts'
import { getBase64 } from '@/composable/Utils/Base64Utils.js'

const categories = ref([]);
const resourceTypes = ref([]);
const relationTypes = ref([]);

const contentOptionsShown = ref(false);

const inputData = ref({});

const emit = defineEmits(["closeModal"]);

const props = defineProps({
  resource: ResourceEntity
})



onMounted(async () => {
  setModal();

  categories.value = await getCategories();
  resourceTypes.value = await getResourceTypes();
  relationTypes.value = await getRelations();
})

const allInputsFilled = computed(
  () => inputData.value.title && (inputData.value.contents.every((content) => content?.value || content.id))
)

const handleRelation = (relationTypeId) => {
  if (!inputData.value.relationTypeIds.includes(relationTypeId)) {
    inputData.value.relationTypeIds.push(relationTypeId)
  } else {
    const index = inputData.value.relationTypeIds.indexOf(relationTypeId);
    inputData.value.relationTypeIds.splice(index, 1);
  }
}

const addContent = (acceptType) => {
  let contentType = ""
  switch (acceptType) {
    case 'application/pdf':
      contentType = 'pdf';
      break;
    case 'image/*':
      contentType = 'image';
      break;
  }

  inputData.value.contents.push({
    contentType: contentType,
    text: null,
    value: null,
    acceptType: acceptType
  })
  contentOptionsShown.value = false
}

const deleteContent = (eventContent, isInDb) => {
  inputData.value.contents = inputData.value.contents.filter((content) => content.id !== eventContent.id);
  if (isInDb) {
    inputData.value.toDelete.push(eventContent.id);
  }
  console.log(inputData.value.contents);
}

const handleUpload = async (file, content) => {
  content.value = await getBase64(file)
  content.text = file.name
}

const publish = async () => {
  emit("closeModal");

  if (props.resource) {
    fetch('http://localhost/api/resources/' + props.resource.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(inputData.value)
    })
      .then((response) => response.json())
      .then(() => {
        window.location.reload()
      })
    return
  }

  fetch('http://localhost/api/resources', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(inputData.value)
  })
    .then((response) => response.json())
    .then(() => {
      window.location.reload()
    })
}

const setModal = () => {
  inputData.value = {
    resourceTypeId: props.resource ? props.resource.resourceTypeId : "",
    categoryId: props.resource ? props.resource.categoryId : "",
    title: props.resource ? props.resource.title : "",
    text: props.resource ? props.resource.text : "",
    contents: props.resource ? props.resource.contents : [],
    isDraft: false,
    relationTypeIds: props.resource ? props.resource.relationTypes.map((relationType) => relationType.id) : [],
    toDelete: []
  }
  console.log(inputData.value)
}

</script>