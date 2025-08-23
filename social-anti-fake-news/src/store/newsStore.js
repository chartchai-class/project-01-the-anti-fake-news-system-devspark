import { defineStore } from 'pinia'
import newsData from '../data/mockNews.json'

export const useNewsStore = defineStore('news', {
  state: () => ({
    newsList: newsData,
    selectedNews: null
  }),
  actions: {
    setSelectedNews(id) {
      this.selectedNews = this.newsList.find(n => n.id === id)
    },
    addComment(newsId, comment) {
      const news = this.newsList.find(n => n.id === newsId)
      if (!news.comments) news.comments = []
      news.comments.push(comment)

      // If currently viewing this news, update selectedNews reference
      if (this.selectedNews?.id === newsId) {
        this.selectedNews = { ...news }
      }
    },
    vote(newsId, type) {
      const news = this.newsList.find(n => n.id === newsId)
      if (!news.votes) news.votes = { fake: 0, notFake: 0 }
      if (type === 'fake') news.votes.fake++
      else news.votes.notFake++

      // Update selectedNews if it matches
      if (this.selectedNews?.id === newsId) {
        this.selectedNews = { ...news }
      }
    }
  }
})
