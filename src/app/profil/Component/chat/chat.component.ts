import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';
import { User } from 'src/app/core/modeles/user';
import { Observable, of } from 'rxjs';
import { ChatService } from 'src/app/core/services/chat.service';
import { Message } from 'src/app/core/modeles/message';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  loggedinUser : any;
  profil: any;
  messages: any;
  moussages: any;
  messagess: Message[] = [];
  mergedMessages: Message[] = [];
  messageContent: string;
  senderId: any;
  message: Observable<Message>
  receivedMessageContent: string | undefined;
  contactedUsers: User[] = [];
  nunu: Observable<User[]>;
  selectedUser: User;
  userRoles: string[] = [];
  receivedMessages: Message[] = [];
  reception : Observable<Message[]>
  

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
  
    this.chatService.sendMessage(senderId, receiverId, content).subscribe((message: Message) => {
      const conversationKey = this.getConversationKey(senderId, receiverId);
      let conversation = this.getConversationFromLocalStorage(conversationKey);
      conversation.push(message);

     
  
      conversation.sort((a: Message, b: Message) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA; // Tri descendant
      });
  
      const maxMessages = 150;
      if (conversation.length > maxMessages) {
        conversation = conversation.slice(0, maxMessages);
      }
  
      this.saveConversationToLocalStorage(conversationKey, conversation);
      this.messages = conversation;
  
      this.messageContent = '';
    });
  }
  
  
  
  private getConversationKey(senderId: number, receiverId: number): string {
    return `conversation_${senderId}_${receiverId}`;
  }
  
  private getConversationFromLocalStorage(conversationKey: string): Message[] {
    const conversationStr = localStorage.getItem(conversationKey);
    return conversationStr ? JSON.parse(conversationStr) : [];
  }
  
  private saveConversationToLocalStorage(conversationKey: string, conversation: Message[]): void {
    localStorage.setItem(conversationKey, JSON.stringify(conversation));
  }
  

  


  choix(user: User) {
    this.selectedUser = user;
  
    // Construire une clé de conversation basée sur senderId et receiverId
    const conversationKey = this.getConversationKey(this.senderId, user.id);
  
    // Récupérer la conversation du stockage local
    const conversation: Message[] = this.getConversationFromLocalStorage(conversationKey) || [];
  
    // Filtrer les messages pour l'utilisateur sélectionné
    this.messages = conversation.filter((message: Message) =>
      (message.sender.id === this.senderId && message.receiver.id === user.id) ||
      (message.sender.id === user.id && message.receiver.id === this.senderId)
    );
  
    this.recevoir();
  }
  


  recevoir() {
    this.chatService.getMessagesByUser(this.senderId).subscribe((moussages) => { 
      this.moussages = moussages
        .filter((message) => message.senderId === this.selectedUser.id)
        .sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA; // Tri par odre descendant
        });
    });
  }
  

    
}
