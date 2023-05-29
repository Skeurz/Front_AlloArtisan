import { Component,OnInit } from '@angular/core';
import { ListArtisanService } from '../../core/services/list-artisan.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/modeles/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
//import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


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
 


}



