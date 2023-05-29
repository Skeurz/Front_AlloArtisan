import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthentificationServiceService } from 'src/app/core/services/authentification-service.service';
import * as alertifyjs from 'alertifyjs';


@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {
  artisanForm !: FormGroup;
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
      email: [null, Validators.required],
      password: [null, Validators.required],
    });

  }
  onSubmitForm() {

    //this.liste.ajouterUser(this.artisanForm.value).subscribe();
    console.log(this.artisanForm.value);
    this.liste.ajouterUser(this.artisanForm.value).subscribe(data=>{
      alertifyjs.set('notifier','position', 'bottom-center');
      alertifyjs.success('Compte créé');}, error=>{alertifyjs.set('notifier','position', 'bottom-center');
      alertifyjs.success('Compte créé')});
    
  

    
    //this.liste.addRoleToUser

    this.router.navigateByUrl('/login');
  }

}