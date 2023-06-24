import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';
import { User } from 'src/app/core/modeles/user';
import { Observable, of, throwError } from 'rxjs';
import { ChatService } from 'src/app/core/services/chat.service';
import { Message } from 'src/app/core/modeles/message';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import * as alertifyjs from 'alertifyjs';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  FormEnvoi :FormGroup;
  showMessagesEnvoyes = false;
  showMessagesRecus = false;
  msgrecu: any;
  msgenvoye: any;
  loggedinUser : any;
  profil: any;
  massages:any;
  messages: any;
  moussages: any;
  missages: any;
  messagess: Message[] = [];
  mergedMessages: Message[] = [];
  messageContent: string;
  senderId: any;
  koalak: any;
  message: Observable<Message>
  receivedMessageContent: string | undefined;
  contactedUsers: User[] = [];
  nunu: Observable<User[]>;
  selectedUser: User;
  userRoles: string[] = [];
  receivedMessages: Message[] = [];
  reception : Observable<Message[]>
  sentUsers: User[] = [];
  senderName: string;
  userIdInput:number


  constructor(private liste: ListArtisanService, private chatService : ChatService, private formBuilder: FormBuilder,
    private route: ActivatedRoute){}

  envoyer(): void {
    
    this.showMessagesEnvoyes = true;
    this.showMessagesRecus = false;
    this.msgenvoye = "Historique des messages envoyés :"
    this.chatService.getMessagesByUser(this.senderId).subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.messages.sort((a: Message, b: Message) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateA - dateB;
        });
      },
      (error) => {}
    );
    
    
  }
  
  recevoir(): void {
    this.showMessagesRecus = true;
    this.showMessagesEnvoyes = false;
    this.msgrecu = "Historique des messages reçus :"
    this.chatService.getMessagesByReceiver(this.senderId).subscribe(
      (messages: Message[]) => {
        this.massages = messages;
        this.massages.sort((a: Message, b: Message) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateA - dateB;
        });
        // Do additional processing or manipulation with the retrieved messages
      },
      (error) => {
        // Handle error case
      }
    );
    
  }
 

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const userId = params['userId'];
      // Assign the user ID to the input field or perform any desired action
      this.userIdInput = userId;
    });
    this.FormEnvoi=this.formBuilder.group({
        destinataire: [null , Validators.required],
        messageContent: [null, Validators.required],
      }) 

   this.nunu=this.liste.getAllArtisan();
    this.loggedinUser = localStorage.getItem('access_token')!;
    const decodedToken: any = jwt_decode(this.loggedinUser); 
    const subject = decodedToken.payload;
    const id = subject.id  ;
    this.senderName = subject.sub;
    this.senderId= subject.id;  
    this.liste.getArtisanById(id).subscribe(
       (user: User) => {
         this.profil = user;
       },
       (error) => {
         console.log(error); 
       }
     ); 
     this.envoyer()
  }


 
  

  sendMessage(): Observable<Message> { 
    const senderId = this.senderId;
    const destinataire = this.FormEnvoi.get('destinataire')?.value;
    const content = this.FormEnvoi.get('messageContent')?.value;
    // Envoi une erreur si l'utilisateur essaye d'envoyer un message à lui même
    if (this.senderName === destinataire) {
      return throwError(alertifyjs.error("Impossible d'envoyer un message a vous même"));
    }
    // Envoi la requête a l'API
    const sendMessageObservable = this.chatService.sendMessage(senderId, destinataire, content);
  
    // extrait les données de la réponse
    sendMessageObservable.subscribe(
      (message: Message) => {
        this.messages.push(message);
        this.FormEnvoi.get('messageContent')?.setValue(''); // Nettoie le textarea
      },
      (error) => {
        console.error(error);
        alertifyjs.error("Utilisateur introuvable / Champs vides");
      }
    );
    return sendMessageObservable; 
  }
  
  
  
  
  
  
  
  

  


  choix(user: User) {
    this.selectedUser = user;
  console.log(this.selectedUser.id);

  this.chatService.getMessagesByUser(this.senderId).subscribe(
    (messages: Message[]) => {
      this.missages = messages.filter((message: Message) => message.receiver.id === this.selectedUser.id)
      .sort((a: Message, b: Message) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA; // Sort by ascending order (oldest to newest)
      });
  },
    (error) => {
      // Handle error case
    }
  );
  }
  
  
  

    
}
