// Change the port to be anything you like:
const PORT = "8081"

const path = "http://localhost:" + PORT
export const PROJECT_API_URL:string = path + "/api/projects"
export const COMMENT_API_URL:string = path + "/api/comments"
export const USER_API_URL:string = path + "/api/users"