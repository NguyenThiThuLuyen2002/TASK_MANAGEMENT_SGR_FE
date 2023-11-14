<script setup>
import SideBar from '../components/listView/admin/SideBar.vue';
import RequestList from '../components/listView/admin/RequestList.vue';
// export default {
//     layout: 'AdminLayout',
// }
</script>
<template>
    <div class="flex w-full">
        <SideBar></SideBar>
        <RequestList></RequestList>
        <!-- <router-view></router-view> -->
    </div>
</template>