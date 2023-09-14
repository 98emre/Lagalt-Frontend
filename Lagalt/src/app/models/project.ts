export type Project = {
    id:number,
    title: string,
    descriptions: string,
    gitlink: string,
    category: string,
    status: string,
    userId: number,
    commentIds: number[],
    collaboratorIds: number[]
}
  