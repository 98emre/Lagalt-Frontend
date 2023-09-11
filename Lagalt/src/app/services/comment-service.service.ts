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

  constructor(private http: HttpClient) {
    this.tokenRefresh();
  }

  /**
   * getComments()
   * A function makes an API request to the backend to obtain every comment (public data).
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
    postComment(projectId:number, comment:ProjectComment):Observable<ProjectComment>{
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

      return this.http.post<ProjectComment>(COMMENT_PRIVATE_API_URL + "/project/" + projectId, postComment, httpOptions)
    }

    /**
     * deleteComment()
     * A method that makes a delete HTTP request to the backend.
     * Unlike other methods that do the same functionality in other services, this method
     * is observable. The reason for this is so that event can be emitted outside this method
     * for when the comment has been deleted (To trigger a re-rendering).
     * 
     * @param comment, the comment to be deleted.
     * @returns A deleteRequest to subscribe to. 
     */
    deleteComment(comment:ProjectComment): Observable<ProjectComment>{
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${keycloak.token}` 
        }),
      };
      return this.http.delete<ProjectComment>(COMMENT_PRIVATE_API_URL + "/" + comment.id, httpOptions)
    }

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
