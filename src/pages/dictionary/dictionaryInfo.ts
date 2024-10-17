import { defineStore } from 'pinia'
import type {genieSimple} from "@/util/interface";
import {request} from "@/util/request";

export const useDictionaryInfoStore = defineStore('dictionaryInfo', {
    state: ()=> {
        return {
            now_attribute: '冰',
            genieList: [] as genieSimple[],
            choose: {} as genieChoose
        }
    },
    actions: {
        getGenieList(){
            request({
                url: '/genie/attribute',
                method: 'get',
                params:{
                    attribute: this.now_attribute
                }
            }).then((res)=>{
                console.log(res.data)
                this.genieList = res.data
                this.choose = {}
            })
        }
    },
})
