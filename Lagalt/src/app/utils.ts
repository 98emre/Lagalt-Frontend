// Change the port to be anything you like:
const PORT = "8081"

// URLs leading to the generic controller endpoint for different models (Projects, Users, Comments, etc):
const path = "http://localhost:" + PORT
export const PROJECT_PRIVATE_API_URL:string = path + "/api/projects"
export const PROJECT_PUBLIC_API_URL:string = PROJECT_PRIVATE_API_URL + "/public"

export const COMMENT_PRIVATE_API_URL:string = path + "/api/comments"
export const COMMENT_PUBLIC_API_URL:string = COMMENT_PRIVATE_API_URL + "/public" 

export const USER_PUBLIC_API_URL:string = path + "/api/users"
export const USER_PRIVATE_API_URL:string = USER_PUBLIC_API_URL + "/public"