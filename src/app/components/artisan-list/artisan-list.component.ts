import { Component,OnInit } from '@angular/core';
import { ListArtisanService } from '../../core/services/list-artisan.service';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/modeles/user';
import * as alertifyjs from 'alertifyjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';



@Component({
  selector: 'app-artisan-list',
  templateUrl: './artisan-list.component.html',
  styleUrls: ['./artisan-list.component.css']
})
export class ArtisanListComponent implements OnInit {
 selectedadresse: string;
 artisan$!: Observable<User[]>;
 users: any;

 

 constructor(private listArtisanService :ListArtisanService, private router: Router){ }

  ngOnInit() : void {}

  tous() {this.resetSearch();this.artisan$=this.listArtisanService.getUsersByRoleId(8)}

  clearSearch() {this.artisan$ = of([]);this.resetSearch()}

 searchUsers(selectedadresse: string) {
  this.artisan$ = of([]);
  this.users = [];

  this.listArtisanService.getUsersByRoleId(8)
    .pipe(
      catchError(error => {
        alertifyjs.error('Une erreur s\'est produite lors de la recherche des utilisateurs');
        return of([]);
      })
    )
    .subscribe((artisanUsers: User[]) => {
      this.users = artisanUsers.filter((user: User) => user.adresse === selectedadresse);
    });
}
  
  resetSearch() {
    this.selectedadresse = '';
    this.searchUsers(this.selectedadresse);
  }
  
  redirectToPage(userId: string): void {
    this.router.navigate(['profil/chat'], { queryParams: { userId : userId } });
  }

}
