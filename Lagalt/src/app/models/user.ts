import { Message } from "./message"

export type User = {
    id: number, 
    email: String, 
    fullname: String, 
    username: String, 
    description: String
    skills: String[]
    projectIds: number[],
    sentMessages: Message[],
    receivedMessages: Message[]
}