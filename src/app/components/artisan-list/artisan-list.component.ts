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

  tous() {this.resetSearch();this.artisan$=this.listArtisanService.getUsersByRoleId(8)}

  clearSearch() {this.artisan$ = of([]);this.resetSearch()}

  searchUsers(selectedadresse: string) {
    this.artisan$ = of([]);
    this.users = [];
    if (!selectedadresse) {
      return console.log("Aucune adresse n'est selectionné");
    }
    this.listArtisanService.getUsersByRoleId(8)
      .subscribe((artisanUsers: User[]) => {
        this.users = artisanUsers.filter((user: User) => user.adresse === selectedadresse);
        console.log(this.users);
      });
  }
  
  resetSearch() {
    this.selectedadresse = '';
    this.searchUsers(this.selectedadresse);
  }
  
  

}
