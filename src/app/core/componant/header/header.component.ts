import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit,Input } from '@angular/core';
import { User } from 'src/app/core/modeles/user';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';
import { Observable } from 'rxjs';
import { AuthentificationServiceService } from 'src/app/core/services/authentification-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  artisan$!: Observable<any[]>;
  loggedinUser : any;
  @Input() artisan!:User;
  users: any[] | undefined
  url: string = "http://localhost:8080/";
  id:number
  username: any;
  profil:any;

  
 
  




  constructor(private router: Router,private listArtisanService :ListArtisanService,private service:AuthentificationServiceService,
                      private jwtHelper: JwtHelperService){}
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
        console.log(error); // erreur
      }
    );;

 /*   const token = localStorage.getItem('access_token'); 
    
if (token) {
  try {
    const decodedToken: any = jwt_decode(token); 
    const subject = decodedToken.payload;
    const username = subject.sub
    console.log(decodedToken);
    return username;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
  } 

} */

  }

  /*onViewEtudiant(){
    this.router.navigateByUrl(`artisans/${this.artisan.id}`);
  }*/
 /* getArtisanById(){
      this.service.getArtisanById(this.id);{
  
      }
    }*/
  loggedin() {
    //return localStorage.getItem('access_token');
   // this.router.navigateByUrl(`artisans/${this.artisan.id}`)
   // this.loggedinUser = localStorage.getItem('access_token')!;
   this.loggedinUser = localStorage.getItem('access_token')!;
  // const decodedToken: any = jwt_decode(this.loggedinUser); 
  // console.log(decodedToken)
    return this.loggedinUser
    
  }

  session() {
    this.loggedinUser = localStorage.getItem('access_token')!;
   const decodedToken: any = jwt_decode(this.loggedinUser); 
   const subject = decodedToken.payload;
    const username = subject.sub
   return username;
  }


  onLogout() {
    localStorage.removeItem('access_token');
    
  }
}


