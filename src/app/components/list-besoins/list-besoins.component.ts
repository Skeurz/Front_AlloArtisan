import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from 'src/app/core/modeles/post';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';
import { ListePostsService } from 'src/app/core/services/liste-posts.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';



@Component({
  selector: 'app-list-besoins',
  templateUrl: './list-besoins.component.html',
  styleUrls: ['./list-besoins.component.css']
})
export class ListBesoinsComponent implements OnInit {

  
  selectedSortOption: string;
  post$!: Observable<Post[]>;
  posts: any;
  selectedville: any;
  selectedchrono: any;
  time:any;
  sortedPosts$: Observable<any[]>;

  constructor(private listePostsService :ListePostsService, private router: Router){ }


  ngOnInit(): void {
    this.post$ = this.listePostsService.getPostsByType('besoin')
   
}


triChronologique(selectedchrono: string) {
  if (selectedchrono == "recent") {
      this.post$ = of([]);
      this.posts = [];
      this.post$ = this.listePostsService.getPostsByType('besoin')
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
      this.post$ = this.listePostsService.getPostsByType('besoin')
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

  


  triVille(selectedville: string): Observable<Post[]> {
    this.selectedchrono="";
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
    this.selectedchrono='';
  }


  redirectToPage(userId: string): void {
    this.router.navigate(['profil/chat'], { queryParams: { userId : userId } });
  }

  
  
  


}
