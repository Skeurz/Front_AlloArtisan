import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';import { Post } from 'src/app/core/modeles/post';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';
import { ListePostsService } from 'src/app/core/services/liste-posts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {
  
  post$!: Observable<Post[]>;
  posts: any;
  selectedville: any;


  constructor(private listePostsService :ListePostsService, private router: Router){ }


  ngOnInit(): void {
    this.post$=this.listePostsService.getPostsByType("offre");
  }


  triVille(selectedville: string): Observable<Post[]> {
    if (selectedville) {
      this.post$ = of([]);
      this.posts = [];
      //Verifie qu'il s'agit de type offre d'abords
      this.listePostsService.getPostsByType("offre").subscribe(posts => {
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


  redirectToPage(userId: string): void {
    this.router.navigate(['profil/chat'], { queryParams: { userId : userId } });
  }
  


}
