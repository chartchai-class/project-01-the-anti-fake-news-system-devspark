<template>
  <form @submit.prevent="submitVote" class="mt-4 space-y-3 p-4 border rounded shadow bg-white">
    <div class="flex items-center space-x-6">
      <label class="flex items-center space-x-2">
        <input type="radio" value="fake" v-model="voteType" class="accent-red-500"/>
        <span>Fake</span>
      </label>
      <label class="flex items-center space-x-2">
        <input type="radio" value="notFake" v-model="voteType" class="accent-green-500"/>
        <span>Not Fake</span>
      </label>
    </div>
    <div v-if="voteError" class="text-red-600 text-sm">Please select Fake or Not Fake</div>

    <input 
      v-model="userName" 
      placeholder="Your name (optional)" 
      class="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <textarea 
      v-model="commentText" 
      placeholder="Your comment" 
      class="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    ></textarea>
    <div v-if="commentError" class="text-red-600 text-sm">Please enter a comment</div>

    <input 
      v-model="imageUrl" 
      placeholder="Image URL (optional)" 
      class="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <button 
      type="submit" 
      class="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition"
    >
      Submit
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useNewsStore } from '../store/newsStore'

const store = useNewsStore()
const voteType = ref('')
const userName = ref('')
const commentText = ref('')
const imageUrl = ref('')

const voteError = ref(false)
const commentError = ref(false)

const props = defineProps({ newsId: Number })

function submitVote() {
  voteError.value = !voteType.value
  commentError.value = !commentText.value.trim()

  if (voteError.value || commentError.value) return

  store.vote(props.newsId, voteType.value)
  store.addComment(props.newsId, {
    user: userName.value.trim() || 'Anonymous', 
    text: commentText.value.trim(), 
    imageUrl: imageUrl.value.trim(),
    vote: voteType.value
  })

  voteType.value = ''
  userName.value = ''
  commentText.value = ''
  imageUrl.value = ''
  voteError.value = false
  commentError.value = false
}
</script>
