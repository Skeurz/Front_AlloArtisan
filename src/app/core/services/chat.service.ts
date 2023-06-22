import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../modeles/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
 apiUrl = 'http://localhost:8090/chats'; 

  constructor(private http: HttpClient) { }

  sendMessage(senderId: number, receiverId: number, content: string): Observable<Message> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = `senderId=${senderId}&receiverId=${receiverId}&content=${encodeURIComponent(content)}`;
    return this.http.post<Message>(`${this.apiUrl}/messages`, body, { headers });
  }

  getMessagesByUser(userId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages/${userId}`);
  }


  saveConversation(messages: Message[]): void {
    localStorage.setItem('conversation', JSON.stringify(messages));
  }

  getConversation(): Message[] {
    const conversation = localStorage.getItem('conversation');
    return conversation ? JSON.parse(conversation) : [];
  }
}
