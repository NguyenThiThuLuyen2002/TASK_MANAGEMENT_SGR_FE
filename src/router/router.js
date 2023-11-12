// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/form/Login.vue'
import CreateRequest from '../components/CreateRequest.vue'
import ItemDetail from '../components/listView/ItemDetail.vue'
import Register from '../components/form/Register.vue'
import RequestList from '../components/listView/RequestList.vue'
import Editor from '../components/form/Editor.vue'
import axios from 'axios'
import SideBar from '../components/SideBar.vue'
import AdminLayout from '../layout/AdminLayout.vue'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/create',
    name: 'create',
    component: CreateRequest
  },
  {
    path: '/itemDetail/:id',
    name: 'itemDetail',
    component: ItemDetail,
    props: true
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/requestList',
    name: 'requestList',
    component: RequestList
  },
  {
    path: '/editor',
    name: 'editor',
    component: Editor
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminLayout,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from) => {
  if (to.name !== 'login' && to.name !== 'register' && !localStorage.getItem('accessToken')) {
    router.push({ name: 'login' });
  }
  if (to.name === 'login' && localStorage.getItem('accessToken')) {
    router.push({ name: 'requestList' });
  }
  if (to.name === 'register' && localStorage.getItem('accessToken')) {
    router.push({ name: 'requestList' });
  }
})

export default router;
