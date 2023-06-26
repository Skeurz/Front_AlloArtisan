import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/modeles/user';
import { AuthentificationServiceService } from 'src/app/core/services/authentification-service.service';
import { TokenStorageServiceService } from 'src/app/core/services/token-storage-service.service';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'})
  //loginForm !:FormGroup;
  FormConnexion !:FormGroup;
  urlApi="http://localhost:8090/authenticate";
  errorMessage: string | null;
  authentifie: boolean;
  emailConfirmed: boolean = true;
  userName: string;
  poop : any;

  constructor( private router: Router ,private formBuilder: FormBuilder ,
     private authService: AuthentificationServiceService, 
     private tokenStorage: TokenStorageServiceService,
    // private alertifyService: AlertifyService
    ){
      this.errorMessage = null;
      this.authentifie = false;
    }

  ngOnInit() : void {
    
  this.FormConnexion=this.formBuilder.group({
    userName: [null , Validators.required],
    password: [null, Validators.required],
  }) 
 } 

 onAuthentifier() {
  this.errorMessage = null;
  this.authentifie = false;

  this.authService.isEmailConfirmed(this.FormConnexion.value.userName).subscribe(
    response => {
      // Response is the string value from the API
      if (response === true) {
        // Email is confirmed, proceed with login
        this.authService.login(this.FormConnexion.value).subscribe(
          data => {
            console.log(data);
            this.authentifie = true;
            localStorage.setItem('access_token', data.token);
            this.router.navigate(['/']).then(() => { window.location.reload(); });
            alertifyjs.set('notifier', 'position', 'bottom-center');
            alertifyjs.success('Connexion réussie');
          },
          error => {
            console.error(error);
            // Handle login error
            this.errorMessage = "Nom d'utilisateur ou mot de passe incorrecte.";
          }
        );
      } else {
        // Email is not confirmed or user not found
        if (response === false) {
          this.errorMessage = "Votre email n'a pas été confirmé.";
        } else if (response === false) {
          this.errorMessage = "Utilisateur non trouvé.";
        } else {
          this.errorMessage = "Erreur lors de la vérification de l'email.";
        }
      }
    },
    error => {
      console.error(error);
      this.errorMessage = "Mot de passe ou nom d'utilisateur incorrecte / utilisateur non activé";
    }
  );
}

}


