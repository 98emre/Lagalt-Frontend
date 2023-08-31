import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { PROJECT_API_URL } from '../utils';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {
  constructor(private http: HttpClient) {}
  
  /**
   * getProjects()
   * A function that provides an observable which can then be used outside this service as a subscription to make 
   * a GET request for every project on the backend side. 
   * Important: Make sure that the backend side uses @CrossOrigin annotation, else a CORS error will be thrown
   * 
   * @returns An observable on the project URL, 
   */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(PROJECT_API_URL)
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
    .post<Project>(PROJECT_API_URL, project, httpOptions)
    .subscribe({
      next: (res) => {alert(res)},
      error: (error) => {console.log(error)}
    });
  }
  
}
