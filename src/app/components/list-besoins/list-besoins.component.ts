import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from 'src/app/core/modeles/post';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';
import { ListePostsService } from 'src/app/core/services/liste-posts.service';
import { catchError, map } from 'rxjs/operators';



@Component({
  selector: 'app-list-besoins',
  templateUrl: './list-besoins.component.html',
  styleUrls: ['./list-besoins.component.css']
})
export class ListBesoinsComponent implements OnInit {

  
  
  post$!: Observable<Post[]>;
  posts: any;
  selectedville: any;

  constructor(private listePostsService :ListePostsService){ }


  ngOnInit(): void {
   /* this.besoin$=this.listePostsService.getAllBesoin();*/
   this.post$=this.listePostsService.getPostsByType("besoin");

  }


  triVille(selectedville: string): Observable<Post[]> {
    if (selectedville) {
      this.post$ = of([]);
      this.posts = [];
      //Verifie qu'il s'agit de type besoin d'abords
      this.listePostsService.getPostsByType("besoin").subscribe(posts => {
        const filteredPosts = posts.filter(post => post.ville === selectedville);
        this.posts = filteredPosts;
      });
    }
    return of(this.posts);
  }


  resetTri() {
    this.selectedville = '';
    this.triVille(this.selectedville);
    this.post$=this.listePostsService.getPostsByType("besoin");
    this.posts = [];
  }

  
  
  
  


}
