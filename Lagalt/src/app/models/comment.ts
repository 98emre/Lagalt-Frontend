
// NOTE: Comment is some kind of interface so just calling this class "Comment" causes a name conflict:
export type ProjectComment = {
    id: number,
    text: string,
    date: Date,
    projectId: number,
    userId: number

}