import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/topic/create',
    component: () => import('../views/CreatedArt.vue'),
    name: 'createdArt'
  },
  {
    path: '/topic/:topicId',
    component: () => import('../views/Details.vue'),
    name: 'details'
  },

  {
    path: '/',
    component: Home
  },
  {
    path: '/:tab',
    component: () => import('../views/Home.vue')
  },


]
const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router
