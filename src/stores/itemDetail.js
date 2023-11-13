import { defineStore } from 'pinia'

export const useItemDetail = defineStore('itemDetail', {
    state: () => ({
        itemDetail: {
            id: '',
            title: '',
            postedBy: '',
            createdAt: '',
            avatar: '',
            status: '',
        }
    }),
    actions: {
        setItemDetail(data) {
            this.itemDetail = data;
        }   
    }
})