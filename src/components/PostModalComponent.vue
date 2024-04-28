<template>
  <Teleport to="body">
    <div
      class="h-screen w-screen hidden flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-50"
      id="postModal"
      @click="hideModal"
    >
      <div
        class="flex flex-col h-[75%] w-[80%] justify-between gap-2 p-5 bg-white rounded-lg shadow"
        @click.stop
      >
        <div>
          <input
            type="text"
            v-model="title"
            class="py-2 px-1 font-bold w-full text-3xl"
            placeholder="Titre de la ressource"
          />
          <div class="flex flex-row w-full">
            <div>
              <div class="flex flex-row space-x-4">
                <select
                  v-model="selectedCategory"
                  id="categorySelect"
                  class="mt-2 block w-1/2 py-2 px-4 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option v-for="(category, index) in categories" :key="index" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
                <select
                  id="resourceTypeSelect"
                  v-model="selectedResourceType"
                  class="mt-2 block w-1/2 py-2 px-4 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Sélectionner un type de ressource</option>
                  <option
                    v-for="(resourceType, index) in resourceTypes"
                    :key="index"
                    :value="resourceType.id"
                  >
                    {{ resourceType.name }}
                  </option>
                </select>
              </div>

              <textarea
                v-model="descriptionValue"
                class="mt-2 p-2 rounded-lg border border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-32"
                :placeholder="randomSentence"
              ></textarea>
            </div>
            <select id="relationSelect" v-model="selectedRelation" name="relationSelect" multiple>
              <option value="0">Sélectionner une relation</option>
              <option v-for="relation in relations" :key="relation.id" :value="relation.id">
                {{ relation.name }}
              </option>
            </select>
          </div>

          <div v-show="contentOptionsShown" class="flex gap-4 items-center pt-3">
            <ContentButton
              enctype="multipart/form-data"
              type="input"
              fileType="file"
              acceptType="application/pdf"
              icon="fa-file-pdf"
              class="py-2 px-4 text-lg rounded-full"
              @add="addContent"
            />
            <ContentButton
              enctype="multipart/form-data"
              type="input"
              fileType="file"
              acceptType="image/*"
              icon="fa-image"
              class="py-2 px-4 text-lg rounded-full"
              @add="addContent"
            />
            <ContentButton
              enctype="multipart/form-data"
              type="input"
              fileType="file"
              acceptType="video/*"
              icon="fa-video"
              class="py-2 px-4 text-lg rounded-full"
              @add="addContent"
            />
          </div>
          <div
            v-for="(content, index) in contents"
            :key="index"
            class="flex gap-2 items-center pt-5"
          >
            <div class="input-wrapper" v-if="content.type === 'input'">
              <input
                :id="'fileInput' + index"
                :type="content.fileType"
                :accept="content.acceptType"
                @change="content.value = $event.target.files[0]"
                class="hidden-input"
              />
              <label :for="'fileInput' + index" class="visible-label">
                {{ content.value ? content.value.name : 'Choisissez un fichier' }}
              </label>
            </div>
            <textarea
              v-else
              v-model="content.value"
              class="p-2 rounded-lg border border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              @click="deleteContent(index)"
              class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700"
            >
              <i class="fa-solid fa-delete-left fa-xl"></i>
            </button>
          </div>
        </div>
        <div class="flex flex-row justify-between">
          <button
            class="font-bold py-2 px-4 rounded-full hover:bg-blue-300 bg-blue-500 text-white"
            @click="showContentOptions"
            v-show="allInputsFilled && !contentOptionsShown"
          >
            Ajouter un contenu
          </button>
          <div class="items-end">
            <button
              v-if="title"
              @click="setDraft"
              class="rounded-full font-bold py-2 px-4 mr-2 hover:bg-blue-300 bg-blue-500 text-white"
            >
              Brouillon
            </button>
            <button
              v-if="title"
              @click="publish"
              class="rounded-full font-bold py-2 px-4 hover:bg-blue-300 bg-blue-500 text-white"
            >
              Publier
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { ref, computed } from 'vue'
import ContentButton from '@/components/ContentButton.vue'
import { getCategories } from '@/composable/Utils/CategoryUtils'
import { getRelations } from '@/composable/Utils/RelationUtils'
import { getResourceTypes } from '@/composable/Utils/ResourceTypeUtils'

export default {
  props: {
    openModal: {
      type: Function,
      required: true
    }
  },
  methods: {
    showModal() {
      this.openModal()
    }
  },
  data() {
    return {
      categories: [],
      relations: [],
      resourceTypes: [],
      selectedCategory: '',
      selectedRelation: '',
      selectedResourceType: '',
      descriptionValue: '',
      sentences: [
        'Quoi de neuf ?',
        'Comment ça va ?',
        'Partagez quelque chose de nouveau !',
        'Exprimez-vous !'
      ]
    }
  },
  computed: {
    randomSentence() {
      return this.sentences[Math.floor(Math.random() * this.sentences.length)]
    }
  },
  async created() {
    this.categories = await getCategories()
    this.relations = await getRelations()
    this.resourceTypes = await getResourceTypes()
  },
  components: {
    ContentButton
  },
  setup() {
    const hideModal = () => {
      const modal = document.getElementById('postModal')
      modal?.classList.toggle('hidden')
    }

    const title = ref('')
    const selectedCategory = ref('')
    const selectedRelation = ref('')
    const selectedResourceType = ref('')
    const contents = ref([])
    const contentOptionsShown = ref(false)
    const descriptionValue = ref('')
    const isDraft = ref(false)
    const allInputsFilled = computed(
      () => title.value && contents.value.every((content) => content?.value)
    )

    const showContentOptions = () => {
      contentOptionsShown.value = true
    }

    const addContent = (type, fileType = null, acceptType = null) => {
      let fileExtension = ''
      if (type === 'textarea') {
        fileExtension = 'text'
      } else if (acceptType) {
        if (acceptType === 'application/pdf') {
          fileExtension = 'pdf'
        } else if (acceptType === 'image/*') {
          fileExtension = 'image'
        } else if (acceptType === 'video/*') {
          fileExtension = 'link'
        }
      }
      contents.value.push({ type, fileType, acceptType, value: '', fileExtension })
      contentOptionsShown.value = false
    }

    const deleteContent = (index) => {
      contents.value.splice(index, 1)
    }

    function getBase64(file) {
      return new Promise((resolve, reject) => {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          resolve(reader.result)
        }
        reader.onerror = function (error) {
          reject('Error: ', error)
        }
      })
    }

    const handleFileChange = (event, content) => {
      return new Promise((resolve, reject) => {
        const file = event.target.files[0]
        getBase64(file)
          .then((base64) => {
            content.value = base64
            content.fileExtension = file.name.split('.').pop()
            resolve()
          })
          .catch(reject)
      })
    }

    const fetchInputs = () => {
      contents.value.push({
        type: 'textarea',
        value: descriptionValue.value,
        fileExtension: 'text'
      })

      const inputData = {
        title: title.value,
        categoryId: selectedCategory.value,
        relationId: selectedRelation.value,
        resourceTypeId: selectedResourceType.value,
        contents: contents.value,
        isDraft: isDraft.value
      }
      console.log(inputData)
      return inputData
    }

    const setDraft = () => {
      isDraft.value = true
      publish()
    }

    const resetForm = () => {
      title.value = ''
      selectedCategory.value = ''
      selectedRelation.value = ''
      selectedResourceType.value = ''
      contents.value = []
      contentOptionsShown.value = false
      descriptionValue.value = ''
      isDraft.value = false
    }

    const publish = async () => {
      hideModal()
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
          console.log('Resource published')
          resetForm()
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
      selectedResourceType,
      descriptionValue,
      setDraft,
      resetForm
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
