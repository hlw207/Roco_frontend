import { defineStore } from 'pinia'
import {request} from "@/util/request";
import {ElMessage} from "element-plus";
import type {genieChoose, manaGenie} from "@/util/interface";
import {useUserInfoStore} from "@/stores/user";

export const useManaInfoStore = defineStore('manaInfo', {
    state: () => {
        return {
            id: -1,
            user: '',
            gameCount: 0,
            nowRound: 0,
            totalRound: 0,
            maxRound: 5,
            grade: 5,
            nowAttribute: '武斗',
            choose: {attribute: "", genieName: "", grade: 0, viceAttribute: "", extra: ""} as manaGenie,
            position: {color: 'blue', order: -1},
            ban_nums: [2,0,0,0,0,0,0,0,0,0,0,0] as number[],
            genie: [] as manaGenie[][],
            ban: [] as genieChoose[],
            playerChoice: [] as manaGenie[][][],
        }
    },
    actions: {
        clear(){
            this.id = -1;
            this.user = '';
            this.gameCount = 0;
            this.nowRound = 0;
            this.totalRound = 0;
            this.maxRound = 5;
            this.grade = 5;
            this.nowAttribute = '冰';
            this.choose = {attribute: "", genieName: "", grade: 0, viceAttribute: "", extra: ""};
            this.position = {color: 'blue', order: -1};
            this.ban_nums = [2,0,0,0,0,0,0,0,0,0,0,0];
            this.genie = [];
            this.ban = [];
            this.playerChoice = [];
        },
        getGenieByAttribute(){
            request({
                url: '/genie/mana/attribute',
                method: 'get',
                params:{
                    attribute: this.nowAttribute
                }
            }).then((res) =>{
                this.genie = []
                const genieList : manaGenie[] = res.data
                console.log(genieList)
                // 5 4.5 4 3.5 3 2.5 2 1.5 1
                for (let i = 0; i < 9;i++){
                    this.genie.push([])
                }
                for (let i = 0;i < genieList.length;i++){
                    const index = (5 - genieList[i].grade) * 2
                    this.genie[index].push(genieList[i])
                }
                console.log(this.genie)
            })
        },
        getGenieByGrade(){
            request({
                url: '/genie/mana/grade',
                method: 'get',
                params:{
                    grade: this.grade
                }
            }).then((res) =>{
                this.genie = [[]]
                const genieList : manaGenie[] = res.data
                console.log(genieList)
                for (let i = 0;i < genieList.length;i++){
                    this.genie[0].push(genieList[i])
                }
            })
        },
        addElem(){
            if(this.nowRound == this.maxRound){
                ElMessage.warning('已经是最后一局啦')
                return
            }
            this.totalRound++
            this.nowRound++
            let once : manaGenie[][] = []
            for (let i = 0;i < 4;i++){
                let line: manaGenie[] = []
                if(i >= 2) {
                    for (let j = 0;j < 6;j++){
                        line.push({grade: 0, viceAttribute: "", attribute : '',genieName: '', extra: ''})
                    }
                }else{
                    for (let j = 0; j < this.ban_nums[this.totalRound - 1];j++){
                        line.push({grade: 0, viceAttribute: "", attribute : '',genieName: '', extra: ''})
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
        async publicBan(){
            if(this.choose.genieName == ''){
                ElMessage.warning("请选择一只宠物")
            }else {
                let item: genieChoose = {
                    attribute: this.choose.attribute,
                    genieName: this.choose.genieName
                };
                this.ban.push(item)
                await this.addBan()
                ElMessage.success("成功公ban " + item.genieName)
                this.choose = {attribute: "", genieName: "", grade: 0, viceAttribute: "", extra: ""}
            }
        },
        async removeBan(attribute: string, genieName: string, banRound: number){
            if(banRound == 0) {
                this.ban = this.ban.filter((item) => item.attribute !== attribute || item.genieName !== genieName);
                await this.deleteBan(attribute, genieName)
                ElMessage.success("删除公ban " + genieName + "成功")
            }else {
                for (let i = 0;i <= 1;i++){
                    for (let j = 0;j < this.ban_nums[banRound - 1];j++){
                        if(this.playerChoice[banRound - 1][i][j].genieName == genieName && this.playerChoice[banRound - 1][i][j].attribute == attribute){
                            await this.deleteChoice(i, this.playerChoice[banRound - 1][i][j])
                            this.playerChoice[banRound - 1][i][j].genieName = this.playerChoice[banRound - 1][i][j].attribute = ''
                            ElMessage.success("删除公ban " + genieName + "成功")
                        }
                    }
                }
            }
        },
        async genieBan(){
            if(this.position.order > 4) {
                ElMessage.warning("请选择正确的位置")
                return
            }
            if(this.choose.genieName == '') {
                ElMessage.warning("请选择一只宠物")
                return;
            }
            let index = this.position.color == 'blue' ? 0 : 1
            this.playerChoice[this.nowRound - 1][index][this.position.order].attribute = this.choose.attribute
            this.playerChoice[this.nowRound - 1][index][this.position.order].genieName = this.choose.genieName
            await this.addChoice(index)
            ElMessage.success("成功禁用 " + this.choose.genieName)
            this.choose = {attribute: "", genieName: "", grade: 0, viceAttribute: "", extra: ""}
            this.position.order++
            if(this.position.order >= this.ban_nums[this.nowRound - 1])
                if(this.position.color == 'blue') {
                    this.position.color = 'red'
                    this.position.order = 0
                }else
                    this.position.order = -1
        },
        async genieChoose(){
            if(this.position.order <= 4) {
                ElMessage.warning("请选择正确的位置")
                return
            }
            if(this.choose.genieName == '') {
                ElMessage.warning("请选择一只宠物")
                return;
            }
            let index = this.position.color == 'blue' ? 2 : 3
            this.playerChoice[this.nowRound - 1][index][this.position.order - 5].attribute = this.choose.attribute
            this.playerChoice[this.nowRound - 1][index][this.position.order - 5].genieName = this.choose.genieName
            this.playerChoice[this.nowRound - 1][index][this.position.order - 5].grade = this.choose.grade
            this.playerChoice[this.nowRound - 1][index][this.position.order - 5].viceAttribute = this.choose.viceAttribute
            this.playerChoice[this.nowRound - 1][index][this.position.order - 5].extra = this.choose.extra
            await this.addChoice(index)
            ElMessage.success("成功选取 " + this.choose.genieName)
            this.choose = {attribute: "", genieName: "", grade: 0, viceAttribute: "", extra: ""}
            this.position.order++
            if(this.position.order > 10)
                if(this.position.color == 'blue') {
                    this.position.color = 'red'
                    this.position.order = 5
                }else
                    this.position.order = -1
        },
        async genieCancel(attribute: string, genieName: string, color: string) {
            let index = color == 'blue' ? 2 : 3
            for (let j = 0; j < 6; j++) {
                if (this.playerChoice[this.nowRound - 1][index][j].genieName == genieName && this.playerChoice[this.nowRound - 1][index][j].attribute == attribute) {
                    await this.deleteChoice(index, this.playerChoice[this.nowRound - 1][index][j])
                    this.playerChoice[this.nowRound - 1][index][j].genieName = this.playerChoice[this.nowRound - 1][index][j].attribute = this.playerChoice[this.nowRound - 1][index][j].viceAttribute = this.playerChoice[this.nowRound - 1][index][j].extra = ''
                    this.playerChoice[this.nowRound - 1][index][j].grade = 0
                    ElMessage.success("取消选取 " + genieName + "成功")
                }
            }
        },
        addBan(){
            const user = useUserInfoStore()
            if(this.id == -1)
                return
            request({
                url: '/game/addBan',
                method: 'POST',
                params:{
                    id: this.id,
                },
                data:{
                    attribute: this.choose.attribute,
                    genieName: this.choose.genieName
                }
            }).then((res)=>{
                console.log('add success')
            })
        },
        deleteBan(attribute: string, genieName: string){
            if(this.id == -1)
                return
            request({
                url: '/game/deleteBan',
                method: 'DELETE',
                params:{
                    id: this.id
                },
                data:{
                    attribute: attribute,
                    genieName: genieName
                }
            }).then((res)=>{
                console.log('delete success')
            })
        },
        addChoice(position: number){
            const user = useUserInfoStore()
            if(this.id == -1)
                return
            request({
                url: '/game/addChoice',
                method: 'POST',
                params: {
                    id: this.id,
                    round: this.nowRound,
                    position: position
                },
                data:{
                    attribute: this.choose.attribute,
                    viceAttribute: this.choose.viceAttribute,
                    genieName: this.choose.genieName,
                    grade: this.choose.grade,
                    extra: this.choose.extra
                }
            }).then((res)=>{
                console.log('add choice success')
            })
        },
        deleteChoice(position: number, manaGenie: manaGenie){
            const user = useUserInfoStore()
            if(this.id == -1)
                return
            request({
                url: '/game/deleteChoice',
                method: 'DELETE',
                params: {
                    id: this.id,
                    round: this.nowRound,
                    position: position
                },
                data:{
                    attribute: manaGenie.attribute,
                    viceAttribute: manaGenie.viceAttribute,
                    genieName: manaGenie.genieName,
                    grade: manaGenie.grade,
                    extra: manaGenie.extra
                }
            }).then((res)=>{
                console.log('delete choice success')
            })
        }
    },
    persist: true,
})
