import { Component,OnInit } from '@angular/core';
import { ListArtisanService } from '../../core/services/list-artisan.service';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/modeles/user';



@Component({
  selector: 'app-artisan-list',
  templateUrl: './artisan-list.component.html',
  styleUrls: ['./artisan-list.component.css']
})
export class ArtisanListComponent implements OnInit {
 selectedadresse: string;
 artisan$!: Observable<User[]>;

 users: any;
 

 



 constructor(private listArtisanService :ListArtisanService){ }

  ngOnInit() : void {}

  tous() {this.artisan$=this.listArtisanService.getUsersByRoleId(8);this.searchUsers(this.selectedadresse = '')}

  clearSearch() {window.location.reload();}

    
  


  searchUsers(selectedadresse: string) { 
    this.users = [];
    if (!this.selectedadresse) {
      return console.log("No"); 
    }
    this.listArtisanService.getUserByAdresse(this.selectedadresse)
    .subscribe(users => {
      this.users = users;
      console.log(this.users)
    });
  }

}
