// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Editor from '../components/form/Editor.vue'
import axios from 'axios'
import Login from '../components/form/Login.vue'
import CreateRequest from '../components/listView/user/CreateRequest.vue'
import RequestListUser from '../components/listView/user/RequestListUser.vue'
import ItemDetail from '../components/listView/ItemDetail.vue'
import Register from '../components/form/Register.vue'
import RequestList from '../components/listView/admin/RequestList.vue'
import SideBar from '../components/listView/admin/SideBar.vue'
import AdminLayout from '../layout/AdminLayout.vue'
import ListUser from '../components/listView/admin/manageUser/ListUser.vue'
import UserDetail from '../components/listView/admin/manageUser/UserDetail.vue'
import UserLayout from '../layout/UserLayout.vue'
import Profile from '../components/listView/user/Profile.vue'
import testInput from '../components/form/testInput.vue'
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
    path: '/requestListUser',
    name: 'requestListUser',
    component: RequestListUser
  },
  {
    path: '/editor',
    name: 'editor',
    component: Editor
  },
  {
    path: '/adminLayout',
    name: 'adminLayout',
    component: AdminLayout,
    // children: [
    //   { path: 'listUser', component: ListUser, name: 'listUser' },
    //   { path: 'userDetail/:id', component: UserDetail, name: 'userDetail' },
    // ]
  },
  {
    path: '/sidebar',
    name: 'sidebar',
    component: SideBar,
  },
  {
    path: '/listUser',
    name: 'listUser',
    component: ListUser,
  },
  {
    path: '/userDetail/:id',
    name: 'userDetail',
    component: UserDetail,
    props: true
  },
  {
    path: '/userLayout',
    name: 'userLayout',
    component: UserLayout,
    // children: [
    //   { path: 'create', component: CreateRequest, name: 'create' },
    //   { path: 'requestListUser', component: RequestListUser, name: 'requestListUser' },
    //   { path: 'itemDetail/:id', component: ItemDetail, name: 'itemDetail', props: true },
    // ]
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  }
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/login'
  // }
  ,{
    path: '/testInput',
    name: 'testInput',
    component: testInput
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
  if (to.name === 'login' && localStorage.getItem('accessToken')) {
    router.push({ name: 'requestListUser' });
  }
  // if (to.name === 'register' && localStorage.getItem('accessToken')) {
  //   router.push({ name: 'requestList' });}
})

export default router;
