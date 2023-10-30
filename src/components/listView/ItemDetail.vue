<template>
    <div class=" w-full  pt-10 box-border relative">
        <!--properties-->
        <div class="properties pr-5 w-1/6 fixed top-10 right-0">
            <h3 class="mb-1">PROPERTIES</h3>
            <hr>
            <!--type-->
            <div class="mb-4 mt-10">
                <label class="block text-sm my-0.5">Type:</label>
                <select v-model="type" class="border-2 rounded-md p-1 w-full text-sm">
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
            <div class="info flex">
                <!--avatar-->
                <img src="https://imgflip.com/s/meme/Cute-Cat.jpg" alt="" class="h-12 w-12 rounded-full mr-2">
                <div>
                    <div>
                        <h2 class="text-lg font-semibold">From: {{ selectedItem.sender }}</h2>
                        <p class="text-gray-500 text-sm">To: (Email)</p>
                    </div>
                </div>
            </div>
            <!-- message -->
            <div class="mt-10 h-auto">
                (Message)
                
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam distinctio, perferendis quos libero animi sit doloremque, quis omnis consectetur, perspiciatis modi corporis pariatur eaque quisquam? Asperiores voluptates magni repudiandae odit.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit optio voluptatibus pariatur saepe dolor quasi error officia minima itaque quod, ipsa blanditiis architecto beatae possimus explicabo illum rem facere. Animi?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quidem nam molestias totam saepe architecto quia voluptates, ea culpa voluptate qui debitis ipsam incidunt, harum sapiente error adipisci id ipsum!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo necessitatibus natus aspernatur explicabo nostrum! Vel expedita porro cumque repellat est tenetur alias quod, optio, sed accusamus enim. Recusandae, dolorem minus!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab maiores cumque consequatur fugiat assumenda harum earum, soluta, optio odio commodi rem quas atque possimus? Cumque earum nemo sit similique soluta?
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam voluptate voluptates eos! Aspernatur aliquam dolor odio voluptates officia distinctio, eum aut vel, excepturi ducimus magnam et, voluptatibus iusto a error?
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus rerum quaerat quibusdam commodi sapiente, voluptates adipisci minus cumque, rem quae necessitatibus similique ab dolore debitis ipsum perferendis error aliquam dolores?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi repellendus maiores quaerat officia odio quos quas magnam rem dolor non? Cum non aliquid eligendi debitis voluptatem commodi aut nisi quis.
            </div>
            <!--Attachments-->
            <div>
                <ul>
                <li class="flex items-center justify-between py-4  pr-5 text-sm leading-6">
              <div class="flex w-0 flex-1 items-center">
                <svg class="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clip-rule="evenodd" />
                </svg>
                <div class="ml-4 flex min-w-0 flex-1 gap-2">
                  <span class="truncate font-medium">resume_back_end_developer.pdf</span>
                  <span class="flex-shrink-0 text-gray-400">2.4mb</span>
                </div>
              </div>
              <div class="ml-4 flex-shrink-0">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
              </div>
            </li>
            <li class="flex items-center justify-between py-4 pr-5 text-sm leading-6">
              <div class="flex w-0 flex-1 items-center">
                <svg class="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clip-rule="evenodd" />
                </svg>
                <div class="ml-4 flex min-w-0 flex-1 gap-2">
                  <span class="truncate font-medium">coverletter_back_end_developer.pdf</span>
                  <span class="flex-shrink-0 text-gray-400">4.5mb</span>
                </div>
              </div>
              <div class="ml-4 flex-shrink-0">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
              </div>
            </li>
            </ul>
            </div>
            <!--reply button-->
            <div class="mt-10">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full" v-if="toggleButton" @click="toggleEdit">
                    Reply
                </button>
            </div>
            <!--editor-->
            <Editor v-if="!toggleButton" ></Editor>
  
        </div>
        
    </div>
</template>
<script>
import { useItemDetail } from '../../stores/itemDetail'
import Editor from '../form/Editor.vue'
export default {
  components:{
    Editor
  },

  setup() {
    const store = useItemDetail()
    console.log(store)
    return {
      store
    }  
  },
  data(){
    return{
      selectedItem: this.store.itemDetail,
      toggleButton: true
    }
  },
  methods:{
    toggleEdit()
    {
      this.toggleButton = !this.toggleButton
    }
  }

};
</script>