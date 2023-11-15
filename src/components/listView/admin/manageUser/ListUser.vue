<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import SideBar from '../../SideBar.vue';
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
    axios.get(`http://54.196.242.13/user`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

        .then(response => {
            users.value = response.data.result;
            users.value.forEach((e) => {
                e.birthday = e.birthday?.split('T')[0]
            })
            totalRecords.value = response.data.totalRecord;


        })
        .catch(error => {
            console.log(error);
            console.log(localStorage.getItem('accessToken'))
        })


}
getAllUsers()

const goToUserDetail = (userId) => {
    console.log(userId)
    router.push({ name: 'userDetail', params: { id: userId } });

};
const createUser = () => {
    router.push({ name: 'register' });
};




const deleteUser = (userId) => {
    axios.delete(`http://54.196.242.13/user/` +userId, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

        .then(response => {
            console.log(response)
            getAllUsers()

        })
        .catch(error => {
            console.log(error);
            console.log(localStorage.getItem('accessToken'))
        })

}
const handleCurrentPage = (newPage) => {
    axios.get(`http://54.196.242.13/user?page=${newPage}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(response => {
            currentPage.value = newPage;
            users.value = response.data.result;
            users.value.forEach((e) => {
                e.birthday = e.birthday?.split('T')[0]
            })
            totalRecords.value = response.data.totalRecord;


        })
        .catch(error => {
            console.log(error);
        })
}
const handleCancel = () => {
    console.log('cancel')
}

</script>
<template>
    <div class="flex">
        <SideBar></SideBar>
        <div class="mx-auto w-[80%] py-8 pl-[18vw] css-responsive ">
            <div class="flex items-center justify-between pb-6">
                <div>
                    <h1 class="font-semibold text-gray-700">User Accounts</h1>
                    <span class="text-xs text-gray-500">View accounts of registered users</span>
                </div>
                <div class="flex items-center justify-between">
                    <!--button plus icon circle-->
                    <button type="button"
                        class="rounded-full bg-blue-500 hover:bg-blue-700  w-10 h-10 font-semibold text-white flex justify-center items-center"
                        @click="createUser"><img src="../../../../assets/icons/plus.svg" alt=""></button>

                </div>
            </div>
            <div class=" w-full rounded-lg border">
                <table class="w-full h-full ">
                    <thead>
                        <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                            <th class="text-left p-3 px-5" v-for="(column, index) in tableColumns" :key="index">
                                {{ column }}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-500">
                        <tr v-for="user in users" :key="user" class="border-b hover:bg-orange-100 cursor-pointer " @click="goToUserDetail(user.ID) ">
                            <td class="p-3 px-5">
                                    {{ user.username }}
                            </td>

                            <td class="p-3 px-5"><span class="bg-transparent">{{ user.name }}</span>
                            </td>
                            <td class="p-3 px-5">
                                <span class="bg-transparent">{{ getGenderLabel(user.gender) }}</span>
                            </td>
                            <td class="p-3 px-5">
                                <span class="bg-transparent">{{ user.birthday }}</span>
                            </td>
                            <td class="py-3 px-7 flex justify-start ">
                                <img src="@/assets/icons/edit.svg" alt="" class="mr-2 w-5 h-5" @click.stop="goToUserDetail(user.ID)" />
                                <el-popconfirm title="Are you sure to delete this?" @confirm="deleteUser(user.ID)"
                                    @cancel="handleCancel()">
                                    <template #reference>
                                        <div @click.stop><img src="@/assets/icons/trash2.svg" alt="" class="w-5 h-5" />
                                        </div>
                                    </template>
                                </el-popconfirm>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <el-pagination :page-size="10" layout="prev, pager, next" :total="totalRecords"
                @current-change="handleCurrentPage" />
        </div>
    </div>
</template>
<style>
@media (max-width: 1200x) {
    .css-responsive {
        width: 30%;
    }

    .css-responsive-table {
        width: 10px;
    }
}
</style>