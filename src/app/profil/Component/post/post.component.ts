import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';
import { ListePostsService } from 'src/app/core/services/liste-posts.service';
import * as alertifyjs from 'alertifyjs';
import { User } from 'src/app/core/modeles/user';
import jwt_decode from 'jwt-decode';




@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  userPost!: FormGroup;
  loggedinUser : any;
  profil: { userName: string };
  dataFormControl = new FormControl();
  userRoles: string[] = [];




  constructor(private listePostsService :ListePostsService,
     private router: Router,
     private formBuilder: FormBuilder,
     private liste:ListArtisanService,) { this.profil = { userName: '' };
     }

  ngOnInit(): void {

   
    this.userPost = this.formBuilder.group({
      type: [null, Validators.required],
      artisan: [null, Validators.required], 
      titreAnnonce: [null, Validators.required],
      description: [null, Validators.required],
      ville: [null, Validators.required],
      imgUrl: [null, Validators.required],
      prix: [null, Validators.required],
    });
    




   this.loggedinUser = localStorage.getItem('access_token')!;
   const decodedToken: any = jwt_decode(this.loggedinUser); 
   const subject = decodedToken.payload;
   const id = subject.id    
   this.liste.getArtisanById(id).subscribe(
      (user: User) => {
        this.profil = user;
      },
      (error) => {
        console.log(error); 
      }
    );
    this.liste.getUserRoles(id)
      .subscribe(
        roles => this.userRoles = roles,
        error => console.log('Error:', error)
      );
  }

 

 
  
  onSubmit() {
    if (this.userPost.invalid) {
      alertifyjs.set('notifier', 'position', 'bottom-center');
        alertifyjs.error('Veuillez remplir tous les champs');
      return;
    }
  
    console.log(this.userPost.value);
    this.listePostsService.lancerPost(this.userPost.value).subscribe(
      () => {
        alertifyjs.set('notifier', 'position', 'bottom-center');
        alertifyjs.success('Post ajouté avec succès');
        this.router.navigate(['/profil']);
      },
      (error) => {
        alertifyjs.set('notifier', 'position', 'bottom-center');
        alertifyjs.error('Une erreur s\'est produite lors de l\'ajout du post.');
        console.error(error);
      }
    );
  }
  
  

}
