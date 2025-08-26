<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-center">➕ Add New News</h1>

    <form @submit.prevent="submitNews" class="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <!-- Title -->
      <div>
        <label class="block text-sm font-medium mb-1">Title <span class="text-red-600">*</span></label>
        <input 
          v-model="title" 
          type="text" 
          placeholder="Enter news title" 
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <!-- Short Detail -->
      <div>
        <label class="block text-sm font-medium mb-1">Short Detail <span class="text-red-600">*</span></label>
        <input 
          v-model="shortDetail" 
          type="text" 
          placeholder="Enter a short summary" 
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <!-- Full Detail -->
      <div>
        <label class="block text-sm font-medium mb-1">Full Detail <span class="text-red-600">*</span></label>
        <textarea 
          v-model="fullDetail" 
          placeholder="Enter full news content" 
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
        ></textarea>
      </div>

      <!-- Reporter -->
      <div>
        <label class="block text-sm font-medium mb-1">Reporter <span class="text-red-600">*</span></label>
        <input 
          v-model="reporter" 
          type="text" 
          placeholder="Enter reporter name" 
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>


      <!-- Image URL -->
      <div>
        <label class="block text-sm font-medium mb-1">Image URL</label>
        <input 
          v-model="image" 
          type="text" 
          placeholder="Enter image URL" 
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
<br>
      <!-- Buttons -->
      <div class="flex gap-2 justify-end">
        <button type="button" @click="cancel" 
          class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm font-medium">Cancel</button>
        <button type="submit" 
          class="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">Add News</button>
      </div>

      <!-- Error -->
      <div v-if="error" class="text-red-600 text-sm font-medium">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNewsStore } from '../store/newsStore'

const store = useNewsStore()
const router = useRouter()

// Form state
const title = ref('')
const shortDetail = ref('')
const fullDetail = ref('')
const reporter = ref('')
const image = ref('')

// Error message
const error = ref('')

// Submit function
function submitNews() {
  if (!title.value || !shortDetail.value || !fullDetail.value || !reporter.value) {
    error.value = 'Please fill in all required fields.'
    return
  }

  const newId = store.newsList.length ? Math.max(...store.newsList.map(n => n.id)) + 1 : 1

  const newNews = {
    id: newId,
    title: title.value,
    shortDetail: shortDetail.value,
    fullDetail: fullDetail.value,
    reporter: reporter.value,
    dateTime: new Date().toISOString(),
    status: 'undecided', 
    image: image.value || '/src/assets/placeholder.png',
    votes: { fake: 0, notFake: 0 },
    comments: []
  }

  store.newsList.push(newNews)
  router.push('/')
}

// Cancel function
function cancel() {
  router.push('/')
}
</script>
