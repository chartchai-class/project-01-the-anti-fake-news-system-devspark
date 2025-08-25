<template>
  <nav class="bg-gray-800 text-white px-4 py-3 flex justify-between items-center shadow-md">
    <h1 class="text-xl md:text-2xl font-bold flex items-center gap-2">📰 Anti-Fake News</h1>
    <div class="space-x-4">
      <RouterLink 
        to="/" 
        class="hover:text-cyan-400 transition-colors duration-300 font-medium"
      >
        Home
      </RouterLink>
      <RouterLink 
  to="/add" 
  class="hover:text-cyan-400 transition-colors duration-300 font-medium"
>
  Add News
</RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
