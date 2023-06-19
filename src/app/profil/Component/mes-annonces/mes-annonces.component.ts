import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';import { Post } from 'src/app/core/modeles/post';
import { User } from 'src/app/core/modeles/user';
import jwt_decode from 'jwt-decode';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';
import { ListePostsService } from 'src/app/core/services/liste-posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mes-annonces',
  templateUrl: './mes-annonces.component.html',
  styleUrls: ['./mes-annonces.component.css']
})
export class MesAnnoncesComponent implements OnInit {
  loggedinUser: any;
  profil: any;
  lab$!: Observable<Post[]>;
  posts: any[] = [];

  constructor(private listePostsService :ListePostsService,
    private router: Router,
    private liste:ListArtisanService,) {}




ngOnInit(): void {
  this.loggedinUser = localStorage.getItem('access_token')!;
  const decodedToken: any = jwt_decode(this.loggedinUser); 
  const subject = decodedToken.payload;
  const userName = subject.sub;  
  this.lab$=this.listePostsService.getPostsByArtisan(userName);
}

deletePost(id: number) {
  this.listePostsService.deletePost(id)
    .subscribe(
      () => { console.log('User deleted successfully.');
      this.posts = this.posts.filter(post => post.id !== id);
      window.location.reload();
      },
      (error) => {  console.error('An error occurred while deleting the user:', error)
      }
    );
}




}
