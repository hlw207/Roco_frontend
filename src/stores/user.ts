import { defineStore } from 'pinia'
import {request} from "@/util/request";

export const useUserInfoStore = defineStore('user', {
    state: ()=> {
        return {
            id: -1,
            name: ''
        }
    },
    actions: {

    },
})
