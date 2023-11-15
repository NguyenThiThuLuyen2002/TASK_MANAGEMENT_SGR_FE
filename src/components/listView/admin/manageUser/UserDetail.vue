<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import SideBar from '../../SideBar.vue'
import { notify } from '@kyvg/vue3-notification';
const route = useRoute()
const userId = route.params.id
const selectedUser = ref({
    username: '',
    password: '',
    name: '',
    email: '',
    birthday: '',
    gender: '',
    role: '',
})

axios.get('http://54.196.242.13/user/' + userId).then((res) => {
    console.log(res.data)
    if (res.data.length > 0) {
        selectedUser.value = res.data[0];
    }

})

const updateUser = () => {
    // console.log(userId)
    axios.put(`http://54.196.242.13/user/${userId}`, {
        username: selectedUser.value.username,
        name: selectedUser.value.name,
        birthday: selectedUser.value.birthday,
        email: selectedUser.value.email,
        gender: selectedUser.value.gender,
        role: selectedUser.value.role
    }).then(response => {
        console.log(response)

        notify({
            title: 'Success',
            text: response?.data ?? 'updated successfully',
            type: 'success'
        });


    })
        .catch(error => {
            console.log(error);
            notify({
                title: 'Error',
                text: error.response?.data ?? 'Errorsrsr',
                type: 'error'
            });
        })

}
</script>
<template>
    <div class="flex">
        <SideBar></SideBar>
        <!--container-->
        <div class="w-full mx-auto pl-[16vw] h-screen flex justify-center items-center">
            <div class="mt-10 sm:mt-0">
                <div class="md:grid md:grid-cols-2 md:gap-6">
                    <div class="mt-5 md:mt-0 md:col-span-2">
                        <section class="bg-white ">
                            <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16 border rounded-xl">
                                <h2 class="mb-4 text-xl font-bold text-blue-600 ">INFORMATION</h2>
                                <form action="#">
                                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 ">
                                        <div class="w-full">
                                            <label class="block mb-2 text-sm font-medium ">Username</label>
                                            <el-input class="css-input" v-model="selectedUser.username"
                                                placeholder="Please input" />

                                        </div>
                                        <div class="w-full">
                                            <label class="block mb-2 text-sm font-medium ">Password</label>
                                            <el-input v-model="selectedUser.password" type="password" placeholder="********"
                                                show-password disabled class="css-input" />
                                        </div>

                                        <div class="w-full">
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full
                                                name</label>
                                            <el-input class="css-input" v-model="selectedUser.name"
                                                placeholder="Please input" />
                                        </div>
                                        <div class="w-full">
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                            <el-input class="css-input" v-model="selectedUser.email"
                                                placeholder="Please input" />
                                        </div>
                                        <div class="mb-4">
                                            <label class="block mb-2 text-sm font-medium text-gray-700">Birthday<span
                                                    class="text-red-500">*</span></label>
                                            <input v-model="selectedUser.birthday" type="date"
                                                class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>

                                        <div>

                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">Gender</label>

                                            <el-select v-model="selectedUser.gender" clearable placeholder="Select gender"
                                                class="css-input">

                                                <el-option label="Male" value="1"></el-option>

                                                <el-option label="Female" value="0"></el-option>

                                            </el-select>

                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>

                                            <el-select class="css-input" v-model="role" clearable placeholder="Select role">
                                                <el-option label="Admin" value="1"></el-option>

                                                <el-option label="User" value="3"></el-option>
                                            </el-select>
                                        </div>

                                    </div>
                                    <div class="w-full flex justify-center p-6  ">
                                        <el-button @click="updateUser" type="primary">Update</el-button>
                                    </div>

                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.css-input {
    width: 250px;
}
</style>
