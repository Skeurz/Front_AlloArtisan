import { Component, OnInit } from '@angular/core';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/modeles/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  user: User | undefined;
  userRoles: string[] = [];

  

  constructor(private liste: ListArtisanService, private route: ActivatedRoute, private http: HttpClient,private router: Router,) {}





  ngOnInit(): void {
    const utilisateur = this.route.snapshot.paramMap.get('utilisateur');
    if (utilisateur !== null) {
      this.liste.getUserByUserName(utilisateur).subscribe(
        (user: User) => {
          this.user = user;
        },
        (error: any) => {
          console.error(error);
        }
      ); 
  }
  if (utilisateur !== null) {
  this.liste.getRoleByUsername(utilisateur)
  .subscribe(
    roles => this.userRoles = roles,
    error => console.log('Error:', error)
  );}
  }

  redirectToPage(userId: string): void {
    this.router.navigate(['profil/chat'], { queryParams: { userId : userId } });
  }
}
