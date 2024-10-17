import { defineStore } from 'pinia'
import {request} from "@/util/request";
import {ElMessage} from "element-plus";
import type {genieChoose, genieSimple} from "@/util/interface";

export const useBPInfoStore = defineStore('bpInfo', {
    state: () => {
        return {
            user: 0,
            gameCount: 0,
            nowRound: 0,
            totalRound: 0,
            nowAttribute: '冰',
            choose: '',
            position: {color: 'blue', order: -1},
            ban_nums: [5,4,3,2,1,0,0,0,0] as number[],
            genie: [] as string[][],
            ban: [] as genieChoose[],
            playerChoice: [] as genieChoose[][][],
        }
    },
    actions: {
        clear(){
            this.user = 0;
            this.gameCount = 0;
            this.nowRound = 0;
            this.totalRound = 0;
            this.nowAttribute = '冰';
            this.choose = '';
            this.position = {color: 'blue', order: -1};
            this.ban_nums = [5,5,5,5,5,5,5,5,5,5,5,5];
            this.genie = [];
            this.ban = [];
            this.playerChoice = [];
        },
        getGenieByAttribute(){
            request({
                url: '/genie/attribute',
                method: 'get',
                params:{
                    attribute: this.nowAttribute
                }
            }).then((res) =>{
                this.genie = []
                const genieList : genieSimple[] = res.data
                console.log(genieList)
                let S = []
                let A = []
                let B = []
                let C = []
                for (let i = 0;i < genieList.length;i++){
                    if (genieList[i].grade >= 90)
                        S.push(genieList[i].genieName)
                    else if(genieList[i].grade >= 80)
                        A.push(genieList[i].genieName)
                    else if(genieList[i].grade >= 70)
                        B.push(genieList[i].genieName)
                    else
                        C.push(genieList[i].genieName)
                }
                this.genie.push(S, A, B, C)
                console.log(this.genie)
            })
        },
        addElem(){
            this.totalRound++
            this.nowRound++
            let once : genieChoose[][] = []
            for (let i = 0;i < 4;i++){
                let line: genieChoose[] = []
                if(i >= 2) {
                    for (let j = 0;j < 6;j++){
                        line.push({'attribute' : '','genieName': ''})
                    }
                }else{
                    for (let j = 0; j < this.ban_nums[this.totalRound - 1];j++){
                        line.push({'attribute' : '','genieName': ''})
                    }
                }
                once.push(line)
            }
            this.playerChoice.push(once)
            console.log(this.playerChoice)
        },
        removeElem(){
            this.totalRound--
            this.nowRound--;
            this.playerChoice.pop()
            console.log(this.playerChoice)
        },

        publicBan(){
            if(this.choose == ''){
                ElMessage.warning("请选择一只宠物")
            }else {
                let item: genieChoose = {
                    attribute: this.nowAttribute,
                    genieName: this.choose
                };
                this.ban.push(item)
                ElMessage.success("成功公ban " + item.genieName)
                this.choose = ''
            }
        },

        removeBan(attribute: string, genieName: string, banRound: number){
            if(banRound == 0) {
                this.ban = this.ban.filter((item) => item.attribute !== attribute || item.genieName !== genieName);
                ElMessage.success("删除公ban " + genieName + "成功")
            }else {
                for (let i = 0;i <= 1;i++){
                    for (let j = 0;j < this.ban_nums[banRound - 1];j++){
                        if(this.playerChoice[banRound - 1][i][j].genieName == genieName && this.playerChoice[banRound - 1][i][j].attribute == attribute){
                            this.playerChoice[banRound - 1][i][j].genieName = this.playerChoice[banRound - 1][i][j].attribute = ''
                            ElMessage.success("删除公ban " + genieName + "成功")
                        }
                    }
                }
            }
        },
        genieBan(){
            if(this.position.order > 4) {
                ElMessage.warning("请选择正确的位置")
                return
            }
            if(this.choose == '') {
                ElMessage.warning("请选择一只宠物")
                return;
            }
            let index = this.position.color == 'blue' ? 0 : 1
            this.playerChoice[this.nowRound - 1][index][this.position.order].attribute = this.nowAttribute
            this.playerChoice[this.nowRound - 1][index][this.position.order].genieName = this.choose
            ElMessage.success("成功禁用 " + this.choose)
            this.choose = ''
            this.position.order++
            if(this.position.order >= this.ban_nums[this.nowRound - 1])
                if(this.position.color == 'blue') {
                    this.position.color = 'red'
                    this.position.order = 0
                }else
                    this.position.order = -1
        },
        genieChoose(){
            if(this.position.order <= 4) {
                ElMessage.warning("请选择正确的位置")
                return
            }
            if(this.choose == '') {
                ElMessage.warning("请选择一只宠物")
                return;
            }
            let index = this.position.color == 'blue' ? 2 : 3
            this.playerChoice[this.nowRound - 1][index][this.position.order - 5].attribute = this.nowAttribute
            this.playerChoice[this.nowRound - 1][index][this.position.order - 5].genieName = this.choose
            ElMessage.success("成功选取 " + this.choose)
            this.choose = ''
            this.position.order++
            if(this.position.order > 10)
                if(this.position.color == 'blue') {
                    this.position.color = 'red'
                    this.position.order = 5
                }else
                    this.position.order = -1
        },
        genieCancel(attribute: string, genieName: string, color: string) {
            let index = color == 'blue' ? 2 : 3
            for (let j = 0; j < 6; j++) {
                if (this.playerChoice[this.nowRound - 1][index][j].genieName == genieName && this.playerChoice[this.nowRound - 1][index][j].attribute == attribute) {
                    this.playerChoice[this.nowRound - 1][index][j].genieName = this.playerChoice[this.nowRound - 1][index][j].attribute = ''
                    ElMessage.success("取消选取 " + genieName + "成功")
                }
            }
        }
    },
    persist: true
})
