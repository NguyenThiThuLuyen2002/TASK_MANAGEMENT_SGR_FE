<template>
    <div class="bg-white shadow-md rounded-lg p-4 mb-4 w-4/5 mx-auto flex  items-center">
        <div class="flex items-center w-3/5">
            <!-- Checkbox -->
            <!-- <input type="checkbox" class="mr-4" /> -->
            <!-- Avatar -->
            <img :src="'..//public'+ profilePicture" alt="Avatar" class="w-12 h-12 rounded-full object-cover" />
            <!-- Title, Sender, Time -->
            <div class="ml-4">
                <h2 class="text-lg font-semibold">{{ title }}</h2>
                <div class="text-gray-600 flex">
                    <span class="text-gray-500 text-sm mr-2">{{ sender }}</span>

                    <span class="text-gray-500 text-sm ml-2"> Time: {{ time }}</span>
                </div>
            </div>
        </div>
        <div class="text-left  w-1/5">
            <!-- Trạng thái -->
            <p class="text-gray-500 text-sm">Status: <span class="text-green-500"> {{ status }}</span> </p>
        </div>
        <div class="bg-white ">
            <button class="inline-flex items-center px-4 py-2  font-medium rounded-md" v-show="getRole =='user'  " >
                <el-popconfirm  title="Are you sure to delete this?" @confirm="deleteRequest()" @cancel="handleCancel()">
                    <template #reference>
                        <div @click.stop><img src="../../assets/icons/trash.svg" alt=""
                                class="w-5 mx-2"></div>
                    </template>
                </el-popconfirm>

                <img src="../../assets/icons/save.svg" alt="" class="w-5 mx-2">
            </button>

        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { useAuthStore } from '../../stores/auth'

export default {
    props: {
        id: Number,
        title: String,
        sender: String,
        time: String,
        profilePicture: String,
        status: String,

    },
    setup() {
        const auth = useAuthStore()
        const jwt = auth.getBearerToken()
        const getRole = localStorage.getItem('role')
        return {
            auth, jwt,
            getRole
        }

    },
    methods: {
        async deleteRequest() {

            try {
                // Perform the HTTP request to delete the task
                await axios.delete(`http://54.196.242.13/task/${this.id}`, {
                    headers: {
                        Authorization: this.jwt
                    },
                })
                console.log(`Task with ID ${this.id} deleted successfully.`);

                // Emit the event to notify the parent component about the deletion
                this.$emit('delete-request', this.id);
            } catch (error) {
                console.error('Error deleting task:', error);
            }
            console.log(this.id)
        },
        saveRequest() {
            this.$emit('save-request', this.id);
        },
    },

};
</script>