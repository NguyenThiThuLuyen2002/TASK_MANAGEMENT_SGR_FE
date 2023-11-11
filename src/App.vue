<script setup>
import { useRouter } from 'vue-router'
import SideBar from './components/SideBar.vue';
const router = useRouter()
const logout = () => {
    localStorage.removeItem('accessToken')
    router.push({ name: 'login' });
}
</script>
<template>
  <notifications />
  <side-bar v-if="$route.name !== 'login' && $route.name !== 'register'" />
  <router-view/>
  <!--button logout-->
  <button v-if="$route.name !== 'login'" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" @click="logout">
  Button
</button>
</template>