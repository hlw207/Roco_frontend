

interface fiction{
    id: bigint,
    title: string,
    coverUrl: string,
    updateTime: string,
    wordCount: string,
    category: string
}

interface chapter{
    chapterId: bigint,
    chapterTitle: string,
    chapterStatus: string
}

interface writerHelper{
    id: bigint,
    description: string
}

interface role{
    name: string,
    description: string,
    updateTime: string
}

interface writerHelperDetail{
    id: bigint,
    novelId: bigint,
    backgroundDescription: string,
    outlineDescription: string,
    characterList: role[]
}

interface outline{
    outlineId: 0,
    title: string
}

export {type fiction, type chapter, type writerHelper, type role, type writerHelperDetail, type outline}