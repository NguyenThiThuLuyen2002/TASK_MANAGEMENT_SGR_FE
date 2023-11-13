import { defineStore } from 'pinia'

export const useItemDetail = defineStore('itemDetail', {
    state: () => ({
        itemDetail: {
            id: '',
            title: '',
            postedBy: '',
            createdAt: '',
            profilePicture: '',
            status: '',
        },
        replyMessages: [],
    }),
    actions: {
        setItemDetail(data) {
            this.itemDetail = data;
        }   
    }
})