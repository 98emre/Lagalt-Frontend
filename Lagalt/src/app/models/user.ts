
export type User = {
    id: number, 
    email: String, 
    fullname: String, 
    username: String, 
    description: String,
    skills: String[],
    profileVisibility: String,
    projectIds: number[],
    collaboratorIds: number[],
    commentIds: number[],
    receivedMessageIds: number[],
    sentMessageIds: number[],
}