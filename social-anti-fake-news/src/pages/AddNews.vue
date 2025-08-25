<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">➕ Add News</h1>
    <form @submit.prevent="submit" class="space-y-4 bg-white p-6 rounded shadow">
      <!-- Title -->
      <input v-model="title" placeholder="Title" 
             class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400" required />

      <!-- Short Detail -->
      <input v-model="shortDetail" placeholder="Short detail" 
             class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400" required />

      <!-- Full Detail -->
      <textarea v-model="fullDetail" placeholder="Full detail" rows="5"
                class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400" required></textarea>

      <!-- Status -->
      <div class="flex gap-6">
        <label class="flex items-center gap-2">
          <input type="radio" value="fake" v-model="status" class="accent-red-500"/> Fake
        </label>
        <label class="flex items-center gap-2">
          <input type="radio" value="notFake" v-model="status" class="accent-green-500"/> Not Fake
        </label>
      </div>

      <!-- Reporter -->
      <input v-model="reporter" placeholder="Reporter name" 
             class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400" required />

      <!-- Image -->
      <input v-model="image" placeholder="Image URL (optional)" 
             class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400" />

      <button class="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition">
        Add News
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNewsStore } from '../store/newsStore'

const store = useNewsStore()
const router = useRouter()

const title = ref('')
const shortDetail = ref('')
const fullDetail = ref('')
const status = ref('fake')
const reporter = ref('')
const image = ref('')

function submit() {
  store.addNews({
    title: title.value,
    shortDetail: shortDetail.value,
    fullDetail: fullDetail.value,
    status: status.value,
    reporter: reporter.value,
    image: image.value
  })
  router.push('/') // ✅ กลับไปหน้า Home หลังเพิ่มข่าว
}
</script>
