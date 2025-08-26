<template>
  <div class="main-container">
    <!-- News Title -->
    <h1 class="text-2xl font-bold mb-4">{{ news.title }}</h1>

    <!-- News Image -->
    <img :src="news.image" class="news-image" />

    <!-- News Details -->
    <p class="my-2">{{ news.fullDetail }}</p>

    <!-- Status & Reporter -->
    <p>Status: <strong>{{ news.status }}</strong></p>
    <p>Reported by {{ news.reporter }} on {{ formatDate(news.dateTime) }}</p>

    <!-- Votes count -->
    <p class="mt-2 font-semibold">
      Number of votes: 
      <strong>{{ news.votes.fake }} fake, {{ news.votes.notFake }} notFake</strong>
    </p>

    <!-- Vote Form -->
    <VoteForm :newsId="news.id" />

    <!-- Comments Section -->
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
          class="comment-image"
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

<style scoped>
.main-container {
  max-width: 750px; 
  margin: 2rem auto;
  padding: 0 1rem;
}

.news-image {
  width: 100%;       
  max-width: 430px;  
  height: auto;     
  border-radius: 0.5rem;
  object-fit: cover;
  display: block;
  margin: 1rem auto; 
  transition: transform 0.3s ease;
}

.news-image:hover {
  transform: scale(1.03); 
}

.comment-image {
  max-width: 280px;
  max-height: 180px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
}

</style>
