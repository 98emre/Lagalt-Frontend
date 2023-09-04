import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { PROJECT_PRIVATE_API_URL, PROJECT_PUBLIC_API_URL } from '../utils';
import { Observable } from 'rxjs';
import { ProjectComment } from '../models/comment';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  
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
   * postProject()
   * A function that posts a project to the API, this can be wholly encapsulated in this service (unlike GET)
   * because a post does not need asynchronous setters on our end, for example, if we want to set a list to contain
   * the projects we obtain via the GET request.
   * 
   * @param project, The project object that we want to post. 
   */
  postProject(project:Project){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': "yo yo yo",
      }),
    };
    this.http
    .post<Project>(PROJECT_PRIVATE_API_URL, project, httpOptions)
    .subscribe({
      error: (error) => {console.log(error)}
    });
  }
  
  /**
   * deleteProject()
   * 
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

}
