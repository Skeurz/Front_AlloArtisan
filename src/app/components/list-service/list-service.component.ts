import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';import { Post } from 'src/app/core/modeles/post';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';
import { ListePostsService } from 'src/app/core/services/liste-posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';


@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {
  
  post$!: Observable<Post[]>;
  posts: any;
  selectedville: any;
  selectedchrono: any;
  time:any;
  sortedPosts$: Observable<any[]>;


  constructor(private listePostsService :ListePostsService, private router: Router, private route: ActivatedRoute){ }


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
    this.post$=this.listePostsService.getPostsByType("offre");
    this.posts = [];
  }


  redirectToPage(userId: string): void {
    this.router.navigate(['profil/chat'], { queryParams: { userId : userId } });
  }
  
  triChronologique(selectedchrono: string) {
    if (selectedchrono == "recent") {
        this.post$ = of([]);
        this.posts = [];
        this.post$ = this.listePostsService.getPostsByType('offre')
      .pipe(
        map(posts => posts.sort((a, b) => {
          const dateA = a.dateCreated ? new Date(a.dateCreated).getTime() : 0;
          const dateB = b.dateCreated ? new Date(b.dateCreated).getTime() : 0;
          return dateB - dateA;
          
        }))
      );
      this.selectedville='';
    }
      
      if (selectedchrono == "ancien") {
        this.post$ = of([]);
        this.posts = [];
        this.post$ = this.listePostsService.getPostsByType('offre')
          .pipe(
            map(posts => posts.sort((a, b) => {
              const dateA = a.dateCreated ? new Date(a.dateCreated).getTime() : 0;
              const dateB = b.dateCreated ? new Date(b.dateCreated).getTime() : 0;
              return dateA - dateB;
            }))
          );
          this.selectedville=''
        }
  
  }

  pageToRedirect(utilisateur: string): void {
    const userName = this.route.snapshot.paramMap.get('utilisateur');
  this.router.navigate(['user/', utilisateur], { queryParams: { userName: userName } });
}

}
