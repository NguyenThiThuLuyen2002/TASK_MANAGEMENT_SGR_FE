<template>
  <div>
    <QuillEditor theme="snow" v-model:content="text" contentType="html" />

  </div>
  <div class="flex">
    <div>
      <label class="p-[8px] cursor-pointer" for="file-upload"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </label>
      <input type="file" class="hidden" id="file-upload" @change="handleFileUpload" name="file-upload"
        accept="application/pdf" multiple>
    </div>
    <div class=" flex pt-2 " v-if="selectedFileNames.length > 0" >
      <p class=" items-center">Selected Files:</p>
      <ul >
        <li class=" text-blue-600" v-for="fileName in selectedFileNames" :key="fileName">{{ fileName.name }}</li>
      </ul>
    </div>
  </div>


  <!--button send-->
  <div class="mt-5">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full" @click="sendMessage">
      Send
    </button>
  </div>
</template>
<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
export default {
  components: {
    QuillEditor
  },
  emits: ['replyMessage'],
  data() {
    return {
      selectedFileNames: [],
      text: '',
      files: [],
    }
  },
  methods: {
    sendMessage: function () {
      console.log("Button 'Send' clicked in component con");
      console.log("Text to send:", this.text);
      this.$emit('replyMessage', this.text, this.files);

      // khi send xong thi xoa mess trong o input ko phai text

    },
    handleFileUpload(event) {
      this.files = event.target.files;
      if (this.files.length > 0) {
        this.selectedFileNames = this.files;
      } 
      // if (this.files.length > 0) {
      //   // Process each file here
      //   for (const file of this.files) {
      //     console.log("Selected file:", file.name);
      //   }
      // }
    },
  }
}
</script>