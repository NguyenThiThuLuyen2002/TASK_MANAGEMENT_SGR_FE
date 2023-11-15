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

      </div>
    </div>

    <!--request list-->
    <div>
      <Item v-for="(item, index) in filteredListItems" :key="index" :id="item.ID" :title="item.title"
        :sender="item.postedBy" :time="item.createdAt" :profilePicture="item.profilePicture" :status="item.status"
        @click="selectItem(item)" />
    </div>
    <el-pagination :page-size="10" layout="prev, pager, next" :total="totalRecords" class="pl-[16vw]"
      @current-change="handleCurrentPage" />
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
    handleCurrentPage(newPage) {
      axios.get(`http://54.196.242.13/task?page=${newPage}`, {
        headers: {
          Authorization: this.jwt
        },
      })
        .then(response => {
          this.currentPage = newPage;
          this.listItems = response.data.result;
          this.listItems.forEach((e) => {
            e.createdAt = e.createdAt?.split('T')[0]
          })
          this.totalRecords = response.data.totalRecord;
        })
        .catch(error => {
          console.log(error);
          console.log(localStorage.getItem('accessToken'))
        })
    }

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
  computed: {
    filteredListItems() {

      const searchTerm = this.searchQuery.toLowerCase();

      return this.listItems.filter(item => {

        return item.title.toLowerCase().includes(searchTerm) ||

          item.sender.toLowerCase().includes(searchTerm);

      });

    }
  },


  created() {
    const t = this
    axios.get('http://54.196.242.13/task', {
      headers: {
        Authorization: this.jwt
      },
    })
      .then(response => {
        t.originalListItems = response.data.result;
        t.listItems = response.data.result;
        t.totalRecords = response.data.totalRecord;
      })

      .catch(error => {
        console.log(error)
      })
    this.decodeToken()
  }
};
</script>