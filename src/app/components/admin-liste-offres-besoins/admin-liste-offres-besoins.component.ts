import { Component,Input,OnInit } from '@angular/core';
import { ListArtisanService } from '../../core/services/list-artisan.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/modeles/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import * as alertifyjs from 'alertifyjs';
import { AdminEditComponent } from '../admin-edit/admin-edit.component';
import { Post } from 'src/app/core/modeles/post';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-admin-liste-offres-besoins',
  templateUrl: './admin-liste-offres-besoins.component.html',
  styleUrls: ['./admin-liste-offres-besoins.component.css']
})
export class AdminListeOffresBesoinsComponent {
  post$!: Observable<Post[]>;
  posts: any[] = [];
  selectedPost: Post;
  showComponent: boolean = false;

  constructor(private listArtisanService :ListArtisanService,private router: Router, private http: HttpClient, private location: Location){ }

  ngOnInit() : void { this.post$=this.listArtisanService.getAllPosts(); } //Montre tous les postes dans la BDD une fois atteri sur la page.

  Activation(post: Post) {
    
    
    this.showComponent = !this.showComponent;
    
    this.selectedPost = post;
    console.log(post)
    
  }

  deletePost(id: number) {
    this.listArtisanService.deletePost(id)
      .subscribe(
        () => { console.log('User deleted successfully.');
        this.posts = this.posts.filter(post => post.id !== id);
        window.location.reload();
          // Handle successful deletion, e.g., show a success message
        },
        (error) => {  console.error('An error occurred while deleting the user:', error)
          // Handle error, e.g., show an error message
        }
      );
  }

  updatePost(post: Post): Observable<Post> {
    return this.listArtisanService.updatePost(post);
  }

  onUpdatePost(post: Post) {
    this.updatePost(post).subscribe(updatedPost => {
      // Handle the updated user response if needed
      console.log('Offre / Besoin éditer:', updatedPost);
      alertifyjs.set('notifier','position', 'bottom-center');
      alertifyjs.success('Offre / besoin modifié avec succès');
      
  
    }, error => {
      // Handle error if the update fails
      console.error('Error updating user:', error);
    });
  }

}
