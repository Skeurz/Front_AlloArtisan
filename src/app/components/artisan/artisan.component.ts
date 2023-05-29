import { Component } from '@angular/core';
import { OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/modeles/user';



@Component({
  selector: 'app-artisan',
  templateUrl: './artisan.component.html',
  styleUrls: ['./artisan.component.css']
})
export class ArtisanComponent implements OnInit {
@Input() artisan!:User;
 constructor(private router: Router) { }

 ngOnInit(){
 }
 /*onViewEtudiant(){
     this.router.navigateByUrl(`artisans/${this.artisan.id}`);

 }*/

}
