<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">📰 Social Anti-Fake News</h1>

    <!-- Controls -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div class="flex gap-2 items-center">
        <button 
          v-for="option in filterOptions" 
          :key="option.value" 
          @click="setFilter(option.value)"
          :class="['px-4 py-2 rounded-lg text-sm font-medium transition shadow', 
            filter===option.value ? 'bg-blue-600 text-white shadow-md':'bg-gray-100 hover:bg-gray-200']"
        >
          {{ option.label }}
        </button>

        <!-- Add News button next to Not Fake -->
        <button 
          @click="goToAddNews" 
          class="px-3 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 shadow ml-2"
        >
          + Add News
        </button>
      </div>

      <div class="flex items-center gap-2">
        <label class="text-sm font-medium text-gray-600">Show:</label>
        <select v-model="itemsPerPage" class="border rounded px-2 py-1 text-sm">
          <option v-for="n in [5,10,15,20]" :key="n" :value="n">{{n}}</option>
        </select>
        <span class="text-sm text-gray-500">per page</span>
      </div>
    </div>

    <!-- News list -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="news in paginatedNews" 
        :key="news.id" 
        @click="goToDetail(news.id)"
        class="border p-4 rounded-lg shadow hover:shadow-xl cursor-pointer transition bg-white"
      >
        <img :src="news.image" class="w-full h-48 object-cover mb-2 rounded"/>
        <h2 class="text-xl font-semibold mb-1">{{ news.title }}</h2>
        <p class="text-sm text-gray-600 mb-2">{{ news.shortDetail }}</p>

        <!-- Status -->
        <div class="flex flex-col text-xs text-gray-500 gap-1 mb-2">
          <span>
            <strong>Status:</strong>
            <span :class="news.status === 'fake' ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'">
              {{ news.status }}
            </span>
          </span>
          <span><strong>Reporter:</strong> {{ news.reporter }}</span>
          <span><strong>Date:</strong> {{ formatDate(news.dateTime) }}</span>
        </div>

        <!-- Vote totals -->
        <div class="flex gap-4 text-sm font-semibold">
          <strong>Number of votes:</strong>&nbsp;
          <p class="text-red-600">Fake: {{ news.votes.fake }}</p>&nbsp;
          <p class="text-green-600">Not Fake: {{ news.votes.notFake }}</p>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center mt-6 gap-2">
      <button @click="prevPage" :disabled="currentPage===1"
        class="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50">Prev</button>
      <span class="text-sm">Page {{currentPage}} of {{totalPages}}</span>
      <button @click="nextPage" :disabled="currentPage===totalPages"
        class="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50">Next</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNewsStore } from '../store/newsStore'

const store = useNewsStore()
const router = useRouter()

const filter = ref('all')
const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Fake', value: 'fake' },
  { label: 'Not Fake', value: 'notFake' }
]

const currentPage = ref(1)
const itemsPerPage = ref(5)

const filteredNews = computed(() => filter.value==='all' ? store.newsList : store.newsList.filter(n => n.status===filter.value))
const totalPages = computed(() => Math.ceil(filteredNews.value.length / itemsPerPage.value))
const paginatedNews = computed(() => {
  const start = (currentPage.value-1)*itemsPerPage.value
  return filteredNews.value.slice(start, start + itemsPerPage.value)
})

function setFilter(val) { filter.value = val; currentPage.value = 1 }
function prevPage() { if(currentPage.value>1) currentPage.value-- }
function nextPage() { if(currentPage.value<totalPages.value) currentPage.value++ }
function goToDetail(id) { store.setSelectedNews(id); router.push(`/news/${id}`) }
function formatDate(dateStr) { return new Date(dateStr).toLocaleString() }

function goToAddNews() { router.push('/addNews') }
</script>
