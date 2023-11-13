<script>
import { useRoute } from 'vue-router'
import { useItemDetail } from '../../stores/itemDetail'
import { useAuthStore } from '../../stores/auth'
import Editor from '../form/Editor.vue'
import ReplyMessage from '../replyMessage.vue';
import axios from 'axios';
import { computed } from 'vue'
import SideBar from '../SideBar.vue'
import MainMessage from '../MainMessage.vue'
export default {
  components: {
    Editor,
    ReplyMessage,
    SideBar,
    MainMessage
  },

  setup() {
    const store = useItemDetail()
    const auth = useAuthStore()
    const route = useRoute()
    const selectedItem = computed(() => store.itemDetail)
    // const replies = computed(() => store.replyMessages);
    // console.log(replies)
    console.log(selectedItem)

    axios.get(`http://localhost:3001/task/${route.params.id}`)
      .then(response => {
        console.log(response.data[0])
        if (response.data) {
          store.itemDetail = response.data[0];

        } else {
          console.error('Empty response from the server');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    axios.get(`http://localhost:3001/task/${route.params.id}/comment`)
      .then(response => {
        store.replyMessages = response.data
        console.log("reply mess", store.replyMessages)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });



    return {
      store,
      auth,
      route,
      selectedItem,
      text: '',

    }

  },
  data() {
    return {
      toggleButton: true,
      replies: [],
    }
  },

  methods: {
    toggleEdit() {
      this.toggleButton = !this.toggleButton
    },
    handleReplyMessage(message) {
      console.log("Message received from Editor:", message);
      const token = localStorage.getItem('accessToken').substring(1, localStorage.getItem('accessToken').length - 1)
      // Configure the request headers outside of the post call for clarity
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`// Assuming Bearer token authentication
        },
      };
      console.log("config", config)
      // The content should be part of the request body, not the headers
      const data = {
        content: message
      };
      axios.post(`http://localhost:3001/task/${this.route.params.id}/comment`, data, config)
        .then(response => {
          console.log(response.data);
          this.replies.push(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
        .finally(() => {
          // Toggle button status should only be changed after the request is completed
          this.toggleButton = !this.toggleButton;
        });
    },
    getReplyMessage() {
      axios.get(`http://localhost:3001/task/${this.route.params.id}/comment`)
        .then(response => {
          console.log(response.data)
          if (response.data) {
            this.replies = response.data;
          } else {
            console.error('Empty response from the server');
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },

  },
  mounted() {
    this.getReplyMessage()
    // console.log("mounted")
    // const store = useItemDetail();
    // this.replies = store.replyMessages;
  }

};
</script>
<template>
  <div class=" w-full h-screen box-border flex ">
    <SideBar></SideBar>
    <div class="w-full pl-6 mx-auto pt-10 h-full overflow-auto">
      <h1 class="text-2xl font-semibold mb-4">{{ selectedItem.title }} </h1>
      <!-- info -->
      <MainMessage :selectedItem="selectedItem" />
      <div>
        <hr>
      </div>
      <div class=" max-h-[280px] overflow-auto">
        <div v-for="(reply, index) in replies" :key="index" >
        <ReplyMessage :reply="reply" />
      </div>
      </div>
     
      <!--reply button-->
      <div class="mt-10">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full" v-if="toggleButton"
          @click="toggleEdit">
          Reply
        </button>
      </div>

      <!--editor-->
      <Editor v-if="!toggleButton" @replyMessage="handleReplyMessage"></Editor>
    </div>

  </div>
</template>
  