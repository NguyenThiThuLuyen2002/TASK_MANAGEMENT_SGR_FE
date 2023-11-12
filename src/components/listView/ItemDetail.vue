  <template>
    <div class=" w-full  pt-10 box-border relative">
      <!--properties-->
      <div class="properties pr-5 w-1/6 fixed top-10 right-0">
        <h3 class="mb-1">PROPERTIES</h3>
        <hr>
        <!--type-->
        <div class="mb-4 mt-10">
          <label class="block text-sm my-0.5">Type:</label>
          <select class="border-2 rounded-md p-1 w-full text-sm">
            <option value="Question">Question</option>
            <option value="Issue">Issue</option>
            <option value="Feedback">Feedback</option>
          </select>
        </div>
        <!--status-->
        <div class="mb-4">
          <label class="block text-sm text-black my-0.5">Status:</label>
          <select class="border-2 rounded-md p-1 w-full text-sm">
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <!--priority-->
        <div class="mb-4">
          <label class="block text-sm text-black  my-0.5">Priority:</label>
          <select class="border-2 rounded-md p-1 w-full text-sm">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
      <div class="w-3/5 pl-6 mx-auto">
        <h1 class="text-2xl font-semibold mb-4">{{ selectedItem.title }} </h1>
        <!-- info -->
        <ReplyMessage :selectedItem="selectedItem" />
        <div>
          <h3 class="text-lg font-semibold mb-4">REPLIES</h3>
          <hr>
          <div v-for="htmlText in text" v-html="htmlText"></div>
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
  <script>
  import { useRoute } from 'vue-router'
  import { useItemDetail } from '../../stores/itemDetail'
  import { useAuthStore } from '../../stores/auth'
  import Editor from '../form/Editor.vue'
  import ReplyMessage from '../replyMessage.vue';
  import axios from 'axios';
  import {computed} from 'vue'
  export default {
    components: {
      Editor,
      ReplyMessage
    },

    setup() {
      const store = useItemDetail()
      const auth = useAuthStore()
      const route = useRoute()
      const selectedItem = computed(() => store.itemDetail)
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
      return {
        store,
        auth,
        selectedItem
      }
    },
    data() {
      return {
        toggleButton: true,
        text: []
      }
    },

    methods: {
      toggleEdit() {
        this.toggleButton = !this.toggleButton
      },
      handleReplyMessage(text) {
        this.toggleButton = !this.toggleButton
        const reply = {
          replyMessage: text,
          from: this.auth.user.email,
          to: this.selectedItem.sender
        }
        console.log("Reply message:", reply)
      },


    }
  };
  </script>