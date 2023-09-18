import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { PROJECT_PRIVATE_API_URL, PROJECT_PUBLIC_API_URL } from '../utils';
import { Observable } from 'rxjs';
import keycloak from 'src/keycloak';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) {
  }
  
  /**
   * getProjects()
   * A function that provides an observable which can then be used outside this service as a subscription to make 
   * a GET request for every project on the backend side.(See, for example, ngOnInit in profile page)
   *  
   * Important Note: Make sure that the backend side uses @CrossOrigin annotation, else a CORS error will be thrown
   * @returns An observable pertaining to the project URL, 
   */

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(PROJECT_PUBLIC_API_URL)
  }

  /**
   * getProjectById()
   * A function that provides an observable which can then be used outside this service as a subscription to make 
   * a GET request for a single project by ID.
   */

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(PROJECT_PUBLIC_API_URL + '/' + id)
  }

  /**
   * getProjectsBySearch()
   * A function that conducts a search by making a public API request to the backend with the project title inserted via the URL.
   * On the backend side, this is caught in a controller that subsequently returns the LIKE sql query to return full matches and partial matches.
   * @param searchTerm 
   * @returns 
   */
  getProjectsBySearch(searchTerm: string): Observable<Project[]>{
    return this.http.get<Project[]>(PROJECT_PUBLIC_API_URL + '/search?title=' + searchTerm)
  }

  /**
   * postProject()
   * A method that posts a project to the API.
   * Like with postComment(), this method also uses the keyword Partial to make insertion possible while omitting the ID.
   * (Because IDs are auto generatad anyways on the backend).
   * 
   * @param project, The project object that we want to post. 
   */
  postProject(project:Project){
    const postProject:Partial<Project> = 
    {
      title:project.title, 
      descriptions:project.descriptions, 
      gitlink: project.gitlink,
      category: project.category,
      status: project.status  
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${keycloak.token}` 
      }),
    };
    this.http
    .post<Partial<Project>>(PROJECT_PRIVATE_API_URL, postProject, httpOptions)
    .subscribe({
      error: (error) => {console.log(error)}
    });
  }
  
  /**
   * customPostProject()
   * A method that works just like postProject() but returns an observable so that
   * some kind of action can be performed only after the post has been made.
   * (and a response returned)
   * @param project, The project object to post.
   * @returns An observable. 
   */
   customPostProject(project:Project){
    const postProject:Partial<Project> = 
    {
      title:project.title, 
      descriptions:project.descriptions, 
      gitlink: project.gitlink,
      category: project.category,
      status: project.status  
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${keycloak.token}` 
      }),
    };
    
    return this.http.post<Partial<Project>>(PROJECT_PRIVATE_API_URL, postProject, httpOptions)
  }

  /**
   * deleteProject()
   * Makes a delete request to the backend to delete a project.
   */

  deleteProject(id: number){
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${keycloak.token}` 
      }),
    };
    this.http
    .delete<Project>(PROJECT_PRIVATE_API_URL+"/" + id, httpOptions)
    .subscribe({
      error: (error) => {console.log(error)}
    });
  }

   /**
   * updateProject()
   * A method that does an update HTTP request.
   * @param id 
   * @param user 
   */
   updateProject(id: number, project: Partial<Project>){
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${keycloak.token}` 
      }),
    };
    this.http
    .patch<Project>(PROJECT_PRIVATE_API_URL + '/' + id, project, httpOptions)
    .subscribe({
      error: (error) => {console.log(error)}
    });
  }

  customUpdateProject(id: number, project: Partial<Project>){
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${keycloak.token}` 
      }),
    };
    return this.http.patch<Project>(PROJECT_PRIVATE_API_URL + '/' + id, project, httpOptions)
  }

}
