import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { PROJECT_API_URL } from '../utils';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {
  constructor(private http: HttpClient) {}
  getProjects(): Project[] {
    let projectList:Project[] = []
    this.http.get<Project>(PROJECT_API_URL).subscribe(
      (response) => {projectList.push(response)},
      (error) => {
        console.error("Error:", error);
      }
    )
    return projectList;
  }  
}
