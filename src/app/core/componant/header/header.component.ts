import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit,Input } from '@angular/core';
import { User } from 'src/app/core/modeles/user';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';
import { Observable } from 'rxjs';
import { AuthentificationServiceService } from 'src/app/core/services/authentification-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  artisan$!: Observable<any[]>;
  loggedinUser : string;
  @Input() artisan!:User;
  users: any[] | undefined
  url: string = "http://localhost:8080/";
  id:number





  constructor(private router: Router,private listArtisanService :ListArtisanService,private service:AuthentificationServiceService){}
  ngOnInit(): void {this.artisan$=this.listArtisanService.getAllArtisan();

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
    this.loggedinUser = localStorage.getItem('access_token')!;


    return this.loggedinUser
  }
  onLogout() {
    localStorage.removeItem('access_token');
  }
}


