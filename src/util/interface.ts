interface genieSimple{
    genieName: string,
    grade: number
}

interface genieChoose{
    attribute: string,
    genieName: string
}

interface genie{
    attribute: string,
    viceAttribute: string,
    genieName: string,
    grade: number
}

interface manaGenie{
    attribute: string,
    viceAttribute: string,
    genieName: string,
    grade: number,
    extra: string
}

interface game{
    id: number,
    description: string,
    round: number,
    banNums: number[]
}

interface userInfo{
    account: string,
    name: string,
    password: string
}

interface recommendInfo{
    id: number
    type: string,
    user: string,
    date: Date,
    manaGenieList?: manaGenie[]
    genieList?: genie[],
    comment: string,
    praise: number
}

export {type genieChoose, type genieSimple, type genie, type manaGenie, type game, type userInfo, type recommendInfo}