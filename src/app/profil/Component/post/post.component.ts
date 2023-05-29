import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationServiceService } from 'src/app/core/services/authentification-service.service';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  userPost!: FormGroup;

  constructor(private router: Router,
     private formBuilder: FormBuilder,
     private liste:ListArtisanService,) { }

  ngOnInit(): void {
    this.userPost = this.formBuilder.group({
      type: [null],
      artisant: [null],
      titreAnnonce: [null],
      description: [null],
      ville: [null],
       imgUrl: [null],
      prix: [null],


    });

  }
  onContinue() {
    this.router.navigateByUrl("/connexion/user");

  }
  onSubmite() {
    console.log(this.userPost.value);

    // console.log(this.userPost.value)
    this.liste.lancerPost(this.userPost.value).subscribe();
  

  
  }

}
