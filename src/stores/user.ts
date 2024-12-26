import { defineStore } from 'pinia'
import {request} from "@/util/request";

export const useUserInfoStore = defineStore('user', {
    state: ()=> {
        return {
            id: '',
            name: '',
            token: ''
        }
    },
    actions: {
        setCookie(name, value, days) {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "")  + expires + "; path=/";
        }
    },
    persist: true
})
