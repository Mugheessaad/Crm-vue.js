import { createRouter, createWebHistory } from 'vue-router';
import Signin from '../components/Signin/Signin.vue';
import Dashboard from '../components/Dashboard/Dashboard.vue';
import ListCompany from "../components/Dashboard/ListCompany.vue";
import AddDepartment from "../components/Dashboard/AddDepartment.vue";
import AddUser from "../components/Dashboard/AddUser.vue";
import store from '../store';


const routes = [
  {
    path: '/',
    name: 'signin',
    component: Signin
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true } 
  },
  {
    path: '/dataDisplay',
    name: 'dataDisplay',
    component: ListCompany,
    meta: { requiresAuth: true }
  },
  {
    path: '/addDepartment',
    name: 'addDepartment',
    component: AddDepartment,
    meta: { requiresAuth: true }
  },
  {
    path: '/addUser',
    name: 'addUser',
    component: AddUser,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isLoggedIn1 = localStorage.getItem("isLoggedIn")
  store.state.isLoggedIn = isLoggedIn1;
  const isLoggedIn = store.state.isLoggedIn;
  if (to.meta.requiresAuth && !isLoggedIn) {

    next({ name: 'signin' });
  } else {

    next();
  }
});

export default router;


