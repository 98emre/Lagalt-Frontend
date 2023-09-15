# Lagalt (Frontend)
## Description
Lagalt is a project management tool. A user can register themselves / log in to the service (Via keycloak). Thereafter the user can edit their profile, create projects, find other people's profiles and projects (filter and search) and request to join said projects. Every user is the owner of their own projects and it is up to them to accept or deny any incoming collaboration requests sent by other users (similar in function to GitHub). Moreover, any user can also comment on any project that they so chose. Basically, Lagalt is as a project management tool similar to GitHub but with no possibility to run GitBash commands (obviously). This right here is the Frontend side of the project, to see the backend side of the same project, see the subsection below:

### Link To Backend
[Backend Link](https://github.com/98emre/Lagalt-Backend)

### Deployment To Vercel
Down below is a link to the deployment in Vercel:

https://lagat-frontend.vercel.app/

### Example Run (Trailer) 
Here is an example of how the application can look like, in running the application via the deployment to Vercel, while the backend is also running (and serving our API requests):

## Installation Guide
To run the project locally, follow these steps down below:
1. Install NPM and Git Bash if you haven't already.
2. Install Angular globally: ```npm install -g @angular/cli```
3. Install Angular Material Dependency:```ng add @angular/material```
4. Install Angular Keycloak Dependency:```npm install keycloak-js```
5. Clone down this folder: ```git clone <ssh link>```
6. Navigate to the Lagalt Folder (cd) and run: ```ng serve```  to start a development server 
7. If no error occurs, go to localhost:4200 as displayed in the terminal. 

## Component Tree
![frontend drawio (1)](https://github.com/AugustDanell/Lagalt-Frontend/assets/70810124/e4321abb-ce68-4fb9-91a5-469f38260564)


## Models
|Model | Data |
|------|---------|
|Project| id (num), title (str), descriptions (str), gitlink (str), category (Enum str), status (Enum str), userId (Num arr), commentIds (Num arr), collaboratorIds (Num arr)|
|ProjectComment| yo yo yo|
|Collaborator| yo yo yo|
|User| yo yo yo|
--------------------
## Authors
Emre Demirel ([emre98](https://github.com/98emre))

Vendela Österman ([Vosterman](https://github.com/Vendelaosterman))

August Danell Håkansson ([AugustDanell](https://github.com/AugustDanell))
