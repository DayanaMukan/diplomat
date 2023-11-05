import { createRouter, createWebHistory } from 'vue-router'
import LoginToGame from '../views/LoginToGame.vue'
import PrepareToGame from '../views/PrepareToGame.vue'
import CurrentGame from '../views/CurrentGame.vue'
import StartGame from '../views/StartGame.vue'


const routes = [
  {
    path: '/',
    name: 'LoginToGame',
    component: LoginToGame,
  },
  {
    path: '/prepare',
    name: 'PrepareToGame',
    component: PrepareToGame,
    meta: { requiresAuth: true }, 
  },
  {
    path: '/current',
    name: 'CurrentGame',
    component: CurrentGame,
  },
  {
    path: '/src/views/StartGame.vue',
    name: 'StartGame',
    component: StartGame,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
