import {defineStore} from "pinia";
import type {genie, manaGenie} from "@/util/interface";
import {request} from "@/util/request";

export const useChooseInfoStore = defineStore('chooseInfo', {
    state: () => {
        return {
            attribute: '冰',
            choose: {} as genie,
            manaChoose: {} as manaGenie,
            genies: [] as genie[],
            manaGenies: [] as manaGenie[]
        }
    },
    actions: {
        changeGenie(type : number){
            if(type == 0)
                this.getGenieByAttribute()
            else
                this.getManaGenieByAttribute()
        },
        getGenieByAttribute(){
            request({
                url: '/genie/attribute',
                method: 'get',
                params:{
                    attribute: this.attribute
                }
            }).then((res) =>{
                this.genies = res.data
                console.log(this.genies)
            })
        },
        getManaGenieByAttribute(){
            request({
                url: '/genie/mana/attribute',
                method: 'get',
                params:{
                    attribute: this.attribute
                }
            }).then((res) =>{
                this.manaGenies = res.data
                console.log(this.manaGenies)
            })
        },
    }
})