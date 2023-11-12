<template >
  <div class="bg-gray-200">
    <div class="w-full justify-self-center flex justify-center p-5">
      <!-- Search -->
      <div class="mr-10 flex align-item-center">
        <input v-model="searchBox" placeholder="search ..." type="text" class="border border-2 rounded-md p-2 w-full" />
      </div>
    </div>
    <!--request list-->
    <div>
      <Item v-for="(item, index) in listItems" :key="index" :title="item.title" :sender="item.postedBy"
        :time="item.createdAt" :avatar="item.avatar" :status="item.status" @click="selectItem(item)" />
    </div>
  </div>
</template>
  
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

      this.$router.push({ name: 'itemDetail', params: { id: item.id } })
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
  