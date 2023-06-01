import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/modeles/user';
import { AuthentificationServiceService } from 'src/app/core/services/authentification-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';
import { Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';


@Component({
  selector: 'app-menu-profil',
  templateUrl: './menu-profil.component.html',
  styleUrls: ['./menu-profil.component.css']
})
export class MenuProfilComponent implements OnInit{
  profil!:any;
  profilForm !: FormGroup;
  isEditing: boolean = false;
  loggedinUser : any;


  constructor(private router: Router,private listArtisanService :ListArtisanService,private service:AuthentificationServiceService,
    private jwtHelper: JwtHelperService ,private formBuilder: FormBuilder){

  }

  ngOnInit(): void {
   /* this.profilForm= this.formBuilder.group({
      userName: [null, Validators.required],
      roleName:[null, Validators.required],})*/
      this.loggedinUser = localStorage.getItem('access_token')!;
   const decodedToken: any = jwt_decode(this.loggedinUser); 
   const subject = decodedToken.payload;
    const id = subject.id
    this.listArtisanService.getArtisanById(id).subscribe(
      (user: User) => {
        this.profil = user;
      },
      (error) => {
        console.log(error); // Handle the error appropriately
      }
    );;
   
    }

    updateUser(user: User): Observable<User> {
      return this.listArtisanService.updateUser(user);
    }
    
    onUpdateUser(user: User) {
      this.updateUser(user).subscribe(updatedUser => {
        // Handle the updated user response if needed
        console.log('User updated:', updatedUser);
        alertifyjs.set('notifier','position', 'bottom-center');
        alertifyjs.success('Utilisateur modifié avec succès');
        
    
      }, error => {
        // Handle error if the update fails
        console.error('Error updating user:', error);
      });
    }
  
 /* getData() {
    return sessionStorage.getItem('token');
  }*/
   
 /* getUserById(id: number) {
   this.profil=this.listArtisanService.getArtisanById(id);
  } */


    onAddRole(){
    //  this.service.addRoleToUser(this.profilForm.value).subscribe();


    }

     //Ouverture fermeture bouton editer
        toggleEdit() {
          this.isEditing = true;
          
        } 
        togglerEdit() {
          this.isEditing = false;
          
        }     

  }

