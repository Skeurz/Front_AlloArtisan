import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthentificationServiceService } from 'src/app/core/services/authentification-service.service';
import * as alertifyjs from 'alertifyjs';
import { User } from 'src/app/core/modeles/user';
import { distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {
  artisanForm !: FormGroup;
  user!: User;
  constructor(private formBuilder: FormBuilder,
     private router: Router,
     private liste: AuthentificationServiceService,
     ) 
     { }

  ngOnInit(): void {
    this.artisanForm = this.formBuilder.group({
      nom: [null, Validators.required],
      userName: [null, Validators.required], 
      prenom: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });

  }
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  onSubmitForm() {

    if (this.artisanForm.invalid) {
      alertifyjs.set('notifier', 'position', 'bottom-center');
        alertifyjs.error('Veuillez remplir tous les champs');
      return;
    }
    
  
    const email = this.artisanForm.value.email;
    if (!this.validateEmail(email)) {
      
      return;
    }
    console.log(this.artisanForm.value);
    this.liste.ajouterUser(this.artisanForm.value).subscribe(
      data => {
        this.user = data;
        this.router.navigateByUrl(`/role/${this.user.userName}`);
        alertifyjs.set('notifier', 'position', 'bottom-center');
        alertifyjs.success('Compte créé');
      },
      error => {
        alertifyjs.set('notifier', 'position', 'bottom-center');
        alertifyjs.error('Erreur lors de la création du compte');
      }
    );
  }

  
  
  
  
  
  /*onSubmitForm() {

    //this.liste.ajouterUser(this.artisanForm.value).subscribe();
    console.log(this.artisanForm.value);
    this.liste.ajouterUser(this.artisanForm.value).subscribe(data=>{
      this.user=data;
      this.router.navigateByUrl(`/role/${this.user.userName}`);
      alertifyjs.set('notifier','position', 'bottom-center');
      alertifyjs.success('Compte créé');}, error=>{alertifyjs.set('notifier','position', 'bottom-center');
      alertifyjs.success('Compte créé')});
    
  

    
    //this.liste.addRoleToUser
    this.router.navigateByUrl(`/role/${this.user.userName}`);
    //this.router.navigateByUrl('/role/:userName');
  }*/

}