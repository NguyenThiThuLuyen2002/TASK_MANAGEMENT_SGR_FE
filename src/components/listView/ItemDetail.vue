<script>
import { useRoute } from 'vue-router'
import { useItemDetail } from '../../stores/itemDetail'
import { useAuthStore } from '../../stores/auth'
import Editor from '../form/Editor.vue';
import axios from 'axios';
import { computed, onMounted } from 'vue'
import SideBar from '../listView/admin/SideBar.vue'
import MainMessage from '../listView/itemMessage/MainMessage.vue'
import ReplyMessage from '../listView/itemMessage/ReplyMessage.vue'

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
    const jwt = auth.getBearerToken()

    axios.get(`http://localhost:3001/task/${route.params.id}`, {
      headers: {
        Authorization: jwt
      },
    })
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

    axios.get(`http://localhost:3001/task/${route.params.id}/comment`, {
      headers: {
        Authorization: jwt
      },
    })
      .then(response => {
        const replyMessages = response.data
        console.log("reply mess", replyMessages)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    return {
      store,
      auth,
      route,
      selectedItem,
      jwt

    }

  },
  data() {
    return {
      toggleButton: true,
      replies: [],
      attachments: [],
    }
  },

  methods: {
    toggleEdit() {
      this.toggleButton = !this.toggleButton
    },
    handleReplyMessage(message) {
      console.log("Message received from Editor:", message);
      const token = localStorage.getItem('accessToken').substring(1, localStorage.getItem('accessToken').length - 1)

      
      const data = {
        content: message
      };
      axios.post(`http://localhost:3001/task/${this.route.params.id}/comment`, data, {
        headers: {
          Authorization:this.jwt
        },
      })
        .then(response => {
          console.log(response.data);
          this.getReplyMessage();
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
        .finally(() => {
          // Toggle button status should only be changed after the request is completed
          this.toggleButton = !this.toggleButton;
        });
    },
    async getReplyMessage() {
      try {
        const response = await axios.get(`http://localhost:3001/task/${this.route.params.id}/comment`, {
          headers: {
            Authorization: this.jwt
          },
        });
        console.log(response.data)
        this.replies = response.data || []; // Fallback to an empty array if response.data is falsy
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    },
    async getAttachments() {
      try {
        const response = await axios.get(`http://localhost:3001/task/${this.route.params.id}/attachment`, {
          headers: {
            Authorization: this.jwt
          },
        });
        console.log(response.data)
        this.attachments = response.data || []; // Fallback to an empty array if response.data is falsy
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

  },
  mounted() {
    this.getReplyMessage()
    this.getAttachments()

  }

};
</script>
<template>
  <div class=" w-5/6 h-screen box-border flex ">
    <SideBar></SideBar>
    <div class="w-full mx-auto pt-10 h-full  pl-[18vw]" >
      <h1 class="text-2xl font-semibold mb-4">{{ selectedItem.title }} </h1>
      <!-- info -->
      <MainMessage :selectedItem="selectedItem" :attachments="attachments" />
      <div>
        <hr>
      </div>
      <div class=" max-h-[280px] overflow-auto" id="journal-scroll">
        <div v-for="(reply, index) in replies" :key="index">
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
<style>
 #journal-scroll::-webkit-scrollbar {
            width: 4px;
            cursor: pointer;
            /*background-color: rgba(229, 231, 235, var(--bg-opacity));*/

        }
        #journal-scroll::-webkit-scrollbar-track {
            background-color: rgba(229, 231, 235, var(--bg-opacity));
            cursor: pointer;
            /*background: red;*/
        }
        #journal-scroll::-webkit-scrollbar-thumb {
            cursor: pointer;
            background-color: #a0aec0;
            /*outline: 1px solid slategrey;*/
        }
</style>