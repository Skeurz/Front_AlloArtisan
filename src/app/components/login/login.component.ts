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
  //  this.loginForm=this.formBuilder.group({
    userName: [null , Validators.required],
    password: [null, Validators.required],
 
  }) 
 } 

 onAuthentifier() { 
  this.errorMessage = null;
  this.authentifie = false; 
  this.authService.login(this.FormConnexion.value) 
  .subscribe(data => {
    console.log(data)
    console.log()
    this.authentifie = true;
    localStorage.setItem('access_token', data.token);
    this.router.navigate(['/']).then(() => {window.location.reload();});
    alertifyjs.set('notifier','position', 'bottom-center');
    alertifyjs.success('Connexion réussi'); 
  },
  error => {
    console.error(error);
    // Gérer l'erreur de la requête si mdp ou NdU est incorrecte
    this.errorMessage= "Nom d'utilisateur ou mot de passe incorrecte.";
  }
);
}
}

