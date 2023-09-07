import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectComment } from '../models/comment';
import { COMMENT_PUBLIC_API_URL, COMMENT_PRIVATE_API_URL} from '../utils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import keycloak from 'src/keycloak';

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
     * A methods that takes in a comment object and attempts to make a post with it via the API URL.
     * Like with other post methods, we want to post the comment with all its data, excluding the id 
     * (Because that is auto generated on the backend)
     * As such we create a new comment with the comment coming in, but the comment we create uses the
     * keyword Partial to make it so the ID is omittable.
     *
     * @param comment, The comment as a whole that comes in to the post method. 
     */
    postComment(projectId:number, comment:ProjectComment){
      const postComment:Partial<ProjectComment> = {
        text: comment.text,
        date: comment.date,
        projectId: comment.projectId,
        userId: comment.userId
      }
      
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${keycloak.token}` 
        }),
      };
      this.http
      .post<ProjectComment>(COMMENT_PRIVATE_API_URL + "/project/" + projectId, postComment, httpOptions)
      .subscribe({
        error: (error) => {console.log(error)}
      });
    }
}
