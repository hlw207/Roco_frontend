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

export {type genieChoose, type genieSimple, type genie}