import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/core/modeles/post';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';
import { ListePostsService } from 'src/app/core/services/liste-posts.service';



@Component({
  selector: 'app-list-besoins',
  templateUrl: './list-besoins.component.html',
  styleUrls: ['./list-besoins.component.css']
})
export class ListBesoinsComponent implements OnInit {
  besoin$!:Observable<Post[]>;

  constructor(private listePostsService :ListePostsService){ }


  ngOnInit(): void {
    this.besoin$=this.listePostsService.getAllBesoin();

  }

}
