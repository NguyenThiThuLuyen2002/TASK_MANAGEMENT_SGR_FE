<!-- <script setup>
import SideBar from '../listView/admin/SideBar.vue';
</script>
<template>
    <SideBar></SideBar>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <div class="">
                        <form class="grid grid-cols-2 gap-4 md:gap-6" action="#">
                            <div>
                                <label for="username"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input type="text" name="username" id="username"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="nguyenvana" required="" v-model="username">
                            </div>
                            <div>
                                <label for="password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required="" v-model="password">
                            </div>
                            <div>
                                <label for="confirm-password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                                    password</label>
                                <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required="" v-model="confirmPassword">
                            </div>
                            <div>
                                <label for="name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" name="name" id="name" placeholder="Nguyen Van A"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required="" v-model="name">
                            </div>
                            <div>
                                <label for="birthday"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birthday</label>
                                <input type="date" name="birthday" id="birthday"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required="" v-model="birthday">

                            </div>
                            <div>
                                <label for="email"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email" placeholder="name@gmail.com"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required="" v-model="email">
                            </div>


                            <div class="flex items-center mb-4">
                                <input id="default-radio-1" type="radio" value="true" name="gender" v-model="isMale"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="default-radio-1"
                                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                            </div>
                            <div class="flex items-center">
                                <input id="default-radio-2" type="radio" value="false" name="gender" v-model="isMale"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="default-radio-2"
                                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template> -->
<script setup>
import {ref} from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

import SideBar from '../listView/admin/SideBar.vue';
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
                                                placeholder="*******" required="" >
                                        </div>
                                        <div class="w-full">
                                            <label class="block mb-2 text-sm font-medium ">Password</label>
                                            <input type="password" name="password" id="password"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="*******" required="" >
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
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                                            <select id="role"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                v-model="selectedUser.role">
                                                <option value="1">Admin</option>
                                                <option value="3">User</option>
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

