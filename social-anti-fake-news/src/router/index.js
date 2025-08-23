import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import NewsDetail from '../pages/NewsDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/news/:id', name: 'Detail', component: NewsDetail }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
