import HomeView from '@/views/HomeView.vue'
import NotFound from '@/views/NotFound.vue'
import PokemonDetailsView from '@/views/PokemonDetailsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/pokemon/:name', component: PokemonDetailsView },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
})

export default router
