<script setup>
import axios from 'axios'
import { ref } from 'vue';
import { notify } from '@kyvg/vue3-notification'
import { useRouter } from 'vue-router'
import SideBar from '../../SideBar.vue';
import { ElSelect, ElOption } from 'element-plus';
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'
const router = useRouter()
const username = ref('')
const password = ref('')
const name = ref('')
const birthday = ref('')
const email = ref('')
const gender = ref('')
const role = ref(null);
const roleOptions = ref([

    { value: 1, label: 'Admin' },

    { value: 3, label: 'User' }

]);

const register = async () => {

    const data = {
        username: username.value,
        password: password.value,
        name: name.value,
        birthday: birthday.value,
        email: email.value,
        gender: gender.value === "1"

    }
    console.log(data)
    await axios.post(`http://54.196.242.13/auth/register`, {
        username: username.value,
        password: password.value,
        name: name.value,
        birthday: birthday.value,
        email: email.value,
        gender: gender.value,
        role: role.value
    })
        // then response = 201 => success
        .then((response) => {
            console.log(response)
            notify({
                title: 'Success',
                text: 'Account created successfully',
                type: 'success',
            });
            router.push({ name: 'listUser' });
        }).catch((error) => {
            console.log(error)
            if (error.response) {
                notify({
                    title: 'Error',
                    text: 'Fill out the form',
                    type: 'error'
                });
                console.log(error)
            }
        })


}

const ageOptions = ref([]);
for (let ageOpt = 0; ageOpt <= 100; ageOpt++) {
    ageOptions.value.push(ageOpt);
};


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
                                <h2 class="mb-4 text-xl font-bold text-blue-600 ">CREATE USER</h2>
                                <form action="#">
                                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 ">
                                        <div class="w-full">
                                            <label class="block mb-2 text-sm font-medium ">Username</label>
                                            <el-input class="css-input" v-model="username" placeholder="Please input" />

                                        </div>
                                        <div class="w-full">
                                            <label class="block mb-2 text-sm font-medium ">Password</label>
                                            <el-input v-model="password" type="password" placeholder="********"
                                                show-password class="css-input" />
                                        </div>

                                        <div class="w-full">
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full
                                                name</label>
                                            <el-input class="css-input" v-model="name" placeholder="Please input" />
                                        </div>
                                        <div class="w-full">
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                            <el-input class="css-input" v-model="email" placeholder="Please input" />
                                        </div>
                                        <div class="mb-4">
                                            <label class="block mb-2 text-sm font-medium text-gray-700">Birthday<span
                                                    class="text-red-500">*</span></label>
                                            <input v-model="birthday" type="date"
                                                class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>

                                            <el-select class="css-input" style="width:300px; height: 40px;" v-model="role"
                                                clearable placeholder="Select role">
                                                <el-option label="Admin" value="1"></el-option>

                                                <el-option label="User" value="3"></el-option>
                                            </el-select>
                                        </div>
                                        <div>

                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">Gender</label>

                                            <el-select v-model="gender" clearable placeholder="Select gender"
                                                class="css-input">

                                                <el-option label="Male" value="1"></el-option>

                                                <el-option label="Female" value="0"></el-option>

                                            </el-select>

                                        </div>

                                    </div>
                                    <div class="w-full flex justify-center p-6  " @click="register">
                                        <el-button type="button">Create</el-button>
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
<style scoped>
.css-input {
    width: 300px;
    height: 40px;
}
</style>

