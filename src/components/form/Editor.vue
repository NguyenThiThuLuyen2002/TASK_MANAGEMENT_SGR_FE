<template>
    <div >
        <QuillEditor theme="snow" toolbar="full" v-model:content="text" contentType="html"/>
    </div>
    <!--button send-->
    <div class="mt-10">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full" @click="sendMessage">
            Send
        </button >
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
  data(){
    return{
        text: '',
    }
  },
  methods: {
    sendMessage: function(){
      console.log("Button 'Send' clicked in component con");
      console.log("Text to send:", this.text);
      this.$emit('replyMessage', this.text);

      // khi send xong thi xoa mess trong o input ko phai text
      
    }
  }
}
</script>