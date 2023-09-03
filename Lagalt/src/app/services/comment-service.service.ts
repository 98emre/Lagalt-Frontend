import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectComment } from '../models/comment';
import { COMMENT_API_URL } from '../utils';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {}

  /**
   * getComments()
   * A function makes an API request to the backend to obtain every comment.
   * 
   * @returns A list of comments that were found in the database.
   */
    getComments(): Observable<ProjectComment[]>{
      return this.http.get<ProjectComment[]>(COMMENT_API_URL)
    }
}
