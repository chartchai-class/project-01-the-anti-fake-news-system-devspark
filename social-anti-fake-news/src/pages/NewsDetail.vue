<template>
  <div class="p-4 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold">{{ news.title }}</h1>

    <img :src="news.image" class="my-4 w-full max-w-md rounded object-cover" />

    <p class="my-2">{{ news.fullDetail }}</p>

    <p>Status: <strong>{{ news.status }}</strong></p>
    <p>Reported by {{ news.reporter }} on {{ formatDate(news.dateTime) }}</p>

    <!-- Votes count -->
    <p class="mt-2 font-semibold">
      Number of votes: 
      <strong>{{ news.votes.fake }} fake, {{ news.votes.notFake }} notFake</strong>
    </p>

    <!-- Vote Form -->
    <VoteForm :newsId="news.id" />

    <!-- Comments -->
    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-2">Comments</h2>
      <div
        v-for="(c, i) in news.comments"
        :key="i"
        class="border-t pt-2 mt-2"
      >
        <p>
          <strong>{{ c.user }}</strong> ({{ c.vote || '-' }}): {{ c.text }}
        </p>
        <img
          v-if="c.imageUrl"
          :src="c.imageUrl"
          class="mt-1 rounded border"
          style="max-width: 300px; max-height: 200px;"
          @error="c.imageUrl = '/src/assets/placeholder.png'"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNewsStore } from '../store/newsStore'
import VoteForm from '../components/VoteForm.vue'

const store = useNewsStore()
const news = store.selectedNews

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleString()
}
</script>
