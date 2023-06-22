import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/modeles/user';
import { AuthentificationServiceService } from 'src/app/core/services/authentification-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertifyjs from 'alertifyjs';
import { AppRole } from 'src/app/core/modeles/role';
import { AdminGuard } from 'src/app/admin.guard';


@Component({
  selector: 'app-menu-profil',
  templateUrl: './menu-profil.component.html',
  styleUrls: ['./menu-profil.component.css']
})
export class MenuProfilComponent implements OnInit{
  profil:any;
  isEditing: boolean = false;
  loggedinUser : any;
  userName: string;
  userRoles: string[] = [];
  id: number;
  user!:User;
  users: any[] = [] 
  yeetus: any;
  



  constructor(private router: Router,private listArtisanService :ListArtisanService,private service:AuthentificationServiceService,
    private jwtHelper: JwtHelperService ,private formBuilder: FormBuilder, private route: ActivatedRoute, private adminGuard : AdminGuard){

  }

  ngOnInit(): void {

   this.loggedinUser = localStorage.getItem('access_token')!;
   const decodedToken: any = jwt_decode(this.loggedinUser); 
   const subject = decodedToken.payload;
   const id = subject.id    
   this.listArtisanService.getArtisanById(id).subscribe(
      (user: User) => {
        this.profil = user;
      },
      (error) => {
        console.log(error); 
      }
      
    );
    this.listArtisanService.getUserRoles(id)
      .subscribe(
        roles => this.userRoles = roles,
        error => console.log('Error:', error)
      );
    }


    

    updateUser(user: User): Observable<User> {
      return this.listArtisanService.updateUser(user);
    }
    
    onUpdateUser(user: User) {
      this.updateUser(user).subscribe(updatedUser => {
        console.log('User updated:', updatedUser);
        alertifyjs.set('notifier','position', 'bottom-center');
        alertifyjs.success('Utilisateur modifié avec succès');
        window.location.reload();
        
    
      }, error => {
        console.error('Error updating user:', error);
      });
    }


    deleteUser(id: number) {
      
      alertifyjs.confirm("Voulez vous vraiment supprimer votre compte ?", () => {
        // confirmation
        this.listArtisanService.deleteUser(id).subscribe(
          () => {
            // suppression réussi
            console.log('Utilisateur supprimé');
            this.users = this.users.filter(user => user.id !== id);
            localStorage.removeItem('access_token');
            this.router.navigate([""]);
            alertifyjs.set('notifier', 'position', 'bottom-center');
            alertifyjs.success('Utilisateur supprimé');
          },
          (error) => {
            // 
            console.error('Erreur', error);
            // 
            alertifyjs.error('Erreur lors de la suppression');
          }
        );
      }, () => {
        // annulation de la suppression
        alertifyjs.error('Suppression annulée');
      }).set({title:"Suppression de compte"}).set('labels', {ok:'Oui', cancel:'Annuler'}); ;
    }
    


     //Ouverture fermeture bouton editer
        toggleEdit() {
          this.isEditing = true;  
        } 


        togglerEdit() {
          this.isEditing = false;   
        }     


        avatar() {
          const oldValue = this.profil.profileImage;
          alertifyjs.prompt('Veuillez rentrer le lien image (laisser vide pour retirer votre avatar):', oldValue,
          (_evt: any, value: String) => {
           
          alertifyjs.success('Avatar ajouté');
          this.profil.profileImage = value;
          console.log( this.profil.profileImage);
             },
             
          () => {alertifyjs.error('Annulation');this.profil.profileImage = oldValue;})
          .set({title:"Avatar :"}).set('labels', {ok:'Valider', cancel:'Annuler'}); ;
                  }

                  navigateTo(): void {
                    this.adminGuard.setAccessedByButton(true);
                    this.router.navigateByUrl('/admin/users'); 
                  }

                  
      


        





  }

