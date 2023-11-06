import { defineStore } from 'pinia'

export const useItemDetail = defineStore('itemDetail', {
    state: () => ({
        itemDetail: {
            id: '',
            title: '',
            sender: '',
            time: '',
            avatar: '',
            numOfRes: '',
            responder: '',
        }
    }),
    actions: {
        setItemDetail(data) {
            this.itemDetail = data;
        }   
    }
})