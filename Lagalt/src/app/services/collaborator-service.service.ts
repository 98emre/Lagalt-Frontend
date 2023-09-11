import { Injectable } from '@angular/core';
import { COLL_PRIVATE_API_URL, COLL_PUBLIC_API_URL } from '../utils';
import { Observable } from 'rxjs';
import { Collaborator } from '../models/collaborator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import keycloak from 'src/keycloak';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService{

  constructor(private http:HttpClient) { }

  getCollaborators(): Observable<Collaborator[]>{
    return this.http.get<Collaborator[]>(COLL_PUBLIC_API_URL)
  }

  postCollaborator(collaborator:Collaborator){
    const postCollaborator:Partial<Collaborator> = {
      status: collaborator.status,
      requestDate: collaborator.requestDate,
      approvalDate: collaborator.approvalDate,
      userId: collaborator.userId,
      projectId: collaborator.projectId
    }
    
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${keycloak.token}` 
      }),
    };
    this.http
    .post<Collaborator>(COLL_PRIVATE_API_URL + "/"+ collaborator.projectId + "/collaborator", postCollaborator, httpOptions)
    .subscribe({
      error: (error) => {console.log(error)}
    });
  }

  deleteCollaborator(collaborator:Collaborator){
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${keycloak.token}` 
      }),
    };
    this.http
    .delete<Collaborator>(COLL_PRIVATE_API_URL + "/" + collaborator.id, httpOptions).subscribe({
      error:(error) => console.log(error)
    })
  }

  patchCollaborator(collaborator:Collaborator){
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${keycloak.token}` 
      }),
    };
    this.http
    .patch<Collaborator>(COLL_PRIVATE_API_URL + "/" + collaborator.id, collaborator, httpOptions).subscribe({
      error:(error) => console.log(error)
    })
  }

}
