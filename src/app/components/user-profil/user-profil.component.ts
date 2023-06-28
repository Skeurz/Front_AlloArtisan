import { Component, OnInit } from '@angular/core';
import { ListArtisanService } from 'src/app/core/services/list-artisan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/modeles/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from 'src/app/core/modeles/review';
import { ReviewService } from 'src/app/core/services/review.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import * as alertifyjs from 'alertifyjs';



@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  user: User | undefined;
  userRoles: string[] = [];
  showForm: boolean = false;
  review: Review = {} as Review;
  reviewForm: FormGroup;
reviewerId: FormControl;
comment: FormControl;
receiverId: FormControl;
starRating: FormControl;
reviews: Review[] = [];
profil:any;
loggedinUser : any;



  

  constructor(private liste: ListArtisanService, private route: ActivatedRoute, private http: HttpClient,private router: Router,
    private  reviewService: ReviewService) {this.reviewerId = new FormControl('', Validators.required);
    this.comment = new FormControl('', Validators.required);
    this.receiverId = new FormControl('', Validators.required);
    this.starRating = new FormControl('0', Validators.required);
  
    this.reviewForm = new FormGroup({
      reviewer: this.reviewerId,
      comment: this.comment,
      receiver: this.receiverId,
      starRating: this.starRating
    });}





  ngOnInit(): void {
    const utilisateur = this.route.snapshot.paramMap.get('utilisateur');
    if (utilisateur !== null) {
      this.liste.getUserByUserName(utilisateur).subscribe(
        (user: User) => {
          this.user = user;
        },
        (error: any) => {
          console.error(error);
        }
      ); 
  }
  if (utilisateur !== null) {
  this.liste.getRoleByUsername(utilisateur)
  .subscribe(
    roles => this.userRoles = roles,
    error => console.log('Error:', error)
  );} 
  if (utilisateur !== null) {
  this.reviewService.getAllReviewsByReceiver(utilisateur).subscribe(
    (reviews: Review[]) => {
      this.reviews = reviews;
    },
    (error: any) => {
      console.log('Error:', error);
    }
  );}
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
  }

  redirectToPage(userId: string): void {
    this.router.navigate(['profil/chat'], { queryParams: { userId : userId } });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  submitReview() {
    if (this.profil.userName !== this.route.snapshot.paramMap.get('utilisateur')){
    this.reviewService.addReview(this.reviewForm.value).subscribe(
      (response) => {
        this.review = {} as Review;
        window.location.reload();
        alertifyjs.set('notifier', 'position', 'bottom-center');
            alertifyjs.success('Merci pour votre commentaire.');
      },
      (error) => {
        console.log('Erreur:', error);
      }
    );
  }
  else {alertifyjs.error('Vous ne pouvez pas commentez sur votre propre profil.');}
}



}
