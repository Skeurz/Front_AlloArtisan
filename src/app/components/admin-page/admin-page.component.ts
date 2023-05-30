import { Component,Input,OnInit } from '@angular/core';
import { ListArtisanService } from '../../core/services/list-artisan.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/modeles/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import * as alertifyjs from 'alertifyjs';
import { AdminEditComponent } from '../admin-edit/admin-edit.component';



@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  artisan$!: Observable<User[]>;
  users: any[] = [] 
  url: string = "http://localhost:8090/";
  id: number;
  showComponent: boolean = false;
  selectedUser: User;


  constructor(private listArtisanService :ListArtisanService,private router: Router, private http: HttpClient, private location: Location){ }


 deleteUser(id: number) {
  this.listArtisanService.deleteUser(id)
    .subscribe(
      () => { console.log('User deleted successfully.');
      this.users = this.users.filter(user => user.id !== id);
      window.location.reload();
        // Handle successful deletion, e.g., show a success message
      },
      (error) => {  console.error('An error occurred while deleting the user:', error)
        // Handle error, e.g., show an error message
      }
    );
}

   ngOnInit() : void {
  // this.artisan$=this.listArtisanService.getAllArtisan();
   this.artisan$=this.listArtisanService.getAllArtisan();

 }

 Activation(user: User) {
  this.showComponent = !this.showComponent;
  this.selectedUser = user;
  console.log(user)
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

}



