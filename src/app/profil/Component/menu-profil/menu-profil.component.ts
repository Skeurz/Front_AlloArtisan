import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/modeles/user';
import { AuthentificationServiceService } from 'src/app/core/services/authentification-service.service';

@Component({
  selector: 'app-menu-profil',
  templateUrl: './menu-profil.component.html',
  styleUrls: ['./menu-profil.component.css']
})
export class MenuProfilComponent implements OnInit{
  profil!:User;
  profilForm !: FormGroup;

  constructor( private service:AuthentificationServiceService,private formBuilder: FormBuilder){

  }

  ngOnInit(): void {
    this.profilForm= this.formBuilder.group({
      userName: [null, Validators.required],
      roleName:[null, Validators.required],
      
    });
  }
  
  getData() {
    return sessionStorage.getItem('token');
  }
    onAddRole(){
    //  this.service.addRoleToUser(this.profilForm.value).subscribe();


    }
    getUserById(){
     //  this.service.getUserById(){
    
        }

  }

