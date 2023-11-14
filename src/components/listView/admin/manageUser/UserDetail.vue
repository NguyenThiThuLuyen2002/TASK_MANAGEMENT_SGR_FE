<script setup>
import {ref} from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

import SideBar from '../SideBar.vue'
const route = useRoute()
const userId = route.params.id
const selectedUser = ref ({
    username: '',
    password: '',
    name: '',
    email: '',
    birthday: '',
    gender: '',
})

axios.get('http://localhost:3001/user/' + userId).then((res) => {
    console.log(res.data)
    if (res.data.length > 0) {
        selectedUser.value = res.data[0];
    }

})

// const updateUser = () => {

//     axios.put('http://localhost:3001/updateUser/' + 100, {
//         username: selectedUser.value.username,
//         name: selectedUser.value.name,
//         age: selectedUser.value.age,
//         email: selectedUser.value.email,
//         gender: selectedUser.value.gender
//     }).then(response => {
//         console.log(response)
//         notify({
//                     title: 'Success',
//                     text: response.data.message,
//                     type: 'success'
//                 });

//     })
//     .catch(error => {
//         console.log(error);
//         notify({
//                     title: 'Error',
//                     text: error.response.data.error,
//                     type: 'error'
//                 });
//     })
// }
</script>
<template>
    <div class="flex">
        <SideBar></SideBar>
        <!--container-->
        <div class="w-full mx-auto">
            <div class="mt-10 sm:mt-0">
                <div class="md:grid md:grid-cols-2 md:gap-6">
                    <div class="mt-5 md:mt-0 md:col-span-2">
                        <section class="bg-white ">
                            <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                                <h2 class="mb-4 text-xl font-bold">General Information</h2>
                                <form action="#">
                                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 ">
                                        <div class="w-full">
                                            <label class="block mb-2 text-sm font-medium ">Username</label>
                                            <input type="text" name="username" id="username"
                                                class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                v-model="selectedUser.username" autocomplete="off">

                                        </div>
                                        <div class="w-full">
                                            <label class="block mb-2 text-sm font-medium ">Password</label>
                                            <input type="password" name="password" id="password"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="*******" required="" readonly>
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full
                                                name</label>
                                            <input type="text" name="name" id="name"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                required="" v-model="selectedUser.name" autocomplete="off">
                                        </div>
                                        <div class="w-full">
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                            <input type="email" name="email" id="email"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                required="" v-model="selectedUser.email" autocomplete="off">
                                        </div>
                                        <div class="w-full">
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birthday</label>
                                            <input type="date" name="birthday" id="birthday"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                required="" v-model="selectedUser.birthday">
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                            <select id="gender"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                v-model="selectedUser.gender">
                                                <option value="0">Male</option>
                                                <option value="1">Female</option>
                                                <option value="2">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="button"
                                        class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mt-10"
                                        @click="updateUser">Update</button>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <!--button Save and reset-->
            <!-- <div class="flex">
            <button class="bg-green-500 p-2 rounded-md text-white mr-10">
                Save Changes
            </button>
            <button class="bg-gray-300 p-2 rounded-md text-white " >
                Reset
            </button>

    </div> -->

        </div>
    </div>
</template>

