import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectComment } from '../models/comment';
import { COMMENT_PUBLIC_API_URL, COMMENT_PRIVATE_API_URL} from '../utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
      return this.http.get<ProjectComment[]>(COMMENT_PUBLIC_API_URL)
    }

    /**
     * postComment()
     * A function that takes in a comment object and attempts to make a post with it via the API URL.
     * 
     * @param comment 
     */
    postComment(comment:ProjectComment){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-api-key': "yo yo yo",
        }),
      };
      this.http
      .post<ProjectComment>(COMMENT_PRIVATE_API_URL, comment, httpOptions)
      .subscribe({
        error: (error) => {console.log(error)}
      });
    }
}
