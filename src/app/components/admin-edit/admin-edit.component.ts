import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';
import { User } from 'src/app/core/modeles/user';
import { Observable } from 'rxjs';
import { AdminPageComponent } from '../admin-page/admin-page.component';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent {
  user: User = new User();
  
  userId: number;
  artisan$!: Observable<User[]>;

  constructor(private listArtisanService: ListArtisanService) {}

  ngOnInit() : void {
    // this.artisan$=this.listArtisanService.getAllArtisan();
     this.artisan$=this.listArtisanService.getAllArtisan();
  
   }

/*onSubmit() {
  this.listArtisanService.updateUser(this.user).subscribe(
    () => {
      console.log('User updated successfully');
      // Handle success, e.g., display a success message or navigate back to AdminPage
    },
    (error) => {
      console.error('Error updating user:', error);
      // Handle error, e.g., display an error message
    }
  );*/
}