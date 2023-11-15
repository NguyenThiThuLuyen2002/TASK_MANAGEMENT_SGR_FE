<script>
import { useRoute } from 'vue-router'
import { useItemDetail } from '../../stores/itemDetail'
import { useAuthStore } from '../../stores/auth'
import Editor from '../form/Editor.vue';
import axios from 'axios';
import { computed, onMounted } from 'vue'
import SideBar from '../listView/SideBar.vue'
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

    axios.get(`http://54.196.242.13/task/${route.params.id}`, {
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

    axios.get(`http://54.196.242.13/task/${route.params.id}/comment`, {
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
      commentAttachments: [],


    }
  },

  methods: {
    toggleEdit() {
      this.toggleButton = !this.toggleButton
    },
    async handleReplyMessage(message, files) {
      console.log("Message received from Editor:", message);
      console.log("Message received from Editor:", files);
      if (message.trim() !== '' || (files && files.length > 0)) {
        const data = {
          content: message
        };
        try {
          const responseComment = await axios.post(`http://54.196.242.13/task/${this.route.params.id}/comment`, data, {
            headers: {
              Authorization: this.jwt
            },
          })

          // .then(response => {
          //   console.log("post comment thanh cong",response.data);

          //   // this.getReplyMessage();
          // })
          // .catch(error => {
          //   console.error('Error fetching data:', error);
          // })
          // .finally(() => {
          //   // Toggle button status should only be changed after the request is completed
          //   this.toggleButton = !this.toggleButton;
          // });

          let id = responseComment.data[0].ID;
          console.log("cmtID", id)

          // 2: Post attachment if it has file
          if (files && files.length > 0) {
            for (const file of files) {
              // Create a FormData object to send files
              let formData = new FormData();
              formData.append("data", file);
              // Upload the file to S3 and get the URL
              const uploadResponse = await axios.post("http://54.196.242.13/auth/upload", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: this.jwt,
                },
              });
              let url = uploadResponse.data.response.Location;
              let attachmentData = {
                name: file.name,
                path: url,
                type: "pdf",
                size: 1,
              };
              try {
                // Post attachment
                const postattachmentResponse = await axios.post("http://54.196.242.13/task/comment/" + id + "/attachment", attachmentData, {
                  headers: {
                    Authorization: this.jwt
                  },
                });
                console.log("daylafile", postattachmentResponse);
              }
              catch (error) {
                console.error("Error:", error);
              }
            }
          }
          this.getReplyMessage();
          this.toggleButton = !this.toggleButton;

        } catch (error) {
          console.log(error)
          if (error) throw error
        }
      } else {
        alert("Please fill in all required information.");
      }


    },
    async getReplyMessage() {
      try {
        const response = await axios.get(`http://54.196.242.13/task/${this.route.params.id}/comment`, {
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
        let idn = this.route.params.id
        console.log("hh", idn)
        const response = await axios.get(`http://54.196.242.13/task/${this.route.params.id}/attachment`, {
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
    // async getCommentAttachments() {
    //   try {
    //     const response = await axios.get(`http://54.196.242.13/task/comment/${this.route.params.id}/attachment`, {
    //       headers: {
    //         Authorization: this.jwt
    //       },
    //     });
    //     console.log("commentedfile",response)
    //     this.commentAttachments = response.data || []; // Fallback to an empty array if response.data is falsy
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // },


  },
  mounted() {
    this.getReplyMessage()
    this.getAttachments()
    // this.getCommentAttachments()


  }

};
</script>
<template>
  <div class=" w-5/6 h-screen box-border flex ">
    <SideBar></SideBar>
    <div class="w-full mx-auto pt-10 h-full pl-[18vw]">
      <h1 class="text-2xl font-semibold mb-4">{{ selectedItem.title }} </h1>
      <!-- info -->
      <MainMessage :selectedItem="selectedItem" :attachments="attachments" />
      <div>
        <hr>
      </div>
      <div class=" max-h-[280px] overflow-auto container-reply" id="journal-scroll">
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
<style scoped>
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
.container-reply img{

    max-width: 300px;
    object-fit: contain;
}
</style>