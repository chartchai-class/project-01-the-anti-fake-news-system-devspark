<template>
  <div 
    class="card cursor-pointer hover:shadow-xl transition p-4 flex flex-col"
    @click="$emit('click')"
  >
    <img 
      :src="news.imageUrl" 
      alt="news image" 
      class="w-full h-48 object-cover rounded mb-3"
    />
    <h2 class="text-lg md:text-xl font-semibold mb-1">{{ news.title }}</h2>
    <p class="text-sm md:text-base text-gray-600 flex-1">{{ news.shortDetail }}</p>
    <div class="mt-2 text-xs md:text-sm text-gray-500 flex justify-between">
      <span>By {{ news.reporter }}</span>
      <span>{{ formatDate(news.dateTime) }}</span>
    </div>
    <span 
      :class="['mt-2 inline-block px-2 py-1 text-xs rounded font-semibold', 
      news.status === 'Fake' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800']"
    >
      {{ news.status }}
    </span>
  </div>
</template>

<script setup>
defineProps({ news: Object })

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })
}
</script>
