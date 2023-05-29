import { Component,OnInit } from '@angular/core';
import { ListArtisanService } from '../../core/services/list-artisan.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/modeles/user';



@Component({
  selector: 'app-artisan-list',
  templateUrl: './artisan-list.component.html',
  styleUrls: ['./artisan-list.component.css']
})
export class ArtisanListComponent implements OnInit {

 artisan$!: Observable<User[]>;


 constructor(private listArtisanService :ListArtisanService){ }

  ngOnInit() : void {
 // this.artisan$=this.listArtisanService.getAllArtisan();
  this.artisan$=this.listArtisanService.getAllArtisan();
}

}
