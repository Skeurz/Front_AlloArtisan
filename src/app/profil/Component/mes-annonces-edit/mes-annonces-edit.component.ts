import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/modeles/post';
import { ListePostsService } from 'src/app/core/services/liste-posts.service';
import { Observable } from 'rxjs';
import * as alertifyjs from 'alertifyjs';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-mes-annonces-edit',
  templateUrl: './mes-annonces-edit.component.html',
  styleUrls: ['./mes-annonces-edit.component.css']
})
export class MesAnnoncesEditComponent implements OnInit {
  constructor(private listePostsService: ListePostsService, private router: Router, private route: ActivatedRoute) { }
  post: Post | undefined;



  ngOnInit(): void {
  const postId = this.route.snapshot.paramMap.get('id');
  console.log(postId)
  if (postId !== null) {
    this.listePostsService.getPost(postId).subscribe(
      (post: Post) => {
        this.post = post;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}


  





 



  updatePost(post: Post): Observable<Post> {
    return this.listePostsService.updatePost(post);
  }

  onUpdatePost(post: Post) {
    this.updatePost(post).subscribe(updatedPost => {
      console.log('annonce éditée:', updatedPost);
      alertifyjs.set('notifier','position', 'bottom-center');
      alertifyjs.success('Offre / besoin modifié avec succès');
      
  
    }, error => {
      console.error('Error updating user:', error);
    });
  }


}
