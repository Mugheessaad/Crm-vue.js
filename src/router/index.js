/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Signin from '../components/Signin/Signin.vue'
import Dashboard from '../components/Dashboard/Dashboard.vue'
import ListCompany from "../components/Dashboard/ListCompany.vue"


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes : [
    {
      path: '/',
      name: 'signin',
      component: Signin
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/dataDisplay',
      name: 'dataDisplay',
      component: ListCompany
    }

  ]  
});

export default router
