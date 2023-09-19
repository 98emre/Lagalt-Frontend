import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import keycloak from 'src/keycloak';
import { UserService } from './user-service.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private readonly http:HttpClient, private readonly userService: UserService){}

  getAllReceivedMessageById(id: number): Observable<Message[]> {
    return this.http.get<Message[]>('http://localhost:8080/api/messages/' + id +'/received-messages')
  }

  getAllSentMessageById(id: number): Observable<Message[]> {
    return this.http.get<Message[]>('http://localhost:8080/api/messages/' + id +'/sent-messages')
  }

  getMessageById(id: number): Observable<Message[]> {
    return this.http.get<Message[]>('http://localhost:8080/api/messages/' + id)
  }

  updateMessage(id: number, message: Partial<Message>){
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${keycloak.token}` 
      }),
    };
    this.http
    .patch<Message>('http://localhost:8080/api/messages/' + id +"/update", message, httpOptions)
    .subscribe({
      error: (error) => {console.log(error)}
    });
  }


  postMessage(message:Message){

    const postMessage:Partial<Message> = 
    {
      title:message.title, 
      text:message.text, 
      date:message.date,
      messageStatus: message.messageStatus,
      receiverId: message.receiverId,
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${keycloak.token}` 
      }),
    };
   
    this.http.post<Partial<Message>>("http://localhost:8080/api/messages", postMessage, httpOptions).subscribe({
      next: (response) => {console.log(response) },
      error: (error) => { console.log(error)}
    });
  }

}
