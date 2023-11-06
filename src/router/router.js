// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/form/Login.vue'
import CreateRequest from '../components/CreateRequest.vue'
import ItemDetail from '../components/listView/ItemDetail.vue'
import Register from '../components/form/Register.vue'
import RequestList from '../components/listView/RequestList.vue'
import Editor from '../components/form/Editor.vue'
const routes = [
  {
    path: '/',
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
    component: ItemDetail
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
  }
 


];

const router = createRouter({
  history: createWebHistory(),
  routes
});

  
export default router;