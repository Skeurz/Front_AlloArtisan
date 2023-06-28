import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../modeles/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:8090/reviews';

  constructor(private http: HttpClient) { }


  addReview(review: Review): Observable<Review> {
    const url = `${this.apiUrl}/add`;
    return this.http.post<Review>(url, review);
  }

  getAllReviews(): Observable<Review[]> {
    const url = `${this.apiUrl}/all`;
    return this.http.get<Review[]>(url);
  }

  getAllReviewsByReceiver(receiver: string): Observable<Review[]> {
    const url = `${this.apiUrl}/receiver/${receiver}`;
    return this.http.get<Review[]>(url);
  }
}
