import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Post } from '../modeles/post';
import { User } from '../modeles/user';
import { Data, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Itoken } from '../modeles/itoken';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationServiceService {
  urlApi = "http://localhost:8090";
  

  headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
  currentUser = {};

  constructor(private http: HttpClient) { }

 login(user:User):Observable<Itoken>{
 return this.http.post<Itoken>(`${this.urlApi}/authenticate`,user);}


 getUserByUserName (userName:string){
  return this.http.get<User>(`${this.urlApi}/users/${userName}`)
}

  
  ajouterUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.urlApi}/register`, user); 
  }

  getArtisanById(id: number): Observable<User>{
    return this.http.get<User>(`${this.urlApi}/profile/${id}`)
    }


  getUserProfil(userId: number): Observable<User> {
    return this.http.get<User>(`${this.urlApi}/profil/${userId}`);
  }


  getUserByEmail(userEmail: string): Observable<User> {
    return this.http.get<User>(`http://localhost:8090/users/${userEmail}`);
  }


   handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  addRoleToUser(userName: string, roleName: string) {
    const url = `${this.urlApi}/addRoleToUser`;
    const roleForm = { userName, roleName };
    return this.http.post<void>(url, roleForm);
  }


  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }


  confirmEmail(token: string) {
    return this.http.get(`${this.urlApi}/confirm?token=${token}`);
  }

  isEmailConfirmed(userName: string): Observable<boolean> {
    const url = `${this.urlApi}/${userName}/confirm`;
    return this.http.get<boolean>(url);
  }
  

}