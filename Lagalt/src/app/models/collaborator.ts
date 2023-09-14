export type Collaborator = {
    id:number,
    status: string,
    requestDate: Date,
    approvalDate: Date|any,
    userId:number,
    projectId:number,
    motivation: string
}