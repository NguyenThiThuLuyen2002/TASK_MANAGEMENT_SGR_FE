<template>
    <div >
        <QuillEditor theme="snow" v-model:content="text" contentType="html"/>
    </div>
    <!--button send-->
    <div class="mt-10">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full" @click="saveData">
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
  emits: ['toggleEdit'],
  data(){
    return{
        text: ''
    }
  },
  methods: {
    saveData: function(){
      console.log(this.text)
      this.$emit('toggleEdit')
    }
  }
}
</script>