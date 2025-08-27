// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'

// Import your pages
import HomePage from '../pages/HomePage.vue'
import NewsDetail from '../pages/NewsDetail.vue'
import AddNews from '../pages/AddNews.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/news/:id', name: 'Detail', component: NewsDetail },
  { path: '/add', name: 'Add', component: () => import('../pages/AddNews.vue') },
  { path: '/addNews', component: AddNews }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
