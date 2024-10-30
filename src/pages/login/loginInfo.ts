import { defineStore } from 'pinia'
import {request} from "@/util/request";

export const useLoginInfoStore = defineStore('loginInfo', {
    state: ()=> {
        return {
            account: '',
            password: '',
            certainPassword: '',
            type: 0,
            order: 0
        }
    },
    actions: {

    },
})
