<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import SideBar from '../SideBar.vue';
const router = useRouter();
let users = ref([])
const tableColumns = ["Username", "Name", "Gender", "Birthday", "Actions"]
const currentPage = ref(1);
const totalRecords = ref(0)
const page = ref(1);
const getGenderLabel = (gender) => {
    return gender === 0 ? 'Female' : 'Male';
};

// get all users
const getAllUsers = () => {
    axios.get(`http://localhost:3001/user`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

        .then(response => {
            users.value = response.data;
            // totalRecords.value = response.data.totalRecords;


        })
        .catch(error => {
            console.log(error);
            console.log(localStorage.getItem('accessToken'))
        })


}
getAllUsers()
const goToUserDetail = (userId) => {
    router.push({ name: 'userDetail', params: { id: userId } });
};
const createUser = () => {
    router.push({ name: 'register'});
};


// const deleteUser = (userId) => {
//     axios.delete(`http://${import.meta.env.VITE_APP_BASE_URL}:8001/deleteUser/` + userId)
//         .then(response => {
//             console.log(response)
//             getAllUsers()
//         })
// }

// const handleCurrentPage = (newPage) => {
//     axios.get(`http://${import.meta.env.VITE_APP_BASE_URL}:8001/users?page=${newPage}`, {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem('accessToken')}`
//         }
//     })
//         .then(response => {
//             users.value = [...response.data.users];
//             currentPage.value = newPage;
//             totalRecords.value = response.data.totalRecords;

//         })
//         .catch(error => {
//             console.log(error);
//         })
// }

</script>
<template>
    <div class="flex">
        <SideBar></SideBar>
        <div class="mx-auto w-[80%] py-8 pl-[18vw]  overflow-auto">
            <div class="flex items-center justify-between pb-6">
                <div>
                    <h2 class="font-semibold text-gray-700">User Accounts</h2>
                    <span class="text-xs text-gray-500">View accounts of registered users</span>
                </div>
                <div class="flex items-center justify-between">
                    <!--button plus icon circle-->
                    <button type="button"
                        class="rounded-full bg-blue-600  w-10 h-10 font-semibold text-white flex justify-center items-center" @click="createUser"><img
                            src="../../../../assets/icons/plus.svg" alt=""></button>

                </div>
            </div>
            <div class="overflow-y-hidden rounded-lg border">
                <div class="overflow-x-auto">
                    <table class="w-full h-full">
                        <thead>
                            <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                <th class="text-left p-3 px-5" v-for="(column, index) in tableColumns" :key="index">
                                    {{ column }}
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-500">
                            <tr v-for="user in users" :key="user" class="border-b hover:bg-orange-100 ">
                                <td class="p-3 px-5">
                                    <router-link  class="no-underline text-black bg-transparent" :to="{ name: 'userDetail', params: { id: user.ID } }">
                                        {{ user.username }}
                                    </router-link>
                                </td>

                                <td class="p-3 px-5"><span class="bg-transparent">{{ user.name }}</span>
                                </td>
                                <td class="p-3 px-5">
                                    <span class="bg-transparent">{{ getGenderLabel(user.gender) }}</span>
                                </td>
                                <td class="p-3 px-5">
                                    <span class="bg-transparent">{{ user.birthday }}</span>
                                </td>
                                <td class="p-3 px-5 flex justify-start "><button type="button"
                                        class="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900"
                                        @click="goToUserDetail(user.id)">Edit</button><button type="button"
                                        class="rounded-full bg-red-400 px-3 py-1 text-xs font-semibold text-white"
                                        @click="deleteUser(user.id)">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <el-pagination :page-size="10" layout="prev, pager, next" :total="totalRecords"
                    @current-change="handleCurrentPage" />

            </div>

        </div>
    </div>
</template>