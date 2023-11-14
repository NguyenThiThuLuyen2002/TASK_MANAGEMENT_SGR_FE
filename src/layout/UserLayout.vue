<script setup>
import SideBar from '../components/listView/user/SideBarUser.vue';
import RequestListUser from '../components/listView/user/RequestListUser.vue';
</script>
<template>
    <div class="flex w-full">
        <SideBar></SideBar>
        <RequestListUser></RequestListUser>
        <!-- <router-view></router-view> -->
    </div>
</template>