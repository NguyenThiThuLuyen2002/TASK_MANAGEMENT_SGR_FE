<template>
    <div class="w-full pl-[18vw] box-border ">
        <div>
            <div class="flex justify-between align-center my-4 mx-auto w-4/5 box-border">
                <!--search box-->
                <div>
                    <div class="relative text-gray-600 ">

                        <input type="search" v-model="searchQuery" placeholder="Search"
                            class="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none border-[0.5px]">

                    </div>
                </div>
                <!--create button-->
                <div class="">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        @click="createItem">
                        Create
                    </button>
                </div>
            </div>
        </div>

        <!--request list-->
        <div>
            <Item v-for="(item, index) in listItems" :key="index" :id="item.ID" :title="item.title" :sender="item.postedBy"
                :time="item.createdAt" :profilePicture="item.profilePicture" :status="item.status"
                @click="selectItem(item)" />
        </div>
    </div>
</template>

<script>
import Item from '../RequestItem.vue';
import { useAuthStore } from '../../../stores/auth'
import { useItemDetail } from '../../../stores/itemDetail';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
export default {
    components: {
        Item,
    },
    setup() {
        const store = useItemDetail()
        const auth = useAuthStore()
        const jwt = auth.getBearerToken()

        return {
            store, auth, jwt
        }

    },
    data() {
        return {
            listItems: [],
            selectedItem: null,
            originalListItems: [],
            searchQuery: '',

        };
    },
    methods: {
        selectItem(item) {
            this.store.itemDetail = item
            this.$router.push({ name: 'itemDetail', params: { id: item.ID } })
        },
        createItem() {
            this.$router.push({ name: 'create' })
        },
        decodeToken() {
            let token = localStorage.getItem('accessToken')
            console.log(token)
            if (token) {
                let decoded = jwtDecode(token)
                console.log(decoded)
                return decoded.role
            }
            return null
        },

    },

    watch: {
        searchQuery(newQuery) {
            this.listItems = newQuery ? this.originalListItems.filter(item => {
                const searchTerm = newQuery.toLowerCase();
                return item.title.toLowerCase().includes(searchTerm) ||
                    item.sender.toLowerCase().includes(searchTerm);
            }) : this.originalListItems;
            this.totalRecords = this.listItems.length;
        }
    },


    created() {
        const t = this
        axios.get('http://localhost:3001/task?', {
            headers: {
                Authorization: this.jwt
            },
        })
            .then(response => {
                console.log(response.data)
                t.originalListItems = response.data;
                t.listItems = response.data;
                t.totalRecords = response.data.totalRecord;
                console.log(t.originalListItems)
            })

            .catch(error => {
                console.log(error)
            })
        this.decodeToken()
    }
};
</script>