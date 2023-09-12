import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { PROJECT_PRIVATE_API_URL, PROJECT_PUBLIC_API_URL } from '../utils';
import { Observable } from 'rxjs';
import { ProjectComment } from '../models/comment';
import keycloak from 'src/keycloak';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) {
    this.tokenRefresh();
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
   * deleteProject()
   * Makes a delete request to the backend to delete a project.
   */

  deleteProject(project:Project){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': "yo yo yo",
      }),
    };
    this.http
    .delete<Project>(PROJECT_PRIVATE_API_URL+"/" + project.id)
    .subscribe({
      error: (error) => {console.log(error)}
    });
  }

   /**
   * tokenRefresh()
   * A method that updates the keycloak Token.
   */
  
  private tokenRefresh(): void {
    keycloak.onTokenExpired = () => {
      keycloak.updateToken(30).then(refreshed => {
        if (!refreshed) {
          console.error('Token not refreshed, maybe the session has expired?');  
      } 
      
      
      else {
         
      }
      }).catch(() => {
        console.error('Failed to refresh the token, or the session has expired');
      });
    };

  }



}
