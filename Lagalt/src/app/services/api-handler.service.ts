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
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(PROJECT_API_URL)
  }
  
}
