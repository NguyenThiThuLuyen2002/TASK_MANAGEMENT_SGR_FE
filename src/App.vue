<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const logout = () => {
    localStorage.removeItem('accessToken')
    router.push({ name: 'login' });
}
</script>
<template>
  <notifications />
  <router-view/>
  <!--button logout-->
  <button v-if="$route.name !== 'login'" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" @click="logout">
  Button
</button>
</template>