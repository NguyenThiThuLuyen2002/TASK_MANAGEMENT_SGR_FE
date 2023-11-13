<template>
  <div class="w-full  box-border h-screen overflow-auto"> 
    <div>
    <div class="flex justify-between align-center my-4 mx-auto w-5/6 box-border">
      <!--search box-->
      <div>
        <div class="relative text-gray-600 ">
          <input type="search" name="serch" placeholder="Search"
            class="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none border-[0.5px]">
          <button type="submit" class="absolute right-0 top-0 mt-3 mr-4 ">
            <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px"
              viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve">
              <path
                d="M55.146,51.408L41.588,37.85c3.608-4.646,5.678-10.406,5.678-16.532C47.266,7.94,39.326,0,29.633,0   C19.94,0,12,7.94,12,17.633c0,9.693,7.94,17.633,17.633,17.633c5.126,0,9.886-2.07,13.532-5.678l13.558,13.558   c0.391,0.391,0.902,0.586,1.414,0.586s1.023-0.195,1.414-0.586C56.536,54.854,56.536,52.438,55.146,51.408z M29.633,31.266   c-7.18,0-13.008-5.828-13.008-13.008c0-7.18,5.828-13.008,13.008-13.008c7.18,0,13.008,5.828,13.008,13.008   C42.641,25.438,36.813,31.266,29.633,31.266z" />
            </svg>
          </button>
        </div>
      </div>
      <!--create button-->
      <div class="">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="createItem">
          Create
        </button>
      </div>
    </div>
  </div>

  <!--request list-->
  <div>
    <Item v-for="(item, index) in listItems" :key="index" :title="item.title" :sender="item.postedBy"
      :time="item.createdAt" :avatar="item.avatar" :status="item.status" @click="selectItem(item)" />
  </div>
  </div>
 
</template>
<style>
.css-scroll{
  overflow: scroll;
}
</style>
<script>
import Item from './RequestItem.vue';
import { useItemDetail } from '../../stores/itemDetail'
import axios from 'axios';
export default {
  components: {
    Item,
  },
  setup() {
    const store = useItemDetail()
    return {
      store
    }
  },
  data() {
    return {
      listItems: [],
      selectedItem: null,

    };
  },
  methods: {
    selectItem(item) {
      this.store.itemDetail = item

      this.$router.push({ name: 'itemDetail', params: { id: item.ID } })
      console.log(item)
    },
    createItem() {
      this.$router.push({ name: 'create' })
    }
  },

  created() {
    const t = this
    axios.get('http://127.0.0.1:3001/task')
      .then(response => {
        t.listItems = response.data
        console.log(t.listItems)
      })

      .catch(error => {
        console.log(error)
      })

  }
};
</script>
  