import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';
import { User } from 'src/app/core/modeles/user';
import { Observable, of } from 'rxjs';
import { ChatService } from 'src/app/core/services/chat.service';
import { Message } from 'src/app/core/modeles/message';
import { map } from 'rxjs/operators';
//import { formatDistanceToNow } from 'date-fns';
//import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  loggedinUser : any;
  profil: any;
  messages: Message[] = [];
  messageContent: string;
  senderId: any;
  message: Observable<Message>
  receivedMessageContent: string | undefined;
  contactedUsers: User[] = [];
  nunu: Observable<User[]>;
  selectedUser: User;
  userRoles: string[] = [];
  receivedMessages: Message[] = [];
  

  constructor(private liste: ListArtisanService, private chatService : ChatService, /*private datePipe: DatePipe*/){}


 

  ngOnInit(): void {
   this.nunu=this.liste.getAllArtisan();
    this.loggedinUser = localStorage.getItem('access_token')!;
    const decodedToken: any = jwt_decode(this.loggedinUser); 
    const subject = decodedToken.payload;
    const id = subject.id  ;
    this.senderId= subject.id;  
    this.liste.getArtisanById(id).subscribe(
       (user: User) => {
         this.profil = user;
       },
       (error) => {
         console.log(error); 
       }
     ); 
     
  }
  

  sendMessage(): void {
    const senderId = this.senderId; 
    const receiverId = this.selectedUser.id; 
    const content = this.messageContent; 
    this.chatService.sendMessage(senderId, receiverId, content)
      .subscribe((message: Message) => {
        this.messages.unshift(message); // Empile les messages du plus recent au plus ancien
        this.messageContent = ''; // Vide le textarea

        const conversation = this.getConversationFromLocalStorage();
      conversation.unshift(message); // Stock le message dans conversation
      this.saveConversationToLocalStorage(conversation);
      });
 /* const existingUser = this.contactedUsers.find(user => user.id === receiverId);

  // If the receiver is not in the contactedUsers array, add them
  if (!existingUser) {
    // Code to retrieve the user information based on the receiverId
    const user: User =  Retrieve the user information based on receiverId ;

    // Add the user to the contactedUsers array
    this.contactedUsers.push(user);
  }*/
  }


  choix(user: User) {
    this.selectedUser = user;
    
    // Extrait la conversisation du local storage.
    const conversation: Message[] = JSON.parse(localStorage.getItem('conversation') || '[]');
    
    if (conversation) {
      this.messages = conversation.filter(
        (message: Message) => 
          (message.sender.id === this.senderId && message.receiver.id === user.id) ||
          (message.sender.id === user.id && message.receiver.id === this.senderId)
      );
    } else {
      this.messages = [];
    }

  }


  mesMessages() {
  const userId = this.senderId;
  this.chatService.getMessagesByUser(userId).subscribe(
    (messages: Message[]) => {
      this.receivedMessages = messages;
    },
    (error) => {
      console.log(error);
    }
  );
  }

  private saveConversationToLocalStorage(conversation: Message[]): void {
    localStorage.setItem('conversation', JSON.stringify(conversation));
  }
  
  private getConversationFromLocalStorage(): Message[] {
    const conversation = localStorage.getItem('conversation');
    return conversation ? JSON.parse(conversation) : [];
  }

    
}
