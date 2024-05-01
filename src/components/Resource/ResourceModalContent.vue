<template>
  <div class="flex flex-col gap-5 w-full">
    <input type="text" v-model="title" class="border-indigo-600 border-2 p-2 rounded-md" placeholder="Titre" autocomplete="off" />
    <div class="flex flex-col items-center gap-4 md:flex-row">
      <div class="flex flex-col gap-2">
        <label for="">Catégorie</label>
        <select class="border-indigo-600 border-2 text-indigo-600 rounded-md p-2 w-80" v-model="category" required>
          <option value="" disabled>Selectionnez une catégorie</option>
          <option v-for="category in categories" :value="category.id" :key="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="flex flex-col gap-2">
        <label for="">Type de ressource</label>
        <select class="border-indigo-600 border-2 text-indigo-600 rounded-md p-2 w-80" v-model="resourceType" required>
          <option value="" disabled>Selectionnez un type de ressource</option>
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

        <div
          class="absolute left-0 w-full origin-top-left bg-white border-2 divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 overflow-y-auto max-h-32">
          <div class="py-1 w-full">
            <div v-for="relationType in relationTypes" :key="relationType.id" class="flex items-center gap-2 px-2 w-full">
              <input type="checkbox" @change="handleRelation(relationType.id)">
              {{ relationType.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <textarea v-model="textContent" class="border-2 border-indigo-600 p-2 rounded-lg"
      placeholder="Comment allez vous ?" required />

    <div v-show="contentOptionsShown" class="flex gap-4 items-center pt-3">
      <ContentButton enctype="multipart/form-data" type="input" fileType="file" acceptType="application/pdf"
                     icon="fa-file-pdf" class="py-2 px-4 text-lg rounded-full" @add="addContent" />
      <ContentButton enctype="multipart/form-data" type="input" fileType="file" acceptType="image/*"
                     icon="fa-image" class="py-2 px-4 text-lg rounded-full" @add="addContent" />
    </div>
    <div v-for="(content, index) in contents" :key="index" class="flex gap-2 items-center pt-5">
      <div class="input-wrapper" v-if="content.type === 'input'">
        <input :id="'fileInput' + index" :type="content.fileType" :accept="content.acceptType"
               @change="content.value = $event.target.files[0]" class="hidden-input" />
        <label :for="'fileInput' + index" class="visible-label">
          {{ content.value ? content.value.name : 'Choisissez un fichier' }}
        </label>
      </div>
      <button>
        <i class="fa-solid fa-delete-left fa-xl"></i>
      </button>
    </div>

    <div class="flex justify-between">
      <div class="flex gap-2 items-center">
        <label for="">Brouillon</label>
        <input type="checkbox" v-model="isDraft">
      </div>
      <button-component @click="showContentOptions" v-show="allInputsFilled && !contentOptionsShown">Ajouter un contenu</button-component>
    </div>

    <button-component @click="publish">Poster</button-component>
  </div>
</template>
<script setup>
import ButtonComponent from '@/components/Shared/buttons/ButtonComponent.vue'
import { computed, onMounted, ref, defineEmits } from 'vue'
import ContentButton from '@/components/ContentButton.vue'
import { getCategories } from '@/composable/Utils/CategoryUtils.ts'
import { getResourceTypes } from '@/composable/Utils/ResourceTypeUtils.ts'
import { getRelations } from '@/composable/Utils/RelationUtils.ts'
import { getBase64 } from '@/composable/Utils/Base64Utils.js'

const categories = ref([]);
const resourceTypes = ref([]);
const relationTypes = ref([]);
const category = ref("");
const contentOptionsShown = ref(false);

const resourceType = ref("");
const textContent = ref("");
const title = ref("");
const contents = ref([]);
const isDraft = ref(false);
const relationIds = ref([]);

const emit = defineEmits(["closeModal"]);

onMounted(async () => {
  categories.value = await getCategories();
  resourceTypes.value = await getResourceTypes();
  relationTypes.value = await getRelations();
})

const allInputsFilled = computed(
  () => title.value && contents.value.every((content) => content?.value)
)

const handleRelation = (relationTypeId) => {
  if (!relationIds.value.includes(relationTypeId)) {
    relationIds.value.push(relationTypeId)
  } else {
    delete relationIds.value[relationTypeId];
  }
}

const addContent = (type, fileType = null, acceptType = null) => {
  let fileExtension = ''
  switch (acceptType) {
    case 'textarea':
      fileExtension = 'text';
      break;
    case 'application/pdf':
      fileExtension = 'pdf';
      break;
    case 'image/*':
      fileExtension = 'image';
      break;
  }
  contents.value.push({ type, fileType, acceptType, value: '', fileExtension })
  contentOptionsShown.value = false
}

const handleFileChange = (event, content) => {
  return new Promise((resolve, reject) => {
    const file = event.target.files[0]
    getBase64(file)
      .then((base64) => {
        content.value = base64
        content.fileExtension = file.name.split('.').pop()
        content.text = file.name
        resolve()
      })
      .catch(reject)
  })
}

const fetchInputs = () => {
  contents.value.push({
    type: 'textarea',
    value: textContent.value,
    fileExtension: 'text'
  })

  console.log(relationIds.value)

  return {
    title: title.value,
    categoryId: category.value,
    relationId: relationIds.value,
    resourceTypeId: resourceType.value,
    contents: contents.value,
    isDraft: isDraft.value,
  }
}

const publish = async () => {
  emit("closeModal");
  await Promise.all(
    contents.value.map((content) => {
      if (content.fileType) {
        const fileInput = document.getElementById('fileInput' + contents.value.indexOf(content))
        return handleFileChange({ target: fileInput }, content)
      }
    })
  )

  const inputData = fetchInputs()
  fetch('http://localhost/api/resources', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(inputData)
  })
    .then((response) => response.json())
    .then(() => {
      resetForm()
    })
}

const resetForm = () => {
  title.value = ''
  category.value = ''
  relationIds.value = []
  resourceType.value = ''
  contents.value = []
  contentOptionsShown.value = false
  textContent.value = ''
  isDraft.value = false
}





const showContentOptions = () => {
  contentOptionsShown.value = true
}
</script>